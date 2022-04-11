import { scrapeProjectInfo } from "academy";
import { Response } from "express";
import { sendNotification } from "telegram/bot";
import {getImgSrc} from "utils/getImgSrc";

export function academyHandler(_, res: Response) {
  try {
    scrapeProjectInfo()
      .then(result => {
        if (result) {
          const notification = `Scrape result \n ${result}`;
          sendNotification(notification);
          res.status(200).send(notification);
        } else {
          res.status(200).end();
        }
      })
      .catch(() => {
        const src = getImgSrc("auth-error.png");
        res.status(500).send(src);
        sendNotification("ERROR WHILE SCRAPE");
        console.error("ERROR WHILE SCRAPE");
        console.error(src);
      });
  } catch (error) {
    sendNotification(error);
    res.status(500).send(error);
  }
}