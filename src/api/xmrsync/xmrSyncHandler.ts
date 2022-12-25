import { Response } from "express";
import  { sendNotification } from "telegram/bot";

type XmrSyncParams = {
  body: {
    name: string;
    status: string;
  }
}

export function xmrSyncHandler(req: XmrSyncParams, res: Response) {
  const message = `XMR SYNC \n Node_${req.body.name} \n Status_${req.body.status}`;
  sendNotification(message);
  res.status(200).send("OK");
}
