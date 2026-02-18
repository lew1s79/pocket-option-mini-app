class PocketOptionApp {
    constructor() {
        this.currentAsset = { symbol: 'BTC', name: 'BTC/USDT' };
        this.currentTimeframe = '1m';
        this.currentTimeframeLabel = '1 минута';
        this.assets = [];
        this.timeframes = [];
        this.apiUrl = 'http://localhost:3001'; // Замените на ваш бэкенд URL
        this.init();
    }

    async init() {
        await this.initTelegram();
        await this.loadAssets();
        await this.loadTimeframes();
        this.setupEventListeners();
        this.updateDisplay();
    }

    async initTelegram() {
        try {
            this.tg = window.Telegram.WebApp;
            this.tg.expand();
            this.tg.enableClosingConfirmation();
            
            document.documentElement.className = this.tg.colorScheme;
        } catch (error) {
            console.error('Telegram init error:', error);
        }
    }

    async loadAssets() {
        try {
            const response = await fetch(`${this.apiUrl}/api/assets`);
            const data = await response.json();
            this.assets = data.data;
            this.renderAssetList();
        } catch (error) {
            console.error('Error loading assets:', error);
            this.loadDemoAssets();
        }
    }

    loadDemoAssets() {
        this.assets = [
            { symbol: "BTC", name: "Bitcoin", type: "crypto", accuracy: 23 },
            { symbol: "ETH", name: "Ethereum", type: "crypto", accuracy: 45 },
            { symbol: "EUR/USD", name: "EUR/USD", type: "forex", accuracy: 89 },
            { symbol: "TSLA", name: "Tesla OTC", type: "stocks", accuracy: 92 }
        ];
        this.renderAssetList();
    }

    async loadTimeframes() {
        try {
            const response = await fetch(`${this.apiUrl}/api/timeframes`);
            const data = await response.json();
            this.timeframes = data.data;
        } catch (error) {
            console.error('Error loading timeframes:', error);
            this.timeframes = [
                { value: "3s", label: "3 секунды" },
                { value: "5s", label: "5 секунд" },
                { value: "30s", label: "30 секунд" },
                { value: "1m", label: "1 минута" },
                { value: "3m", label: "3 минуты" },
                { value: "5m", label: "5 минут" }
            ];
        }
    }

    setupEventListeners() {
        document.getElementById('selectAsset').addEventListener('click', () => {
            this.showModal('assetModal');
        });

        document.getElementById('selectTimeframe').addEventListener('click', () => {
            this.showTimeframeSelector();
        });

        document.getElementById('getSignals').addEventListener('click', () => {
            this.getSignals();
        });

        document.getElementById('closeModal').addEventListener('click', () => {
            this.hideModal('assetModal');
        });

        document.getElementById('closeTimeframeModal').addEventListener('click', () => {
            this.hideModal('timeframeModal');
        });
    }

    renderAssetList() {
        const container = document.getElementById('assetList');
        if (!container) return;

        const grouped = this.groupAssetsByType();
        
        let html = '';
        for (const [type, assets] of Object.entries(grouped)) {
            html += `<div class="asset-group">
                <h3>${this.getTypeName(type)}</h3>`;
            
            assets.forEach(asset => {
                html += `<div class="asset-item" data-symbol="${asset.symbol}">
                    <span class="asset-name">${asset.name}</span>
                    <span class="asset-accuracy">${asset.accuracy}%</span>
                </div>`;
            });
            
            html += '</div>';
        }
        
        container.innerHTML = html;
        
        document.querySelectorAll('.asset-item').forEach(item => {
            item.addEventListener('click', () => {
                const symbol = item.dataset.symbol;
                this.selectAsset(symbol);
            });
        });
    }

    showTimeframeSelector() {
        const container = document.getElementById('timeframeList');
        let html = '';
        
        this.timeframes.forEach(tf => {
            html += `<div class="timeframe-item" data-value="${tf.value}">
                ${tf.label}
            </div>`;
        });
        
        container.innerHTML = html;
        
        document.querySelectorAll('.timeframe-item').forEach(item => {
            item.addEventListener('click', () => {
                const value = item.dataset.value;
                const label = item.textContent;
                this.selectTimeframe(value, label);
            });
        });
        
        this.showModal('timeframeModal');
    }

    groupAssetsByType() {
        return this.assets.reduce((acc, asset) => {
            if (!acc[asset.type]) acc[asset.type] = [];
            acc[asset.type].push(asset);
            return acc;
        }, {});
    }

    getTypeName(type) {
        const names = {
            forex: 'Валютные пары',
            crypto: 'Криптовалюты',
            stocks: 'Акции'
        };
        return names[type] || type;
    }

    selectAsset(symbol) {
        const asset = this.assets.find(a => a.symbol === symbol);
        if (asset) {
            this.currentAsset = asset;
            document.getElementById('selectedAsset').textContent = asset.name;
            this.hideModal('assetModal');
        }
    }

    selectTimeframe(value, label) {
        this.currentTimeframe = value;
        this.currentTimeframeLabel = label;
        document.getElementById('selectedTimeframe').textContent = label;
        this.hideModal('timeframeModal');
    }

    async getSignals() {
        const button = document.getElementById('getSignals');
        
        try {
            button.disabled = true;
            button.textContent = 'Загрузка...';

            const response = await fetch(
                `${this.apiUrl}/api/analysis?symbol=${this.currentAsset.symbol}&timeframe=${this.currentTimeframe}`
            );
            
            const data = await response.json();
            
            if (data.success) {
                this.showSignals(data.data);
            }
        } catch (error) {
            console.error('Error getting signals:', error);
            this.showDemoSignals();
        } finally {
            button.disabled = false;
            button.textContent = 'Получать сигналы';
        }
    }

    showDemoSignals() {
        const demoData = {
            currentPrice: (Math.random() * 1000).toFixed(2),
            trend: Math.random() > 0.5 ? 'up' : 'down',
            accuracy: Math.floor(Math.random() * 30 + 60)
        };
        this.showSignals(demoData);
    }

    showSignals(data) {
        document.getElementById('currentAssetDisplay').textContent = this.currentAsset.name;
        document.getElementById('currentPrice').textContent = data.currentPrice;
        
        const trendElement = document.getElementById('trend');
        trendElement.textContent = data.trend === 'up' ? '📈 Вверх' : '📉 Вниз';
        trendElement.className = data.trend === 'up' ? 'trend-up' : 'trend-down';
        
        document.getElementById('accuracy').textContent = `${data.accuracy}%`;
        
        document.getElementById('resultCard').style.display = 'block';
    }

    updateDisplay() {
        document.getElementById('selectedAsset').textContent = this.currentAsset.name;
        document.getElementById('selectedTimeframe').textContent = this.currentTimeframeLabel;
    }

    showModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }

    hideModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PocketOptionApp();
});