import TelegrafContext from "telegraf/typings/context";
import { scrapeHomeworks } from "scrapper/academy/scrapeHomeworks";
export function homeworks(ctx: TelegrafContext) {
  try {
    scrapeHomeworks()
      .then(result => {
        const notification = result ? `${result}` : "Empty Result";
        ctx.reply(notification);
      })
      .catch((err) => {
        console.error(err);
        ctx.reply("ERROR WHILE SCRAPE");
      });
  } catch (error) {
    ctx.reply(error);
  }
}
