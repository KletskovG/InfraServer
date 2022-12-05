import got from "got/dist/source";
import TelegrafContext from "telegraf/typings/context";

export function deploy(ctx: TelegrafContext) {
  got("http://139.59.151.135:8091/update")
    .then((res) => ctx.reply(res.body));
}
