import {Schema, model} from "mongoose";
import type { IDealModel } from "types/kraken/ILastDealModel";

export const schema = new Schema<IDealModel>({
  orderId: String,
  buyPrice: Number,
  defenseThershold: Number,
  ticker: String,
});

export const Deal = model("deal", schema);
