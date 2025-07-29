# YouTube 即時風景桌布

這是一個讓您將YouTube的4K即時風景直播設為動態桌布的網頁應用程式。

## 🚨 視頻無法播放的解決方案

如果您遇到視頻無法播放的問題，這通常是由於以下原因：

### 1. 瀏覽器安全限制
- YouTube API需要在HTTP/HTTPS環境下運行
- 直接打開HTML文件（file://協議）可能導致CORS錯誤

### 2. 解決方法

**方法一：使用本地HTTP服務器（推薦）**
```bash
# 如果您有Python
python -m http.server 8000
# 然後訪問 http://localhost:8000/live-wallpaper.html

# 如果您有Node.js
npx http-server -p 8000
# 然後訪問 http://localhost:8000/live-wallpaper.html
```

**方法二：使用在線服務**
- 將文件上傳到GitHub Pages、Netlify或其他靜態網站託管服務
- 通過HTTPS訪問

**方法三：瀏覽器設置**
- 在Chrome中啟動時添加參數：`--disable-web-security --user-data-dir="/tmp/chrome_dev_test"`
- 注意：這會降低瀏覽器安全性，僅用於測試

### 3. 視頻ID更新

如果特定視頻無法播放，可能是因為：
- 直播已結束
- 視頻被設為私人
- 地區限制

您可以在 `live-wallpaper.js` 中更新視頻ID：
```javascript
// 在landscapes陣列中更換videoId
videoId: 'YOUR_NEW_VIDEO_ID'
```

## 功能特色

- 🌍 **10個精選風景場景**：包含自然風景、海洋、森林等
- 🔇 **自動靜音播放**：專為桌布使用設計，無聲音干擾
- 🖥️ **全螢幕桌布模式**：一鍵進入沉浸式桌布體驗
- 📱 **響應式設計**：支援各種螢幕尺寸
- ⚡ **錯誤處理**：自動檢測並報告播放問題

## 使用方法

1. 確保在HTTP/HTTPS環境下運行（見上方解決方案）
2. 開啟 `live-wallpaper.html` 文件
3. 從10個風景場景中選擇您喜愛的
4. 點擊「全螢幕桌布模式」按鈕
5. 享受您的動態桌布！
6. 按 ESC 鍵或點擊退出按鈕離開桌布模式

## 技術要求

- 現代瀏覽器（Chrome、Firefox、Edge）
- 穩定的網路連接
- **重要：必須在HTTP/HTTPS環境下運行**

## 風景場景列表

1. 🌿 **寧靜自然風景** - 4K自然風景放鬆直播
2. 🌊 **海洋波浪** - 寧靜海洋波浪聲音
3. 🌲 **森林雨聲** - 森林中的雨聲直播
4. ⛰️ **山景風光** - 美麗山景4K直播
5. 🔥 **壁爐火焰** - 溫暖壁爐火焰直播
6. 🌍 **地球太空視角** - 從太空看地球的直播
7. 🐠 **水族館** - 寧靜水族館魚類直播
8. ❄️ **冬季雪景** - 美麗冬季雪景直播
9. 🌅 **海灘日落** - 海灘日落美景直播
10. 🌃 **城市夜景** - 城市夜景燈光直播

## 故障排除

### 常見錯誤代碼
- **錯誤2**：視頻ID無效
- **錯誤5**：視頻無法在HTML5播放器中播放
- **錯誤100**：視頻不存在或已被移除
- **錯誤101/150**：視頻擁有者不允許在嵌入式播放器中播放

### 調試步驟
1. 打開瀏覽器開發者工具（F12）
2. 查看Console標籤中的錯誤信息
3. 確認網路連接正常
4. 嘗試更換其他風景場景

## 檔案結構

```
live-wallpaper.html    # 主要HTML文件
live-wallpaper.css     # 樣式文件
live-wallpaper.js      # JavaScript功能文件
start-server.py        # Python HTTP服務器腳本
start-server.ps1       # PowerShell啟動腳本
```

## 自訂風景

您可以在 `live-wallpaper.js` 文件中的 `landscapes` 陣列中添加或修改風景場景：

```javascript
{
    id: 'your-custom-id',
    title: '您的風景標題',
    description: '風景描述',
    emoji: '🌟',
    videoId: 'YOUTUBE_VIDEO_ID'
}
```

---

如果您仍然遇到問題，請確保：
1. ✅ 使用HTTP/HTTPS協議訪問
2. ✅ 網路連接正常
3. ✅ 瀏覽器支援YouTube API
4. ✅ 視頻ID有效且可播放

享受您的動態桌布體驗！🌟