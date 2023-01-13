import { Price } from "kraken/db/models/price";
import { getSecondsTimestamp } from "utils/getSecondsTimestamp";
import { log } from "logger/logger";
import { getPairInfo } from "kraken/marketapi/getPairInfo";
import { scanHikeTickers } from "kraken/core/scanHikeTickers";

export async function prepareTickersData(executeScan: boolean) {
  await collectTickersInfo();
  if (!executeScan) {
    return;
  }

  scanHikeTickers();
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
  value: {price: number},
  timestamp: number,
) {
  const storedTicker = await Price.findOne({ ticker }, { _id: true, ticker: true });
  console.log(storedTicker);
  const tick = {
    price: value.price,
    timestamp,
  };

  if (!storedTicker) {
    Price.create({
      ticker,
      timestamp,
      prices: [tick],
    });
    return;
  }

  Price.updateOne({ _id: storedTicker._id }, {
    $push: {
      prices: tick,
    },
    timestamp,
  })
    .then(() => undefined)
    .catch(err => {
      console.log(err);
    });
}
