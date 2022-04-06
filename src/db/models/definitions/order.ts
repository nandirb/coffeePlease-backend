import { Document, Schema } from "mongoose";
import { IProduct } from "./products";
import { field } from "./utils";

export interface IOrder {
  createdAt: Date;
  status: string;
  deliverType: string;
  deliverAddress?: string;
  products?: IProduct[];
}

export interface IOrderDocument extends IOrder, Document {
  _id;
}

export const orderSchema = new Schema({
  createdAt: field({ type: String, label: "Date" }),
  status: field({ type: String, label: "Order status" }),
  deliverType: field({ type: String, label: "Deliver type" }),
  deliverAddress: field({ type: Number, label: "Deliver address" }),
  products: field({ type: [Object], label: "Products with count" }),
});
