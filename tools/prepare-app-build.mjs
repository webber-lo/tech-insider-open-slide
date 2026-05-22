import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

await mkdir(dist, { recursive: true });
await copyFile(path.join(root, "deck-generator-prototype.html"), path.join(dist, "deck-generator-prototype.html"));
await copyFile(path.join(root, "index.html"), path.join(dist, "index.html"));
