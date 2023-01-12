import {Schema, model} from "mongoose";
import type { IPriceModel } from "types/kraken/IPriceModel";

export const schema = new Schema<IPriceModel>({
  ticker: String,
  prices: [{
    price: Number,
    timestamp: Number,
  }],
});

export const Price = model("price", schema);
