import { Schema, model, Types } from "mongoose";

const MessageSchema = new Schema({
  ticketId: { 
    type: Types.ObjectId, 
    ref: "Ticket", 
    required: true 
  },
  senderId: { 
    type: Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  senderName: String,
  // Контент
  text: String,
  media: [{
    type: { type: String, enum: ["image", "video", "document", "audio", "voice"] },
    url: { type: String },
    filename: String, // Оригинальное имя файла
    size: Number, // Размер в байтах
    duration: Number, // Для аудио/видео (в секундах)
    width: Number, // Для изображений/видео
    height: Number, // Для изображений/видео
    thumbnail: String, // URL превью
    caption: String, // Подпись к медиа
  }],

  // Ответ на сообщение
  replyTo: { 
    type: Types.ObjectId, 
    ref: "Message",
    required: false
  },
  iv: { type: String }, // Для GCM
  isEncrypted: { type: Boolean, default: false },
  authTag: String,
  });
  
export const Message = model("Message", MessageSchema);