import { z } from "zod";

export const addAlertSchema = z.object({
    displayName: z
        .string()
        .trim()
        .max(100, "The name is too long")
        .min(1, "The name cannot be empty"),
    description: z
        .string()
        .trim()
        .min(1, "The description cannot be empty")
        .max(1000, "The description is too long"),
    priority: z.enum(["low", "medium", "high", "critical"]),
    arena: z.enum(["north", "south", "center"]),
    status: z.enum(["active", "handled"]),
    lon: z.number(),
    lat: z.number(),
});

export const updateAlertSchema = z.object({
    displayName: z
        .string()
        .trim()
        .max(100, "The name is too long")
        .min(1, "The name cannot be empty")
        .optional(),
    description: z
        .string()
        .trim()
        .min(1, "The description cannot be empty")
        .max(1000, "The description is too long")
        .optional(),
    priority: z.enum(["low", "medium", "high", "critical"]).optional(),
    status: z.enum(["active", "handled"]).optional(),
});
