import {
    createAlert,
    getAllAlerts,
    getById,
} from "../repositories/alert.repository.js";

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
        throw err;
    }
};

export const getAlertByIdService = async (req, res) => {
    const { id } = req.params;

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
};

export const createAlertService = async (req, res) => {
    try {
        const { displayName, description, priority, arena, status, lon, lat } =
            req.body;

        if (
            !displayName ||
            !description ||
            !priority ||
            !arena ||
            !status ||
            !lon ||
            !lat
        ) {
            return res.status(401).json({
                success: false,
                message: "Some property is missing",
            });
        }

        const data = {
            displayName,
            description,
            priority,
            arena,
            status,
            lon,
            lat,
        };

        const alert = await createAlert(data);

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
