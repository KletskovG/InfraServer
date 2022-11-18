import TelegrafContext from "telegraf/typings/context";
import { getCurrentDate } from "utils/getCurrentDate";
import { getCurrencyValue } from "lib";
import { CBR_COURSE_URL } from "const";
import got from "got";

export async function mir(ctx: TelegrafContext) {
  const requestDate = getCurrentDate();

  Promise.all([
    got(`${CBR_COURSE_URL}${requestDate}`),
  ])
    .then(values => {
      const CB = getCurrencyValue(values[0].body, "TRY");
      return [CB];
    })
    .then(rates => {
      const notification = `
        CB RATE
        ${parseInt(rates[0], 10) / 10}
      `;

      ctx.reply(notification);
    })
    .catch(err => {
      ctx.reply(`MIR RATE ERROR: ${err}`);
    });
}
