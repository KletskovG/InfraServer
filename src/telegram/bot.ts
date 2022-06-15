import { Telegraf } from "telegraf";
import { getEnvVariable } from "utils/getEnvVariable";
import { scrapeProjectInfo } from "academy";
import { toggleTagMode } from "./airtagLocation";
import { ExtraEditMessage } from "telegraf/typings/telegram-types";
import { EBotCommands } from "types";
import { TelegrafContext } from "telegraf/typings/context";

const BOT_TOKEN = getEnvVariable("BOT_TOKEN");
const ACADEMY_CHAT = getEnvVariable("ACADEMY_CHAT");
const ACADEMY_SECOND = getEnvVariable("ACADEMY_SECOND");
const CHAT_NUMBER = getEnvVariable("CHAT_NUMBER");

const bot = new Telegraf(BOT_TOKEN);
bot.launch();

export function registerCommandHanlder(
  command: EBotCommands, handler: (ctx: TelegrafContext) => void
) {
  bot.hears(command, handler);
}

registerCommandHanlder("chatid", (ctx) => ctx.reply(`Chat ID ${ctx.chat.id}`));
registerCommandHanlder("academy", async (ctx) => {
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
registerCommandHanlder("tag", toggleTagMode);
registerCommandHanlder("wake", (ctx) => {
  ctx.reply("Run wake shortcut \n https://telegram.kletskovg.tech/shortcut/wake");
});

export function sendAcademyNotification(message: string) {
  bot.telegram.sendMessage(ACADEMY_CHAT, message);
  bot.telegram.sendMessage(ACADEMY_SECOND, message);
}

export function sendNotification(message: string) {
  const messageSettings: ExtraEditMessage = {
    parse_mode: "Markdown",
    disable_web_page_preview: true,
  };

  bot.telegram.sendMessage(CHAT_NUMBER, message, messageSettings);
}

export default bot;
