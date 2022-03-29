import { Document, Schema } from "mongoose";
import { field } from "./utils";

export interface ICategory {
  name?: string;
  type?: string;
}

export interface ICategoryDocument extends ICategory, Document {
  _id: string;
}

export const categorySchema = new Schema({
  createdAt: field({
    type: Date,
    default: Date.now,
  }),
  name: field({ type: String, label: "Name" }),
  type: field({ type: String, label: "Type" }),
});
