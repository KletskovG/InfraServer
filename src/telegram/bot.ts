import { Telegraf } from "telegraf";
import { getEnvVariable } from "utils/getEnvVariable";

const BOT_TOKEN = getEnvVariable("BOT_TOKEN");
const CHAT_NUMBER = getEnvVariable("CHAT_NUMBER");

const bot = new Telegraf(BOT_TOKEN);
bot.launch();

bot.on("message", (ctx) => {
  ctx.reply(`Your Chat ID ${ctx.chat.id}`);
});

export function sendNotification(message: string) {
  bot.telegram.sendMessage(CHAT_NUMBER, message);
}

export default bot;
