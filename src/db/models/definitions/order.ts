import { Document, Schema } from "mongoose";
import { field } from "./utils";

export interface IOrder {
  createdAt?: Date;
  status: string;
  totalPrice: number;
  userId: string;
  deliverType: string;
  deliverAddress?: Object;
  items: Object[];
}

export interface IOrderDocument extends IOrder, Document {
  _id;
}

export const orderSchema = new Schema({
  createdAt: field({ type: String, label: "Date" }),
  status: field({ type: String, default: "PROCESSING", label: "Order status" }),
  deliverType: field({ type: String, label: "Deliver type" }),
  deliverAddress: field({ type: Object, label: "Deliver address" }),
  totalPrice: field({ type: Number, label: "Total Price" }),
  userId: field({ type: String, label: "User id" }),
  items: field({ type: Object, label: "Order items" }),
});
