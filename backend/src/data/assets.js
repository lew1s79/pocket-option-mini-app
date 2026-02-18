
const assets = [
    // Валютные пары OTC
    { symbol: "AED/CNY", name: "AED/CNY OTC", type: "forex", accuracy: 92 },
    { symbol: "AUD/CAD", name: "AUD/CAD OTC", type: "forex", accuracy: 92 },
    { symbol: "AUD/CHF", name: "AUD/CHF OTC", type: "forex", accuracy: 92 },
    { symbol: "AUD/NZD", name: "AUD/NZD OTC", type: "forex", accuracy: 92 },
    { symbol: "AUD/USD", name: "AUD/USD OTC", type: "forex", accuracy: 92 },
    { symbol: "CHF/JPY", name: "CHF/JPY OTC", type: "forex", accuracy: 92 },
    { symbol: "EUR/CHF", name: "EUR/CHF OTC", type: "forex", accuracy: 92 },
    { symbol: "EUR/GBP", name: "EUR/GBP OTC", type: "forex", accuracy: 92 },
    { symbol: "EUR/JPY", name: "EUR/JPY OTC", type: "forex", accuracy: 92 },
    { symbol: "EUR/NZD", name: "EUR/NZD OTC", type: "forex", accuracy: 92 },
    { symbol: "EUR/RUB", name: "EUR/RUB OTC", type: "forex", accuracy: 92 },
    { symbol: "EUR/TRY", name: "EUR/TRY OTC", type: "forex", accuracy: 92 },
    { symbol: "EUR/USD", name: "EUR/USD OTC", type: "forex", accuracy: 92 },
    { symbol: "GBP/JPY", name: "GBP/JPY OTC", type: "forex", accuracy: 92 },
    { symbol: "GBP/USD", name: "GBP/USD OTC", type: "forex", accuracy: 92 },
    { symbol: "JOD/CNY", name: "JOD/CNY OTC", type: "forex", accuracy: 92 },
    { symbol: "KES/USD", name: "KES/USD OTC", type: "forex", accuracy: 92 },
    { symbol: "LBP/USD", name: "LBP/USD OTC", type: "forex", accuracy: 92 },
    { symbol: "NGN/USD", name: "NGN/USD OTC", type: "forex", accuracy: 92 },
    { symbol: "NZD/JPY", name: "NZD/JPY OTC", type: "forex", accuracy: 92 },
    { symbol: "OMR/CNY", name: "OMR/CNY OTC", type: "forex", accuracy: 92 },
    { symbol: "QAR/CNY", name: "QAR/CNY OTC", type: "forex", accuracy: 92 },
    { symbol: "TND/USD", name: "TND/USD OTC", type: "forex", accuracy: 92 },
    { symbol: "UAH/USD", name: "UAH/USD OTC", type: "forex", accuracy: 92 },
    { symbol: "USD/BDT", name: "USD/BDT OTC", type: "forex", accuracy: 92 },
    { symbol: "USD/CAD", name: "USD/CAD OTC", type: "forex", accuracy: 92 },
    { symbol: "USD/COP", name: "USD/COP OTC", type: "forex", accuracy: 92 },
    { symbol: "USD/MYR", name: "USD/MYR OTC", type: "forex", accuracy: 92 },
    { symbol: "USD/PKR", name: "USD/PKR OTC", type: "forex", accuracy: 92 },
    { symbol: "USD/THB", name: "USD/THB OTC", type: "forex", accuracy: 92 },
    { symbol: "BHD/CNY", name: "BHD/CNY OTC", type: "forex", accuracy: 91 },
    { symbol: "EUR/USD", name: "EUR/USD", type: "forex", accuracy: 89 },
    
    // Криптовалюты
    { symbol: "DOGE", name: "Dogecoin OTC", type: "crypto", accuracy: 56 },
    { symbol: "BNB", name: "BNB OTC", type: "crypto", accuracy: 40 },
    { symbol: "BTC", name: "Bitcoin", type: "crypto", accuracy: 23 },
    
    // Акции
    { symbol: "PFE", name: "Pfizer Inc OTC", type: "stocks", accuracy: 92 },
    { symbol: "TSLA", name: "Tesla OTC", type: "stocks", accuracy: 92 },
    { symbol: "AMD", name: "Advanced Micro Devices OTC", type: "stocks", accuracy: 92 },
    { symbol: "AMZN", name: "Amazon OTC", type: "stocks", accuracy: 92 },
    { symbol: "C", name: "Citigroup Inc OTC", type: "stocks", accuracy: 92 },
    { symbol: "GME", name: "GameStop Corp OTC", type: "stocks", accuracy: 92 },
    { symbol: "NFLX", name: "Netflix OTC", type: "stocks", accuracy: 92 },
    { symbol: "VIX", name: "VIX OTC", type: "stocks", accuracy: 92 }
];

const timeframes = [
    { value: "3s", label: "3 секунды" },
    { value: "5s", label: "5 секунд" },
    { value: "30s", label: "30 секунд" },
    { value: "1m", label: "1 минута" },
    { value: "3m", label: "3 минуты" },
    { value: "5m", label: "5 минут" }
];

module.exports = { assets, timeframes };