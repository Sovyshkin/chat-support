import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    age: Number,
    isGoogleUser: Boolean,
    isYandexUser: Boolean,
    role: String,
    avatar: String,
    userId: String
  });
  
export const User = model("User", UserSchema);