import asyncHandler from "../utils/asyncHandlers.js";
import { User } from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../utils/errorHandler.js";

export const register = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new ApiError(400, "Username, email and password are required.");
    }

    if (password.length < 6) {
        throw new ApiError(400, "Password must be at least 6 characters long.");
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (existingUser) {
        throw new ApiError(400, "User with this email or username already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS || 10);

    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    
    res.status(201).json({
        success: true,
        message: "User registered successfully"
    });
});

export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new ApiError(400, "Invalid email.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid email or password.");
    }

    res.status(200).json({
        success: true,
        message: "Login successful"
    });
});
