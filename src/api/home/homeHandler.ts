import { Response } from "express";

export function homeHandler(_, res: Response) {
  res.status(200).send("Infra server is up!");
}