import mongoose from "mongoose";
import {
    createUser,
    findUserByUsername,
    getAllUsers,
} from "../repositories/auth.repository.js";
import { createUserSchema } from "../validations/auth.validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();

        res.json({
            success: true,
            data: {
                users,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Could not load users",
        });
    }
};

export const getUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID",
            });
        }

        const user = await getUserByUsername(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.json({
            success: true,
            data: {
                user,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Initial server error",
        });
    }
};

const createToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

export const register = async (req, res) => {
    try {
        const data = createUserSchema.parse(req.body);
        const exists = findUserByUsername(data.email);

        if (exists) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        const passwordHash = await bcrypt.hash(data.password, 12);
        const role =
            data.email.toLowerCase() === process.env.ADMIN_EMAIL
                ? "admin"
                : "user";

        const user = await createUser({
            username: data.username,
            email: data.email.toLowerCase(),
            passwordHash,
            role,
            assignedArena: data.assignedArena,
        });

        const token = createToken(user);

        return res.status(201).json({
            success: true,
            token,
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    assignedArena: user.assignedArena,
                },
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Initial server error",
        });
    }
};
