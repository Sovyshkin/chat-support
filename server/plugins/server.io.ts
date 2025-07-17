import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";
import { Ticket } from "../models/ticket.model";
import { Message } from "~/server/models/message.model";
import { User } from "~/server/models/user.model";
import mongoose from "mongoose";
import { randomBytes, createCipheriv, createDecipheriv } from "node:crypto";

// Проверка наличия ключа шифрования
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
if (!ENCRYPTION_KEY) {
  throw new Error("ENCRYPTION_KEY is not defined in environment variables");
}
const ALGORITHM = "aes-256-gcm";

const ADMINS_ID = Array.from(JSON.parse(process.env.ADMINS_ID));
if (!ADMINS_ID) {
  throw new Error("ADMINS_ID is not defined in environment variables");
}

export default defineNitroPlugin(async (nitroApp: NitroApp) => {
  const engine = new Engine();
  const io = new Server({
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  await mongoose.connect("mongodb://localhost:27017/chatSupport");

  let clients = new Map();

  const encryptMessage = (text: string) => {
    const iv = randomBytes(16); // 128 бит для GCM
    const cipher = createCipheriv(
      ALGORITHM,
      Buffer.from(ENCRYPTION_KEY, "base64"),
      iv
    );

    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");

    const authTag = cipher.getAuthTag().toString("base64");

    return {
      encrypted,
      iv: iv.toString("base64"),
      authTag,
    };
  };

  const decryptMessage = (
    encryptedText: string,
    iv: string,
    authTag: string
  ) => {
    const decipher = createDecipheriv(
      ALGORITHM,
      Buffer.from(ENCRYPTION_KEY, "base64"),
      Buffer.from(iv, "base64")
    );

    decipher.setAuthTag(Buffer.from(authTag, "base64"));

    let decrypted = decipher.update(encryptedText, "base64", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  };

  const getMessages = async (ticketId) => {
    try {
      let response = await $fetch("/api/tickets/messages", {
        method: "POST",
        body: {
          ticketId
        },
      });
    
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const getTickets = async (userId = false) => {
    try {
      let userObjectId;
      let tickets;
      console.log(userId);
      console.log(ADMINS_ID.includes(userId));
      
      if (!ADMINS_ID.includes(userId) && userId) {
        userObjectId = new mongoose.Types.ObjectId(userId);
        tickets = await Ticket.find({ creatorId: userObjectId })
      } else {
        tickets = await Ticket.find()
      }

      return tickets;
    } catch (err) {
      console.error("Error loading tickets:", err);
      return [];
    }
  };

  const getTicket = async (id: string) => {
    return await Ticket.findOne({ _id: id });
  };

  io.bind(engine);

  io.on("connection", async (socket) => {
    socket.on("logined", async (data) => {
      try {
        clients.set(data.userId1, socket.id);
        io.emit("online", Array.from(clients.keys()));
        const tickets = await getTickets(data.userId1)
        socket.emit("tickets", tickets);
        let messages = await getMessages(data.ticketId)
        socket.emit("messages", messages);
      } catch (error) {
        console.error("Login error:", error);
      }
    });

    socket.on("new message", async (data) => {
      try {
        const { encrypted, iv, authTag } = encryptMessage(data.text);

        console.log(encrypted, iv, authTag);

        const message = new Message({
          text: encrypted,
          iv,
          authTag,
          isEncrypted: true,
          senderId: data.senderId,
          senderName: data.senderName,
          ticketId: data.ticketId,
          replyTo: data.replyId,
        });

        await message.save();
        console.log("Сообщение добавлено", data.text);

        const messages = await getMessages(
          data.ticketId
        );

        socket.emit("messages", messages)

        ADMINS_ID.forEach((client) => {
          const clientSocketId = clients.get(client.toString());
          if (clientSocketId) {
            socket.to(clientSocketId).emit("messages", messages);
          }
        });
      } catch (error) {
        console.error("Message processing error:", error);
      }
    });

    socket.on("new message with files", async (data) => {
      try {
        let messages = await getMessages(data.ticketId)
        socket.emit("messages", messages)
        socket.to(clients.get(data.creatorId.toString())).emit("messages", messages)
        ADMINS_ID.forEach((client) => {
          const clientSocketId = clients.get(client.toString());
          if (clientSocketId) {
            socket.to(clientSocketId).emit("messages", messages);
          }
        });
      } catch (err) {
        console.log(err);
        
      }
    })

    socket.on("delete message", async (data) => {
      try {
        await Message.deleteOne({ _id: data.messageId });
        const messages = await getMessages(
          data.ticketId,
        )
        socket.emit("messages", messages)
        socket.to(clients.get(ticket?.creatorId.toString())).emit("messages", messages)
        ADMINS_ID.forEach((client) => {
          const clientSocketId = clients.get(client.toString());
          if (clientSocketId) {
            socket.to(clientSocketId).emit("messages", messages);
          }
        });
      } catch (error) {
        console.error("Delete message error:", error);
      }
    });

    socket.on("change status ticket", async (data) => {
      try {
        let ticket = await getTicket(data.ticketId)
        if (ticket) {
          ticket.status = data.status
          await ticket.save()
        }
        socket.emit('ticket', ticket)
        let tickets = await getTickets()
        socket.emit('tickets', tickets)
        socket.to(clients.get(ticket?.creatorId.toString())).emit("tickets", tickets)
        socket.to(clients.get(ticket?.creatorId.toString())).emit("ticket", ticket)
        ADMINS_ID.forEach((client) => {
          const clientSocketId = clients.get(client.toString());
          if (clientSocketId) {
            socket.to(clientSocketId).emit("tickets", tickets);
            socket.to(clientSocketId).emit("ticket", ticket);
          }
        });
        
      } catch (error) {
        console.error("Delete message error:", error);
      }
    });

    socket.on("new ticket", async (data) => {
      try {
        const ticket = new Ticket({
          title: data.title,
          description: data.description,
          creatorId: data.creatorId,
          status: 'open'
        });
        await ticket.save();
        console.log("новый тикет", ticket);
        let tickets = await getTickets(data.creatorId)
        socket.emit('tickets', tickets)
        tickets = await getTickets()
        ADMINS_ID.forEach((client) => {
          const clientSocketId = clients.get(client.toString());
          if (clientSocketId) {
            socket.to(clientSocketId).emit("tickets", tickets);
          }
        });
      } catch (err) {
        console.log(err);
        
      }
    })

    socket.on("disconnect", () => {
      for (const [userId, socketId] of clients.entries()) {
        if (socketId === socket.id) {
          clients.delete(userId);
          io.emit("online", Array.from(clients.keys()));
          break;
        }
      }
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
          engine.prepare(peer._internal.nodeReq);
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
