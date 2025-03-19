import { Context } from 'telegraf';
import { getWalletBalances } from '../../services/copperx';
import { SessionData } from '../../types/session';
import { logError, logInfo } from '../../utils/logger';

// Extend the Context type to include session
declare module 'telegraf' {
  interface Context {
    session: SessionData;
  }
}

// Command: /balance
export const balanceCommand = async (ctx: Context) => {
  const token = ctx.session.token;
  if (!token) {
    return ctx.reply('Please log in first using /login.');
  }

  try {
    const balances = await getWalletBalances(token);

    // Format balances for a user-friendly response
    const formattedBalances = balances
      .map((balance: any) => `${balance.currency}: ${balance.amount}`)
      .join('\n');

    logInfo(`Fetched balances for user: ${ctx.session.email}`, 'wallet');
    ctx.reply(`Your wallet balances:\n${formattedBalances}`);
  } catch (error) {
    logError(error, 'fetching balances');
    ctx.reply('Failed to fetch balances. Please try again later.');
  }
};