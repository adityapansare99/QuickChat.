import { Router } from "express";
import {
  register,
  login,
  updateProfile,
  getProfile,
} from "../controllers/user.contoller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const userrouter = Router();

userrouter.route("/register").post(register);
userrouter.route("/login").post(login);
userrouter
  .route("/update-profile")
  .post(auth, upload.single("image"), updateProfile);
userrouter.route("/get-profile").get(auth, getProfile);

export default userrouter;
