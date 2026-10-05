import { getAllAlerts, getById } from "../repositories/alert.repository.js";

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
