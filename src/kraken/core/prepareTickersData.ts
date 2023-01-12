import { Price } from "kraken/db/models/price";
import { getSecondsTimestamp } from "utils/getSecondsTimestamp";
import { log } from "logger/logger";
import { getPairInfo } from "kraken/marketapi/getPairInfo";
// import { KRAKEN_ACTIVE_PAIR } from "const";


export async function prepareTickersData() {
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
    log("Important", "TICKERS PREPARED");

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
      prices: [tick],
    });
    return;
  }

  Price.updateOne({ _id: storedTicker._id }, {
    $push: {
      prices: tick,
    }
  })
    .then(() => undefined)
    .catch(err => {
      console.log(err);
    });
}
