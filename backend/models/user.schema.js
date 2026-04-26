import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],  // Custom error message if username is not provided
            unique: true,  // Ensure usernames are unique
            trim: true, // Remove whitespace from both ends of the string
            minlength: [3, "Username must be at least 3 characters long"],
            maxlength: [30, "Username cannot exceed 30 characters"],
            match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            select: false, // Exclude password from query results by default
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", userSchema);
