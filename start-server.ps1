# YouTube動態桌布服務器啟動腳本
# PowerShell版本

Write-Host "🌍 YouTube動態桌布服務器啟動中..." -ForegroundColor Green
Write-Host "📁 服務目錄: $PWD" -ForegroundColor Cyan

# 檢查是否有Python
$pythonCommands = @('python', 'python3', 'py')
$pythonFound = $false

foreach ($cmd in $pythonCommands) {
    try {
        $version = & $cmd --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ 找到Python: $version" -ForegroundColor Green
            Write-Host "🚀 啟動HTTP服務器..." -ForegroundColor Yellow
            
            # 啟動Python HTTP服務器
            Start-Process -NoNewWindow -FilePath $cmd -ArgumentList "-m", "http.server", "8000"
            
            Start-Sleep -Seconds 2
            
            # 打開瀏覽器
            $url = "http://localhost:8000/live-wallpaper.html"
            Write-Host "🔗 正在打開: $url" -ForegroundColor Cyan
            Start-Process $url
            
            Write-Host "\n✅ 服務器已啟動在 http://localhost:8000" -ForegroundColor Green
            Write-Host "🎬 桌布頁面: http://localhost:8000/live-wallpaper.html" -ForegroundColor Green
            Write-Host "\n按任意鍵停止服務器..." -ForegroundColor Yellow
            
            $pythonFound = $true
            break
        }
    }
    catch {
        continue
    }
}

if (-not $pythonFound) {
    Write-Host "⚠️  未找到Python，使用文件協議打開..." -ForegroundColor Yellow
    Write-Host "注意: YouTube API可能無法正常工作" -ForegroundColor Red
    
    $filePath = Join-Path $PWD "live-wallpaper.html"
    Write-Host "🔗 正在打開: file:///$($filePath.Replace('\', '/'))" -ForegroundColor Cyan
    
    Start-Process $filePath
    
    Write-Host "📝 建議安裝Python以獲得最佳體驗:" -ForegroundColor Yellow
    Write-Host "   1. 訪問 https://www.python.org/downloads/" -ForegroundColor White
    Write-Host "   2. 下載並安裝Python" -ForegroundColor White
    Write-Host "   3. 重新運行此腳本" -ForegroundColor White
}

Write-Host "`n按任意鍵退出..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')