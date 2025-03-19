import { Telegraf, Markup } from 'telegraf';

// Send menu with inline buttons
export const sendMenu = Markup.inlineKeyboard([
  Markup.button.callback('Send to Email', 'send_email'),
  Markup.button.callback('Send to Wallet', 'send_wallet'),
]);

// Setup send menu
export const setupSendMenu = (bot: Telegraf) => {
  bot.hears('📤 Send', (ctx) => {
    ctx.reply('Choose recipient type:', sendMenu);
  });

  bot.action('send_email', (ctx) => {
    ctx.reply('Please use the command: /send email <email> <amount>');
  });

  bot.action('send_wallet', (ctx) => {
    ctx.reply('Please use the command: /send wallet <address> <amount>');
  });
};