export interface IPriceModel {
  ticker: string;
  timestamp: number;
  prices: {
    price: number;
    timestamp: number;
  }[]
}
