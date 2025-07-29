// 語言管理器
class LanguageManager {
    constructor() {
        this.currentLanguage = 'zh-CN';
        this.translations = {
            'zh-CN': {
                title: '動態桌布直播',
                subtitle: '沉浸式自然風景體驗',
                wallpaperMode: '桌布模式',
                exitWallpaper: '退出桌布',
                muteToggle: '靜音切換',
                languageSelect: '語言選擇',
                colorScheme: '配色方案',
                prevPage: '上一頁',
                nextPage: '下一頁',
                page: '第',
                of: '頁，共',
                pages: '頁'
            },
            'en-US': {
                title: 'Live Wallpaper Streaming',
                subtitle: 'Immersive Natural Landscape Experience',
                wallpaperMode: 'Wallpaper Mode',
                exitWallpaper: 'Exit Wallpaper',
                muteToggle: 'Mute Toggle',
                languageSelect: 'Language Select',
                colorScheme: 'Color Scheme',
                prevPage: 'Previous',
                nextPage: 'Next',
                page: 'Page',
                of: 'of',
                pages: ''
            },
            'ja-JP': {
                title: 'ライブ壁紙ストリーミング',
                subtitle: '没入型自然風景体験',
                wallpaperMode: '壁紙モード',
                exitWallpaper: '壁紙終了',
                muteToggle: 'ミュート切替',
                languageSelect: '言語選択',
                colorScheme: 'カラースキーム',
                prevPage: '前へ',
                nextPage: '次へ',
                page: 'ページ',
                of: '/',
                pages: ''
            },
            'ko-KR': {
                title: '라이브 배경화면 스트리밍',
                subtitle: '몰입형 자연 풍경 체험',
                wallpaperMode: '배경화면 모드',
                exitWallpaper: '배경화면 종료',
                muteToggle: '음소거 전환',
                languageSelect: '언어 선택',
                colorScheme: '색상 테마',
                prevPage: '이전',
                nextPage: '다음',
                page: '페이지',
                of: '/',
                pages: ''
            },
            'es-ES': {
                title: 'Transmisión de Fondo de Pantalla en Vivo',
                subtitle: 'Experiencia Inmersiva de Paisajes Naturales',
                wallpaperMode: 'Modo Fondo de Pantalla',
                exitWallpaper: 'Salir del Fondo',
                muteToggle: 'Alternar Silencio',
                languageSelect: 'Seleccionar Idioma',
                colorScheme: 'Esquema de Color',
                prevPage: 'Anterior',
                nextPage: 'Siguiente',
                page: 'Página',
                of: 'de',
                pages: ''
            },
            'fr-FR': {
                title: 'Diffusion de Fond d\'Écran en Direct',
                subtitle: 'Expérience Immersive de Paysages Naturels',
                wallpaperMode: 'Mode Fond d\'Écran',
                exitWallpaper: 'Quitter le Fond',
                muteToggle: 'Basculer le Silence',
                languageSelect: 'Sélectionner la Langue',
                colorScheme: 'Schéma de Couleur',
                prevPage: 'Précédent',
                nextPage: 'Suivant',
                page: 'Page',
                of: 'sur',
                pages: ''
            },
            'de-DE': {
                title: 'Live-Hintergrundbild-Streaming',
                subtitle: 'Immersive Naturlandschaftserfahrung',
                wallpaperMode: 'Hintergrundbild-Modus',
                exitWallpaper: 'Hintergrund Beenden',
                muteToggle: 'Stumm Umschalten',
                languageSelect: 'Sprache Auswählen',
                colorScheme: 'Farbschema',
                prevPage: 'Zurück',
                nextPage: 'Weiter',
                page: 'Seite',
                of: 'von',
                pages: ''
            }
        };
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        this.updatePageTexts();
    }

    getText(key) {
        return this.translations[this.currentLanguage][key] || this.translations['en-US'][key] || key;
    }

    updatePageTexts() {
        // 更新頁面標題和副標題
        const titleElement = document.querySelector('h1');
        const subtitleElement = document.querySelector('.subtitle');
        
        if (titleElement) titleElement.textContent = this.getText('title');
        if (subtitleElement) subtitleElement.textContent = this.getText('subtitle');

        // 更新按鈕文字
        const wallpaperBtn = document.getElementById('wallpaper-btn');
        const muteBtn = document.getElementById('mute-btn');
        
        if (wallpaperBtn) {
            wallpaperBtn.textContent = this.getText('wallpaperMode');
        }
        
        if (muteBtn) {
            muteBtn.textContent = this.getText('muteToggle');
        }

        // 更新語言選擇器標籤
        const languageLabel = document.querySelector('label[for="language-select"]');
        if (languageLabel) {
            languageLabel.textContent = this.getText('languageSelect');
        }

        // 更新配色方案標籤
        const colorLabel = document.querySelector('label[for="color-scheme"]');
        if (colorLabel) {
            colorLabel.textContent = this.getText('colorScheme');
        }

        // 更新分頁按鈕文字
        this.updatePaginationTexts();
    }

