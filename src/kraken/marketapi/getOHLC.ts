import { KrakenClient } from "kraken/marketapi/Kraken";
import { KrakenError } from "kraken/KrakenError";
import { log } from "logger/logger";
import { inferErrorType } from "utils/inferErrorType";
import { TKrakenPairInfoResult } from "types/kraken/IKrakenResponse";
import { KRAKEN_ACTIVE_PAIR } from "const";

export async function getOHLC<TPair extends string>(
  pair: string,
  sinceSeconds: number,
  interval = 1,
): Promise<TKrakenPairInfoResult | null> {
  const kraken = new KrakenClient();

  try {
    const { result } = await kraken.getOHLCData<TPair>(pair,sinceSeconds, interval) as any;
    console.log("______________________________________");
    console.log("GET OHLC RESULT");
    const ticks = result[KRAKEN_ACTIVE_PAIR];
    console.log(result);
    console.log(ticks[ticks.length - 1]);
    return result as any;
  } catch (error) {
    if (!inferErrorType<KrakenError>(error)) {
      log("Error", `getOHLC: Cant handle error ${error.error.message}`);
      return null;
    }
    log("Error", `getOHLC: ${error.error.message}`);
    return null;
  }
}

// function transformPairResult<TPair extends string>(
//   response:
// ) {

// }
