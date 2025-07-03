import { User } from "~/server/models/user.model";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
    try {
      await mongoose.connect("mongodb://localhost:27017/Auth");
      let { email, password, phone, age, name, isGoogleUser, isYandexUser, login, avatar } = await readBody(event)
      console.log(login, avatar, name);
        const user = new User({
            email, password, phone, age, name, isGoogleUser, isYandexUser
        });
        await user.save()
        return user
      } catch (e) {
        console.error(e);
      }
  return null;
});
