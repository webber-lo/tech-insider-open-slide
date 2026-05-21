import { colors } from './theme';
import type {
  CoverContent,
  DeckMeta,
  MythClassContent,
  PaletteReferenceContent,
  ProgramContent,
  TrustPyramidContent,
} from './schema';

export const deckMeta = {
  title: 'TECH INSIDER Channel Plan',
  createdAt: '2026-05-19T13:01:39.915Z',
} satisfies DeckMeta;

export const cover = {
  kicker: 'CHANNEL PLAN',
  title: 'TECH INSIDER',
  subtitle: '用商業角度看懂科技在想什麼。',
  footer: 'BUSINESS INSIDER TAIWAN',
  cards: [
    {
      label: '以信任為基礎',
      body: '科技內容要先建立判斷力與可信度，再追求速度與流量。',
      color: colors.brandBlue,
    },
    {
      label: '多媒體先行',
      body: 'YouTube、Podcast、短影音先形成注意力，文字最後沉澱為 SEO 與知識庫。',
      color: colors.brandNavy,
    },
    {
      label: '商業觀點收割',
      body: '把新聞、外電與授權內容轉譯成商業決策者看得懂的脈絡。',
      color: colors.brandRoyal,
    },
  ],
} satisfies CoverContent;

export const trustPyramid = {
  kicker: 'Trust Pyramid',
  title: 'TECH INSIDER 的內容信任金字塔',
  levels: [
    {
      label: '讀者信任',
      body: '每個單元都必須讓觀眾覺得：這裡不是跟風，而是在幫我理解世界。',
      color: colors.brandBlue,
    },
    {
      label: '商業轉譯',
      body: '從公司、產業、投資邏輯與市場影響切入，而不是只複述科技新聞。',
      color: colors.brandSlate,
    },
    {
      label: 'AI 協作製作',
      body: 'AI 可以加速研究、腳本、圖像與剪輯，但不能讓受眾感到內容失真。',
      color: colors.brandRoyal,
    },
    {
      label: '多媒體發行',
      body: '影音與聲音先建立觸及，文字再整理為文章、網站內容與長期知識資產。',
      color: colors.brandNavy,
    },
  ],
} satisfies TrustPyramidContent;

export const programs = [
  {
    id: 'tech-talk',
    title: '踢透 Tech Talk',
    positioning: '用動畫與視覺化解釋科技新聞背後的事件、關係、利益與下一步。',
    carrier: 'YouTube',
    length: '5-8 分鐘',
    structure: '一個事件、一張關係圖、三個商業問題',
    source: 'BI 外電、重大科技事件、海外授權內容',
    accent: colors.brandBlue,
  },
  {
    id: 'ai-work',
    title: 'AI 上工',
    positioning: '邀請各行各業談 AI 如何改變工作流，讓抽象趨勢變成具體現場。',
    carrier: 'Podcast，可搭配 YouTube 精華',
    length: '15-20 分鐘',
    structure: '工作流拆解、工具選擇、失敗經驗、下一步',
    source: '各行業工作者、企業內部實踐者、創作者',
    accent: colors.brandRoyal,
  },
  {
    id: 'earnings-translator',
    title: '財報翻譯機',
    positioning: '把科技公司財報、商業模式與投資邏輯翻譯給知識大眾。',
    carrier: 'Podcast / YouTube / 文章皆可',
    length: '15 分鐘以內',
    structure: '財報重點、商業模式、風險訊號、投資人真正該看什麼',
    source: '公司財報、分析師會議、金融圈與財經同仁合作',
    accent: colors.brandNavy,
  },
  {
    id: 'tech-care',
    title: 'Tech Care',
    positioning: '處理健康、醫療、生活科技與商業科技交界，讓科技回到人的日常。',
    carrier: '文章不限，影音可短可長',
    length: '15-20 分鐘以內，也可更短',
    structure: '需求場景、技術突破、商業化阻力、生活影響',
    source: '醫療健康、生活科技、跨線同仁共同企劃',
    accent: colors.brandSlate,
  },
] satisfies ProgramContent[];

export const mythClass = {
  kicker: 'Short-form Explainer',
  title: '迷思課 Myth Class',
  duration: '60-180 秒短影音',
  headline: '把科技與商業迷思拆成可以轉傳的一堂課',
  body: '用短影音、YouTube 或圖文解釋大家常聽到但未必理解的科技概念，適合和社群同仁合作。',
  examples: [
    {
      label: '01 迷思',
      body: 'AI 公司是不是只要有模型就會賺錢？',
    },
    {
      label: '02 事件',
      body: '記憶體、HBM、DRAM 到底在漲什麼？',
    },
    {
      label: '03 商業解釋',
      body: '短影音把問題說清楚，文章再補上資料、圖表與延伸閱讀。',
    },
  ],
} satisfies MythClassContent;

export const paletteReference = {
  kicker: 'Palette Reference',
  title: '品牌色階 + 功能色 token',
  brandColors: [
    { name: '主品牌深藍', hex: colors.brandNavy, role: '封面、深色底、強品牌識別' },
    { name: '次深藍', hex: colors.brandRoyal, role: 'Program 頁、重點色塊、次層級標示' },
    { name: '灰藍', hex: colors.brandSlate, role: '分析、信任、產業脈絡頁的沉穩色' },
    { name: '主強調藍', hex: colors.brandBlue, role: 'tag、線條、頁碼、重點提示' },
    { name: '淡藍', hex: colors.brandPaleBlue, role: '輕量背景、輔助區隔、資訊層級', textDark: true },
    { name: '米白背景', hex: colors.paper, role: '第二頁以後的主要背景，避免全白廉價感', textDark: true },
  ],
  tokens: [
    { name: '深墨文字', hex: colors.ink, role: '標題與正文主文字' },
    { name: '輔助灰藍', hex: colors.muted, role: '說明文字、註解與低層級資訊' },
    { name: '線條灰藍', hex: colors.line, role: '卡片邊框、表格線、分隔線', textDark: true },
    { name: '純白卡片', hex: colors.white, role: '卡片與資訊容器背景', textDark: true },
  ],
} satisfies PaletteReferenceContent;

export const aiOperationRules = [
  'AI 生圖只負責主視覺，不負責中文字。',
  '標題、內文、數字、tag、頁碼全部交給 OpenSlide 排版。',
  '文字以深墨色為主；顏色用於色塊、tag、線條、底色與區隔。',
  '不要新增隨機深黃色或非品牌色。',
  '9:16 直式資訊圖需要另外建立直式母片，不混在 16:9 簡報裡。',
];
