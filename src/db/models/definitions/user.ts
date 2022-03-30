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
  isActive?: boolean;
  avatar?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  deviceTokens?: string[];
}

export interface IUserDocument extends IUser, Document {
  _id: string;
}

// User schema
export const userSchema = new Schema({
  createdAt: field({
    type: Date,
    default: Date.now,
  }),
  phoneNumber: field({ type: String, label: "Phone number", optional: true }),
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
  isActive: field({ type: Boolean, default: true, label: "Is active" }),
  avatar: field({ type: String, label: "Avatar" }),
  fullName: field({ type: String, label: "Full name" }),
  firstName: field({ type: String, label: "First name" }),
  lastName: field({ type: String, optional: true, label: "Last name" }),
  deviceTokens: field({ type: [String], default: [], label: "Device tokens" }),
  address: field({ type: String, optional: true, label: "Address" }),
});
