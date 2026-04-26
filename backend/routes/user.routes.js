import express from "express";

import { getAllUsers, updateUser, deleteUser } from "../controllers/user.controller.js";
import { getAllUsersRateLimiter, updateUserRateLimiter, deleteUserRateLimiter } from "../config/rateLimit.config.js";
import verificationTokenMiddleware from "../middlewares/verifyToken.middle.js";

const userRouter = express.Router();

userRouter.get("/allusers", getAllUsersRateLimiter, verificationTokenMiddleware, getAllUsers);
userRouter.put("/update", updateUserRateLimiter, verificationTokenMiddleware, updateUser);
userRouter.delete("/delete", deleteUserRateLimiter, verificationTokenMiddleware, deleteUser);

export default userRouter;