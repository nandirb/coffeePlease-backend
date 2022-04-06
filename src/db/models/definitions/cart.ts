import { Document, Schema } from "mongoose";
import { IProduct } from "./products";
import { field } from "./utils";

export interface ICart {
  createdAt?: Date;
  productId?: string;
  count?: number;
  product?: IProduct;
  orderId?: string;
}

export interface ICartDocument extends ICart, Document {
  _id: string;
}

export const cartSchema = new Schema({
  createdAt: field({
    type: Date,
    default: Date.now,
  }),
  productId: field({ type: String, label: "ProductId" }),
  count: field({ type: String, label: "Count" }),
  orderId: field({ type: String, label: "OrderId" }),
});
