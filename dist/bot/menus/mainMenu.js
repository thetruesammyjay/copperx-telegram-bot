"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMainMenu = exports.mainMenu = void 0;
const telegraf_1 = require("telegraf");
// Main menu with buttons
exports.mainMenu = telegraf_1.Markup.keyboard([
    ['💰 Balance', '📤 Send'],
    ['📥 Withdraw', '🆘 Help'],
]).resize();
// Setup main menu
const setupMainMenu = (bot) => {
    bot.command('start', (ctx) => {
        ctx.reply('Welcome to Copperx Payout Bot!', exports.mainMenu);
    });
    bot.hears('💰 Balance', (ctx) => ctx.reply('Use /balance to check your wallet balances.'));
    bot.hears('📤 Send', (ctx) => ctx.reply('Use /send to transfer funds.'));
    bot.hears('📥 Withdraw', (ctx) => ctx.reply('Use /withdraw to withdraw funds.'));
    bot.hears('🆘 Help', (ctx) => ctx.reply('Use /help for a list of commands.'));
};
exports.setupMainMenu = setupMainMenu;
