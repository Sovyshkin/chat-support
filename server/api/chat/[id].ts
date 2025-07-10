import { Ticket } from "~/server/models/ticket.model";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
    let ticket;
    const id = getRouterParam(event, 'id')
    try {
        await mongoose.connect("mongodb://localhost:27017/chatSupport");
        ticket = await Ticket.findOne({id:id})
      } catch (e) {
        console.error(e);
      }

  return ticket;
});


