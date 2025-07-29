// 遊戲常量
const GRID_SIZE = 20; // 網格大小
const GAME_SPEED = 300; // 遊戲速度（毫秒）- 減慢到0.5倍（原150*2）
const SNAKE_SIZE_MULTIPLIER = 2; // 蛇的尺寸倍數

// 遊戲變量
let canvas, ctx;
let snake = [];
let food = {};
let direction = 'right';
let nextDirection = 'right';
let score = 0;
let gameInterval;
let isPaused = false;
let gameOver = false;
let currentGameSpeed = GAME_SPEED; // 當前遊戲速度，初始為基本速度

// DOM 元素
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const restartButton = document.getElementById('restart-btn');
const musicButton = document.getElementById('music-btn');

// 初始化遊戲
function initGame() {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    
    // 初始化音效
    if (eatSound && typeof eatSound.initialize === 'function') {
        eatSound.initialize();
    }
    
    // 初始化平滑圖形系統
    if (SmoothGraphics && typeof SmoothGraphics.initialize === 'function') {
        SmoothGraphics.initialize();
    }
    
    // 初始化蛇
    snake = [
        {x: 5, y: 10},
        {x: 4, y: 10},
        {x: 3, y: 10}
    ];
    
    // 生成第一個食物
    generateFood();
    
    // 重置遊戲狀態
    direction = 'right';
    nextDirection = 'right';
    score = 0;
    scoreElement.textContent = score;
    gameOver = false;
    isPaused = false;
    currentGameSpeed = GAME_SPEED; // 重置遊戲速度
    
    // 繪製初始狀態
    draw();
    
    // 添加事件監聽器
    document.addEventListener('keydown', handleKeyPress);
    startButton.addEventListener('click', startGame);
    pauseButton.addEventListener('click', togglePause);
    restartButton.addEventListener('click', restartGame);
}

// 開始遊戲
function startGame() {
    // 檢查是否已登入
    if (typeof userSystem !== 'undefined' && !userSystem.getCurrentUser()) {
        alert('請先登入才能開始遊戲！');
        return;
    }
    
    if (gameInterval) clearInterval(gameInterval);
    if (!gameOver && !isPaused) {
        // 隱藏排行榜
        const leaderboard = document.querySelector('.leaderboard');
        if (leaderboard) {
            leaderboard.style.display = 'none';
        }
        
        // 通知用戶系統遊戲開始
        if (typeof userSystem !== 'undefined') {
            userSystem.onGameStart();
        }
        
        gameInterval = setInterval(gameLoop, currentGameSpeed);
    }
}

// 遊戲主循環
function gameLoop() {
    if (gameOver || isPaused) return;
    
    // 更新方向
    direction = nextDirection;
    
    // 移動蛇
    moveSnake();
    
    // 檢查碰撞
    if (checkCollision()) {
        endGame();
        return;
    }
    
    // 檢查是否吃到食物
    if (snake[0].x === food.x && snake[0].y === food.y) {
        eatFood();
    } else {
        // 如果沒有吃到食物，移除尾部
        snake.pop();
    }
    
    // 繪製遊戲
    draw();
}

// 移動蛇
function moveSnake() {
    const head = {x: snake[0].x, y: snake[0].y};
    
    switch(direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }
    
    // 在蛇的頭部添加新的位置
    snake.unshift(head);
}

// 檢查碰撞
function checkCollision() {
    const head = snake[0];
    
    // 檢查牆壁碰撞
    if (head.x < 0 || head.x >= canvas.width / GRID_SIZE ||
        head.y < 0 || head.y >= canvas.height / GRID_SIZE) {
        return true;
    }
    
    // 檢查自身碰撞（從第二個身體部分開始檢查）
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    
    return false;
}

// 生成食物
function generateFood() {
    // 隨機生成食物位置
    const gridWidth = canvas.width / GRID_SIZE;
    const gridHeight = canvas.height / GRID_SIZE;
    
    food = {
        x: Math.floor(Math.random() * gridWidth),
        y: Math.floor(Math.random() * gridHeight)
    };
    
    // 確保食物不會生成在蛇身上
    for (let i = 0; i < snake.length; i++) {
        if (food.x === snake[i].x && food.y === snake[i].y) {
            generateFood(); // 遞歸重新生成
            break;
        }
    }
}

// 吃食物
function eatFood() {
    // 增加分數
    score += 10;
    scoreElement.textContent = score;
    
    // 播放吃食物音效 - 使用隨機音效
    if (eatSound && typeof eatSound.playRandom === 'function') {
        eatSound.playRandom();
    }
    
    // 加快遊戲速度（每次增加0.1倍）
    currentGameSpeed = Math.max(30, currentGameSpeed * 0.9); // 設置最小速度為30毫秒
    
    // 重新設置遊戲間隔
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, currentGameSpeed);
    }
    
    // 生成新的食物
    generateFood();
}

