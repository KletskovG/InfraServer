export interface IAddOrderRequestParams {
  orderType: "market" | "limit" | "take-profit" | "stop-loss-limit" | "take-profit-limit" | "settle-position";
  type: "buy" | "sell";
  volume: string;
  pair: string;
  validate: boolean;
}
