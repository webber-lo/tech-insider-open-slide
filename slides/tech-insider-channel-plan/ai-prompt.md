# TECH INSIDER SDD 操作 Prompt

你正在編輯 TECH INSIDER 的 OpenSlide 簡報系統。這不是傳統 PPT，而是 AI 可操作的簡報原始碼。

這套 SDD 採用 Open Design 式工作流：artifact-first、先鎖需求、使用 design system、跑 pre-flight、最後自檢。不要只把 prompt 變成一張漂亮截圖；要維護一個可被修改、預覽、匯出的 OpenSlide artifact。

## Pre-flight

如果使用者沒有明確給出以下資訊，先從現有上下文合理推定；推定風險高時再問：

- `surface`：16:9 提案版、分享版、PDF/PPTX 匯出，或另外建立 9:16 artifact
- `audience`：內部編輯企劃、高階主管、合作夥伴、贊助商、公開分享
- `tone`：策略型、編輯型、銷售型、營運型、教學型
- `brand-context`：預設使用 TECH INSIDER SDD，不另開設計系統
- `scale`：頁數、資訊密度、是否包含品牌色票 appendix

預設方向是 `Tech Utility`。只有當需求明確偏向雜誌感或極簡高階主管版時，才改用 `Editorial Monocle` 或 `Modern Minimal`。

## 使用方式

當使用者提供新內容時，先判斷它屬於哪一種頁型，再改資料或新增元件：

- 只改文案、節目資訊、卡片內容：優先改 `content.ts`
- 改品牌色、字級、間距、卡片、頁碼、陰影：優先改 `theme.ts`
- 改版型結構或新增母片：改 `components.tsx`
- 調整頁面順序、頁數、分享版包含哪些頁：改 `slides.tsx`
- `index.tsx` 只作為 OpenSlide 入口，避免塞入內容或版面細節
- 新增或調整資料欄位時，同步檢查 `schema.ts`
- 新增或規劃母片時，同步更新 `wireframes.ts`
- 更動 Open Design 工作流、需求表單、方向選擇、自檢規則時，同步更新 `open-design.ts`

## 核心原則

- AI 生圖只負責主視覺，不負責中文字。
- 標題、內文、數字、tag、頁碼全部交給 OpenSlide 排版。
- 文字以深墨色為主，不使用彩色字。
- 顏色用在色塊、tag、線條、底色、區隔，不亂用在內文。
- 不新增隨機深黃色或非品牌色。
- 卡片樣式保持一致，不混用大圓角、正方與膠囊樣式。
- 頁碼使用 `PageBadge`，不要退回普通數字。
- 9:16 直式資訊圖需要另外建立直式母片，不混進 16:9 deck。

## 指令範例

「這份內容請用 TECH INSIDER SDD，做成 16:9 提案版；第 2 頁用金字塔，第 4 頁用矩陣。」

執行時應該：

1. 先把使用者素材整理成 `content.ts` 的資料結構。
2. 選擇既有 component，或在 `components.tsx` 建立可重用的新 component。
3. 在 `slides.tsx` 組裝頁面，不把文案寫死在 JSX 裡。
4. 跑 OpenSlide build，確認主版與分享版路由可載入。

## Self-review

完成前依 `open-design.ts` 的 checklist 自檢：

1. Content：每頁是否只有一個清楚主張或模組？
2. Brand：是否只使用 TECH INSIDER tokens 與既定頁碼/卡片語言？
3. Layout：是否可用同一 component 換內容重生，而不是一次性貼死？
4. Artifact：中文字、tag、數字、頁碼是否仍由 OpenSlide 排版？
5. Export：主版與分享版是否 build 並可載入？
