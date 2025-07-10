import { User } from "~~/server/models/user.model";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
    let users;
    const id = getRouterParam(event, 'id')
    try {
        await mongoose.connect("mongodb://localhost:27017/chatSupport");
        users = await User.find({_id: { $ne: id } }).select('-password').lean()
      } catch (e) {
        console.error(e);
      }

  return users;
});


