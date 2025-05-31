import { defineStore } from "pinia";
import { io } from "socket.io-client";

export const useChatStore = defineStore(
  "chat",
  () => {
    const socket = ref(null);
    const isLoading = ref(false);
    const empty = ref(true);
    const auth = useAuthStore();
    const content = ref("");
    const username = ref("");
    const userID = ref("");
    const chatLoader = ref(false);
    const messages = ref([]);
    const chats = ref([])
    const clients = ref([])
    const selectedChat = ref("")
    let online = []
    const notification = ref(false)

    const addMessage = async () => {
      try {
        chatLoader.value = true;
        username.value = auth.user.name;
        userID.value = auth.user._id;
        if (socket.value) {
          socket.value.emit("new message", {
            content: content.value,
            sender: username.value || auth.user.email,
            userID: userID.value,
            receiver: selectedChat.value
          });
          content.value = ''
        }
      } catch (err) {
        console.log(err);
      } finally {
        chatLoader.value = false;
      }
    };

    const connect = () => {
      if (process.client) {
        userID.value = auth.user._id;

        socket.value = io("ws://localhost:3000");

        socket.value.emit('logined', {
          name: auth.user.name,
          receiver: selectedChat.value,
        })

        socket.value.on("messages", (data) => {
          messages.value = data;
          if (data.length > 0) {
            empty.value = false
          }
        });

        socket.value.on('chats', (data) => {
          clients.value = data || []
          // console.log(online.value);
        })
        socket.value.on('online', (data) => {
          online = data || []
          online.forEach((item) => {
            for (let client of clients.value) {
              if (item == client.name) {
                client.online = true
              }
            }
          })

          // console.log(online.value);
        })

        socket.value.on('notification', (name) => {
          for (let client of clients.value) {
            if (client.name == name) {
              client.notification = true
            }
          }
        })
      }
    };

    const disconnect = () => {
      if (socket.value) {
        socket.value.disconnect();
        socket.value = null;
      }
    };

    const openChat = async (username, id) => {
      try {
        selectedChat.value = username
        messages.value = await $fetch('/api/messages/chat', {
          method: 'POST',
          body: {
            sender: auth.user.name,
            receiver: username
          }
        })
        for (let client of clients.value) {
          if (client._id = id) {
            client.notification = false
          }
        }
      } catch (err) {
        console.log(err);
        
      }
    }

    const checkOnline = (name) => {
      try {
        return online.includes(name)
      } catch (err) {
        console.log(err);
        
      }
    }
    return {
      checkOnline,
      selectedChat,
      openChat,
      clients,
        chats,
      isLoading,
      chatLoader,
      empty,
      addMessage,
      content,
      messages,
      connect,
      disconnect,
      userID,
      notification
    };
  },
  { persist: true }
);
