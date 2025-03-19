import { MiddlewareFn } from 'telegraf';
import { Context } from 'telegraf';
import { SessionData } from '../../types/session';
import { logInfo, logError } from '../../utils/logger';

// Extend the Context type to include session
declare module 'telegraf' {
  interface Context {
    session: SessionData;
  }
}

// Middleware to check if user is authenticated
export const authMiddleware: MiddlewareFn<Context> = (ctx, next) => {
  if (!ctx.session.token) {
    logInfo('Unauthorized access attempt.', 'authMiddleware');
    return ctx.reply('Please log in first using /login.');
  }
  return next();
};

// Middleware to check if user is not authenticated
export const guestMiddleware: MiddlewareFn<Context> = (ctx, next) => {
  if (ctx.session.token) {
    logInfo('User already logged in.', 'guestMiddleware');
    return ctx.reply('You are already logged in.');
  }
  return next();
};