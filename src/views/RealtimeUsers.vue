<template>
  <div class="user-count">
    <h2>Active Users:</h2>
    <p class="number">{{ users }}</p>
  </div>
</template>

<script>
import { io } from "socket.io-client";

export default {
  name: "RealtimeUsers",
  data() {
    return {
      users: 0,
      socket: null,
    };
  },
  mounted() {
    this.socket = io("http://localhost:3000"); // Change to your backend URL
    this.socket.on("users", (count) => {
      this.users = count;
    });
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};
</script>

<style scoped>
.user-count {
  font-family: "Segoe UI", sans-serif;
  background: #1a1a1a;
  color: #00ff88;
  padding: 20px;
  border-radius: 10px;
  max-width: 250px;
  text-align: center;
  box-shadow: 0 0 10px #00ff88;
}
.number {
  font-size: 2.5rem;
  font-weight: bold;
}
</style>
