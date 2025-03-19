"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSendMenu = exports.sendMenu = void 0;
const telegraf_1 = require("telegraf");
// Send menu with inline buttons
exports.sendMenu = telegraf_1.Markup.inlineKeyboard([
    telegraf_1.Markup.button.callback('Send to Email', 'send_email'),
    telegraf_1.Markup.button.callback('Send to Wallet', 'send_wallet'),
]);
// Setup send menu
const setupSendMenu = (bot) => {
    bot.hears('📤 Send', (ctx) => {
        ctx.reply('Choose recipient type:', exports.sendMenu);
    });
    bot.action('send_email', (ctx) => {
        ctx.reply('Please use the command: /send email <email> <amount>');
    });
    bot.action('send_wallet', (ctx) => {
        ctx.reply('Please use the command: /send wallet <address> <amount>');
    });
};
exports.setupSendMenu = setupSendMenu;
