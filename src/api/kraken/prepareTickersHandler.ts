import { Response } from "express";
import { prepareTickersData } from "kraken/core/prepareTickersData";
import { HIKE_TIME_FRAME } from "const/kraken/core";
import { log } from "logger/logger";

let currentStreak = 8;

export function prepareTickersHandler(_: unknown, res: Response) {
  if (currentStreak === HIKE_TIME_FRAME) {
    res.send("SCAN");
    log("Important", "Init hike scan");
    currentStreak -= 3;
    prepareTickersData(true);
    return;
  }

  res.send("PREPARE");
  prepareTickersData(false);
  currentStreak += 1;
  log("Info", `Prepare hike data, streak: ${currentStreak}`);
}
