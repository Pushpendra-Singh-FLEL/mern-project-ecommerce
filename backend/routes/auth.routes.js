import express from "express";
import { register } from "../controllers/auth.controller.js";
import errorMiddleware from "../middlewares/error.middle.js";

const authRouter = express.Router();

authRouter.post("/register", register, errorMiddleware);

export default authRouter;