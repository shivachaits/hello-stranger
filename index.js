const express=require("express");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");

const port = process.env.PORT || 3000;

let onlineUsers = 0;

io.on("connection", (socket) => {
  onlineUsers++;
  io.emit("users online", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers--;
    io.emit("users online", onlineUsers);
  });

  socket.on("chat message", ({ username, message }) => {
    io.emit("chat message", { username, message });
  });
});


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname+"/login.html"));
});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname+"/index.html"));
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
