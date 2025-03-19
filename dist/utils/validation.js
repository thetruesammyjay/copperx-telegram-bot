"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAmount = exports.validateWalletAddress = exports.validateEmail = void 0;
// Validate email format
const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
exports.validateEmail = validateEmail;
// Validate wallet address format (basic example for Ethereum)
const validateWalletAddress = (address) => {
    const regex = /^0x[a-fA-F0-9]{40}$/;
    return regex.test(address);
};
exports.validateWalletAddress = validateWalletAddress;
// Validate amount (must be a positive number)
const validateAmount = (amount) => {
    const parsedAmount = parseFloat(amount);
    return !isNaN(parsedAmount) && parsedAmount > 0;
};
exports.validateAmount = validateAmount;
