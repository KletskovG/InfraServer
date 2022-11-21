import TelegrafContext from "telegraf/typings/context";
import { scrapeStoreAvailability } from "scrapper/ecom";

export function academy() {
  return async (ctx: TelegrafContext) => {
    try {
      scrapeStoreAvailability()
        .then(result => {
          if (!result) {
            ctx.reply("Empty search result");
            return;
          }

          const antalyaStores = result.filter(el => {
            return el.includes("ANTALYA");
          })
            .map(el => el.replace(/\n/g, "").trim())
            .map(el => {
              const nameOfStoreIndex = el.indexOf("  ");
              const amountTemp = el.slice(0, -22);
              const amountIndex = amountTemp.lastIndexOf("  ");
              const amount = amountTemp.slice(amountIndex);

              return `
              STORE: \n ${el.slice(0, nameOfStoreIndex)} \n Amount: \n ${amount}
            `;
            });

          const message = `
            Link: https://ux.mediamarkt.com.tr/stok-takip/index.html?id=1218695

            ${antalyaStores.join()}
          `;

          ctx.reply(message);
        })
        .catch((err) => {
          console.error(err);
          ctx.reply("ERROR WHILE SCRAPE");
        });
    } catch (error) {
      ctx.reply(error);
    }
  };
}
