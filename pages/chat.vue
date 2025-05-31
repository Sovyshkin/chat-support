<script setup>
import { ref, watch, nextTick, onMounted } from "vue";
import AppLoader from "@/components/AppLoader.vue";
import ChatLoader from "@/components/ChatLoader.vue";
import AppEmpty from "@/components/AppEmpty.vue";

const chatStore = useChatStore();
chatStore.connect();

const messagesContainer = ref(null); // Создаем ref для контейнера сообщений
// const toast = useToast()

const handleEnter = (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatStore.addMessage();
  }
};

// Функция для прокрутки к последнему сообщению
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      console.log(messagesContainer.value);
      messagesContainer.value.scrollTo({
        top: messagesContainer.value.scrollHeight,
        behavior: "smooth",
      });
    }
  });
};

watch(
    () => chatStore.messages,
    () => {
      // console.log('новое сообщение');
      chatStore.isLoading = false
      scrollToBottom();
      // toast.add({ title: 'новое сообщение' })
    },
    { deep: true, immediate: true }
);

// Прокручиваем к последнему сообщению при монтировании компонента
onMounted(() => {
  scrollToBottom();
});
</script>

<template>
  <div class="wrapper">
    <!-- <UNotifications/> -->
    <AllChats/>
    <div class="chat">
      <div class="messages" v-if="!chatStore.empty && !chatStore.isLoading" ref="messagesContainer">
        <div
          class="wrap-message"
          v-for="message in chatStore.messages"
          :key="message._id"
          :class="{ user: message.userID == chatStore.userID }"
        >
          <div
            class="group-message"
            :class="{ userGroupMessage: message.userID == chatStore.userID }"
          >
            <div
              class="message"
              v-html="message.content"
              :class="{ userMessage: message.userID == chatStore.userID }"
            >
            </div>
            <div class="avatar">
              <img
                src="../assets/image.png"
                alt=""
                v-if="message.userID == chatStore.userID"
              />
              <img
                src="../assets/gpt.svg"
                alt=""
                v-else
              />
            </div>
            <div class="username" :class="{ me: message.userID == chatStore.userID }">{{ message.sender }}</div>
          </div>
        </div>
      </div>
      <AppEmpty v-if="chatStore.empty"/>
      <ChatLoader class="left" v-if="chatStore.chatLoader"/>
      <div class="group-send">
        <input
          type="text"
          class="group-item"
          v-model="chatStore.content"
          @keydown.enter="handleEnter"
          placeholder="начни писать..."
        />
        <img
          class="send"
          src="../assets/send.svg"
          @click="chatStore.addMessage"
          alt=""
          v-if="!chatStore.isLoading"
        />
        <AppLoader v-if="chatStore.isLoading" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
}

h1 {
    text-align: center;
    font-weight: 600;
    font-size: 25px;
    line-height: 30px;
    padding: 20px 0;
}

.chat {
  width: 100%;
  height: 100vh;
  max-width: 1440px;
}

input[type="file"] {
  border: none;
  display: none;
}

.group-file {
  display: flex;
  align-items: center;
  justify-content: center;
}

label {
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.messages {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  height: 92vh;
  background-color: #f8f9fc;
  padding: 20px;
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: column;
  gap: 35px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.messages::-webkit-scrollbar {
  width: 0;
}

.wrap-message {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.user {
  justify-content: flex-end;
}

.group-message {
    position: relative;
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: start;
  gap: 10px;
  flex-direction: row-reverse;
  padding-right: 38px;
  padding-left: 0;
}

.userGroupMessage {
  flex-direction: row;
  padding-left: 38px;
  padding-right: 0;
  justify-content: end;
}

.message {
  max-width: 600px;
  width: fit-content;
  background-color: #e6eefe;
  padding: 20px;
  border-radius: 4px 12px 12px 12px;
}
.userMessage {
  background-color: #fff;
  border-radius: 12px 4px 12px 12px;
}

.group-item {
  line-height: 22px;
  font-size: 14px;
  width: 100%;
  outline: none;
}

.group-send {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 13px 16px;
  border-radius: 8px;
  border: 1px solid #dfe3ec;
  background-color: #fff;
}

.send {
  cursor: pointer;
  transition: all 500ms ease;
  width: 30px;
  width: 30px;
}

.send:hover {
  transform: translateY(-3px);
}
.avatar {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  overflow: hidden; /* Обрезает изображение, если оно выходит за пределы блока */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0; /* Фон на случай, если изображение не загрузится */
  box-sizing: border-box;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  display: block; /* Убирает лишние пробелы */
  border: none; /* Убирает возможные границы */
  padding: 0; /* Убирает возможные отступы */
  margin: 0;
}

.doc {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.info {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 500;
  font-size: 12px;
  line-height: 16.8px;
}

.left {
  width: 100%;
  display: flex;
  justify-content: start;
  padding-left: 20px;
}


.username {
    position: absolute;
    width: fit-content;
    top: -20px;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 10;
    font-weight: 500;
    font-size: 12px;
    line-height: 16.8px;
    color: black;
  }

  .me {
    left: auto;
    right: 0;
    transform: none;
  }
</style>
