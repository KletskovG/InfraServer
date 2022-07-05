import { Response } from "express";

export function cashHandler(_, res: Response) {
  res.redirect("shortcuts://run-shortcut?name=Cash");
}
