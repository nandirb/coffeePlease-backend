import { Document, Schema } from "mongoose";
import { field } from "./utils";
import { ORDER_STATUS } from "./constants";

export interface IOrder {
  createdAt: Date;
  totalPrice: string;
  status: string;
  deliverType: string;
  deliverAddress?: string;
}

export interface IOrderDocument extends IOrder, Document {
  _id;
}

export const orderSchema = new Schema({
  createdAt: field({ type: String, label: "Date" }),
  status: field({ type: String, label: "Order status" }),
  totalPrice: field({ type: Number, label: "Total price" }),
  deliverType: field({ type: String, label: "Deliver type" }),
  deliverAddress: field({ type: Number, label: "Deliver address" }),
});
