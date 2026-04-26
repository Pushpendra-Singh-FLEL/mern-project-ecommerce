import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import errorMiddleware from "../middlewares/error.middle.js";

const authRouter = express.Router();

authRouter.post("/register", register, errorMiddleware);
authRouter.post("/login", login, errorMiddleware);

export default authRouter;