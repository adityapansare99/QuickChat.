import { app } from "./app.js";
import dotenv from "dotenv";
import { dbconnection } from "./db/index.js";
import { Server, Socket } from "socket.io";

dotenv.config({
  path: "./.env",
});

//init socket.io server
export const io = new Server(Server, {
  cors: {
    origin: "*",
  },
});

//store online users
export const userSocketMap={}; //{userId:socketId}

//socket.io connection handler
io.on("connection",(socket)=>{
  
})

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
