// backend/socketServer.js
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*", // allow all origins (adjust as needed)
  },
});

let onlineUsers = 0;

io.on("connection", (socket) => {
  onlineUsers++;
  io.emit("users", onlineUsers); // emit to all clients

  socket.on("disconnect", () => {
    onlineUsers--;
    io.emit("users", onlineUsers);
  });
});

server.listen(3000, () => {
  console.log("Socket.IO server running on http://localhost:5173");
});
