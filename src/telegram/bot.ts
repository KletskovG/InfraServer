import { Telegraf } from "telegraf";
import { getEnvVariable } from "utils/getEnvVariable";
import { scrapeProjectInfo } from "academy";

const BOT_TOKEN = getEnvVariable("BOT_TOKEN");
const CHAT_NUMBER = getEnvVariable("ACADEMY_CHAT");

const bot = new Telegraf(BOT_TOKEN);
bot.launch();

bot.on("message", (ctx) => {
  ctx.reply(`Your Chat ID ${ctx.chat.id}`);
});

bot.command("academy", async (ctx) => {
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

export function sendNotification(message: string) {
  bot.telegram.sendMessage(CHAT_NUMBER, message);
}

export default bot;
