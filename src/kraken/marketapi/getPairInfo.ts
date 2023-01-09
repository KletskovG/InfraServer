import { KrakenClient } from "kraken/marketapi/Kraken";

export const getPairInfo = async (pair?: string) => {
  const kraken = new KrakenClient();
  const requestParams: Record<string, string> = {};

  if (pair) {
    requestParams.pair = pair;
  }

  const result = await kraken.api("Ticker", {...requestParams});
  console.log("TICKER INFO");
  console.log(result.result);
  // console.log(result.result.XLTCZEUR.c)
};
