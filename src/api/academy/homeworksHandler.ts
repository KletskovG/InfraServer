import { scrapeHomeworks } from "scrapper/academy";
import { Response } from "express";
import { sendNotification } from "telegram/bot";
import {getImgSrc} from "utils/getImgSrc";

export function homeworksHandler(_, res: Response) {

  try {
    scrapeHomeworks()
      .then(result => {
        if (result) {
          sendNotification(result);
          res.status(200).send(result);
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
