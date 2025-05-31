import { User } from "~~/server/models/user.model";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
    const { email, password, name, isGoogleUser, isYandexUser } = await readBody(event);

    try {
      await mongoose.connect("mongodb://localhost:27017/Auth");
        const user = await User.findOne({email});
        if (user){
          if(user.password == password){
            return user;
          }
        } else {
          let newUser = new User({
            email, password, name, isGoogleUser, isYandexUser
          });
          await newUser.save()
          return user
        }
      } catch (e) {
        console.error(e);
      }

  return null;
});
