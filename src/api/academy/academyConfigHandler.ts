import { Request, Response } from "express";
import { AcademyConfigModel } from "db/models/academyScrape";
import { getEnvVariable } from "utils/getEnvVariable";
import { ICourseModel } from "types/academy/IAcademyConfig";
import { log } from "logger/logger";

export function getAcademyConfigHandler(_: unknown, res: Response) {
  AcademyConfigModel.find({})
    .then(data => {
      res.status(200).send(JSON.stringify(data));
    })
    .catch(err => {
      res.status(500).send("Error while retrieving data from DB");
      log("Error", err);
    });
}

type SetAcademyConfigRequest = Request<unknown, unknown, ICourseModel[], unknown>;

export function setAcademyConfigHandler(req: SetAcademyConfigRequest, res: Response) {
  const data = req.body;
  console.log("SET REQUEST DATA");
  console.log(data);

  res.status(200).send("OK");

  for (const course of data) {
    // TODO: Check for auto-upsert, or try to find first, and create if empty
    AcademyConfigModel.findOneAndUpdate({name: course.name}, course, { upsert: true })
      // .exec();
      .then(res => {
        console.log("UPDATE RESULT");
        console.log(res);
        log("Important", `Academy config: ${course.name} is updated`);
      })
      .catch(err => {
        log("Error", `Set academy config error ${JSON.stringify(err)}`);
      });
  }
}

type PassRequest = Request<unknown, unknown, unknown, {pass?: string}>;

export function academyConfigPassHandler(req: PassRequest, res: Response) {
  const { pass } = req.query;

  const configPass = getEnvVariable("ACADEMY_CONFIG_PASS");

  if (pass !== configPass) {
    res.status(401).send();
    return;
  }

  res.status(200).send("OK");
}
