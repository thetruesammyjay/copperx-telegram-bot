import { Context } from 'telegraf';
import { requestOTP, authenticateOTP } from '../../services/copperx';
import { SessionData } from '../../types/session';
import { logError, logInfo } from '../../utils/logger';

// Extend the Context type to include session
declare module 'telegraf' {
  interface Context {
    session: SessionData;
  }
}

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate OTP format (6 digits)
const isValidOTP = (otp: string): boolean => {
  const otpRegex = /^\d{6}$/;
  return otpRegex.test(otp);
};

// Command: /login <email>
export const loginCommand = async (ctx: Context) => {
  // Ensure the message is a text message
  if (!('text' in ctx.message!)) {
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

    await requestOTP(email);
    ctx.session.email = email; // Store email in session
    logInfo(`OTP sent to ${email}`, 'authentication');
    ctx.reply(`OTP sent to ${email}. Please check your email and use /auth <otp> to authenticate.`);
  } catch (error) {
    logError(error, 'sending OTP');
    ctx.reply('Failed to send OTP. Please try again later.');
  }
};

// Command: /auth <otp>
export const authCommand = async (ctx: Context) => {
  // Ensure the message is a text message
  if (!('text' in ctx.message!)) {
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
  if (!ctx.session?.email) {
    return ctx.reply('Please start the login process with /login <email> first.');
  }

  try {
    const token = await authenticateOTP(ctx.session.email, otp);
    ctx.session.token = token; // Store token in session
    logInfo(`User authenticated successfully: ${ctx.session.email}`, 'authentication');
    ctx.reply('Authentication successful! You can now use other commands.');
  } catch (error) {
    logError(error, 'authentication');
    ctx.reply('Invalid OTP or authentication failed. Please try again.');
  }
};

// Command: /logout
export const logoutCommand = async (ctx: Context) => {
  // Clear session data
  ctx.session = { email: undefined, token: undefined };
  logInfo('User logged out successfully.', 'authentication');
  ctx.reply('Logged out successfully.');
};