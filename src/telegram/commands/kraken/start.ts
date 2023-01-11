import TelegrafContext from "telegraf/typings/context";
import { startMainLoop } from "kraken/core/mainLoop";

export function start(_: TelegrafContext) {
  startMainLoop();
}
