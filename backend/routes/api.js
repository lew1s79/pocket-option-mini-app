const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');

router.get('/assets', assetController.getAllAssets.bind(assetController));
router.get('/assets/:symbol/price', assetController.getAssetPrice.bind(assetController));
router.get('/analysis', assetController.getAnalysis.bind(assetController));
router.get('/timeframes', assetController.getTimeframes.bind(assetController));

module.exports = router;