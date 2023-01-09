import { orderBotCommand, openedCoursesNames } from "types/academy/IAcademyConfig";

export type EBotCommands =
  "/chatid" |
  "/academy" |
  "/homeworks" |
  "/tag" |
  "/mir" |
  "/kraken_stop" |
  `${orderBotCommand}_${openedCoursesNames}`
