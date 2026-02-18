const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

const token = 'YOUR_BOT_TOKEN_HERE'; // Получите у @BotFather
const miniAppUrl = 'https://your-mini-app.com'; // Замените на URL вашего приложения

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    bot.sendMessage(chatId, '📊 Добро пожаловать в анализатор Pocket Option!\n\nАнализируйте монеты по таймфреймам 3s, 5s, 30s, 1m, 3m, 5m', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: '🚀 Открыть приложение',
                    web_app: { url: miniAppUrl }
                }],
                [{
                    text: '📋 Список активов',
                    callback_data: 'list_assets'
                }],
                [{
                    text: '❓ Помощь',
                    callback_data: 'help'
                }]
            ]
        }
    });
});

bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    
    if (query.data === 'list_assets') {
        await bot.sendMessage(chatId, '📋 Все доступные активы:\n\n' +
            '• EUR/USD\n' +
            '• GBP/USD\n' +
            '• BTC/USD\n' +
            '• Tesla OTC\n' +
            '• Apple OTC\n' +
            '• И многие другие...\n\n' +
            'Откройте приложение для полного списка!', {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: '📱 Открыть приложение',
                        web_app: { url: miniAppUrl }
                    }]
                ]
            }
        });
    } else if (query.data === 'help') {
        await bot.sendMessage(chatId, '❓ Помощь\n\n' +
            'Это приложение анализирует монеты с Pocket Option.\n\n' +
            'Доступные таймфреймы:\n' +
            '• 3 секунды\n' +
            '• 5 секунд\n' +
            '• 30 секунд\n' +
            '• 1 минута\n' +
            '• 3 минуты\n' +
            '• 5 минут\n\n' +
            'Нажмите кнопку "Открыть приложение" для начала работы!');
    }
});

app.get('/', (req, res) => {
    res.send('Telegram Bot is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});