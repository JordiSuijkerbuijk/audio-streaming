const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log(`a user connected`);
  console.log();

  socket.on("disconnect", () => console.log("a user disconnected"));

  socket.on("message", ({ data }) => {
    io.sockets.sockets.forEach((sid) => {
      if (socket.id === sid) return;
      else io.to(sid.id).emit("audio", { data });
    });
  });
});

http.listen(3000, () => console.log(`SERVER listening on port ${3000}`));
