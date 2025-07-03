import { User } from "~/server/models/user.model";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import { id } from "@nuxt/ui/runtime/locale/index.js";

// Хеширование пароля
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}


export default defineEventHandler(async (event) => {
    try {
      await mongoose.connect("mongodb://localhost:27017/Auth");
      let { email, password, phone, age, name, isGoogleUser, isYandexUser, id, avatar } = await readBody(event)
      let passwordHash = await hashPassword(password)
      console.log(id, avatar, name);
      
        const user = new User({
            email, password: passwordHash, phone, age, name, isGoogleUser, isYandexUser
        });
        await user.save()
        return user
      } catch (e) {
        console.error(e);
      }
  return null;
});
