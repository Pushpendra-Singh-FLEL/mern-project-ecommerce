import asyncHandler from "../utils/asyncHandlers.js";
import { User } from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/errorHandler.js";

export const register = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({email});

    if (existingUser) {
        return next(new ApiError(400, "User already exists."));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role: 'user' });
    await user.save();
    res.status(201).json({
        success: true,
        message: "User registered successfully"
    });
});
