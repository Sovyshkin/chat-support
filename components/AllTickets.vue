<script setup>
import { ref } from "vue";
import Modal from "@/components/Modal.vue";
import { useTicketStore } from "@/stores/ticket.ts";

const ticketStore = useTicketStore();
ticketStore.connect();

const showCreateTicketModal = ref(false);
const newTicketTitle = ref("");
const newTicketDescription = ref("");

const createTicket = async () => {
  if (newTicketTitle.value.trim() && newTicketDescription.value.trim()) {
    await ticketStore.createTicket({
      title: newTicketTitle.value,
      description: newTicketDescription.value,
    });
    newTicketTitle.value = "";
    newTicketDescription.value = "";
    showCreateTicketModal.value = false;
  }
};

const openCreateTicketModal = async () => {
  try {
    showCreateTicketModal.value = true;
  } catch (err) {
    console.error(err);
  }
};
</script>

<template>
  <div class="wrapper">
    <header class="header-tickets">
      <div class="emp"></div>
      <h1>Tickets</h1>
      <button class="create-ticket-btn" @click="openCreateTicketModal">
        Create a ticket
      </button>
    </header>

    <ul class="tickets">
      <li
        class="ticket"
        @click="ticketStore.openTicket(item)"
        v-for="(item, i) in ticketStore.tickets"
        :key="i"
        :class="{ selected: ticketStore.selectedTicket?._id === item._id }"
      >
        <div class="info">
          <div class="ticket-details">
            <span class="title">{{ item.title }}</span>
          </div>
        </div>
        <div class="status" :class="item.status">
          {{ item.status === 'open' ? 'Open' : 'Closed' }}
        </div>
      </li>
    </ul>

    <Modal v-if="showCreateTicketModal" @close="showCreateTicketModal = false">
      <div class="create-ticket-modal">
        <h2>New ticket</h2>

        <div class="form-group">
          <input
            type="text"
            v-model="newTicketTitle"
            placeholder="Ticket title"
            class="ticket-title-input"
          />
        </div>

        <div class="form-group">
          <textarea
            v-model="newTicketDescription"
            placeholder="Problem description"
            class="ticket-description-input"
            rows="5"
          ></textarea>
        </div>

        <AppLoader v-if="ticketStore.isLoading" />

        <button
          class="create-btn"
          @click="createTicket"
          :disabled="!newTicketTitle.trim() || !newTicketDescription.trim()"
        >
        Create a ticket
        </button>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  max-width: 500px;
  height: 100vh;
  background-color: #f8f9fc;
  border-right: 1px solid #e0e0e0;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}

.wrapper {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.header-tickets {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #fff;
}

h1 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.create-ticket-btn {
  padding: 8px 16px;
  background-color: #4a6bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.create-ticket-btn:hover {
  background-color: #3a5bef;
}

.tickets {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  list-style: none;
}

.ticket {
  width: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #fff;
}

.ticket:hover {
  background-color: #f5f7ff;
}

.selected {
  background-color: #e6eefe;
}

.info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.ticket-priority {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.ticket-priority.low {
  background-color: #4caf50;
}
.ticket-priority.medium {
  background-color: #ffc107;
}
.ticket-priority.high {
  background-color: #ff9800;
}
.ticket-priority.critical {
  background-color: #f44336;
}

.ticket-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ticket-details .title {
  font-weight: 500;
  font-size: 0.95rem;
}

.ticket-details .category {
  font-size: 0.8rem;
  color: #666;
}

.status {
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.status.open {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status.closed {
  background-color: #ffebee;
  color: #c62828;
}

/* Стили для модального окна */
.create-ticket-modal {
  padding: 20px;
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 8px;
}

.create-ticket-modal h2 {
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-row .form-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #555;
}

.ticket-title-input,
.ticket-description-input,
.priority-select,
.category-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.95rem;
}

.ticket-description-input {
  resize: vertical;
  min-height: 100px;
}

.priority-select,
.category-select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 10px;
}

.create-btn {
  width: 100%;
  padding: 12px;
  background: #4a6bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 10px;
}

.create-btn:hover {
  background: #3a5bef;
}

.create-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>~/stores/ticket