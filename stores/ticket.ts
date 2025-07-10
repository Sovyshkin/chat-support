import { defineStore } from "pinia";
import { io } from "socket.io-client";

export const useTicketStore = defineStore(
  "ticket",
  () => {
    const socket = ref(null);
    const isLoading = ref(false);
    const empty = ref(true);
    const content = ref("");
    const username = ref("");
    const userID = ref("");
    const ticketLoader = ref(false);
    const messages = ref([]);
    const tickets = ref([]);
    const clients = ref([]);
    const selectedTicket = ref("");
    const ticket = ref(null);
    let online = [];
    const notification = ref(false);
    const replyId = ref(null);
    const users = ref([]);
    const files = ref([]);
    const showTickets = ref(false);
    const showTicketsPred = ref(true);
    const user = ref({});

    const addMessage = async () => {
      try {
        ticketLoader.value = true;
        userID.value = user.value._id;
        console.log(files.value);

        // Если есть файлы для загрузки
        if (files.value && files.value.length > 0) {
          const formData = new FormData();

          // Добавляем все файлы в FormData
          files.value.forEach((file) => {
            formData.append("files", file);
          });

          // Добавляем метаданные сообщения
          formData.append("text", content.value);
          formData.append("senderId", userID.value);
          formData.append("senderName", user.value.name);
          formData.append("ticketId", selectedTicket.value._id);
          formData.append("userId", user.value._id);
          formData.append("replyId", replyId.value || "");

          let response = await $fetch("/api/messages/files", {
            method: "POST",
            body: formData,
          });

          if (socket.value) {
            socket.value.emit("new message with files", {
              ticketId: selectedTicket.value._id,
              creatorId: selectedTicket.value.creatorId
            });
          }
        } else {
          // Обычное текстовое сообщение
          if (socket.value) {
            socket.value.emit("new message", {
              text: content.value,
              senderId: userID.value,
              senderName: user.value.name,
              ticketId: selectedTicket.value._id,
              replyId: replyId.value,
            });
          }
        }
        content.value = "";
        replyId.value = null;
        files.value = [];
      } catch (err) {
        console.error("Ошибка при отправке сообщения:", err);
      } finally {
        ticketLoader.value = false;
      }
    };

    const deleteMessage = async (messageId) => {
      try {
        ticketLoader.value = true;
        userID.value = user.value._id;
        if (socket.value) {
          socket.value.emit("delete message", {
            messageId,
            userId1: user.value._id,
            ticketId: ticket.value._id,
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        ticketLoader.value = false;
      }
    };

    const changeStatusTicket = async (status) => {
      try {
        if (socket.value) {
          socket.value.emit("change status ticket", {
            ticketId: selectedTicket.value._id,
            status,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    const connect = () => {
      if (process.client) {
        userID.value = user.value._id;
        console.log(user.value);
        

        socket.value = io("http://localhost:3000", {
          // http://37.1.215.252 http://localhost:3000
          path: "/socket.io/",
          transports: ["websocket"],
        });

        socket.value.emit("logined", {
          userId1: user.value._id,
          ticketId: selectedTicket.value._id,
        });

        socket.value.on("messages", (data) => {
          messages.value = data;
          if (data) {
            empty.value = false;
          }
        });

        socket.value.on("tickets", (data) => {
          tickets.value = [...data];
        });

        socket.value.on("ticket", (data) => {
          selectedTicket.value = { ...data };
        });
      }
    };

    const disconnect = () => {
      if (socket.value) {
        socket.value.disconnect();
        socket.value = null;
      }
    };

    const openTicket = async (ticketOpen) => {
      try {
        selectedTicket.value = { ...ticketOpen };
        showTickets.value = false;
        showTicketsPred.value = false;
        userID.value = user.value._id;
        messages.value = await $fetch(`/api/tickets/messages`, {
          method: "POST",
          body: {
            ticketId: ticketOpen._id,
          },
        });
        
        clients.value = clients.value.map((client) => {
          if (client._id === selectedTicket.value._id) {
            return { ...client, notification: false };
          }
          return client;
        });
      } catch (err) {
        console.log(err);
      }
    };

    const openAllTickets = () => {
      try {
        showTicketsPred.value = true;
        setTimeout(() => {
          showTickets.value = true;
          showTicketsPred.value = false;
        }, 300);
      } catch (err) {
        console.log(err);
      }
    };

    const checkOnline = (name) => {
      try {
        return online.includes(name);
      } catch (err) {
        console.log(err);
      }
    };

    const createTicket = async (newTicket) => {
      try {
        isLoading.value = true;

        socket.value.emit("new ticket", {
          title: newTicket.title,
          description: newTicket.description,
          creatorId: user.value._id,
        });

      } catch (err) {
        console.log(err);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      createTicket,
      user,
      showTickets,
      showTicketsPred,
      files,
      users,
      replyId,
      deleteMessage,
      ticket,
      checkOnline,
      selectedTicket,
      openTicket,
      clients,
      tickets,
      isLoading,
      ticketLoader,
      empty,
      addMessage,
      content,
      messages,
      connect,
      disconnect,
      userID,
      notification,
      openAllTickets,
      changeStatusTicket,
    };
  },
  { persist: true }
);
