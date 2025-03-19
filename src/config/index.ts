import * as dotenv from 'dotenv';
import { DEFAULT_PUSHER_CLUSTER, DEFAULT_PUSHER_KEY, DEFAULT_COPPERX_API_BASE_URL } from './constants';

// Load environment variables from .env file
dotenv.config();

// Define the configuration interface
export interface Config {
  telegramBotToken: string;
  pusherKey: string;
  pusherCluster: string;
  copperxApiBaseUrl: string;
}

// Load configuration from environment variables
export const loadConfig = (): Config => {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!telegramBotToken) {
    throw new Error('TELEGRAM_BOT_TOKEN is not defined in the environment variables.');
  }

  return {
    telegramBotToken,
    pusherKey: process.env.PUSHER_KEY || DEFAULT_PUSHER_KEY,
    pusherCluster: process.env.PUSHER_CLUSTER || DEFAULT_PUSHER_CLUSTER,
    copperxApiBaseUrl: process.env.COPPERX_API_BASE_URL || DEFAULT_COPPERX_API_BASE_URL,
  };
};

// Export the configuration object
export const config = loadConfig();