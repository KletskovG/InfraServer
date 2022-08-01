import { scrapeProjectInfo } from "scrapper/academy";
import { Request, Response } from "express";
import { sendAcademyNotification } from "telegram/bot";
import {getImgSrc} from "utils/getImgSrc";

type AcademyRequest = Request<unknown, unknown, unknown, {collectHomework?: boolean}>;

export function academyHandler(req: AcademyRequest, res: Response) {
  const {
    collectHomework = false
  } = req.query;

  try {
    scrapeProjectInfo(collectHomework)
      .then(result => {
        if (result) {
          sendAcademyNotification(result);
          res.status(200).send(result);
        } else {
          res.status(200).end();
        }
      })
      .catch(() => {
        const src = getImgSrc("auth-error.png");
        res.status(500).send(src);
        sendAcademyNotification("ERROR WHILE SCRAPE");
        console.error("ERROR WHILE SCRAPE");
        console.error(src);
      });
  } catch (error) {
    sendAcademyNotification(error);
    res.status(500).send(error);
  }
}
