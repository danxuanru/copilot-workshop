![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)
# 待辦清單 Web App

一個在 GitHub Copilot 實戰工作坊完成的全功能待辦清單應用，展示如何使用 Agent Mode 搭配 MCP 與 agentic workflows 來快速實現完整的網頁應用程式。

## 線上展示

🌐 https://danxuanru.github.io/copilot-workshop/

## 功能

- ✅ **新增待辦事項** - 透過輸入欄位新增待辦項目
- ✅ **標記完成** - 勾選核取方塊標記項目為已完成，自動添加刪除線
- ✅ **刪除項目** - 單筆刪除指定的待辦事項
- ✅ **清除已完成** - 一鍵刪除所有已完成項目，含確認機制防止誤刪
- ✅ **篩選檢視** - 全部、未完成、已完成三種篩選模式
- ✅ **統計顯示** - 實時顯示未完成項目數量
- ✅ **深色模式** - 支援淺色/深色主題切換，並記住使用者偏好
- ✅ **系統主題跟隨** - 若未手動切換，自動跟隨作業系統深淺色設定
- ✅ **本地儲存** - 待辦資料存入 localStorage，重新整理後自動恢復
- ✅ **無障礙設計** - 完整的 ARIA 標籤與語意化 HTML

## 技術

- **純前端開發** - 不使用任何 JavaScript 框架或 CSS 框架
- **原生 JavaScript** - ES6+ 標準（const/let、箭頭函式、模板字串等）
- **CSS 變數** - 統一管理淺色與深色模式的色彩方案
- **本地儲存** - 使用 `localStorage` API 實現資料持久化
- **無外部依賴** - 所有資源均為本地檔案，支援完全離線運作
- **響應式設計** - 兼容桌面與行動裝置視窗（RWD）

## 開發方式

本專案使用 GitHub Copilot Agent Mode 搭配現代 AI 開發工作流程完成：

### Agent Mode + MCP 工作流程
- **GitHub MCP** - 使用 GitHub API 讀取並管理 Issue 與 Pull Request
- **Microsoft Learn MCP** - 查閱官方文件進行無障礙與最佳實踐驗證
- **.github/prompts** - 建立 `fix-issue.prompt.md` 作為標準化的修復流程範本

### 開發流程
1. 從 GitHub Issue 讀取需求規格
2. 條列提案內容等待使用者確認（三層決策機制）
3. 建立獨立的 git 分支進行開發
4. 同步執行多個檔案修改（批量編輯優化）
5. 詳細說明驗證步驟，讓使用者自行測試
6. 自動化提交、推送與 PR 建立

### 專案規範
- 建立 `.github/copilot-instructions.md` 定義協作規則
- 使用 CSS 變數統一管理配色，確保一致性
- 註解使用繁體中文，程式碼使用英文 camelCase
- 優先使用 `textContent` 與 `createElement` 防止 XSS

## 我學到什麼

1. **AI Agent 的縮放性思維** - 透過提案等待確認，可以避免 AI 過度生成無用修改；多檔案批量編輯大幅提升效率。

2. **MCP 的實用價值** - GitHub MCP 讓 AI 可直接讀取 Issue 與建立 PR；Microsoft Learn MCP 幫助驗證無障礙與最佳實踐，減少手動查詢時間。

3. **Agentic Workflows 的威力** - 標準化的 `.github/prompts` 流程樣本可複用於任何 Issue 修復；整個修復循環從提案→開發→測試→提交→PR 自動化完成。

4. **CSS 變數的模組化設計** - 單一 CSS 變數定義點可支援完整的主題系統，大幅降低維護成本。

5. **純前端應用的實用性** - 無框架、無套件、支援離線的應用看似簡單，但透過良好的架構設計、localStorage 與 ARIA 標籤，可實現專業級的使用者體驗。

---

**修改紀錄**：參見 [CHANGELOG.md](CHANGELOG.md)  
**協作規範**：參見 [.github/copilot-instructions.md](.github/copilot-instructions.md)
