import { z } from "zod";

export const createUserSchema = z.object({
    username: z.string().trim().min(10),
    email: z.email().trim(),
    password: z.string().trim().min(8).max(100),
    role: z.enum(["arena_user", "general_user", "admin"]),
    assignedArena: z.enum(["north", "south", "center", "all"]),
});
