const { assets, timeframes } = require('../data/assets');
const parserService = require('../services/parserService');
const predictionService = require('../services/predictionService');

class AssetController {
    async getAllAssets(req, res) {
        try {
            const { type } = req.query;
            let filteredAssets = assets;
            
            if (type) {
                filteredAssets = assets.filter(a => a.type === type);
            }
            
            res.json({
                success: true,
                data: filteredAssets
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    async getAssetPrice(req, res) {
        try {
            const { symbol } = req.params;
            const asset = assets.find(a => a.symbol === symbol);
            
            if (!asset) {
                return res.status(404).json({
                    success: false,
                    error: 'Asset not found'
                });
            }
            
            const price = await parserService.getPrice(asset);
            
            res.json({
                success: true,
                data: price
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    async getAnalysis(req, res) {
        try {
            const { symbol, timeframe } = req.query;
            
            if (!symbol || !timeframe) {
                return res.status(400).json({
                    success: false,
                    error: 'Symbol and timeframe are required'
                });
            }
            
            const asset = assets.find(a => a.symbol === symbol);
            if (!asset) {
                return res.status(404).json({
                    success: false,
                    error: 'Asset not found'
                });
            }
            
            const analysis = await parserService.analyzeTimeframe(asset, timeframe);
            const prediction = await predictionService.getPrediction(asset, timeframe);
            
            res.json({
                success: true,
                data: {
                    ...analysis,
                    prediction
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    getTimeframes(req, res) {
        res.json({
            success: true,
            data: timeframes
        });
    }
}

module.exports = new AssetController();