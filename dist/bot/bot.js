"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupBot = void 0;
const telegraf_1 = require("telegraf");
const commands_1 = require("./commands");
const mainMenu_1 = require("./menus/mainMenu");
const middlewares_1 = require("./middlewares");
const config_1 = require("../config");
const logger_1 = require("../utils/logger");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Load environment variables
const config = (0, config_1.loadConfig)();
// Initialize the bot
const bot = new telegraf_1.Telegraf(config.telegramBotToken);
// Lock file to prevent multiple instances
const lockFile = path_1.default.join(__dirname, 'bot.lock');
if (fs_1.default.existsSync(lockFile)) {
    (0, logger_1.logError)('Another instance of the bot is already running.', 'bot');
    process.exit(1);
}
fs_1.default.writeFileSync(lockFile, process.pid.toString());
process.on('exit', () => {
    fs_1.default.unlinkSync(lockFile);
});
// Set up the bot
const setupBot = (bot) => {
    // Set up middlewares
    (0, middlewares_1.setupMiddlewares)(bot);
    // Set up commands
    (0, commands_1.setupCommands)(bot);
    // Set up menus
    (0, mainMenu_1.setupMainMenu)(bot);
    // Error handling
    bot.catch((error) => {
        (0, logger_1.logError)(error, 'bot error');
    });
    // Start the bot
    bot.launch();
    (0, logger_1.logInfo)('Bot is running...', 'bot');
    // Graceful shutdown
    process.once('SIGINT', () => {
        (0, logger_1.logInfo)('Bot is shutting down (SIGINT)...', 'bot');
        bot.stop('SIGINT');
        process.exit(0);
    });
    process.once('SIGTERM', () => {
        (0, logger_1.logInfo)('Bot is shutting down (SIGTERM)...', 'bot');
        bot.stop('SIGTERM');
        process.exit(0);
    });
};
exports.setupBot = setupBot;
