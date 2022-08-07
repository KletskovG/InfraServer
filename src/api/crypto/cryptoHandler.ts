import { Request, Response } from "express";
import { scrapeCrypto } from "scrapper/crypto";

export async function cryptoHandler(_: Request, res: Response) {
  try {
    await scrapeCrypto();
    res.send("Command completed").sendStatus(200);
  } catch (error) {
    res.send(error).status(500);
  }
}
