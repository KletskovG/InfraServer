import { Price } from "db/models/price";
import { getSecondsTimestamp } from "utils/getSecondsTimestamp";
import { log } from "logger/logger";
import { getPairInfo } from "kraken/marketapi/getPairInfo";
import { scanHikeTickers } from "kraken/core/scanHikeTickers";
import { IPriceModel } from "types/kraken/IPriceModel";
import { IPOTickers } from "types/kraken/IPOTickers";
import type { Document } from "mongoose";
import { buildAppUrl } from "lib/kraken/buildAppUrl";

let isScanRequired = true;

export async function prepareTickersData(executeScan: boolean) {
  if (executeScan && isScanRequired) {
    scanHikeTickers();
    return;
  }

  collectTickersInfo();
}

async function collectTickersInfo() {
  const timestamp = getSecondsTimestamp();

  log("Info", "PREPARE TICKER INFO");
  const marketTickers = await getPairInfo("");

  if (!marketTickers) {
    log("Error", "prepareTickersData: Tickers is empty");
    return;
  }

  const entries = Object.entries(marketTickers);
  try {
    for (const [ticker, value] of entries) {
      processTicker(ticker, value, timestamp);
    }
  } catch (error) {
    log("Error", `prepareTickersData ${JSON.stringify(error)}`);
  }
}


async function processTicker(
  ticker: string,
  value: { price: number },
  timestamp: number,
) {
  const storedTicker = await Price.findOne({ ticker }, { _id: true, ticker: true });

  const tick = {
    price: value.price,
    timestamp,
  };

  if (!storedTicker) {
    const newTicker: IPriceModel = {
      ticker,
      timestamp,
      isNew: true,
      prices: [tick],
      createdTimestamp: timestamp,
    };

    Price.create(newTicker);
    log("Important", `Found new currency: ${ticker}`);
    return;
  }

  Price.updateOne({ _id: storedTicker._id }, {
    $push: {
      prices: tick,
    },
    timestamp,
  })
    .then(() => {
      checkIPOPrice(storedTicker);
    })
    .catch(err => {
      console.log(err);
    });
}

export function stopScan() {
  isScanRequired = false;
  log("Notify", "Hike scan stopped");
}

export function startScan() {
  isScanRequired = true;
  log("Notify", "Hike scan enabled");
}

async function checkIPOPrice(ticker: Document<unknown, unknown, IPriceModel> & IPriceModel) {
  if (IPOTickers.find((el) => el === ticker.ticker)) {
    log("Info", `Check IPO price ${ticker.ticker}`);
    const lastTickerPrices = await Price.findById(ticker._id, {prices: true});
    if (lastTickerPrices?.prices.length) {
      const lastPrice = lastTickerPrices.prices.pop();

      if (Number(lastPrice.price) > 0) {
        log("Important", `Ticker is available to buy: ${ticker.ticker} ${lastPrice.price} ${buildAppUrl(ticker.ticker)}`);
      }
    }
  }

  return false;
}
