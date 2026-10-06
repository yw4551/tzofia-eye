import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        role: {
            type: String,
            enum: ["arena_user", "general_user", "admin"],
            required: true,
        },
        assignedArena: {
            type: String,
            enum: ["north", "south", "center", "all"],
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model("User", AuthSchema);

export default User;
