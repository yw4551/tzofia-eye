import z, { success } from "zod";
import {
    createAlert,
    deleteAlert,
    getAllAlerts,
    getById,
    updateAlert,
} from "../repositories/alert.repository.js";
import {
    addAlertSchema,
    updateAlertSchema,
} from "../validations/alert.validation.js";
import mongoose from "mongoose";

export const getAllAlertsService = async (req, res) => {
    try {
        const alerts = await getAllAlerts();

        res.json({
            success: true,
            data: {
                alerts,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Initial server error",
        });
    }
};

export const getAlertByIdService = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid object ID",
            });
        }

        const alert = await getById(id);

        if (!alert) {
            return res.status(404).json({
                success: false,
                message: "Alert not found",
            });
        }

        res.json({
            success: true,
            data: {
                alert,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Initial server error",
        });
    }
};

export const createAlertService = async (req, res) => {
    try {
        const validatedData = addAlertSchema.parse(req.body);
        const alert = await createAlert(validatedData);

        res.status(201).json({
            success: true,
            data: {
                alert,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Initial server error",
        });
    }
};

export const deleteAlertService = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid object ID",
            });
        }

        const alert = await deleteAlert(id);

        if (!alert) {
            return res.status(404).json({
                success: false,
                message: "Alert not found",
            });
        }

        res.json({
            success: true,
            data: {
                message: "Alert deleted successfully",
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Initial server error",
        });
    }
};

export const updateAlertService = async (req, res) => {
    try {
        const { id } = req.params;

        if (!isValidId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid alert ID",
            });
        }

        const validatedData = updateAlertSchema.parse(req.body);

        if (Object.keys(validatedData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "You must have at least one value to update",
            });
        }

        const alert = await updateAlert(id, validatedData);

        res.status(201).json({
            success: true,
            data: {
                alert,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Initial server error",
        });
    }
};
