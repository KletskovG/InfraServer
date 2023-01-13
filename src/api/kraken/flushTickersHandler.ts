import { Response } from "express";
import { Price } from "kraken/db/models/price";
import { log } from "logger/logger";

export async function flushTickersHandler(_: unknown, res: Response) {
  const tickers = await Price.find({}, { ticker: true });

  if (!tickers) {
    res.send("OK");
    log("Important", "flushTickersHandler: Prices collection empty");
    return;
  }

  tickers.forEach(ticker => {
    Price.findOne({ ticker: ticker.ticker })
      .then(result => {
        result.updateOne({ prices: result.prices.slice(-8) })
          .then(result => result)
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  });
  log("Important", "Ticker prices flushed");
  res.send("OK");

}
