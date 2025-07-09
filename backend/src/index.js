import { app } from "./app.js";
import dotenv from "dotenv";
import { dbconnection } from "./db/index.js";
import { Server, Socket } from "socket.io";
import http from "http"; 

dotenv.config({
  path: "./.env",
});

const server = http.createServer(app);

//init socket.io server
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

//store online users
export const userSocketMap = {}; //{userId:socketId}

//socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("user connected: ", userId);

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  //emit online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected: ", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

const port = process.env.port || 8002;

dbconnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(`Error in db connection ${err}`);
  });
