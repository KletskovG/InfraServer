export interface IKrakenResponse {
  error: string[];
  result: Record<string, string | TTickerResult>;
}

export interface IKrakenBalanceResponse extends IKrakenResponse {
  result: {
    ZEUR: string;
    "EUR.M": string;
  }
}

export interface IKrakenBalanceResult {
  ZEUR: number;
  "EUM.M": number;
}

export type TTickerResult = {
  a: string[]; // Ask price
  b: string[]; // Bid price
  c: string[]; // Current price
  v: string[]; // Volume
  p: string[]; // Average price
  o: string; // Open price
}

export interface IKrakenPairInfoResponse <
  TName extends string | undefined
> extends IKrakenResponse {
  result: Record<
    TName extends string ? TName : string,
    TTickerResult
  >;
}

type TickerResult = {
  price: number;
}

export type TKrakenPairInfoResult = Record<string, TickerResult>;
