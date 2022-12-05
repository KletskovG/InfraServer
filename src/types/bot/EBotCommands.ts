import { orderBotCommand, openedCoursesNames } from "types/academy/IAcademyConfig";

export type EBotCommands =
  "/chatid" |
  "/academy" |
  "/homeworks" |
  "/tag" |
  "/mir" |
  `${orderBotCommand}_${openedCoursesNames}` |
  "/deploy"
  // "/order_react"
