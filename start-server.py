#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
簡單的HTTP服務器用於運行YouTube動態桌布網站
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # 添加CORS頭部以支援YouTube API
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def log_message(self, format, *args):
        # 自定義日誌格式
        print(f"[{self.address_string()}] {format % args}")

def main():
    PORT = 8000
    
    # 確保在正確的目錄中運行
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    print(f"🌍 YouTube動態桌布服務器啟動中...")
    print(f"📁 服務目錄: {script_dir}")
    print(f"🔗 本地地址: http://localhost:{PORT}")
    print(f"🎬 桌布頁面: http://localhost:{PORT}/live-wallpaper.html")
    print("\n按 Ctrl+C 停止服務器")
    print("-" * 50)
    
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            # 自動打開瀏覽器
            webbrowser.open(f'http://localhost:{PORT}/live-wallpaper.html')
            
            print(f"✅ 服務器已啟動在端口 {PORT}")
            print("🚀 瀏覽器將自動打開桌布頁面")
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n🛑 服務器已停止")
        sys.exit(0)
    except OSError as e:
        if e.errno == 10048:  # Windows: Address already in use
            print(f"❌ 錯誤: 端口 {PORT} 已被占用")
            print(f"請嘗試關閉其他使用該端口的程序，或修改腳本中的PORT變數")
        else:
            print(f"❌ 服務器啟動失敗: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()