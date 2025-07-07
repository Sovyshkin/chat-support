import { User } from "~/server/models/user.model";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Auth");
    const { name, userId, avatar } = await readBody(event);

    if (!userId || !name) {
      throw createError({
        statusCode: 400,
        statusMessage: "UserId and Name are required!",
      });
    }

    // Ищем пользователя или создаем нового
    let user = await User.findOne({ userId });

    if (!user) {
      user = new User({ name, userId, avatar });
      await user.save();
    } else {
      // Если пользователь уже существует, можно обновить его данные (опционально)
      user.name = name;
      user.avatar = avatar;
      await user.save();
    }

    return user;
  } catch (e) {
    console.error(e);
    if (e.code === 11000) {
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
});