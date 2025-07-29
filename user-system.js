// 用戶系統和排行榜管理
class UserSystem {
    constructor() {
        this.currentUser = null;
        this.users = this.loadUsers();
        this.initializeEventListeners();
    }

    // 初始化事件監聽器
    initializeEventListeners() {
        const loginBtn = document.getElementById('login-btn');
        const logoutBtn = document.getElementById('logout-btn');
        const usernameInput = document.getElementById('username');
        const playAgainBtn = document.getElementById('play-again-btn');
        const backToGameBtn = document.getElementById('back-to-game-btn');

        loginBtn.addEventListener('click', () => this.login());
        logoutBtn.addEventListener('click', () => this.logout());
        playAgainBtn.addEventListener('click', () => this.playAgain());
        backToGameBtn.addEventListener('click', () => this.backToGame());
        
        // 按Enter鍵登入
        usernameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.login();
            }
        });
    }

    // 登入功能
    login() {
        const usernameInput = document.getElementById('username');
        const username = usernameInput.value.trim();

        if (!username) {
            alert('請輸入用戶名！');
            return;
        }

        if (username.length > 20) {
            alert('用戶名不能超過20個字符！');
            return;
        }

        // 檢查用戶名是否包含特殊字符
        if (!/^[a-zA-Z0-9\u4e00-\u9fa5_-]+$/.test(username)) {
            alert('用戶名只能包含字母、數字、中文、下劃線和連字符！');
            return;
        }

        this.currentUser = username;
        
        // 如果是新用戶，初始化數據
        if (!this.users[username]) {
            this.users[username] = {
                name: username,
                highScore: 0,
                totalGames: 0,
                lastPlayed: new Date().toISOString()
            };
        }

        this.saveUsers();
        this.showGameInterface();
        this.updateLeaderboard();
        
        // 登入後立即播放背景音樂
        if (typeof backgroundMusic !== 'undefined') {
            backgroundMusic.startGameMusic();
            console.log('登入後自動播放背景音樂');
        }
    }

    // 登出功能
    logout() {
        this.currentUser = null;
        this.showLoginInterface();
        
        // 如果遊戲正在進行，結束遊戲
        if (typeof endGame === 'function') {
            endGame();
        }
    }

    // 顯示遊戲界面
    showGameInterface() {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        document.getElementById('current-user').textContent = this.currentUser;
        
        // 初始化背景音樂系統
        if (typeof backgroundMusic !== 'undefined') {
            backgroundMusic.initialize();
            console.log('背景音樂系統已準備就緒');
            

        }
    }

    // 顯示登入界面
    showLoginInterface() {
        document.getElementById('login-container').style.display = 'block';
        document.getElementById('game-container').style.display = 'none';
        document.getElementById('username').value = '';
        
        // 隱藏排行榜
        const leaderboard = document.querySelector('.leaderboard');
        if (leaderboard) {
            leaderboard.style.display = 'none';
        }
    }

    // 記錄遊戲分數
    recordScore(score) {
        if (!this.currentUser) return;

        const user = this.users[this.currentUser];
        user.totalGames++;
        user.lastPlayed = new Date().toISOString();
        
        // 停止背景音樂
        if (typeof backgroundMusic !== 'undefined') {
            backgroundMusic.stopGameMusic();
        }
        
        let isNewRecord = false;
        if (score > user.highScore) {
            user.highScore = score;
            isNewRecord = true;
            
            // 播放新紀錄音效
            if (typeof backgroundMusic !== 'undefined') {
                backgroundMusic.playNewRecordSound();
            }
        } else {
            // 播放遊戲結束音效
            if (typeof backgroundMusic !== 'undefined') {
                backgroundMusic.playGameOverSound();
            }
        }
        
        this.saveUsers();
        
        // 顯示遊戲結束頁面
        this.showGameOverScreen(score, isNewRecord);
    }

    // 獲取當前用戶
    getCurrentUser() {
        return this.currentUser;
    }

    // 獲取當前用戶的最高分
    getCurrentUserHighScore() {
        if (!this.currentUser || !this.users[this.currentUser]) {
            return 0;
        }
        return this.users[this.currentUser].highScore;
    }

    // 更新排行榜
    updateLeaderboard() {
        const leaderboardList = document.getElementById('leaderboard-list');
        
        // 獲取所有用戶並按最高分排序
        const sortedUsers = Object.values(this.users)
            .filter(user => user.highScore > 0)
            .sort((a, b) => b.highScore - a.highScore)
            .slice(0, 10); // 只顯示前10名

        if (sortedUsers.length === 0) {
            leaderboardList.innerHTML = '<p>暫無記錄</p>';
            return;
        }

        let html = '';
        sortedUsers.forEach((user, index) => {
            const isCurrentUser = user.name === this.currentUser;
            const itemClass = isCurrentUser ? 'leaderboard-item current-user' : 'leaderboard-item';
            
            html += `
                <div class="${itemClass}">
                    <div class="rank-circle">${index + 1}</div>
                    <div class="player-info">
                        <span class="player-name">${user.name}</span>
                        <span class="player-score">${user.highScore} 分</span>
                    </div>
                </div>
            `;
        });

        leaderboardList.innerHTML = html;
    }

    // 從本地存儲加載用戶數據
    loadUsers() {
        try {
            const data = localStorage.getItem('snakeGameUsers');
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('加載用戶數據失敗:', error);
            return {};
        }
    }

    // 保存用戶數據到本地存儲
    saveUsers() {
        try {
            localStorage.setItem('snakeGameUsers', JSON.stringify(this.users));
        } catch (error) {
            console.error('保存用戶數據失敗:', error);
        }
    }

    // 開始遊戲時的處理
    onGameStart() {
        // 開始背景音樂
        if (typeof backgroundMusic !== 'undefined') {
            backgroundMusic.startGameMusic();
        }
    }

    // 遊戲暫停時的處理
    onGamePause() {
        // 暫停背景音樂
        if (typeof backgroundMusic !== 'undefined') {
            backgroundMusic.stopGameMusic();
        }
    }

    // 遊戲恢復時的處理
    onGameResume() {
        // 恢復背景音樂
        if (typeof backgroundMusic !== 'undefined') {
            backgroundMusic.startGameMusic();
        }
    }

    // 顯示遊戲結束頁面
    showGameOverScreen(score, isNewRecord) {
        // 隱藏遊戲界面
        document.getElementById('game-container').style.display = 'none';
        
        // 顯示遊戲結束頁面
        document.getElementById('game-over-container').style.display = 'flex';
        
        // 設置最終分數
        document.getElementById('final-score').textContent = score;
        
        // 更新遊戲結束頁面的排行榜
        this.updateGameOverLeaderboard();
        
        // 如果是新紀錄，顯示特殊提示
        if (isNewRecord) {
            setTimeout(() => {
                const finalScoreElement = document.querySelector('.final-score h2');
                finalScoreElement.innerHTML = `🎉 新紀錄！本次得分: <span id="final-score">${score}</span>`;
            }, 1000);
        }
    }
    
    // 更新遊戲結束頁面的排行榜
    updateGameOverLeaderboard() {
        const leaderboardList = document.getElementById('game-over-leaderboard-list');
        
        // 獲取所有用戶並按最高分排序
        const sortedUsers = Object.values(this.users)
            .filter(user => user.highScore > 0)
            .sort((a, b) => b.highScore - a.highScore)
            .slice(0, 10); // 只顯示前10名

        if (sortedUsers.length === 0) {
            leaderboardList.innerHTML = '<p>暫無記錄</p>';
            return;
        }

        // 檢查當前用戶是否在前10名
        const currentUserInTop10 = sortedUsers.some(user => user.name === this.currentUser);
        
        // 如果當前用戶不在前10名，顯示提示訊息
        if (this.currentUser && !currentUserInTop10) {
            leaderboardList.innerHTML = `
                <div class="not-in-leaderboard">
                    很抱歉！您的得分沒有未能出現在排行榜中
                </div>
            `;
            return;
        }

        // 分成兩列：左邊1-5名，右邊6-10名
        const leftColumn = sortedUsers.slice(0, 5);
        const rightColumn = sortedUsers.slice(5, 10);
        
        let leftHtml = '';
        let rightHtml = '';
        
        // 生成左列HTML（1-5名）
        leftColumn.forEach((user, index) => {
            const isCurrentUser = user.name === this.currentUser;
            const itemClass = isCurrentUser ? 'leaderboard-item current-user' : 'leaderboard-item';
            
            leftHtml += `
                <div class="${itemClass}">
                    <div class="rank-circle">${index + 1}</div>
                    <div class="player-info">
                        <span class="player-name">${user.name}</span>
                        <span class="player-score">${user.highScore} 分</span>
                    </div>
                </div>
            `;
        });
        
        // 生成右列HTML（6-10名）
        rightColumn.forEach((user, index) => {
            const isCurrentUser = user.name === this.currentUser;
            const itemClass = isCurrentUser ? 'leaderboard-item current-user' : 'leaderboard-item';
            
            rightHtml += `
                <div class="${itemClass}">
                    <div class="rank-circle">${index + 6}</div>
                    <div class="player-info">
                        <span class="player-name">${user.name}</span>
                        <span class="player-score">${user.highScore} 分</span>
                    </div>
                </div>
            `;
        });

        leaderboardList.innerHTML = `
            <div class="leaderboard-column">
                ${leftHtml}
            </div>
            <div class="leaderboard-column">
                ${rightHtml}
            </div>
        `;
    }
    
    // 再玩一次
    playAgain() {
        // 隱藏遊戲結束頁面
        document.getElementById('game-over-container').style.display = 'none';
        
        // 顯示遊戲界面
        document.getElementById('game-container').style.display = 'block';
        
        // 重新開始遊戲
        if (typeof restartGame === 'function') {
            restartGame();
        }
    }
    
    // 返回遊戲界面
    backToGame() {
        // 隱藏遊戲結束頁面
        document.getElementById('game-over-container').style.display = 'none';
        
        // 顯示遊戲界面
        document.getElementById('game-container').style.display = 'block';
        
        // 確保排行榜顯示（因為遊戲已結束）
        const leaderboard = document.querySelector('.leaderboard');
        if (leaderboard) {
            leaderboard.style.display = 'block';
        }
    }

    // 清除所有數據（調試用）
    clearAllData() {
        if (confirm('確定要清除所有用戶數據嗎？此操作不可恢復！')) {
            localStorage.removeItem('snakeGameUsers');
            this.users = {};
            this.updateLeaderboard();
            alert('所有數據已清除！');
        }
    }
}

// 創建全局用戶系統實例
const userSystem = new UserSystem();