export interface IPriceModel {
  ticker: string;
  prices: {
    price: number;
    timestamp: number;
  }[]
}
