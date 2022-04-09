import { Document, Schema } from "mongoose";

import { field } from "./utils";

export interface IAdditionInfoDocument extends Document {}

export interface IUser {
  createdAt?: Date;
  phoneNumber?: string;
  email?: string;
  password?: string;
  resetPassword?: string;
  resetPasswordExpires?: number;
  avatar?: string;
  point?: number;
  reward?: number;
  fullName?: string;
  address?: string;
  deviceTokens?: string[];
  orders?: [Schema.Types.Array];
}

export interface IUserDocument extends IUser, Document {
  _id: string;
}

export const userSchema = new Schema({
  createdAt: field({
    type: Date,
    default: Date.now,
  }),
  phoneNumber: field({ type: Number, label: "Phone number", optional: true }),
  email: field({
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/,
      "Please fill a valid email address",
    ],
    label: "Email",
  }),
  password: field({ type: String }),
  resetPasswordToken: field({ type: String }),
  resetPassword: field({ type: String }),
  resetPasswordExpires: field({ type: Date }),
  avatar: field({ type: String, label: "Avatar" }),
  fullName: field({ type: String, label: "Full name" }),
  deviceTokens: field({ type: [String], default: [], label: "Device tokens" }),
  point: field({ type: Number, default: 0, label: "Point" }),
  reward: field({ type: Number, default: 0, label: "Reward" }),
  address: field({ type: String }),
  orders: field({ type: Array }),
});
