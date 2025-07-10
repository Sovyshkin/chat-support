import { Schema, model, Types } from "mongoose";

const TicketSchema = new Schema({
  title: String,
  creatorId: {
    type: Types.ObjectId,
    ref: "User",
  },
  description: String,
  status: { type: String, enum: ["open", "closed"] }
});

export const Ticket = model("Ticket", TicketSchema);
