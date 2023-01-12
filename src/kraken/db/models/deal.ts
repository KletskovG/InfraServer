import {Schema, model} from "mongoose";
import type { IDealModel } from "types/kraken/ILastDealModel";

export const schema = new Schema<IDealModel>({
  orderId: String,
  buyPrice: Number,
  defenseThershold: Number,
});

export const Deal = model("deal", schema);
