import { Response } from "express";

export function wakeHandler(_, res: Response) {
  res.redirect("shortcuts://run-shortcut?name=Wake");
}
