import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';

export const design: DesignSystem = {
  palette: {
    bg: '#081C2B',
    text: '#F7FAFC',
    accent: '#00A6D6',
  },
  fonts: {
    display:
      '"Play", "Noto Sans TC", "Microsoft JhengHei", system-ui, -apple-system, sans-serif',
    body: '"Noto Sans TC", "Microsoft JhengHei", system-ui, -apple-system, sans-serif',
  },
  typeScale: {
    hero: 136,
    body: 34,
  },
  radius: 8,
};

const palette = {
  navy: design.palette.bg,
  text: design.palette.text,
  accent: design.palette.accent,
  ice: '#F4F7FA',
  ink: '#082033',
  muted: '#66788A',
  line: '#D9E2EA',
  white: '#FFFFFF',
  softAccent: '#DDF4FB',
};

const PAGE_W = 1920;
const PAGE_H = 1080;
const PAD_X = 88;
const PAD_TOP = 82;
const PAD_BOTTOM = 76;
const radius = 'var(--osd-radius)';

const base = {
  width: '100%',
  height: '100%',
  position: 'relative' as const,
  overflow: 'hidden',
  fontFamily: 'var(--osd-font-body)',
};

const PageBadge = ({ page, dark }: { page: string; dark?: boolean }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      color: dark ? palette.white : palette.ink,
      fontSize: 22,
      fontWeight: 800,
      letterSpacing: '0.04em',
    }}
  >
    <span
      style={{
        width: 52,
        height: 5,
        background: palette.accent,
        display: 'block',
      }}
    />
    <span
      style={{
        border: `1px solid ${dark ? 'rgba(255,255,255,0.30)' : palette.line}`,
        background: dark ? 'rgba(255,255,255,0.08)' : palette.white,
        borderRadius: 999,
        padding: '8px 18px 9px',
        boxShadow: dark ? 'none' : '0 12px 28px rgba(8, 32, 51, 0.08)',
      }}
    >
      TI / {page}
    </span>
  </div>
);

const Footer = ({ page }: { page: string }) => (
  <div
    style={{
      position: 'absolute',
      left: PAD_X,
      right: PAD_X,
      bottom: 36,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 22,
      color: palette.muted,
      letterSpacing: 0,
    }}
  >
    <span style={{ fontWeight: 700, color: palette.ink }}>TECH INSIDER</span>
    <PageBadge page={page} />
  </div>
);

const CoverFooter = ({ page }: { page: string }) => (
  <div
    style={{
      position: 'absolute',
      left: PAD_X,
      right: PAD_X,
      bottom: 36,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 22,
      color: 'rgba(255,255,255,0.72)',
      letterSpacing: 0,
    }}
  >
    <span style={{ fontWeight: 700 }}>BUSINESS INSIDER TAIWAN</span>
    <PageBadge page={page} dark />
  </div>
);

const PageTitle = ({ kicker, title }: { kicker: string; title: string }) => (
  <div style={{ position: 'absolute', left: PAD_X, top: PAD_TOP }}>
    <div
      style={{
        fontSize: 22,
        fontWeight: 800,
        color: palette.accent,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        marginBottom: 22,
      }}
    >
      {kicker}
    </div>
    <h1
      style={{
        margin: 0,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 68,
        lineHeight: 1.12,
        fontWeight: 800,
        color: palette.ink,
        letterSpacing: 0,
      }}
    >
      {title}
    </h1>
  </div>
);

const TopRule = () => (
  <div
    style={{
      position: 'absolute',
      top: 58,
      left: PAD_X,
      width: 138,
      height: 8,
      background: palette.accent,
      borderRadius: 0,
    }}
  />
);

