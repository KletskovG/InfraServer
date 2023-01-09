import { Telegraf } from "telegraf";
import { getEnvVariable } from "utils/getEnvVariable";
import {
  EBotCommands,
  academyScrapeConfig,
} from "types";
import TelegrafContext from "telegraf/typings/context";
import {
  chatid,
  mir,
  tag,
  academy,
  homeworks,
  order,
} from "telegram/commands";

const BOT_TOKEN = getEnvVariable("BOT_TOKEN") || "";
const CHAT_NUMBER = getEnvVariable("CHAT_NUMBER") || 1;

const bot = new Telegraf(BOT_TOKEN);
bot.launch();

export function registerCommandHanlder(
  command: EBotCommands, handler: (ctx: TelegrafContext) => void
) {
  bot.hears(command, handler);
}

registerCommandHanlder("/chatid", chatid);
registerCommandHanlder("/academy", academy());
registerCommandHanlder("/homeworks", homeworks);
registerCommandHanlder("/tag", tag);
registerCommandHanlder("/mir", mir);

academyScrapeConfig.forEach(course => {
  registerCommandHanlder(course.additional.order, order(course.name));
});


export function sendNotification(message: string, chaitId = CHAT_NUMBER) {
  bot.telegram.sendMessage(chaitId, message);
}

export default bot;
