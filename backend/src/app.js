import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());


import router from "./routes/healtcheck.route.js";
app.use("/", router);

import userRouter from "./routes/user.route.js";
app.use("/user", userRouter);

export { app };