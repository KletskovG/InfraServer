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
  try {
    const message = `XMR SYNC \n Node ${name} \n Container ${container}  \n Status: ${status} `;
    sendNotification(message);
  } catch (error) {
    sendNotification(`ERROR: \n Node ${name} \n Contaienr ${container} \n Error while decoding log \n ${status}`);
  }
  res.status(200).send("OK");
}
