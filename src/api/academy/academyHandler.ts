import { scrapeProjectInfo } from "academy";
import { Response } from "express";
import { sendNotification } from "telegram/bot";

export function academyHandler(_, res: Response) {
  try {
    scrapeProjectInfo()
      .then(result => {
        if (result) {
          const notification = `I HAVE PROJECTS TO CHECK \n ${result}`;
          sendNotification(notification);
          res.status(200).send(notification);
        } else {
          res.status(200).end();
        }
      });
  } catch (error) {
    sendNotification(error);
    res.status(500).send(error);
  }
}