const Card = ({
  label,
  body,
  inverted,
}: {
  label: string;
  body: string;
  inverted?: boolean;
}) => (
  <div
    style={{
      background: inverted ? palette.accent : palette.white,
      border: inverted ? 'none' : `1px solid ${palette.line}`,
      borderRadius: radius,
      padding: '42px 42px 38px',
      minHeight: 250,
      boxShadow: '0 22px 44px rgba(8, 32, 51, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div
      style={{
        fontSize: 33,
        lineHeight: 1.25,
        fontWeight: 800,
        color: inverted ? palette.white : palette.ink,
        letterSpacing: 0,
      }}
    >
      {label}
    </div>
    <p
      style={{
        margin: '26px 0 0',
        fontSize: 26,
        lineHeight: 1.45,
        color: inverted ? 'rgba(255,255,255,0.88)' : palette.muted,
        letterSpacing: 0,
      }}
    >
      {body}
    </p>
  </div>
);

const Cover: Page = () => (
  <div style={{ ...base, background: palette.navy, color: palette.text }}>
    <div
      style={{
        position: 'absolute',
        right: -180,
        top: -260,
        width: 740,
        height: 740,
        border: '86px solid rgba(0,166,214,0.22)',
        borderRadius: '50%',
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: PAD_X,
        top: 132,
        width: 128,
        height: 8,
        background: palette.accent,
      }}
    />
    <div style={{ position: 'absolute', left: PAD_X, top: 214, width: 1400 }}>
      <div
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: palette.accent,
          letterSpacing: '0.1em',
          marginBottom: 36,
        }}
      >
        SLIDE MASTER V1
      </div>
      <h1
        style={{
          margin: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          lineHeight: 1.02,
          fontWeight: 800,
          color: palette.text,
          letterSpacing: 0,
        }}
      >
        TECH INSIDER
      </h1>
      <p
        style={{
          margin: '38px 0 0',
          maxWidth: 1240,
          fontSize: 42,
          lineHeight: 1.35,
          color: 'rgba(247,250,252,0.86)',
          letterSpacing: 0,
        }}
      >
        用商業視角看懂科技如何改變工作、公司與生活
      </p>
    </div>
    <CoverFooter page="01 / 10" />
  </div>
);

const Section: Page = () => (
  <div style={{ ...base, background: palette.ice }}>
    <TopRule />
    <div style={{ position: 'absolute', left: PAD_X, top: 190, width: 1460 }}>
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: palette.accent,
          letterSpacing: '0.08em',
          marginBottom: 40,
        }}
      >
        CHAPTER
      </div>
      <h1
        style={{
          margin: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 112,
          lineHeight: 1.08,
          fontWeight: 800,
          color: palette.ink,
          letterSpacing: 0,
        }}
      >
        先定義問題，
        <br />
        再決定格式。
      </h1>
    </div>
    <div
      style={{
        position: 'absolute',
        right: PAD_X,
        bottom: 112,
        width: 500,
        height: 260,
        background: palette.accent,
        borderRadius: radius,
      }}
    />
    <Footer page="02 / 10" />
  </div>
);

const Claim: Page = () => (
  <div style={{ ...base, background: palette.ice }}>
    <PageTitle kicker="Single Claim" title="每頁只說一個判斷，其他資訊都服務這個判斷。" />
    <div
      style={{
        position: 'absolute',
        left: PAD_X,
        right: PAD_X,
        top: 314,
        background: palette.white,
        border: `1px solid ${palette.line}`,
        borderRadius: radius,
        padding: '76px 86px',
        boxShadow: '0 22px 44px rgba(8, 32, 51, 0.08)',
      }}
    >
      <p
        style={{
          margin: 0,
          maxWidth: 1500,
          fontSize: 52,
          lineHeight: 1.45,
          fontWeight: 700,
          color: palette.ink,
          letterSpacing: 0,
        }}
      >
        AI 可以輔助製作，但如果讓閱讀者因為 AI 味而失去信任，這份內容就失敗了。
      </p>
      <div
        style={{
          marginTop: 52,
          width: 210,
          height: 8,
          background: palette.accent,
        }}
      />
    </div>
    <Footer page="03 / 10" />
  </div>
);

const ThreeCards: Page = () => (
  <div style={{ ...base, background: palette.ice }}>
    <PageTitle kicker="Three Columns" title="三欄頁只放同一層級的資訊，不混流程與結論。" />
    <div
      style={{
        position: 'absolute',
        left: PAD_X,
        right: PAD_X,
        top: 330,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 34,
      }}
    >
      <Card label="國際內容基礎" body="以 BI 全球科技與商業內容作為議題底層。" />
      <Card label="商業邏輯轉譯" body="從公司、資本、工作流與生活影響切入。" inverted />
      <Card label="多格式沉澱" body="影片、Podcast、文章可互相延伸與回收。" />
    </div>
    <Footer page="04 / 10" />
  </div>
);

