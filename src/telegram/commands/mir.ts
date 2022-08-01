import TelegrafContext from "telegraf/typings/context";
import { getMIRCurrencyCourse } from "scrapper/MIR";

export async function mir(ctx: TelegrafContext) {
  try {
    getMIRCurrencyCourse()
      .then(result => {
        const notification = result ? `MIR COURSE: \n ${result}` : "MIR TRY COURSE WAS NOT FOUND";
        ctx.reply(notification);
      })
      .catch(err => ctx.reply(err));
  } catch (error) {
    ctx.reply(error);
  }
}
