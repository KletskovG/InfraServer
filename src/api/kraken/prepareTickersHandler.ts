import { Response } from "express";
import { prepareTickersData } from "kraken/core/prepareTickersData";
import { scanHikeTickers } from "kraken/core/scanHikeTickers";
import { HIKE_TIME_FRAME } from "const/kraken/core";

let currentStreak = 8;

export function prepareTickersHandler(_: unknown, res: Response) {
  if (currentStreak === HIKE_TIME_FRAME) {
    res.send("SCAN");
    currentStreak -= 3;
    scanHikeTickers();
    return;
  }
  res.send("PREPARE");
  prepareTickersData();
  currentStreak += 1;

}