const Program: Page = () => (
  <div style={{ ...base, background: palette.ice }}>
    <PageTitle kicker="Program Page" title="單元規劃頁：固定欄位，方便比較與決策。" />
    <div
      style={{
        position: 'absolute',
        left: PAD_X,
        right: PAD_X,
        top: 300,
        display: 'grid',
        gridTemplateColumns: '460px 1fr',
        gap: 34,
      }}
    >
      <div
        style={{
          background: palette.navy,
          color: palette.white,
          borderRadius: radius,
          padding: '52px 46px',
          minHeight: 440,
        }}
      >
        <div style={{ fontSize: 25, color: palette.accent, fontWeight: 800, marginBottom: 32 }}>
          範例單元
        </div>
        <div style={{ fontSize: 54, lineHeight: 1.12, fontWeight: 800 }}>踢透 Tech Talk</div>
        <p style={{ margin: '38px 0 0', fontSize: 27, lineHeight: 1.48, color: 'rgba(255,255,255,0.78)' }}>
          用短影音或動畫解釋科技新聞背後的商業脈絡。
        </p>
      </div>
      <div
        style={{
          background: palette.white,
          border: `1px solid ${palette.line}`,
          borderRadius: radius,
          padding: '44px 50px',
          minHeight: 440,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '28px 44px',
        }}
      >
        <Info label="主載體" value="YouTube" />
        <Info label="每集長度" value="5–8 分鐘" />
        <Info label="固定結構" value="事件、脈絡、商業意義、下一步" />
        <Info label="合作來源" value="外電授權、社群、資料整理" />
      </div>
    </div>
    <Footer page="05 / 10" />
  </div>
);

const Info = ({ label, value }: { label: string; value: string }) => (
  <div
    style={{
      borderTop: `5px solid ${palette.accent}`,
      paddingTop: 22,
    }}
  >
    <div style={{ fontSize: 22, fontWeight: 800, color: palette.muted, marginBottom: 16 }}>
      {label}
    </div>
    <div style={{ fontSize: 34, lineHeight: 1.32, fontWeight: 800, color: palette.ink }}>
      {value}
    </div>
  </div>
);

const AxisLabel = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div
    style={{
      position: 'absolute',
      fontSize: 21,
      fontWeight: 800,
      color: palette.muted,
      letterSpacing: '0.06em',
      ...style,
    }}
  >
    {children}
  </div>
);

const MatrixCell = ({
  title,
  body,
  active,
}: {
  title: string;
  body: string;
  active?: boolean;
}) => (
  <div
    style={{
      background: active ? palette.accent : palette.white,
      color: active ? palette.white : palette.ink,
      border: active ? 'none' : `1px solid ${palette.line}`,
      borderRadius: radius,
      padding: '34px 38px',
      minHeight: 184,
      boxShadow: active ? '0 26px 54px rgba(0, 166, 214, 0.24)' : 'none',
    }}
  >
    <div style={{ fontSize: 31, lineHeight: 1.22, fontWeight: 800 }}>{title}</div>
    <p
      style={{
        margin: '18px 0 0',
        fontSize: 23,
        lineHeight: 1.42,
        color: active ? 'rgba(255,255,255,0.86)' : palette.muted,
      }}
    >
      {body}
    </p>
  </div>
);

