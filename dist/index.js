"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const bot_1 = require("./bot/bot");
const config_1 = require("./config");
// Load environment variables
const config = (0, config_1.loadConfig)();
// Initialize the bot
const bot = new telegraf_1.Telegraf(config.telegramBotToken);
(0, bot_1.setupBot)(bot);
// Start the bot
bot.launch();
console.log('Bot is running...');
