<script setup>
const chatStore = useChatStore()
chatStore.connect()
</script>
<template>
    <div class="wrapper">
        <ul class="chats">
            <li class="chat" @click="chatStore.openChat(item.name, item._id)" v-for="item in chatStore.clients" :key="item._id" :class="{ selected: chatStore.selectedChat == item.name }">
                <div class="info">
                    <img src="../assets/gpt.svg" alt="">
                    <span class="name">{{ item.name }}</span>
                </div>
                <div class="online" v-if="item.online && !item.notification"></div> <!-- ФИШКА -->
                <div class="offline" v-if="!item.online && !item.notification"></div>
                <AppNotification v-if="item.notification"/>
            </li>
        </ul>
    </div>
</template>
<style scoped>
.wrapper {
    width: 100%;
    max-width: 500px;
    height: 100vh;
  background-color: #f8f9fc;
  border-right: 1px solid black;
  overflow-x: hidden;
  overflow-y: scroll;
}

.wrapper {
    -ms-overflow-style: none; /* IE и Edge */
    scrollbar-width: none; /* Firefox */
  }

.chats {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.chat {
    width: 100%;
    padding: 20px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid black;
    cursor: pointer;
    transition: all 500ms ease;
}

.selected {
    background-color: #e6eefe;
}

.info {
    display: flex;
    align-items: center;
    gap: 15px;
}

.online {
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background-color: rgb(76, 211, 76);
}

.offline {
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background-color: rgb(219, 60, 32);
}

.chat:hover {
    transform: scale(1.02);
}
</style>