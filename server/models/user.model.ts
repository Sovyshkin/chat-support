import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: String,
    role: String,
    avatar: String,
    userId: String,
  });
  
export const User = model("User", UserSchema);