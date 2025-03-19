"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestMiddleware = exports.authMiddleware = void 0;
const logger_1 = require("../../utils/logger");
// Middleware to check if user is authenticated
const authMiddleware = (ctx, next) => {
    if (!ctx.session.token) {
        (0, logger_1.logInfo)('Unauthorized access attempt.', 'authMiddleware');
        return ctx.reply('Please log in first using /login.');
    }
    return next();
};
exports.authMiddleware = authMiddleware;
// Middleware to check if user is not authenticated
const guestMiddleware = (ctx, next) => {
    if (ctx.session.token) {
        (0, logger_1.logInfo)('User already logged in.', 'guestMiddleware');
        return ctx.reply('You are already logged in.');
    }
    return next();
};
exports.guestMiddleware = guestMiddleware;
