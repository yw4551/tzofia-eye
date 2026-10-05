import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema(
    {
        displayName: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high", "critical"],
            required: true,
        },
        arena: {
            type: String,
            enum: ["north", "south", "center"],
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "handled"],
            required: true,
        },
        lon: {
            type: Number,
            required: true,
        },
        lat: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Alert = mongoose.model("Alert", AlertSchema);

export default Alert;
