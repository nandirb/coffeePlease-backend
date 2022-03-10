import { Document, Schema } from "mongoose";
import { field } from "./utils";

export interface IService {
  createdAt?: Date;
  name: string;
  type: string;
  description: string;
  categoryId: string;
}

export interface IServiceDocument extends IService, Document {
  _id;
}

// Service schema
export const serviceSchema = new Schema({
  createdAt: field({
    type: Date,
    default: Date.now,
  }),
  name: field({ type: String, label: "Name" }),
  type: field({ type: String, label: "Type" }),
  description: field({ type: String, label: "Description" }),

  categoryId: field({ type: String, label: "categoryId" }),
});
