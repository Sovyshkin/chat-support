import { Ticket } from "~/server/models/ticket.model";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/chatSupport");
    let { title, description, creatorId } = await readBody(event);
    const ticket = new Ticket({
      title,
      description,
      creatorId,
      status: 'open'
    });
    await ticket.save();
    return ticket;
  } catch (e) {
    console.error(e);
  }

  return null;
});
