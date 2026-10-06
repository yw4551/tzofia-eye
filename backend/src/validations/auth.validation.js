import { z } from "zod";

export const createUserData = z.object({
    username: z.string().trim().min(10),
    email: z.email().trim(),
    password: z.string().trim().min(8).max(20),
    role: z.enum(["arena_user", "general_user", "admin"]),
    assignedArena: z.enum(["north", "south", "center", "all"]),
});

export const loginUserData = z.object({
    username: z.string().trim().min(10),
    password: z.string().trim().min(8).max(20),
});
