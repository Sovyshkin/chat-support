import { User } from "~/server/models/user.model";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Auth");
    let {
      name,
      userId,
      avatar,
    } = await readBody(event);
    console.log(userId, avatar, name);

    const user = new User({
      name,
      userId,
      avatar,
    });

    console.log(user);

    await user.save();
    return user;
  } catch (e) {
    console.error(e);
    if (e.code === 11000) {
      // Duplicate key error
      throw createError({
        statusCode: 409,
        statusMessage: "User already exists",
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
  return null;
});
