import {Schema, model} from "mongoose";
import type { IPriceModel } from "types/kraken/IPriceModel";

export const schema = new Schema<IPriceModel>({
  ticker: String,
  timestamp: Number,
  prices: [{
    price: Number,
    timestamp: Number,
  }],
});

export const Price = model("price", schema);
