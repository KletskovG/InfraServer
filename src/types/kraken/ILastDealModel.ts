export interface ILastDealModel {
  ordertype: "buy" | "sell",
  price: number;
  pair: string;
  timestamp: number;
  dealResult: "success" | "fail",
}
