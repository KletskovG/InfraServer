import { Price } from "kraken/db/models/price";
import { log } from "logger/logger";
import { HIKE_TIME_FRAME, KRAKEN_PROFIT } from "const/kraken/core";
import { ceilNumber } from "utils/ceilNumber";

export async function scanHikeTickers() {
  log("Info", "Scan hike tickers");

  const allAvailableTickers = await Price.find({}, { ticker: true });

  allAvailableTickers.forEach(async (ticker) => await checkMaxDiff(ticker.ticker));
  log("Important", "Ticker Scan completed");
}

async function checkMaxDiff(tickerName: string) {
  const ticker = await Price.findOne({ticker: tickerName});

  if (ticker.prices.length < HIKE_TIME_FRAME) {
    return;
  }

  const freshChartData = ticker.prices.slice(-HIKE_TIME_FRAME);
  const initialPrice = freshChartData[0].price;
  log("Info", `TICKER: ${JSON.stringify({ ticker: ticker.ticker, start: initialPrice })}`);
  let maxPrice = {
    price: 0,
    timestamp: 0,
  };
  let maxPriceIndex = -1;

  for (let i = 0; i < freshChartData.length; i++) {
    if (freshChartData[i].price > maxPrice.price) {
      maxPrice = freshChartData[i];
      maxPriceIndex = i;
    }
  }
  const isHikePerformingNow = maxPriceIndex > 3;
  const priceDiff = ceilNumber(maxPrice.price / initialPrice, 2);
  log("Info", `MAX PRICE: ${tickerName} ${JSON.stringify(maxPrice)} DIFF: ${priceDiff}`);
  if (isHikePerformingNow && priceDiff > 1.1) {
    const currentPrice = freshChartData[freshChartData.length - 1].price;
    const profitPrice = currentPrice * KRAKEN_PROFIT;
    log("Important",
      `HIKE: ${ticker.ticker} +${priceDiff}%` +
      `PICK: ${maxPriceIndex * 15}m ago` +
      `CURRENT PRICE: ${ceilNumber(currentPrice, 3)} profit price: ${ceilNumber(profitPrice, 3)}`
    );
    return;
  }
}
