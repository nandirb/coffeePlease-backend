import { Document, Schema } from "mongoose";
import { field } from "./utils";

export interface ILoyalty {
  quantity: number;
}

export interface ILoyaltyDocument extends ILoyalty, Document {
  _id;
}

// Product schema
export const productSchema = new Schema({
  quantity: field({ type: Number, label: "Quantity" }),
});
