import http from "node:http";
import { readFile } from "node:fs/promises";
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const envPath = process.env.TECH_INSIDER_SDD_ENV || "C:\\Users\\webbe\\.tech-insider-sdd\\.env";

async function loadEnv() {
  if (!existsSync(envPath)) return;
  const text = await readFile(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    if (key && !process.env[key]) process.env[key] = value;
  }
}

await loadEnv();

function sendJson(res, status, body) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

async function handleApi(req, res) {
  const apiName = req.url.split("?")[0].replace("/api/", "");
  const file = path.join(root, "api", `${apiName}.js`);
  if (!existsSync(file)) return sendJson(res, 404, { ok: false, error: "API not found" });
  const mod = await import(`${pathToFileURL(file).href}?t=${Date.now()}`);
  return mod.default(req, res);
}

function serveFile(res, filePath) {
  if (!existsSync(filePath)) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }
  const ext = path.extname(filePath);
  const type = ext === ".html" ? "text/html; charset=utf-8" : ext === ".js" ? "text/javascript; charset=utf-8" : "text/plain; charset=utf-8";
  res.writeHead(200, { "content-type": type });
  createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.url.startsWith("/api/")) return handleApi(req, res);
    const pathname = decodeURIComponent(req.url.split("?")[0]);
    const filePath = pathname === "/" ? path.join(root, "deck-generator-prototype.html") : path.join(root, pathname);
    return serveFile(res, filePath);
  } catch (error) {
    return sendJson(res, 500, { ok: false, error: error.message });
  }
});

const port = Number(process.env.PORT || 8787);
server.listen(port, "127.0.0.1", () => {
  console.log(`TECH INSIDER SDD app: http://127.0.0.1:${port}/`);
  console.log(`Reading API keys from: ${envPath}`);
});
