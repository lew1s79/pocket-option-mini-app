const { assets } = require('../data/assets');

class ParserService {
    constructor() {
        this.prices = new Map();
    }

    async init() {
        console.log('Parser service initialized');
    }

    async getPrice(asset) {
        try {
            const price = this.generateDemoPrice(asset);
            return price;
        } catch (error) {
            console.error(`Error getting price for ${asset.symbol}:`, error);
            return null;
        }
    }

    generateDemoPrice(asset) {
        const basePrice = this.getBasePrice(asset.symbol);
        const change = (Math.random() * 2 - 1) / 100;
        const currentPrice = basePrice * (1 + change);
        
        return {
            symbol: asset.symbol,
            price: currentPrice.toFixed(asset.symbol.includes('BTC') ? 2 : 4),
            change: (change * 100).toFixed(2),
            timestamp: Date.now()
        };
    }

    getBasePrice(symbol) {
        const prices = {
            'BTC': 50000,
            'ETH': 3000,
            'EUR/USD': 1.08,
            'GBP/USD': 1.26,
            'TSLA': 180.50,
            'AMD': 120.30,
            'AMZN': 3300,
            'DOGE': 0.08,
            'BNB': 300
        };
        
        for (const [key, value] of Object.entries(prices)) {
            if (symbol.includes(key)) return value;
        }
        
        return 100.00;
    }

    async analyzeTimeframe(asset, timeframe) {
        const price = await this.getPrice(asset);
        const trend = Math.random() > 0.5 ? 'up' : 'down';
        const strength = Math.random() * 30 + 50;
        
        return {
            asset: asset.name,
            timeframe,
            currentPrice: price.price,
            trend,
            accuracy: Math.round(strength),
            signal: trend === 'up' ? 'Покупать' : 'Продавать'
        };
    }

    async close() {
        console.log('Parser service closed');
    }
}

module.exports = new ParserService();