import { Schema, model, Types } from "mongoose";

const ChatSchema = new Schema({
  type: {
    type: String,
    enum: ["private", "group"],
    required: true,
  },
  title: String,
  avatar: String,
  members: [
    {
      userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
      },
      role: {
        type: String,
        enum: ["member", "admin", "creator"],
        default: "member",
      },
      joinedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  creatorId: {
    type: Types.ObjectId,
    ref: "User",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Chat = model("Chat", ChatSchema);
