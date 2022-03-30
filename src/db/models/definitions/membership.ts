import { Document, Schema } from "mongoose";
import { field } from "./utils";

export interface IMembership {
  type: string;
  discount: number;
  description: string;
}

export interface IMembershipDocument extends IMembership, Document {
  _id;
}

// Product schema
export const membershipSchema = new Schema({
  type: field({ type: String, label: "Type" }),
  discount: field({ type: Number, label: "Discount" }),
  description: field({ type: String, label: "Description" }),
});
