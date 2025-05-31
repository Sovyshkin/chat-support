import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
    userID: String,
    content: String,
    receiver: String,
    sender: String
  });
  
export const Message = model("Message", MessageSchema);