/* eslint-disable @typescript-eslint/ban-ts-comment */
import TelegrafContext from "telegraf/typings/context";
import { Balance } from "kraken/db/models/balance";
import {log} from "logger/logger";

export async function topupSet(ctx: TelegrafContext) {
  //@ts-ignore // Telegraf typings dont have text field
  const text: string = ctx.message.text ?? "";
  if (!text) {
    return;
  }

  const dividerIndex = text.indexOf(" ");

  if (dividerIndex === -1) {
    ctx.reply("Cant find space divider");
    return;
  }

  const currentBalance = await Balance.findOne({});

  if (!currentBalance) {
    ctx.reply("Cant find balance in DB");
    return;
  }

  const topup = Number(text.slice(dividerIndex + 1));

  Balance.updateOne({_id: currentBalance._id}, {topups: topup})
    .then(result => {
      log("Info", `SET TOPUPS: ${JSON.stringify(result)}`);
    })
    .catch(err => {
      log("Error", `SET TOPUPS: ${JSON.stringify(err.message)}`);
    });
  ctx.reply(`Should set topup: ${topup}`);
}
