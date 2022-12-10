import { Response } from "express";
import { orderProject } from "scrapper/academy";
import { getEnvVariable } from "utils/getEnvVariable";
import { sendNotification } from "telegram/bot";
import {IRequest, openedCoursesNames} from "types";

type OrderProjectRequest = IRequest<
  {course: openedCoursesNames}
>;
export function orderProjectHandler(req: OrderProjectRequest, res: Response) {
  const { course } = req.params;
  const academyChatId = getEnvVariable("ACADEMY_CHAT");
  try {
    orderProject(course)
      .then(result => {
        res.status(200).send(result);
        sendNotification(`Project order result: \n ${result}`, academyChatId);
      })
      .catch((errorMessage) => {
        res.status(404).send(errorMessage);
        sendNotification(errorMessage, academyChatId);
        console.error(errorMessage);
      });
  } catch (error) {
    res.status(500).send(error);
    sendNotification("ORDER PROJECT UNKNOWN ERROR", academyChatId);
    console.error(error);
  }
}