    updatePaginationTexts() {
        const prevBtn = document.querySelector('.pagination-btn:first-child');
        const nextBtn = document.querySelector('.pagination-btn:last-child');
        const pageInfo = document.querySelector('.page-info');
        
        if (prevBtn) {
            prevBtn.textContent = this.getText('prevPage');
        }
        
        if (nextBtn) {
            nextBtn.textContent = this.getText('nextPage');
        }
        
        // 更新頁面信息
        if (pageInfo && window.app) {
            const currentPage = window.app.currentPage;
            const totalPages = window.app.totalPages;
            
            if (this.currentLanguage === 'zh-CN') {
                pageInfo.textContent = `${this.getText('page')} ${currentPage} ${this.getText('of')} ${totalPages} ${this.getText('pages')}`;
            } else {
                pageInfo.textContent = `${this.getText('page')} ${currentPage} ${this.getText('of')} ${totalPages}`;
            }
        }
    }
}

// 顏色方案管理器
class ColorSchemeManager {
    constructor() {
        this.schemes = {
            morandi1: {
                name: 'Morandi Sage',
                primary: '#A8B5A0',
                secondary: '#C4B5A0',
                accent: '#B5A8A0',
                background: 'linear-gradient(135deg, #A8B5A0 0%, #C4B5A0 100%)',
                buttonColor: '#A8B5A0'
            },
            morandi2: {
                name: 'Morandi Dusty',
                primary: '#B5A8A0',
                secondary: '#A0A8B5',
                accent: '#A8A0B5',
                background: 'linear-gradient(135deg, #B5A8A0 0%, #A0A8B5 100%)',
                buttonColor: '#B5A8A0'
            },
            morandi3: {
                name: 'Morandi Mist',
                primary: '#A0A8B5',
                secondary: '#A8A0B5',
                accent: '#B5A0A8',
                background: 'linear-gradient(135deg, #A0A8B5 0%, #A8A0B5 100%)',
                buttonColor: '#A0A8B5'
            },
            morandi4: {
                name: 'Morandi Rose',
                primary: '#B5A0A8',
                secondary: '#A8B5A0',
                accent: '#A0B5A8',
                background: 'linear-gradient(135deg, #B5A0A8 0%, #A8B5A0 100%)',
                buttonColor: '#B5A0A8'
            },
            morandi5: {
                name: 'Morandi Clay',
                primary: '#A0B5A8',
                secondary: '#B5A8A0',
                accent: '#A8A0B5',
                background: 'linear-gradient(135deg, #A0B5A8 0%, #B5A8A0 100%)',
                buttonColor: '#A0B5A8'
            }
        };
        
        this.currentScheme = 'morandi1';
    }

    setScheme(schemeName) {
        if (this.schemes[schemeName]) {
            this.currentScheme = schemeName;
            this.applyScheme();
        }
    }

    getCurrentScheme() {
        return this.schemes[this.currentScheme];
    }

    applyScheme() {
        const scheme = this.schemes[this.currentScheme];
        const root = document.documentElement;
        
        root.style.setProperty('--primary-color', scheme.primary);
        root.style.setProperty('--secondary-color', scheme.secondary);
        root.style.setProperty('--accent-color', scheme.accent);
        root.style.setProperty('--background-gradient', scheme.background);
        
        // 更新按鈕顏色
        if (window.app) {
            window.app.updateButtonColors();
            window.app.updatePaginationColors();
        }
    }

    getRandomScheme() {
        const schemeNames = Object.keys(this.schemes);
        const randomIndex = Math.floor(Math.random() * schemeNames.length);
        return schemeNames[randomIndex];
    }

    startRandomChange(intervalMinutes = 2) {
        setInterval(() => {
            const randomScheme = this.getRandomScheme();
            this.setScheme(randomScheme);
            
            // 更新選擇器
            const colorSelect = document.getElementById('color-scheme');
            if (colorSelect) {
                colorSelect.value = randomScheme;
            }
        }, intervalMinutes * 60 * 1000);
    }
}

