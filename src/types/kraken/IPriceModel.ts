export interface IPriceModel {
  ticker: string;
  timestamp: number;
  isNew?: boolean;
  prices: {
    price: number;
    timestamp: number;
  }[]
}
