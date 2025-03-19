"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceCommand = void 0;
const copperx_1 = require("../../services/copperx");
const logger_1 = require("../../utils/logger");
// Command: /balance
const balanceCommand = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const token = ctx.session.token;
    if (!token) {
        return ctx.reply('Please log in first using /login.');
    }
    try {
        const balances = yield (0, copperx_1.getWalletBalances)(token);
        // Format balances for a user-friendly response
        const formattedBalances = balances
            .map((balance) => `${balance.currency}: ${balance.amount}`)
            .join('\n');
        (0, logger_1.logInfo)(`Fetched balances for user: ${ctx.session.email}`, 'wallet');
        ctx.reply(`Your wallet balances:\n${formattedBalances}`);
    }
    catch (error) {
        (0, logger_1.logError)(error, 'fetching balances');
        ctx.reply('Failed to fetch balances. Please try again later.');
    }
});
exports.balanceCommand = balanceCommand;
