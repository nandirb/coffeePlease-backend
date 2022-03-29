import { Document, Schema } from "mongoose";
import { field } from "./utils";

export interface IAddress {
  district?: string;
  zipcode?: number;
  addressDetail: string;
}

export interface IAddressDocument extends IAddress, Document {
  _id: string;
}

export const categorySchema = new Schema({
  createdAt: field({
    type: Date,
    default: Date.now,
  }),
  district: field({ type: String, label: "District" }),
  zipcode: field({ type: Number, label: "Zipcode" }),
  addressDetail: field({ type: String, label: "Address Detail" }),
});
