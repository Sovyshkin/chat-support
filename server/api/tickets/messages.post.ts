import { Message } from "~/server/models/message.model";
import mongoose from "mongoose";
import { createDecipheriv } from 'node:crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const ALGORITHM = 'aes-256-gcm';
if (!ENCRYPTION_KEY) {
  throw new Error('ENCRYPTION_KEY is not defined in environment variables');
}

const decryptMessage = (message: any) => {
  if (!message.isEncrypted) {
    return {
      ...message,
      _id: message._id.toString(),
      text: message.text,
      replyTo: message.replyTo ? {
        ...message.replyTo,
        _id: message.replyTo._id.toString()
      } : null
    };
  }

  try {
    const decipher = createDecipheriv(
      ALGORITHM,
      Buffer.from(ENCRYPTION_KEY, 'base64'),
      Buffer.from(message.iv, 'base64')
    );
    
    decipher.setAuthTag(Buffer.from(message.authTag, 'base64'));
    
    let decrypted = decipher.update(message.text, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    
    return {
      ...message,
      _id: message._id.toString(),
      text: decrypted,
      replyTo: message.replyTo ? {
        ...message.replyTo,
        _id: message.replyTo._id.toString()
      } : null
    };
  } catch (error) {
    console.error('Decryption error:', error);
    return {
      ...message,
      _id: message._id.toString(),
      text: 'Не удалось расшифровать сообщение',
      replyTo: message.replyTo ? {
        ...message.replyTo,
        _id: message.replyTo._id.toString()
      } : null
    };
  }
};

export default defineEventHandler(async (event) => {
    const { ticketId } = await readBody(event);
    let messages
    try {
        await mongoose.connect("mongodb://localhost:27017/chatSupport");
        let encryptedMessages = await Message.find({ ticketId }).populate('replyTo').lean()
        messages = encryptedMessages.map(decryptMessage);
      } catch (e) {
        console.error(e);
      }

  return messages;
});


