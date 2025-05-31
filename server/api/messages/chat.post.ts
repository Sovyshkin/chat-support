import { Message } from "~~/server/models/message.model.ts";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Auth");
    let { sender, receiver } = await readBody(event);
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ createdAt: 1 });

    
    return messages;
  } catch (e) {
    console.error(e);
  }

  return null;
});
