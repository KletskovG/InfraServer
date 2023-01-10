import { KrakenClient } from "kraken/marketapi/Kraken";
import { KrakenError } from "kraken/KrakenError";
import { log } from "logger/logger";
import { inferErrorType } from "utils/inferErrorType";
import { IKrakenBalanceResponse, IKrakenBalanceResult } from "types/kraken/IKrakenResponse";

export async function getCurrentBalance (): Promise<IKrakenBalanceResult | null> {
  const kraken = new KrakenClient();
  try {
    const { result } = await kraken.getBalance();

    return transformCurrentBalance(result);
  } catch (error) {
    if (!inferErrorType<KrakenError>(error)) {
      log("Error", `getPairInfo: Cant handle error ${error}`);
      return null;
    }
    log("Error", `getPairInfo: ${error.error.message}`);
    return null;
  }
}


function transformCurrentBalance(
  response: IKrakenBalanceResponse["result"],
): IKrakenBalanceResult {
  return {
    ZEUR: Number(response.ZEUR) || 0,
    "EUM.M": Number(response["EUR.M"]) || 0,
  };
}
