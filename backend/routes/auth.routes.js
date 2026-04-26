import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import errorMiddleware from "../middlewares/error.middle.js";
import { loginRateLimiter } from "../config/rateLimit.config.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", loginRateLimiter, login);

export default authRouter;