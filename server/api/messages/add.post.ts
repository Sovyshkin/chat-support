import { Message } from "~~/server/models/message.model.ts";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
    try {
      await mongoose.connect("mongodb://localhost:27017/chatSupport");
      let { content, username, userID } = await readBody(event)
        const message = new Message({
            content,
            username,
            userID
        });
        await message.save()
        return message
      } catch (e) {
        console.error(e);
      }

  return null;
});