const Matrix: Page = () => (
  <div style={{ ...base, background: palette.ice }}>
    <PageTitle kicker="Matrix" title="2x2 矩陣：用兩個問題快速決定內容優先順序。" />
    <div
      style={{
        position: 'absolute',
        left: 172,
        top: 318,
        width: 1500,
        height: 560,
      }}
    >
      <AxisLabel style={{ left: 590, top: -48 }}>商業影響高</AxisLabel>
      <AxisLabel style={{ left: 592, bottom: -48 }}>商業影響低</AxisLabel>
      <AxisLabel style={{ left: -104, top: 250, transform: 'rotate(-90deg)' }}>製作難度低</AxisLabel>
      <AxisLabel style={{ right: -104, top: 250, transform: 'rotate(90deg)' }}>製作難度高</AxisLabel>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: 24,
        }}
      >
        <MatrixCell title="先做成系列" body="高影響、低難度，適合變成固定帶狀單元。" active />
        <MatrixCell title="重點企劃" body="高影響、高難度，適合做成專題或大型提案。" />
        <MatrixCell title="社群測水溫" body="低影響、低難度，適合短影音或圖卡快速驗證。" />
        <MatrixCell title="暫緩" body="低影響、高難度，除非有合作資源，不先投入。" />
      </div>
    </div>
    <Footer page="06 / 10" />
  </div>
);

const PyramidBand = ({
  width,
  top,
  label,
  body,
  dark,
}: {
  width: number;
  top: number;
  label: string;
  body: string;
  dark?: boolean;
}) => (
  <div
    style={{
      position: 'absolute',
      left: (PAGE_W - width) / 2,
      top,
      width,
      height: 142,
      background: dark ? palette.navy : dark === false ? palette.accent : palette.white,
      color: dark || dark === false ? palette.white : palette.ink,
      border: dark || dark === false ? 'none' : `1px solid ${palette.line}`,
      borderRadius: radius,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 52px',
      boxShadow: '0 22px 44px rgba(8, 32, 51, 0.08)',
    }}
  >
    <div style={{ fontSize: 34, fontWeight: 800 }}>{label}</div>
    <div style={{ maxWidth: 560, fontSize: 24, lineHeight: 1.36, opacity: 0.86 }}>{body}</div>
  </div>
);

const Pyramid: Page = () => (
  <div style={{ ...base, background: palette.ice }}>
    <PageTitle kicker="Pyramid" title="金字塔頁：把論證層級說清楚，避免所有資訊等重。" />
    <PyramidBand
      width={720}
      top={292}
      label="主張"
      body="這頁最後要讓聽眾帶走的一句話。"
      dark={false}
    />
    <PyramidBand
      width={1040}
      top={452}
      label="證據"
      body="數據、案例、採訪、外電脈絡，支撐主張。"
    />
    <PyramidBand
      width={1360}
      top={612}
      label="背景"
      body="讓聽眾理解脈絡所需的最少資訊。"
    />
    <PyramidBand
      width={1680}
      top={772}
      label="信任基礎"
      body="來源透明、人類判斷、AI 輔助不越界。"
      dark
    />
    <Footer page="07 / 10" />
  </div>
);

const SpectrumPoint = ({ left, label }: { left: number; label: string }) => (
  <div
    style={{
      position: 'absolute',
      left,
      top: 492,
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: palette.accent,
      boxShadow: '0 0 0 12px rgba(0,166,214,0.14)',
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: -110,
        top: 48,
        width: 240,
        textAlign: 'center',
        fontSize: 24,
        lineHeight: 1.28,
        fontWeight: 800,
        color: palette.ink,
      }}
    >
      {label}
    </div>
  </div>
);

const Spectrum: Page = () => (
  <div style={{ ...base, background: palette.ice }}>
    <PageTitle kicker="Spectrum" title="光譜軸：不是二選一，而是標出合理位置。" />
    <div
      style={{
        position: 'absolute',
        left: 156,
        right: 156,
        top: 488,
        height: 8,
        background: `linear-gradient(90deg, ${palette.navy}, ${palette.accent})`,
        borderRadius: 999,
      }}
    />
    <div style={{ position: 'absolute', left: 156, top: 402, fontSize: 32, fontWeight: 800, color: palette.ink }}>
      人類判斷
    </div>
    <div style={{ position: 'absolute', right: 156, top: 402, fontSize: 32, fontWeight: 800, color: palette.ink }}>
      AI 輔助
    </div>
    <SpectrumPoint left={420} label="採訪與判斷" />
    <SpectrumPoint left={900} label="整理與腳本" />
    <SpectrumPoint left={1380} label="剪輯與變體" />
    <div
      style={{
        position: 'absolute',
        left: 360,
        right: 360,
        top: 710,
        background: palette.white,
        border: `1px solid ${palette.line}`,
        borderRadius: radius,
        padding: '34px 48px',
        textAlign: 'center',
        fontSize: 31,
        lineHeight: 1.4,
        fontWeight: 800,
        color: palette.ink,
        boxShadow: '0 22px 44px rgba(8, 32, 51, 0.08)',
      }}
    >
      原則：AI 可以省工，但不能代替可信內容的責任歸屬。
    </div>
    <Footer page="08 / 10" />
  </div>
);

