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

registerCommandHanlder("/chatid", chatid);
registerCommandHanlder("/academy", academy());
registerCommandHanlder("/homeworks", homeworks);
registerCommandHanlder("/tag", tag);
registerCommandHanlder("/mir", mir);

academyScrapeConfig.forEach(course => {
  registerCommandHanlder(course.additional.order, order(course.name));
});



// TODO: refactor
export function sendAcademyNotification(message: string) {
  bot.telegram.sendMessage(ACADEMY_CHAT, message);
  bot.telegram.sendMessage(ACADEMY_SECOND, message);
}

export function sendNotification(message: string) {
  bot.telegram.sendMessage(CHAT_NUMBER, message);
}

export default bot;