// YouTube API 和應用程式主要功能
class LiveWallpaperApp {
    constructor() {
        this.player = null;
        this.wallpaperPlayer = null;
        this.currentVideoId = null;
        this.isMuted = true;
        this.isWallpaperMode = false;
        this.currentColorScheme = null;
        this.languageManager = new LanguageManager();
        
        // 預設的動態桌面直播頻道 - 無版權限制、24小時即時影像傳輸播放、風景區為佳、2K視頻以上
        this.landscapes = [
            // 第1頁 - 森林與自然風景 (9個)
            {
                id: 'forest-stream-4k',
                titles: {
                    'zh-CN': '東海岸即時影像',
                    'en-US': 'East Coast Live View',
                    'ja-JP': '東海岸ライブ映像',
                    'ko-KR': '동해안 실시간 영상',
                    'es-ES': 'Vista en Vivo Costa Este',
                    'fr-FR': 'Vue en Direct Côte Est',
                    'de-DE': 'Ostküste Live-Ansicht'
                },
                descriptions: {
                    'zh-CN': '都歷遊客中心4K即時影像',
                    'en-US': 'Duoli Visitor Center 4K Live Stream',
                    'ja-JP': '都歷ビジターセンター4Kライブ映像',
                    'ko-KR': '두리 방문자센터 4K 실시간 스트림',
                    'es-ES': 'Centro de Visitantes Duoli Transmisión 4K',
                    'fr-FR': 'Centre des Visiteurs Duoli Diffusion 4K',
                    'de-DE': 'Duoli Besucherzentrum 4K Live-Stream'
                },
                emoji: '🌲',
                videoId: 'JhQuR77AR7U'
            },
            {
                id: 'autumn-forest-4k',
                titles: {
                    'zh-CN': '台東多良車站',
                    'en-US': 'Taitung Duoliang Station',
                    'ja-JP': '台東多良駅',
                    'ko-KR': '타이둥 둘량역',
                    'es-ES': 'Estación Duoliang Taitung',
                    'fr-FR': 'Gare Duoliang Taitung',
                    'de-DE': 'Bahnhof Duoliang Taitung'
                },
                descriptions: {
                    'zh-CN': '台東多良車站4K即時影像',
                    'en-US': 'Taitung Duoliang Station 4K Live Camera',
                    'ja-JP': '台東多良駅4Kライブカメラ',
                    'ko-KR': '타이둥 둘량역 4K 실시간 카메라',
                    'es-ES': 'Cámara en Vivo 4K Estación Duoliang Taitung',
                    'fr-FR': 'Caméra en Direct 4K Gare Duoliang Taitung',
                    'de-DE': '4K Live-Kamera Bahnhof Duoliang Taitung'
                },
                emoji: '🍂',
                videoId: 'UCG1aXVO8H8'
            },
            {
                id: 'earth-space-view',
                titles: {
                    'zh-CN': '象山看台北',
                    'en-US': 'Taipei from Elephant Mountain',
                    'ja-JP': '象山から台北',
                    'ko-KR': '코끼리산에서 본 타이베이',
                    'es-ES': 'Taipei desde Montaña Elefante',
                    'fr-FR': 'Taipei depuis Montagne Éléphant',
                    'de-DE': 'Taipei vom Elefantenberg'
                },
                descriptions: {
                    'zh-CN': '象山看台北4K即時影像',
                    'en-US': 'Taipei 4K Live View from Elephant Mountain',
                    'ja-JP': '象山から台北4Kライブ映像',
                    'ko-KR': '코끼리산에서 본 타이베이 4K 실시간 영상',
                    'es-ES': 'Vista en Vivo 4K de Taipei desde Montaña Elefante',
                    'fr-FR': 'Vue en Direct 4K de Taipei depuis Montagne Éléphant',
                    'de-DE': '4K Live-Ansicht von Taipei vom Elefantenberg'
                },
                emoji: '🌍',
                videoId: 'z_fY1pj1VBw'
            },
            {
                id: 'techi-dam-lishan',
                titles: {
                    'zh-CN': '東京水岸城市景觀',
                    'en-US': 'Tokyo Waterfront Cityscape',
                    'ja-JP': '東京ウォーターフロント都市景観',
                    'ko-KR': '도쿄 워터프론트 도시 경관',
                    'es-ES': 'Paisaje Urbano Costero de Tokio',
                    'fr-FR': 'Paysage Urbain Côtier de Tokyo',
                    'de-DE': 'Tokyo Waterfront Stadtlandschaft'
                },
                descriptions: {
                    'zh-CN': '東京水岸城市景觀24/7直播',
                    'en-US': 'Tokyo Waterfront Cityscape 24/7 Live Stream',
                    'ja-JP': '東京ウォーターフロント都市景観24/7ライブストリーム',
                    'ko-KR': '도쿄 워터프론트 도시 경관 24/7 라이브 스트림',
                    'es-ES': 'Transmisión en Vivo 24/7 Paisaje Urbano Costero de Tokio',
                    'fr-FR': 'Diffusion en Direct 24/7 Paysage Urbain Côtier de Tokyo',
                    'de-DE': '24/7 Live-Stream Tokyo Waterfront Stadtlandschaft'
                },
                emoji: '🌆',
                videoId: '_k-5U7IeK8g'
            },
            {
                id: 'yongan-fishing-harbor',
                titles: {
                    'zh-CN': '涉谷十字路口',
                    'en-US': 'Shibuya Scramble Crossing',
                    'ja-JP': '渋谷スクランブル交差点',
                    'ko-KR': '시부야 스크램블 교차로',
                    'es-ES': 'Cruce Peatonal de Shibuya',
                    'fr-FR': 'Passage Piéton de Shibuya',
                    'de-DE': 'Shibuya Scramble Crossing'
                },
                descriptions: {
                    'zh-CN': '東京涉谷十字路口即時攝影機',
                    'en-US': 'Tokyo Shibuya Scramble Crossing Live Camera',
                    'ja-JP': '東京渋谷スクランブル交差点ライブカメラ',
                    'ko-KR': '도쿄 시부야 스크램블 교차로 실시간 카메라',
                    'es-ES': 'Cámara en Vivo Cruce Peatonal Shibuya Tokio',
                    'fr-FR': 'Caméra en Direct Passage Piéton Shibuya Tokyo',
                    'de-DE': 'Live-Kamera Shibuya Scramble Crossing Tokyo'
                },
                emoji: '🚶',
                videoId: 'tujkoXI8rWM'
            },
            {
                id: 'torik-visitor-center',
                titles: {
                    'zh-CN': '台場海濱公園',
                    'en-US': 'Odaiba Marine Park',
                    'ja-JP': 'お台場海浜公園',
                    'ko-KR': '오다이바 해변공원',
                    'es-ES': 'Parque Marino Odaiba',
                    'fr-FR': 'Parc Marin d\'Odaiba',
                    'de-DE': 'Odaiba Meerespark'
                },
                descriptions: {
                    'zh-CN': '東京台場海濱公園即時影像',
                    'en-US': 'Tokyo Odaiba Marine Park Live Camera',
                    'ja-JP': '東京お台場海浜公園ライブカメラ',
                    'ko-KR': '도쿄 오다이바 해변공원 실시간 카메라',
                    'es-ES': 'Cámara en Vivo Parque Marino Odaiba Tokio',
                    'fr-FR': 'Caméra en Direct Parc Marin Odaiba Tokyo',
                    'de-DE': 'Live-Kamera Odaiba Meerespark Tokyo'
                },
                emoji: '🌊',
                videoId: 'dJZBqTeC-h8'
            },
            {
                id: 'yellowstone-geyser',
                titles: {
                    'zh-CN': '東京鐵塔夜景',
                    'en-US': 'Tokyo Tower Night View',
                    'ja-JP': '東京タワー夜景',
                    'ko-KR': '도쿄타워 야경',
                    'es-ES': 'Vista Nocturna Torre de Tokio',
                    'fr-FR': 'Vue Nocturne Tour de Tokyo',
                    'de-DE': 'Tokyo Tower Nachtansicht'
                },
                descriptions: {
                    'zh-CN': '東京鐵塔與鐵道夜景即時攝影機',
                    'en-US': 'Tokyo Tower & Railway Night View Live Camera',
                    'ja-JP': '東京タワー&鉄道夜景ライブカメラ',
                    'ko-KR': '도쿄타워 & 철도 야경 실시간 카메라',
                    'es-ES': 'Cámara en Vivo Vista Nocturna Torre de Tokio y Ferrocarril',
                    'fr-FR': 'Caméra en Direct Vue Nocturne Tour de Tokyo et Chemin de Fer',
                    'de-DE': 'Live-Kamera Tokyo Tower & Eisenbahn Nachtansicht'
                },
                emoji: '🌃',
                videoId: 'Tz8NEpxF6zY'
            },
            {
                id: 'niagara-falls',
                titles: {
                    'zh-CN': '靜岡富士山',
                    'en-US': 'Mount Fuji Shizuoka',
                    'ja-JP': '静岡富士山',
                    'ko-KR': '시즈오카 후지산',
                    'es-ES': 'Monte Fuji Shizuoka',
                    'fr-FR': 'Mont Fuji Shizuoka',
                    'de-DE': 'Berg Fuji Shizuoka'
                },
                descriptions: {
                    'zh-CN': '靜岡市薩埵峠廣重富士山即時影像',
                    'en-US': 'Mount Fuji Live View from Satta Pass Shizuoka',
                    'ja-JP': '静岡市さった峠広重の富士山ライブ映像',
                    'ko-KR': '시즈오카시 삿타토게에서 본 후지산 실시간 영상',
                    'es-ES': 'Vista en Vivo del Monte Fuji desde Paso Satta Shizuoka',
                    'fr-FR': 'Vue en Direct du Mont Fuji depuis le Col Satta Shizuoka',
                    'de-DE': 'Live-Ansicht des Berg Fuji vom Satta-Pass Shizuoka'
                },
                emoji: '🗻',
                videoId: 'GsD9QQEKSzQ'
            },
            {
                id: 'mount-fuji-view',
                titles: {
                    'zh-CN': '精進湖富士山',
                    'en-US': 'Mount Fuji Lake Shojiko',
                    'ja-JP': '精進湖富士山',
                    'ko-KR': '쇼지코 호수 후지산',
                    'es-ES': 'Monte Fuji Lago Shojiko',
                    'fr-FR': 'Mont Fuji Lac Shojiko',
                    'de-DE': 'Berg Fuji Shojiko-See'
                },
                descriptions: {
                    'zh-CN': '精進湖富士山即時攝影機',
                    'en-US': 'Mount Fuji Live Camera from Lake Shojiko',
                    'ja-JP': '精進湖からの富士山ライブカメラ',
                    'ko-KR': '쇼지코 호수에서 본 후지산 실시간 카메라',
                    'es-ES': 'Cámara en Vivo del Monte Fuji desde Lago Shojiko',
                    'fr-FR': 'Caméra en Direct du Mont Fuji depuis le Lac Shojiko',
                    'de-DE': 'Live-Kamera Berg Fuji vom Shojiko-See'
                },
                emoji: '🗾',
                videoId: 'so_3HK9HIdg'
            },
            
            // 第2頁 - 海灘與海洋風景 (8個)
            {
                id: 'crystal-bay-beach',
                titles: {
                    'zh-CN': '富士山河口湖',
                    'en-US': 'Mount Fuji Lake Kawaguchi',
                    'ja-JP': '富士山河口湖',
                    'ko-KR': '후지산 가와구치 호수',
                    'es-ES': 'Monte Fuji Lago Kawaguchi',
                    'fr-FR': 'Mont Fuji Lac Kawaguchi',
                    'de-DE': 'Berg Fuji Kawaguchi-See'
                },
                descriptions: {
                    'zh-CN': '富士山河口湖水野飯店即時攝影機',
                    'en-US': 'Mount Fuji & Lake Kawaguchi Live Stream from Mizno Hotel',
                    'ja-JP': '富士山&河口湖水野ホテルからのライブストリーム',
                    'ko-KR': '미즈노 호텔에서 본 후지산 & 가와구치 호수 실시간 스트림',
                    'es-ES': 'Transmisión en Vivo Monte Fuji y Lago Kawaguchi desde Hotel Mizno',
                    'fr-FR': 'Diffusion en Direct Mont Fuji et Lac Kawaguchi depuis Hôtel Mizno',
                    'de-DE': 'Live-Stream Berg Fuji & Kawaguchi-See vom Mizno Hotel'
                },
                emoji: '🏔️',
                videoId: 'oe7SMLOEQk0'
            },
            {
                id: 'waikiki-beach',
                titles: {
                    'zh-CN': '馬爾地夫海洋',
                    'en-US': 'Maldives Ocean',
                    'ja-JP': 'モルディブ海洋',
                    'ko-KR': '몰디브 바다',
                    'es-ES': 'Océano Maldivas',
                    'fr-FR': 'Océan Maldives',
                    'de-DE': 'Malediven Ozean'
                },
                descriptions: {
                    'zh-CN': '馬爾地夫洲際酒店4K海洋環境音',
                    'en-US': 'Maldives InterContinental 4K Ocean Ambience',
                    'ja-JP': 'モルディブインターコンチネンタル4K海洋環境音',
                    'ko-KR': '몰디브 인터컨티넨탈 4K 바다 환경음',
                    'es-ES': 'Ambiente Oceánico 4K InterContinental Maldivas',
                    'fr-FR': 'Ambiance Océanique 4K InterContinental Maldives',
                    'de-DE': '4K Ozean-Ambiente InterContinental Malediven'
                },
                emoji: '🌺',
                videoId: '_BMi3usEwi8'
            },
            {
                id: 'maldives-resort',
                titles: {
                    'zh-CN': '西耶斯塔島海灘',
                    'en-US': 'Siesta Key Beach',
                    'ja-JP': 'シエスタキービーチ',
                    'ko-KR': '시에스타 키 비치',
                    'es-ES': 'Playa Siesta Key',
                    'fr-FR': 'Plage Siesta Key',
                    'de-DE': 'Siesta Key Strand'
                },
                descriptions: {
                    'zh-CN': '西耶斯塔島海灘即時影像',
                    'en-US': 'Siesta Key Beach Live Stream',
                    'ja-JP': 'シエスタキービーチライブストリーム',
                    'ko-KR': '시에스타 키 비치 실시간 스트림',
                    'es-ES': 'Transmisión en Vivo Playa Siesta Key',
                    'fr-FR': 'Diffusion en Direct Plage Siesta Key',
                    'de-DE': 'Live-Stream Siesta Key Strand'
                },
                emoji: '🏝️',
                videoId: 'NLhxcyzXQxM'
            },
            {
                id: 'santorini-sunset',
                titles: {
                    'zh-CN': '尼加拉瀑布',
                    'en-US': 'Niagara Falls',
                    'ja-JP': 'ナイアガラの滝',
                    'ko-KR': '나이아가라 폭포',
                    'es-ES': 'Cataratas del Niágara',
                    'fr-FR': 'Chutes du Niagara',
                    'de-DE': 'Niagarafälle'
                },
                descriptions: {
                    'zh-CN': '尼加拉瀑布即時攝影機',
                    'en-US': 'Niagara Falls Live Camera',
                    'ja-JP': 'ナイアガラの滝ライブカメラ',
                    'ko-KR': '나이아가라 폭포 실시간 카메라',
                    'es-ES': 'Cámara en Vivo Cataratas del Niágara',
                    'fr-FR': 'Caméra en Direct Chutes du Niagara',
                    'de-DE': 'Live-Kamera Niagarafälle'
                },
                emoji: '💦',
                videoId: '4Z6wOToTgh0'
            },
            {
                id: 'caribbean-beach',
                titles: {
                    'zh-CN': '森林瀑布溪流',
                    'en-US': 'Forest Waterfall Stream',
                    'ja-JP': '森の滝の小川',
                    'ko-KR': '숲속 폭포 개울',
                    'es-ES': 'Arroyo Cascada del Bosque',
                    'fr-FR': 'Ruisseau Cascade de Forêt',
                    'de-DE': 'Wald-Wasserfall-Bach'
                },
                descriptions: {
                    'zh-CN': '森林中溫和瀑布溪流聲24/7',
                    'en-US': 'Gentle Waterfall Stream Sound in Forest 24/7',
                    'ja-JP': '森の中の穏やかな滝の小川の音24/7',
                    'ko-KR': '숲속 부드러운 폭포 개울 소리 24/7',
                    'es-ES': 'Sonido Suave de Arroyo Cascada en Bosque 24/7',
                    'fr-FR': 'Son Doux de Ruisseau Cascade en Forêt 24/7',
                    'de-DE': 'Sanftes Wasserfall-Bach-Geräusch im Wald 24/7'
                },
                emoji: '🌲',
                videoId: '798qd_SQU3I'
            },
            {
                id: 'miami-beach',
                titles: {
                    'zh-CN': '紐卡斯爾港',
                    'en-US': 'Port of Newcastle',
                    'ja-JP': 'ニューカッスル港',
                    'ko-KR': '뉴캐슬 항구',
                    'es-ES': 'Puerto de Newcastle',
                    'fr-FR': 'Port de Newcastle',
                    'de-DE': 'Hafen von Newcastle'
                },
                descriptions: {
                    'zh-CN': '紐卡斯爾港即時港口攝影機',
                    'en-US': 'Port of Newcastle Live Harbour Camera',
                    'ja-JP': 'ニューカッスル港ライブハーバーカメラ',
                    'ko-KR': '뉴캐슬 항구 실시간 항만 카메라',
                    'es-ES': 'Cámara en Vivo Puerto de Newcastle',
                    'fr-FR': 'Caméra en Direct Port de Newcastle',
                    'de-DE': 'Live-Hafenkamera Newcastle'
                },
                emoji: '⚓',
                videoId: 'tbQPUvUifEc'
            },
            {
                id: 'bondi-beach',
                titles: {
                    'zh-CN': '蘇美島水晶灣',
                    'en-US': 'Crystal Bay Koh Samui',
                    'ja-JP': 'サムイ島クリスタルベイ',
                    'ko-KR': '코사무이 크리스탈 베이',
                    'es-ES': 'Bahía Cristal Koh Samui',
                    'fr-FR': 'Baie Cristal Koh Samui',
                    'de-DE': 'Crystal Bay Koh Samui'
                },
                descriptions: {
                    'zh-CN': '泰國蘇美島拉邁水晶灣海灘度假村全景',
                    'en-US': 'Crystal Bay Beach Resort Panoramic Lamai Koh Samui Thailand',
                    'ja-JP': 'タイ・サムイ島ラマイ・クリスタルベイビーチリゾートパノラマ',
                    'ko-KR': '태국 코사무이 라마이 크리스탈 베이 비치 리조트 파노라마',
                    'es-ES': 'Panorámica Resort Playa Bahía Cristal Lamai Koh Samui Tailandia',
                    'fr-FR': 'Panoramique Resort Plage Baie Cristal Lamai Koh Samui Thaïlande',
                    'de-DE': 'Panorama Crystal Bay Beach Resort Lamai Koh Samui Thailand'
                },
                emoji: '🏖️',
                videoId: 'NTTtqzL5OWI'
            },
            {
                id: 'copacabana-beach',
                titles: {
                    'zh-CN': '蘇美島水晶灣海灘',
                    'en-US': 'Crystal Bay Beach Koh Samui',
                    'ja-JP': 'サムイ島クリスタルベイビーチ',
                    'ko-KR': '코사무이 크리스탈 베이 비치',
                    'es-ES': 'Playa Bahía Cristal Koh Samui',
                    'fr-FR': 'Plage Baie Cristal Koh Samui',
                    'de-DE': 'Crystal Bay Beach Koh Samui'
                },
                descriptions: {
                    'zh-CN': '泰國蘇美島拉邁水晶灣海灘度假村即時海灘攝影機',
                    'en-US': 'Crystal Bay Beach Resort Live Beach Webcam Lamai Koh Samui Thailand',
                    'ja-JP': 'タイ・サムイ島ラマイ・クリスタルベイビーチリゾートライブビーチウェブカメラ',
                    'ko-KR': '태국 코사무이 라마이 크리스탈 베이 비치 리조트 실시간 해변 웹캠',
                    'es-ES': 'Webcam en Vivo Playa Resort Bahía Cristal Lamai Koh Samui Tailandia',
                    'fr-FR': 'Webcam en Direct Plage Resort Baie Cristal Lamai Koh Samui Thaïlande',
                    'de-DE': 'Live-Beach-Webcam Crystal Bay Beach Resort Lamai Koh Samui Thailand'
                },
                emoji: '🌴',
                videoId: 'Fw9hgttWzIg'
            }
        ];
        
        // 分頁設定
        this.itemsPerPage = 9;
        this.currentPage = 1;
        this.totalPages = Math.ceil(this.landscapes.length / this.itemsPerPage);
        
        this.init();
    }
    
