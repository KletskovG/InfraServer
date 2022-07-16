import { Request, Response } from "express";
import { orderProject } from "academy";
import { sendAcademyNotification } from "telegram/bot";

export function orderProjectHandler(req: Request, res: Response) {
  const { course } = req.params;
  try {
    orderProject(course)
      .then(result => {
        res.status(200).send(result);
        sendAcademyNotification(`Project order result: \n ${result}`);
      })
      .catch((errorMessage) => {
        res.status(404).send(errorMessage);
        sendAcademyNotification(errorMessage);
        console.error(errorMessage);
      });
  } catch (error) {
    res.status(500).send(error);
    sendAcademyNotification("ORDER PROJECT UNKNOWN ERROR");
    console.error(error);
  }
}
