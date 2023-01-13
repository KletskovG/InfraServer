import TelegrafContext from "telegraf/typings/context";
import { getMessageWithText } from "telegram/lib/getMessageWithText";
// import { IDealModel } from "types/kraken/ILastDealModel";
// import { addDeal } from "kraken/core/orders/addDeal";


export async function addDeal(ctx: TelegrafContext) {
  const { text } = getMessageWithText(ctx).message;
  return text;
}

// function extractMessageArgs(text: string): IDealModel {
//   let deal: IDealModel = {};

//   // const orderIdRegExp = /orderid/;
//   // const buyRegExp = /buy/;
//   // const sellRegExp = /sell/;
//   // const tickerRegExp = /ticker/;
//   // const defenseRegExp = /defense/;

//   const argsMap: Record<keyof IDealModel, string> = {
//     orderId: "orderid",
//     buyPrice: "buy",
//     sellPrice: "sell",
//     ticker: "ticker",
//     defenseThershold: "defense",
//   };

//   Object.entries(argsMap).forEach(([key, value]) => {
//     const startRegResult = text.match("<" + value);
//     const endRegRestul = text.match(value + ">");
//     if (!startRegResult || !endRegRestul) {
//       deal[key]
//     }
//   });
// }


