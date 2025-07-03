import { User } from "~~/server/models/user.model";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

// Хеширование пароля
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

export default defineEventHandler(async (event) => {
    const { email, password, name, isGoogleUser, isYandexUser } = await readBody(event);
    
    try {
      await mongoose.connect("mongodb://localhost:27017/Auth");
        const user = await User.findOne({email});
        let passwordHash = await hashPassword(password)
        if (user){
          if (bcrypt.compare(user.password, passwordHash)){
            return user;
          }
        } else {
          let newUser = new User({
            email, passwordHash, name, isGoogleUser, isYandexUser
          });
          await newUser.save()
          return user
        }
      } catch (e) {
        console.error(e);
      }

  return null;
});
