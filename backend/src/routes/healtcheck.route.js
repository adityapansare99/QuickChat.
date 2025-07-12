import { Router } from "express";
import { health } from "../controllers/healthcheck.controller.js";

const router = Router();

router.route("/").get(health);

export default router;
