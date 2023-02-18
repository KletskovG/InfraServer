/* eslint-disable @typescript-eslint/ban-ts-comment */
import TelegrafContext from "telegraf/typings/context";
import { Balance } from "db/models/balance";
import {log} from "logger/logger";

export async function topupUpdate(ctx: TelegrafContext) {
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

  const currentBalance = await Balance.findOne();

  if (!currentBalance) {
    ctx.reply("Cant find balance in DB");
    return;
  }

  const topup = Number(text.slice(dividerIndex + 1));
  const newTopup = currentBalance.topups + topup;

  Balance.updateOne({_id: currentBalance._id}, {topups: newTopup})
    .then(result => {
      log("Info", `UPDATE TOPUPS: ${JSON.stringify(result)}`);
    })
    .catch(err => {
      log("Error", `UPDATE TOPUPS: ${JSON.stringify(err.message)}`);
    });
  ctx.reply(`Should update topup: ${newTopup}`);
}
