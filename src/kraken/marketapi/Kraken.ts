import got from "got";
import { createHash, createHmac } from "crypto";
import qs from "qs";
import { getEnvVariable } from "utils/getEnvVariable";
import { KRAKEN_API_BASE_URL, KRAKEN_API_VERSION, KRAKEN_AUTH_HEADERS } from "const";

const PUBLIC_METHODS = [ "Time", "Assets", "AssetPairs", "Ticker", "Depth", "Trades", "Spread", "OHLC" ] as const;
type TPublicMethod = typeof PUBLIC_METHODS[number];

const PRIVATE_METHOD = [ "Balance", "TradeBalance", "OpenOrders", "ClosedOrders", "QueryOrders", "TradesHistory", "QueryTrades", "OpenPositions", "Ledgers", "QueryLedgers", "TradeVolume", "AddOrder", "CancelOrder", "DepositMethods", "DepositAddresses", "DepositStatus", "WithdrawInfo", "Withdraw", "WithdrawStatus", "WithdrawCancel", "GetWebSocketsToken" ] as const;
type TPrivateMethod = typeof PRIVATE_METHOD[number];

const getMessageSignature = (
  path: string,
  params: Record<string, string>,
  secret: string,
  nonce: number,
) => {
  const message = qs.stringify(params);
  const secret_buffer = Buffer.from(secret, "base64");
  const hash = createHash("sha256");
  const hmac = createHmac("sha512", secret_buffer);
  const hash_digest = hash.update(nonce + message).digest("binary");
  const hmac_digest = hmac.update(path + hash_digest, "binary").digest("base64");

  return hmac_digest;
};

const rawRequest = async (
  url: string,
  headers: Record<string, string>,
  params: Record<string, string>,
  timeout = 10_000
) => {
  headers["User-Agent"] = "Kraken Javascript API Client";

  const options = { headers, timeout };

  Object.assign(options, {
    method: "POST",
    body: qs.stringify(params),
  });

  const { body } = await got(url, options);
  const response = JSON.parse(body);

  if(response.error?.length) {
    const error = response.error
      .filter((e: string) => e.startsWith("E"))
      .map((e: string) => e.substr(1));

    if(!error.length) {
      throw new Error("Kraken API returned an unknown error");
    }

    throw new Error(error.join(", "));
  }

  return response;
};

export class KrakenClient {

  config: {
    key: string,
    secret: string,
    version: number,
    url: string,
  };

  constructor() {
    // // Allow passing the OTP as the third argument for backwards compatibility
    // if(typeof options === "string") {
    //   options = { otp : options };
    // }

    const key = getEnvVariable("KRAKEN_API_KEY");
    const secret = getEnvVariable("KRAKEN_API_SIGN");
    this.config = Object.assign({ key, secret });
  }

  api(method: TPublicMethod | TPrivateMethod, params: Record<string, string>) {
    const publicApiMethod = PUBLIC_METHODS.find(item => item === method);

    if(publicApiMethod) {
      return this.publicMethod(publicApiMethod, params);
    }

    const privateApiMethod = PRIVATE_METHOD.find(item => item === method);

    if(privateApiMethod) {
      return this.privateMethod(privateApiMethod, params);
    }

    throw new Error(method + " is not a valid API method.");
  }

  publicMethod(method: TPublicMethod, params = {}) {
    const path = "/" + KRAKEN_API_VERSION + "/public/" + method;
    const url = KRAKEN_API_BASE_URL + path;
    const response = rawRequest(url, {}, params, 10_000);

    return response;
  }

  privateMethod(method: TPrivateMethod, params: Record<string, string> = {}) {

    const path = "/" + KRAKEN_API_VERSION + "/private/" + method;
    const url = KRAKEN_API_BASE_URL + path;

    // if(this.config.otp !== undefined) {
    //   params.otp = this.config.otp;
    // }

    const nonce = Number(new Date()) * 1000;
    params.nonce = String(nonce);

    const signature = getMessageSignature(
      path,
      params,
      this.config.secret,
      nonce,
    );

    const headers = {
      [KRAKEN_AUTH_HEADERS.KEY]: this.config.key,
      [KRAKEN_AUTH_HEADERS.SIGN]: signature,
    };

    const response = rawRequest(url, headers, params, 10_000);

    return response;
  }
}
