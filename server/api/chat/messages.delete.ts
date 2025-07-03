import { Message } from "~/server/models/message.model.ts";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Auth");
    const { messageId } = await readBody(event);

    let message = await Message.deleteOne({ _id: messageId })
    
    return message
  } catch (e) {
    console.error(e);
    return { error: e.message };
  }
});