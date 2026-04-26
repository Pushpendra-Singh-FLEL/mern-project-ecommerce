import asyncHandler from "../utils/asyncHandlers.js";
import { User } from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({email});

    if (existingUser) {
        return res.status(400).end("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role: 'user' });
    await user.save();
    res.end("User registered successfully");
});
