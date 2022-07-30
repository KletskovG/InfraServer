import { Request, Response } from "express";
import { getMIRCurrencyCourse } from "scrapper/MIR";
import { sendNotification } from "telegram";

export async function getMIRCurrencyHandler(_: Request, res: Response) {
  try {
    const result = await getMIRCurrencyCourse();
    if (!result) {
      res.sendStatus(404);
      sendNotification("MIR TRY COURSE WAS NOT FOUND");
    }

    const notification = `MIR COURSE: \n ${result}`;
    res.send(notification).status(200);
    sendNotification(notification);
  } catch (error) {
    res.sendStatus(500);
    sendNotification("ERROR WHILE GETTING MIR COURSE");
    sendNotification(`${error}`);
  }
}
