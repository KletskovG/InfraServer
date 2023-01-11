import {Schema, model} from "mongoose";
import type { ILastDealModel } from "types/kraken/ILastDealModel";

export const schema = new Schema<ILastDealModel>({
  ordertype: String,
  price: Number,
  pair: String,
  timestamp: Number,

});

export const Deal = model("deal", schema);