// 繪製遊戲
function draw() {
    // 清空畫布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 繪製蛇
    for (let i = 0; i < snake.length; i++) {
        // 判斷是否是蛇頭
        const isHead = i === 0;
        
        // 獲取當前蛇身部分的位置
        const x = snake[i].x * GRID_SIZE;
        const y = snake[i].y * GRID_SIZE;
        
        // 使用平滑圖形系統繪製蛇的部分
        SmoothGraphics.drawSnakeSegment(
            ctx, 
            x, 
            y, 
            GRID_SIZE, 
            isHead, 
            isHead ? direction : null // 只有蛇頭需要方向信息
        );
    }
    
    // 繪製食物（黃色蛋）
    SmoothGraphics.drawFood(
        ctx,
        food.x * GRID_SIZE,
        food.y * GRID_SIZE,
        GRID_SIZE
    );
    
    // 如果遊戲結束，顯示遊戲結束文字
    if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('遊戲結束', canvas.width / 2, canvas.height / 2 - 15);
        ctx.font = '20px Arial';
        ctx.fillText(`最終得分: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
    }
}

// 處理鍵盤輸入
function handleKeyPress(event) {
    // 防止方向鍵滾動頁面
    if ([37, 38, 39, 40, 65, 87, 68, 83].includes(event.keyCode)) {
        event.preventDefault();
    }
    
    // 只有在遊戲運行時才處理方向鍵
    if (gameOver || isPaused) return;
    
    // 根據按鍵設置下一個方向
    // 防止180度轉彎（例如，向右移動時不能直接向左轉）
    switch(event.keyCode) {
        // 上箭頭或W
        case 38:
        case 87:
            if (direction !== 'down') nextDirection = 'up';
            break;
        // 下箭頭或S
        case 40:
        case 83:
            if (direction !== 'up') nextDirection = 'down';
            break;
        // 左箭頭或A
        case 37:
        case 65:
            if (direction !== 'right') nextDirection = 'left';
            break;
        // 右箭頭或D
        case 39:
        case 68:
            if (direction !== 'left') nextDirection = 'right';
            break;
        // 空格鍵暫停/繼續
        case 32:
            togglePause();
            break;
    }
}

// 暫停/繼續遊戲
function togglePause() {
    if (gameOver) return;
    
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? '繼續' : '暫停';
    
    if (isPaused) {
        clearInterval(gameInterval);
        
        // 通知用戶系統遊戲暫停
        if (typeof userSystem !== 'undefined') {
            userSystem.onGamePause();
        }
    } else {
        gameInterval = setInterval(gameLoop, currentGameSpeed);
        
        // 通知用戶系統遊戲恢復
        if (typeof userSystem !== 'undefined') {
            userSystem.onGameResume();
        }
    }
}

// 結束遊戲
function endGame() {
    gameOver = true;
    clearInterval(gameInterval);
    
    // 重新顯示排行榜
    const leaderboard = document.querySelector('.leaderboard');
    if (leaderboard) {
        leaderboard.style.display = 'block';
    }
    
    // 記錄分數到用戶系統
    if (typeof userSystem !== 'undefined' && userSystem.getCurrentUser()) {
        userSystem.recordScore(score);
    }
    
    draw(); // 繪製遊戲結束畫面
}

// 重新開始遊戲
function restartGame() {
    clearInterval(gameInterval);
    initGame();
    startGame();
}

// 頁面加載完成後初始化遊戲
window.onload = function() {
    initGame();
    
    // 初始隱藏排行榜（因為用戶還未登入）
    const leaderboard = document.querySelector('.leaderboard');
    if (leaderboard) {
        leaderboard.style.display = 'none';
    }
    
    // 初始化用戶系統後更新排行榜
    if (typeof userSystem !== 'undefined') {
        setTimeout(() => {
            userSystem.updateLeaderboard();
        }, 100);
    }
    
    // 添加音樂按鈕事件監聽器
    if (musicButton && typeof backgroundMusic !== 'undefined') {
        musicButton.addEventListener('click', function() {
            if (backgroundMusic.isPlaying) {
                backgroundMusic.stopGameMusic();
                musicButton.textContent = '🔇 音樂';
                musicButton.classList.add('muted');
            } else {
                // 只有在遊戲進行中才播放音樂
                if (!gameOver && !isPaused && typeof userSystem !== 'undefined' && userSystem.getCurrentUser()) {
                    backgroundMusic.startGameMusic();
                }
                musicButton.textContent = '🎵 音樂';
                musicButton.classList.remove('muted');
            }
        });
    }
};