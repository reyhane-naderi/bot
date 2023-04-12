const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const answers = require('./answers.json');

// تعریف توکن بات
const token = '6086911614:AAG1AO_k5cIVVceEigoMjeFXg6nEUDXK5o8';

// ایجاد شیء بات با استفاده از توکن
const bot = new TelegramBot(token, { polling: true });

// تابعی برای پیدا کردن پاسخ مربوط به سوال در فایل JSON
function getAnswer(question) {
  const answer = answers.answers.find((item) => item.question === question);
  if (answer) {
    return answer.answer;
  }
  return 'متاسفانه به سوال شما پاسخی ندارم.';
}

// بررسی و پاسخ به هر پیامی که کاربر ارسال می‌کند
bot.onText(/(.+)/, (msg, match) => {
  const question = match[1];
  const chatId = msg.chat.id;
  const answer = getAnswer(question);
  bot.sendMessage(chatId, answer);
});
bot.setWebHook(`https://8f97-139-60-20-2.ngrok.io/telegram${token}`);
