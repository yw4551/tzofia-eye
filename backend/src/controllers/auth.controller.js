import mongoose from "mongoose";
import {
    createUser,
    getUserById,
    getAllUsers,
    deleteUser,
    findUserByUsername,
} from "../repositories/auth.repository.js";
import { createUserData } from "../validations/auth.validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginUserData } from "../validations/auth.validation.js";
import { z } from "zod";

export const getAllUsersController = async (req, res) => {
    try {
        const response = await getAllUsers();
        const users = response.map((user) => {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                assignedArena: user.assignedArena,
            };
        });

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

        const user = await getUserById(id);

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
        const data = createUserData.parse(req.body);
        const exists = await findUserByUsername(data.username);

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
                : "arena_user";

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
        if (err.name === z.ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: err.error.issues,
            });
        }

        res.status(500).json({
            success: false,
            message: err.message || "Initial server error",
        });
    }
};

export const login = async (req, res) => {
    try {
        const data = loginUserData.parse(req.body);
        const user = await findUserByUsername(data.username);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const validateUser = await bcrypt.compare(
            data.password,
            user.passwordHash,
        );

        if (!validateUser) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = createToken(user);

        res.json({
            success: true,
            data: {
                token,
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
        if (err.name === z.ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: err.error.issues,
            });
        }

        res.status(500).json({
            success: false,
            message: err.message || "Internal server error",
        });
    }
};

export const getMe = async (req, res) => {
    const user = req.user;

    res.json({
        success: true,
        data: {
            user,
        },
    });
};

export const removeUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID",
            });
        }

        const user = await deleteUser(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.json({
            success: true,
            data: {
                message: "User deleted successfully",
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Initial server error",
        });
    }
};