const MiniBar = ({ width, label, value, active }: { width: number; label: string; value: string; active?: boolean }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr 70px', gap: 20, alignItems: 'center' }}>
    <div style={{ fontSize: 22, fontWeight: 800, color: active ? palette.ink : palette.muted }}>{label}</div>
    <div style={{ height: 28, background: palette.softAccent, borderRadius: 0 }}>
      <div
        style={{
          width,
          height: 28,
          background: active ? palette.accent : '#A9B8C4',
          borderRadius: 0,
        }}
      />
    </div>
    <div style={{ fontSize: 22, fontWeight: 800, color: active ? palette.ink : palette.muted }}>{value}</div>
  </div>
);

const ChartCleanup: Page = () => (
  <div style={{ ...base, background: palette.ice }}>
    <PageTitle kicker="Declutter" title="圖表頁：先移除雜訊，再用顏色畫出故事重點。" />
    <div
      style={{
        position: 'absolute',
        left: PAD_X,
        right: PAD_X,
        top: 306,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 34,
      }}
    >
      <div style={{ background: palette.white, border: `1px solid ${palette.line}`, borderRadius: radius, padding: 52 }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: palette.muted, marginBottom: 34 }}>修改前：所有資料等重</div>
        <MiniBar width={250} label="A 單元" value="42" />
        <MiniBar width={360} label="B 單元" value="61" />
        <MiniBar width={305} label="C 單元" value="52" />
        <MiniBar width={420} label="D 單元" value="71" />
      </div>
      <div style={{ background: palette.white, border: `1px solid ${palette.line}`, borderRadius: radius, padding: 52 }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: palette.ink, marginBottom: 34 }}>修改後：只強調要說的重點</div>
        <MiniBar width={250} label="A 單元" value="42" />
        <MiniBar width={360} label="B 單元" value="61" />
        <MiniBar width={305} label="C 單元" value="52" />
        <MiniBar width={420} label="D 單元" value="71" active />
      </div>
    </div>
    <Footer page="09 / 10" />
  </div>
);

const Closing: Page = () => (
  <div style={{ ...base, background: palette.navy, color: palette.text }}>
    <div
      style={{
        position: 'absolute',
        left: PAD_X,
        top: 132,
        width: 140,
        height: 8,
        background: palette.accent,
      }}
    />
    <div style={{ position: 'absolute', left: PAD_X, top: 242, width: 1420 }}>
      <h1
        style={{
          margin: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 104,
          lineHeight: 1.1,
          fontWeight: 800,
          color: palette.text,
          letterSpacing: 0,
        }}
      >
        固定風格，
        <br />
        再讓內容長出來。
      </h1>
      <p
        style={{
          margin: '48px 0 0',
          maxWidth: 1140,
          fontSize: 36,
          lineHeight: 1.45,
          color: 'rgba(247,250,252,0.82)',
          letterSpacing: 0,
        }}
      >
        這套母片先處理一致性：配色、字級、標題、頁碼、資訊框。下一步才是把不同企劃放進同一套語法。
      </p>
    </div>
    <CoverFooter page="10 / 10" />
  </div>
);

export const meta: SlideMeta = {
  title: 'TECH INSIDER Slide Master v1',
  createdAt: '2026-05-19T12:39:51.837Z',
};

export default [
  Cover,
  Section,
  Claim,
  ThreeCards,
  Program,
  Matrix,
  Pyramid,
  Spectrum,
  ChartCleanup,
  Closing,
] satisfies Page[];
