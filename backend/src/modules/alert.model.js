import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema(
    {
        displayName: {
            type: String,
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
        },
        area: {
            type: String,
            enum: ["north", "south", "center"],
        },
        status: {
            type: String,
            enum: ["active", "handled"],
        },
        lon: {
            type: Number,
        },
        lat: {
            type: Number,
        },
    },
    {
        timestamps: true,
    },
);

const Alert = mongoose.model("Alert", AlertSchema);

export default Alert;
