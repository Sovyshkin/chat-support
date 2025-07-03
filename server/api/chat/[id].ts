import { Chat } from "~~/server/models/chat.model";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
    let chat;
    const id = getRouterParam(event, 'id')
    try {
        await mongoose.connect("mongodb://localhost:27017/Auth");
        chat = await Chat.findOne({id:id})
      } catch (e) {
        console.error(e);
      }

  return chat;
});