    init() {
        this.languageManager.updatePageTexts();
        this.renderLandscapes();
        this.bindEvents();
        
        // 預設載入4K森林溪流直播作為桌布
        if (this.landscapes.length > 0) {
            this.loadVideo(this.landscapes[0].videoId); // 4K森林溪流直播
            this.setActiveLandscape(this.landscapes[0].id);
        }
        
        // 啟動隨機底色變換
        this.startRandomBackgroundChange();
    }
    
    // 獲取當前語言的風景標題
    getLandscapeTitle(landscape) {
        return landscape.titles ? 
            landscape.titles[this.languageManager.currentLanguage] || 
            landscape.titles['en-US'] || 
            landscape.title || 
            'Unknown' : 
            landscape.title || 'Unknown';
    }
    
    // 獲取當前語言的風景描述
    getLandscapeDescription(landscape) {
        return landscape.descriptions ? 
            landscape.descriptions[this.languageManager.currentLanguage] || 
            landscape.descriptions['en-US'] || 
            landscape.description || 
            'No description' : 
            landscape.description || 'No description';
    }
    
    renderLandscapes() {
        const grid = document.getElementById('landscape-grid');
        grid.innerHTML = '';
        
        // 計算當前頁面要顯示的項目
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const currentPageItems = this.landscapes.slice(startIndex, endIndex);
        
        currentPageItems.forEach(landscape => {
            const item = document.createElement('div');
            item.className = 'landscape-item';
            item.dataset.id = landscape.id;
            item.dataset.videoId = landscape.videoId;
            
            item.innerHTML = `
                <span class="emoji">${landscape.emoji}</span>
                <h3>${this.getLandscapeTitle(landscape)}</h3>
                <p>${this.getLandscapeDescription(landscape)}</p>
            `;
            
            item.addEventListener('click', () => {
                this.loadVideo(landscape.videoId);
                this.setActiveLandscape(landscape.id);
            });
            
            grid.appendChild(item);
        });
        
        // 渲染分頁控制
        this.renderPagination();
    }
    
