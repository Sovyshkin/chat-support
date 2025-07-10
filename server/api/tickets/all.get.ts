import { Ticket } from "~/server/models/ticket.model";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/chatSupport");

    let tickets = await Ticket.find({ status: "open" })
    
    return tickets
  } catch (e) {
    console.error(e);
    return { error: e.message };
  }
});