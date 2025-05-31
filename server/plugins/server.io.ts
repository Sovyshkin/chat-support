import type { NitroApp } from "nitropack";

import { Server as Engine } from "engine.io";

import { Server } from "socket.io";

import { defineEventHandler } from "h3";

import { Message } from "~~/server/models/message.model.ts";
import { User } from "~~/server/models/user.model.ts";
import mongoose from "mongoose";

export default defineNitroPlugin(async (nitroApp: NitroApp) => {
  const engine = new Engine();

  const io = new Server();
  await mongoose.connect("mongodb://localhost:27017/Auth");

  let messages = [];
  let chats = []
  let clients = new Map()

  const getMessages = async (sender, receiver) => {
    try {
      messages = await Message.find({
        $or: [
          { sender, receiver },
          { sender: receiver, receiver: sender },
        ],
      }).sort({ createdAt: 1 });
    } catch (err) {
      console.log(err);
    }
  };

  const getChats = async (username) => {
    try {
      chats = await User.find({ name: { $ne: username } }).lean()
      chats.forEach((chat) => {
        chat.notification = false
        chat.online = false
      })      
    } catch (err) {
      console.log(err);
      
    }
  }

  io.bind(engine);


  io.on("connection", async (socket) => {
    socket.on('logined', async (data) => {
      clients.set(data.name, socket.id)
      await getChats(data.name)
      socket.emit('chats', chats);
      io.emit('online', Array.from(clients.keys()))
      await getMessages(data.name, data.receiver);
      socket.emit("messages", messages);
    })

    
    socket.on("new message", async (data) => {
      const message = new Message({
        content: data.content,
        sender: data.sender,
        userID: data.userID,
        receiver: data.receiver,
      });
      await message.save();
      await getMessages(data.sender, data.receiver);
      socket.emit("messages", messages);
      socket.to(clients.get(data.receiver)).emit('messages', messages)
      socket.to(clients.get(data.receiver)).emit('notification', data.sender)
    });
  });

  nitroApp.router.use(
    "/socket.io/",
    defineEventHandler({
      handler(event) {
        engine.handleRequest(event.node.req, event.node.res);

        event._handled = true;
      },

      websocket: {
        open(peer) {
          // @ts-expect-error private method and property

          engine.prepare(peer._internal.nodeReq);

          // @ts-expect-error private method and property

          engine.onWebSocket(
            peer._internal.nodeReq,
            peer._internal.nodeReq.socket,
            peer.websocket
          );
        },
      },
    })
  );
});
