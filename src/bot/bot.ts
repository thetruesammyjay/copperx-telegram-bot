import { Telegraf, Context } from 'telegraf';
import { Update } from 'telegraf/types';
import { setupCommands } from './commands';
import { setupMainMenu } from './menus/mainMenu';
import { setupMiddlewares } from './middlewares';
import { loadConfig } from '../config';
import { SessionData } from '../types/session';
import { logInfo, logError } from '../utils/logger';

// Load environment variables
const config = loadConfig();

// Initialize the bot
const bot = new Telegraf<Context<Update>>(config.telegramBotToken);

// Extend the Context type to include session
declare module 'telegraf' {
  interface Context {
    session: SessionData;
  }
}

// Set up the bot
export const setupBot = (bot: Telegraf<Context<Update>>) => {
  // Set up middlewares
  setupMiddlewares(bot);

  // Set up commands
  setupCommands(bot);

  // Set up menus
  setupMainMenu(bot);

  // Error handling
  bot.catch((error) => {
    logError(error, 'bot error');
  });

  // Start the bot
  bot.launch();
  logInfo('Bot is running...', 'bot');

  // Graceful shutdown
  process.once('SIGINT', () => {
    logInfo('Bot is shutting down (SIGINT)...', 'bot');
    bot.stop('SIGINT');
    process.exit(0);
  });
  process.once('SIGTERM', () => {
    logInfo('Bot is shutting down (SIGTERM)...', 'bot');
    bot.stop('SIGTERM');
    process.exit(0);
  });
};