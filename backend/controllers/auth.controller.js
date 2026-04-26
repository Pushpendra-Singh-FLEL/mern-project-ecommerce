import asyncHandler from "../utils/asyncHandlers.js";
import User from "../models/user.model.js";
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

    const canonicalizedEmail = email.trim().toLowerCase();
    const canonicalizedUsername = username.trim().toLowerCase();

    const existingUser = await User.findOne({
        $or: [{ email: canonicalizedEmail }, { username: canonicalizedUsername }],
    });

    if (existingUser) {
        throw new ApiError(400, "User with this email or username already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10);

    const user = new User({
        username: canonicalizedUsername,
        email: canonicalizedEmail,
        password: hashedPassword
    });

    await user.save();

    res.status(201).json({
        success: true,
        message: "User registered successfully"
    });
});

export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required.");
    }

    const canonicalizedEmail = email.trim().toLowerCase();
    
    const user = await User.findOne({ email: canonicalizedEmail }).select("+password");

    if (!user) {
        throw new ApiError(401, "Invalid credentials.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials.");
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    res
        .status(200)
        .cookie("token", token, cookieOptions)
        .json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            token,
        });
});
