import { Response } from "express";
import { IRequest } from "types/api";
import  { sendNotification } from "telegram/bot";

type DoneMessageParams = {
  text: string;
}

export function xmrSyncHandler(req: IRequest<DoneMessageParams>, res: Response) {
  const {
    name = "Name not set",
    status = "Status unknown",
    container = "Container uknown"
  } = req.query;
  const message = `XMR SYNC \n Node ${name} \n Container ${container}  \n Status: ${decodeURI(status)} `;
  sendNotification(message);
  res.status(200).send("OK");
}
