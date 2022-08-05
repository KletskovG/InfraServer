import TelegrafContext from "telegraf/typings/context";
import { getMIRCurrencyCourse } from "scrapper/MIR";
import { getCurrentDate } from "utils/getCurrentDate";
import { getCurrencyValue } from "lib";
import { CBR_COURSE_URL } from "const";
import got from "got";

export async function mir(ctx: TelegrafContext) {
  const requestDate = getCurrentDate();

  Promise.all([
    got(`${CBR_COURSE_URL}${requestDate}`),
    getMIRCurrencyCourse(),
  ])
    .then(values => {
      const CB = getCurrencyValue(values[0].body, "TRY");
      return [CB, values[1]];
    })
    .then(rates => {
      const notification = `
        MIR RATE
        ${rates[1]}

        CB RATE
        ${parseInt(rates[0], 10) / 10}
      `;

      ctx.reply(notification);
    })
    .catch(err => {
      ctx.reply(`MIR RATE ERROR: ${err}`);
    });
}
