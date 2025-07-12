import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));
app.use(cookieParser());

import router from "./routes/healtcheck.route.js";
app.use("/", router);

import userRouter from "./routes/user.route.js";
app.use("/user", userRouter);

import messagerouter from "./routes/message.route.js";
app.use("/message", messagerouter);

export { app };
