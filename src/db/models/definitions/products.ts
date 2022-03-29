import { Document, Schema } from "mongoose";
import { field } from "./utils";

export interface IProduct {
  createdAt?: Date;
  name: string;
  type: string;
  description: string;
  unitPrice?: number;
  categoryId: string;
}

export interface IProductDocument extends IProduct, Document {
  _id;
}

// Product schema
export const productSchema = new Schema({
  name: field({ type: String, label: "Name" }),
  type: field({ type: String, label: "Type" }),
  description: field({ type: String, label: "Description" }),
  unitPrice: field({ type: Number, label: "Unit price" }),
  categoryId: field({ type: String, label: "categoryId" }),
});
