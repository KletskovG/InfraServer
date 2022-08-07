import TelegrafContext from "telegraf/typings/context";
import { orderProject } from "scrapper/academy/orderProject";
import { openedCoursesNames } from "types";

export function order(name: openedCoursesNames) {
  return (ctx: TelegrafContext) => {
    orderProject(name)
      .then(result => {
        ctx.reply(`Project order result: \n ${result}`);
      })
      .catch(errorMessage => {
        ctx.reply(errorMessage);
      });
  };
}

