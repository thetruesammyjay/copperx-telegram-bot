import { Telegraf } from 'telegraf';
import { setupBot } from './bot/bot';
import { loadConfig } from './config';

// Load environment variables
const config = loadConfig();

// Initialize the bot
const bot = new Telegraf(config.telegramBotToken);
setupBot(bot);

// Start the bot
bot.launch();
console.log('Bot is running...');