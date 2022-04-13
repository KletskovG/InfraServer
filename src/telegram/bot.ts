import { Telegraf } from "telegraf";
import { getEnvVariable } from "utils/getEnvVariable";
import { scrapeProjectInfo } from "academy";
import { ExtraEditMessage } from "telegraf/typings/telegram-types";

const BOT_TOKEN = getEnvVariable("BOT_TOKEN");
const ACADEMY_CHAT = getEnvVariable("ACADEMY_CHAT");
const CHAT_NUMBER = getEnvVariable("CHAT_NUMBER");

const bot = new Telegraf(BOT_TOKEN);
bot.launch();

bot.hears("chatid", (ctx) => ctx.reply(`Chat ID ${ctx.chat.id}`));

bot.hears("academy", async (ctx) => {
  try {
    scrapeProjectInfo()
      .then(result => {
        if (result) {
          const notification = `Scrape result \n ${result}`;
          ctx.reply(notification);
        } else {
          ctx.reply("SMTH WENT WRONG");
        } 
      })
      .catch(() => {
        ctx.reply("ERROR WHILE SCRAPE");
      });
  } catch (error) {
    sendNotification(error);
  }
});

export function sendAcademyNotification(message: string) {
  bot.telegram.sendMessage(ACADEMY_CHAT, message);
}

export function sendNotification(message: string) {
  const messageSettings: ExtraEditMessage = {
    parse_mode: "Markdown",
    disable_web_page_preview: true,
  };
  
  bot.telegram.sendMessage(CHAT_NUMBER, message, messageSettings);
}

export default bot;
