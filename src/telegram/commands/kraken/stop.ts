import TelegrafContext from "telegraf/typings/context";
import { stopMainLoop } from "kraken/core/mainLoop";

export function stop(_: TelegrafContext) {
  stopMainLoop();
}
