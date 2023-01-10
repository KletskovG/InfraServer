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
  status,
  start,
  stop,
  topupSet,
  topupUpdate,
} from "telegram/commands";

const BOT_TOKEN = getEnvVariable("BOT_TOKEN") || "";
const CHAT_NUMBER = getEnvVariable("CHAT_NUMBER") || 1;

const bot = new Telegraf(BOT_TOKEN);
bot.launch();

export function registerCommandHanlder(
  command: EBotCommands,
  handler: (ctx: TelegrafContext) => void,
  isProtected = false,
) {
  bot.hears(command, (ctx) => {
    if (isProtected && ctx.chat.id !== Number(CHAT_NUMBER)) {
      ctx.reply("PERMISSION DENIED");
      return;
    }

    handler(ctx);
  });
}

registerCommandHanlder("/chatid", chatid);
registerCommandHanlder("/academy", academy());
registerCommandHanlder("/homeworks", homeworks);
registerCommandHanlder("/tag", tag);
registerCommandHanlder("/mir", mir);

registerCommandHanlder("/kraken_stop", stop, true);
registerCommandHanlder("/kraken_start", start, true);
registerCommandHanlder("/kraken_start", status, true);
registerCommandHanlder("/kraken_topup_set", topupSet, true);
registerCommandHanlder("/kraken_topup_update", topupUpdate, true);

academyScrapeConfig.forEach(course => {
  registerCommandHanlder(course.additional.order, order(course.name));
});


export function sendNotification(message: string, chaitId = CHAT_NUMBER) {
  bot.telegram.sendMessage(chaitId, message);
}

export default bot;
