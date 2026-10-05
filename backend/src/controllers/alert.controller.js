import { getAllAlerts } from "../repositories/alert.repository.js";

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
