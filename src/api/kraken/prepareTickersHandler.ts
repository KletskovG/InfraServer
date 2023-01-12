import { Response } from "express";
import { prepareTickersData } from "kraken/core/prepareTickersData";

let currentStreak = 0;

export function prepareTickersHandler(_: unknown, res: Response) {
  if (currentStreak === 6) {
    res.send("SCAN");
    currentStreak = 0;
    return;
  }
  res.send("PREPARE");
  prepareTickersData();
  currentStreak += 1;

}
