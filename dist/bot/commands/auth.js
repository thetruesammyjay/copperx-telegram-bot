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
exports.logoutCommand = exports.authCommand = exports.loginCommand = void 0;
const copperx_1 = require("../../services/copperx");
const logger_1 = require("../../utils/logger");
// Validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
// Validate OTP format (6 digits)
const isValidOTP = (otp) => {
    const otpRegex = /^\d{6}$/;
    return otpRegex.test(otp);
};
// Command: /login <email>
const loginCommand = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure the message is a text message
    if (!('text' in ctx.message)) {
        return ctx.reply('Please send a text message.');
    }
    const email = ctx.message.text.split(' ')[1]; // Extract email from command
    if (!email) {
        return ctx.reply('Please provide your email. Usage: /login <email>');
    }
    // Validate email format
    if (!isValidEmail(email)) {
        return ctx.reply('Invalid email format. Please provide a valid email address.');
    }
    try {
        // Initialize session if it doesn't exist
        if (!ctx.session) {
            ctx.session = { email: undefined, token: undefined };
        }
        yield (0, copperx_1.requestOTP)(email);
        ctx.session.email = email; // Store email in session
        (0, logger_1.logInfo)(`OTP sent to ${email}`, 'authentication');
        ctx.reply(`OTP sent to ${email}. Please check your email and use /auth <otp> to authenticate.`);
    }
    catch (error) {
        (0, logger_1.logError)(error, 'sending OTP');
        ctx.reply('Failed to send OTP. Please try again later.');
    }
});
exports.loginCommand = loginCommand;
// Command: /auth <otp>
const authCommand = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Ensure the message is a text message
    if (!('text' in ctx.message)) {
        return ctx.reply('Please send a text message.');
    }
    const otp = ctx.message.text.split(' ')[1]; // Extract OTP from command
    if (!otp) {
        return ctx.reply('Please provide the OTP. Usage: /auth <otp>');
    }
    // Validate OTP format
    if (!isValidOTP(otp)) {
        return ctx.reply('Invalid OTP format. Please provide a 6-digit OTP.');
    }
    // Ensure session exists and email is stored
    if (!((_a = ctx.session) === null || _a === void 0 ? void 0 : _a.email)) {
        return ctx.reply('Please start the login process with /login <email> first.');
    }
    try {
        const token = yield (0, copperx_1.authenticateOTP)(ctx.session.email, otp);
        ctx.session.token = token; // Store token in session
        (0, logger_1.logInfo)(`User authenticated successfully: ${ctx.session.email}`, 'authentication');
        ctx.reply('Authentication successful! You can now use other commands.');
    }
    catch (error) {
        (0, logger_1.logError)(error, 'authentication');
        ctx.reply('Invalid OTP or authentication failed. Please try again.');
    }
});
exports.authCommand = authCommand;
// Command: /logout
const logoutCommand = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    // Clear session data
    ctx.session = { email: undefined, token: undefined };
    (0, logger_1.logInfo)('User logged out successfully.', 'authentication');
    ctx.reply('Logged out successfully.');
});
exports.logoutCommand = logoutCommand;
