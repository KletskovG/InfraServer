import { scrapeProjectInfo } from "scrapper/academy";
import { Response } from "express";
import { sendNotification } from "telegram/bot";
import {getImgSrc} from "utils/getImgSrc";
import { getEnvVariable } from "utils/getEnvVariable";

export function academyHandler(_: unknown, res: Response) {
  const academyChatId = getEnvVariable("ACADEMY_CHAT");
  try {
    scrapeProjectInfo()
      .then(result => {
        if (result) {
          sendNotification(result, academyChatId);
          res.status(200).send(result);
        } else {
          res.status(200).end();
        }
      })
      .catch(() => {
        const src = getImgSrc("auth-error.png");
        res.status(500).send(src);
        sendNotification("ERROR WHILE SCRAPE", academyChatId);
        console.error("ERROR WHILE SCRAPE");
        console.error(src);
      });
  } catch (error) {
    sendNotification(error, academyChatId);
    res.status(500).send(error);
  }
}
