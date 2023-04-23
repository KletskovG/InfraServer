import { Response } from "express";

export function homeworksHandler(_: unknown, res: Response) {
  res.status(200).send();
}
