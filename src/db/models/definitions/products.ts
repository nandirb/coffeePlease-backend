import { Document, Schema } from "mongoose";
import { field } from "./utils";

export interface IProduct {
  createdAt?: Date;
  name: string;
  type: string;
  cal: string;
  description?: string;
  unitPrice: number;
  categoryId: string;
  image: string;
  productStatus?: string;
}

export interface IProductDocument extends IProduct, Document {
  _id;
}

// Product schema
export const productSchema = new Schema({
  createdAt: field({ type: Date, label: "CreatedAt" }),
  name: field({ type: String, label: "Name" }),
  type: field({ type: String, label: "Type" }),
  cal: field({ type: String, label: "Cal" }),
  description: field({ type: String, label: "Description" }),
  unitPrice: field({ type: Number, label: "Unit price" }),
  categoryId: field({ type: String, label: "categoryId" }),
  image: field({ type: String, label: "Product image" }),
  productStatus: field({ type: String, default: "" }),
});
