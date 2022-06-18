import { Response } from "express";

export function wakeIpadHandler(_, res: Response) {
  res.redirect("shortcuts://run-shortcut?name=Wake_Ipad");
}
