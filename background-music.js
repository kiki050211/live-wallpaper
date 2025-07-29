// 背景音樂系統
const backgroundMusic = {
    context: null,
    initialized: false,
    gameMusic: null,
    gameOverSound: null,
    isPlaying: false,
    volume: 0.3,
    audioElement: null,
    musicUrl: 'https://docs.google.com/uc?export=download&id=1NxYvJaMaL_OmIcaeuoFOMK09lcuNjQhd',

    // 初始化音頻系統
    initialize: function() {
        if (this.initialized) return;
        
        try {
            // 創建音頻元素
            this.audioElement = new Audio();
            this.audioElement.src = this.musicUrl;
            this.audioElement.loop = true;
            this.audioElement.volume = this.volume;
            this.audioElement.preload = 'auto';
            
            // 移除跨域屬性以避免CORS問題
            // this.audioElement.crossOrigin = 'anonymous';
            
            // 添加事件監聽器
            this.audioElement.addEventListener('loadstart', () => {
                console.log('開始載入音樂：', this.musicUrl);
            });
            
            this.audioElement.addEventListener('canplay', () => {
                console.log('音樂可以播放');
            });
            
            this.audioElement.addEventListener('error', (e) => {
                console.error('音樂載入錯誤：', e.target.error);
                console.log('將使用合成音樂作為備用');
            });
            
            // 初始化Web Audio API作為備用
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.context = new AudioContext();
            
            this.initialized = true;
            console.log('背景音樂系統初始化成功，音樂URL：', this.musicUrl);
        } catch(e) {
            console.warn('音頻系統初始化失敗：', e);
        }
    },

    // 創建遊戲背景音樂
    createGameMusic: function() {
        if (!this.context) return null;

        const oscillator1 = this.context.createOscillator();
        const oscillator2 = this.context.createOscillator();
        const gainNode = this.context.createGain();
        const filterNode = this.context.createBiquadFilter();

        // 設置主旋律
        oscillator1.type = 'triangle';
        oscillator1.frequency.setValueAtTime(220, this.context.currentTime); // A3
        
        // 設置和聲
        oscillator2.type = 'sine';
        oscillator2.frequency.setValueAtTime(330, this.context.currentTime); // E4
        
        // 設置濾波器
        filterNode.type = 'lowpass';
        filterNode.frequency.setValueAtTime(800, this.context.currentTime);
        filterNode.Q.setValueAtTime(1, this.context.currentTime);
        
        // 設置音量
        gainNode.gain.setValueAtTime(this.volume, this.context.currentTime);
        
        // 連接節點
        oscillator1.connect(filterNode);
        oscillator2.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        return {
            oscillator1: oscillator1,
            oscillator2: oscillator2,
            gainNode: gainNode,
            filterNode: filterNode
        };
    },

    // 播放背景音樂
    startGameMusic: function() {
        if (this.isPlaying) {
            console.log('音樂已在播放中');
            return;
        }
        
        if (!this.audioElement) {
            console.warn('音頻元素未初始化，使用合成音樂');
            this.startSynthMusic();
            return;
        }
        
        console.log('嘗試播放線上音樂：', this.musicUrl);
        
        try {
            // 重置音頻到開始位置
            this.audioElement.currentTime = 0;
            
            // 播放音頻
            const playPromise = this.audioElement.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    this.isPlaying = true;
                    console.log('線上背景音樂開始播放成功');
                }).catch(error => {
                    console.warn('線上音樂播放失敗，錯誤：', error);
                    console.log('切換到合成音樂');
                    this.startSynthMusic();
                });
            } else {
                this.isPlaying = true;
                console.log('音樂播放（舊版瀏覽器）');
            }
        } catch(e) {
            console.warn('音樂播放異常，錯誤：', e);
            console.log('切換到合成音樂');
            this.startSynthMusic();
        }
    },

    // 創建旋律模式
    createMelodyPattern: function() {
        if (!this.gameMusic || !this.isPlaying) return;
        
        const notes = [220, 247, 262, 294, 330, 370, 392, 440]; // A3到A4的音階
        let noteIndex = 0;
        
        const playNextNote = () => {
            if (!this.isPlaying || !this.gameMusic) return;
            
            const currentTime = this.context.currentTime;
            const frequency = notes[noteIndex % notes.length];
            
            // 改變主旋律頻率
            this.gameMusic.oscillator1.frequency.setValueAtTime(frequency, currentTime);
            this.gameMusic.oscillator2.frequency.setValueAtTime(frequency * 1.5, currentTime);
            
            noteIndex++;
            
            // 每2秒換一個音符
            setTimeout(playNextNote, 2000);
        };
        
        playNextNote();
    },

    // 停止背景音樂
    stopGameMusic: function() {
        if (!this.isPlaying) return;
        
        this.isPlaying = false;
        
        try {
            // 停止音頻播放
            if (this.audioElement) {
                this.audioElement.pause();
                this.audioElement.currentTime = 0;
            }
            
            // 停止合成音樂（如果在使用）
            if (this.gameMusic) {
                this.gameMusic.oscillator1.stop();
                this.gameMusic.oscillator2.stop();
                this.gameMusic = null;
            }
        } catch(e) {
            // 忽略已經停止的錯誤
        }
    },

    // 播放遊戲結束音效
    playGameOverSound: function() {
        if (!this.context) return;
        
        // 創建下降音效
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(440, this.context.currentTime); // A4
        oscillator.frequency.exponentialRampToValueAtTime(110, this.context.currentTime + 1.5); // 下降到A2
        
        gainNode.gain.setValueAtTime(0.4, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 1.5);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        oscillator.start();
        oscillator.stop(this.context.currentTime + 1.5);
    },

    // 播放新紀錄音效
    playNewRecordSound: function() {
        if (!this.context) return;
        
        // 創建上升音效
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(220, this.context.currentTime); // A3
        oscillator.frequency.exponentialRampToValueAtTime(880, this.context.currentTime + 1); // 上升到A5
        
        gainNode.gain.setValueAtTime(0.3, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 1);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        oscillator.start();
        oscillator.stop(this.context.currentTime + 1);
    },

    // 設置音量
    setVolume: function(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        
        // 設置音頻元素音量
        if (this.audioElement) {
            this.audioElement.volume = this.volume;
        }
        
        // 設置合成音樂音量（備用）
        if (this.gameMusic && this.gameMusic.gainNode) {
            this.gameMusic.gainNode.gain.setValueAtTime(this.volume, this.context.currentTime);
        }
    },

    // 切換音樂開關
    toggle: function() {
        if (this.isPlaying) {
            this.stopGameMusic();
        } else {
            this.startGameMusic();
        }
    },
    
    // 備用合成音樂（當URL音樂無法播放時使用）
    startSynthMusic: function() {
        if (!this.context) {
            console.warn('Web Audio Context 未初始化');
            return;
        }
        
        if (this.isPlaying) {
            console.log('音樂已在播放中，跳過合成音樂');
            return;
        }
        
        console.log('開始播放合成背景音樂');
        
        // 停止線上音樂（如果正在播放）
        if (this.audioElement && !this.audioElement.paused) {
            this.audioElement.pause();
            console.log('停止線上音樂，切換到合成音樂');
        }
        
        this.gameMusic = this.createGameMusic();
        if (!this.gameMusic) {
            console.warn('無法創建合成音樂');
            return;
        }
        
        this.isPlaying = true;
        
        // 開始播放
        this.gameMusic.oscillator1.start();
        this.gameMusic.oscillator2.start();
        
        console.log('合成背景音樂開始播放');
        
        // 創建簡單的旋律變化
        this.createMelodyPattern();
    }
};