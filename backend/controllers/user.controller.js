import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandlers.js";

const userController = express.Router();

export const getAllUsers = asyncHandler(async (req, res, next) => {
    // TODO: Implement logic to fetch all users from the database
    res.status(200).json({ message : "Get all users successful" });
});

export const updateUser = asyncHandler(async (req, res, next) => {
    // TODO: Implement logic to update user details in the database
    res.status(200).json({ message : "Update user successful" });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
    // TODO: Implement logic to delete a user from the database
    res.status(200).json({ message : "Delete user successful" });
});