    renderPagination() {
        const container = document.getElementById('pagination-container');
        
        // 如果只有一頁，隱藏分頁控制
        if (this.totalPages <= 1) {
            container.style.display = 'none';
            return;
        }
        
        container.style.display = 'flex';
        container.innerHTML = '';
        
        // 上一頁按鈕
        const prevBtn = document.createElement('button');
        prevBtn.className = 'pagination-btn';
        prevBtn.textContent = this.languageManager.getText('prevPage');
        prevBtn.disabled = this.currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderLandscapes();
                this.updatePaginationColors();
            }
        });
        container.appendChild(prevBtn);
        
        // 頁面信息
        const pageInfo = document.createElement('span');
        pageInfo.className = 'page-info';
        
        if (this.languageManager.currentLanguage === 'zh-CN') {
            pageInfo.textContent = `${this.languageManager.getText('page')} ${this.currentPage} ${this.languageManager.getText('of')} ${this.totalPages} ${this.languageManager.getText('pages')}`;
        } else {
            pageInfo.textContent = `${this.languageManager.getText('page')} ${this.currentPage} ${this.languageManager.getText('of')} ${this.totalPages}`;
        }
        
        container.appendChild(pageInfo);
        
        // 下一頁按鈕
        const nextBtn = document.createElement('button');
        nextBtn.className = 'pagination-btn';
        nextBtn.textContent = this.languageManager.getText('nextPage');
        nextBtn.disabled = this.currentPage === this.totalPages;
        nextBtn.addEventListener('click', () => {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.renderLandscapes();
                this.updatePaginationColors();
            }
        });
        container.appendChild(nextBtn);
        
        // 更新分頁按鈕顏色
        this.updatePaginationColors();
    }
    
    updatePaginationColors() {
        if (!this.currentColorScheme) return;
        
        const paginationBtns = document.querySelectorAll('.pagination-btn');
        paginationBtns.forEach(btn => {
            if (!btn.disabled) {
                btn.style.backgroundColor = this.currentColorScheme.buttonColor;
            }
        });
    }

    selectRandomLandscape() {
        // 從所有17個風景中隨機選擇一個
        const randomIndex = Math.floor(Math.random() * this.landscapes.length);
        const randomLandscape = this.landscapes[randomIndex];
        
        // 計算該風景在哪一頁
        const targetPage = Math.ceil((randomIndex + 1) / this.itemsPerPage);
        
        // 如果不在當前頁，切換到目標頁
        if (targetPage !== this.currentPage) {
            this.currentPage = targetPage;
            this.renderLandscapes();
        }
        
        // 載入隨機選擇的風景
        this.loadVideo(randomLandscape.videoId);
        this.setActiveLandscape(randomLandscape.id);
    }
    
    bindEvents() {
        // 語言選擇器
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.languageManager.setLanguage(e.target.value);
                this.renderLandscapes(); // 重新渲染以更新語言
            });
        }

        // 配色方案選擇器
        const colorSchemeSelect = document.getElementById('color-scheme');
        if (colorSchemeSelect) {
            colorSchemeSelect.addEventListener('change', (e) => {
                this.colorSchemeManager.setScheme(e.target.value);
            });
        }

        // 隨機選擇按鈕
        const randomBtn = document.getElementById('random-btn');
        if (randomBtn) {
            randomBtn.addEventListener('click', () => {
                this.selectRandomLandscape();
            });
        }

        // 桌布模式按鈕
        const wallpaperBtn = document.getElementById('wallpaper-btn');
        if (wallpaperBtn) {
            wallpaperBtn.addEventListener('click', () => {
                this.toggleWallpaperMode();
            });
        }

        // 靜音按鈕
        const muteBtn = document.getElementById('mute-btn');
        if (muteBtn) {
            muteBtn.addEventListener('click', () => {
                this.toggleMute();
            });
        }

        // ESC 鍵退出桌布模式
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isWallpaperMode) {
                this.exitWallpaperMode();
            }
        });
    }

    loadVideo(videoId) {
        this.currentVideoId = videoId;
        
        if (this.player) {
            this.player.loadVideoById(videoId);
        } else {
            this.initYouTubePlayer(videoId);
        }
    }

    initYouTubePlayer(videoId) {
        this.player = new YT.Player('youtube-player', {
            height: '100%',
            width: '100%',
            videoId: videoId,
            playerVars: {
                autoplay: 1,
                controls: 0,
                disablekb: 1,
                fs: 0,
                iv_load_policy: 3,
                modestbranding: 1,
                playsinline: 1,
                rel: 0,
                showinfo: 0,
                mute: this.isMuted ? 1 : 0,
                loop: 1,
                playlist: videoId
            },
            events: {
                onReady: (event) => {
                    if (this.isMuted) {
                        event.target.mute();
                    }
                },
                onStateChange: (event) => {
                    if (event.data === YT.PlayerState.ENDED) {
                        event.target.playVideo();
                    }
                }
            }
        });
    }

    setActiveLandscape(landscapeId) {
        // 移除所有激活狀態
        document.querySelectorAll('.landscape-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // 設置當前激活項目
        const activeItem = document.querySelector(`[data-id="${landscapeId}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
        
        // 更新按鈕顏色
        this.updateButtonColors();
    }

    updateButtonColors() {
        if (!this.currentColorScheme) return;
        
        // 更新控制按鈕顏色
        const controlBtns = document.querySelectorAll('.control-btn');
        controlBtns.forEach(btn => {
            btn.style.background = `${this.currentColorScheme.background}, rgba(0,0,0,0.3)`;
        });
        
        // 重置所有風景項目為白色背景
        const allItems = document.querySelectorAll('.landscape-item');
        allItems.forEach(item => {
            item.style.background = '#ffffff';
            item.style.color = '#333';
        });
        
        // 只有激活的風景項目使用莫蘭迪背景色
        const activeItem = document.querySelector('.landscape-item.active');
        if (activeItem) {
            activeItem.style.background = this.currentColorScheme.background;
            activeItem.style.color = 'white';
        }
        
        // 更新隨機按鈕顏色
        this.updateRandomButtonColor();
    }

    updateRandomButtonColor() {
        const randomBtn = document.getElementById('random-btn');
        if (randomBtn) {
            // 使用莫蘭迪色系的紫色調
            randomBtn.style.background = 'linear-gradient(135deg, #A8A0B5 0%, #B5A0A8 100%)';
            randomBtn.style.boxShadow = '0 4px 15px rgba(168, 160, 181, 0.3)';
        }
    }

    toggleWallpaperMode() {
        if (this.isWallpaperMode) {
            this.exitWallpaperMode();
        } else {
            this.enterWallpaperMode();
        }
    }

    enterWallpaperMode() {
        this.isWallpaperMode = true;
        
        // 創建全屏桌布播放器
        const wallpaperContainer = document.createElement('div');
        wallpaperContainer.id = 'wallpaper-container';
        wallpaperContainer.innerHTML = '<div id="wallpaper-player"></div>';
        document.body.appendChild(wallpaperContainer);
        
        // 初始化桌布播放器
        this.wallpaperPlayer = new YT.Player('wallpaper-player', {
            height: '100%',
            width: '100%',
            videoId: this.currentVideoId,
            playerVars: {
                autoplay: 1,
                controls: 0,
                disablekb: 1,
                fs: 0,
                iv_load_policy: 3,
                modestbranding: 1,
                playsinline: 1,
                rel: 0,
                showinfo: 0,
                mute: 1, // 桌布模式強制靜音
                loop: 1,
                playlist: this.currentVideoId
            },
            events: {
                onReady: (event) => {
                    event.target.mute();
                },
                onStateChange: (event) => {
                    if (event.data === YT.PlayerState.ENDED) {
                        event.target.playVideo();
                    }
                }
            }
        });
        
        // 更新按鈕文字
        const wallpaperBtn = document.getElementById('wallpaper-btn');
        wallpaperBtn.textContent = this.languageManager.getText('exitWallpaper');
    }

    exitWallpaperMode() {
        this.isWallpaperMode = false;
        
        // 移除桌布容器
        const wallpaperContainer = document.getElementById('wallpaper-container');
        if (wallpaperContainer) {
            wallpaperContainer.remove();
        }
        
        // 清理桌布播放器
        if (this.wallpaperPlayer) {
            this.wallpaperPlayer.destroy();
            this.wallpaperPlayer = null;
        }
        
        // 更新按鈕文字
        const wallpaperBtn = document.getElementById('wallpaper-btn');
        wallpaperBtn.textContent = this.languageManager.getText('wallpaperMode');
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        
        if (this.player) {
            if (this.isMuted) {
                this.player.mute();
            } else {
                this.player.unMute();
            }
        }
        
        // 更新按鈕文字（可選）
        const muteBtn = document.getElementById('mute-btn');
        muteBtn.textContent = this.isMuted ? '🔇' : '🔊';
    }

    startRandomBackgroundChange() {
        this.colorSchemeManager = new ColorSchemeManager();
        
        // 每次進入網站時隨機選擇配色方案
        const randomScheme = this.colorSchemeManager.getRandomScheme();
        this.colorSchemeManager.setScheme(randomScheme);
        this.currentColorScheme = this.colorSchemeManager.getCurrentScheme();
        
        // 立即應用初始配色
        this.colorSchemeManager.applyScheme();
        
        // 啟動隨機變換
        this.colorSchemeManager.startRandomChange(2); // 每2分鐘變換一次
        
        // 監聽配色變化
        setInterval(() => {
            this.currentColorScheme = this.colorSchemeManager.getCurrentScheme();
            this.updateRandomButtonColor(); // 更新隨機按鈕顏色
        }, 1000);
    }
}

// YouTube API 載入完成後初始化應用程式
function onYouTubeIframeAPIReady() {
    window.app = new LiveWallpaperApp();
}

// 載入 YouTube API
if (!window.YT) {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}