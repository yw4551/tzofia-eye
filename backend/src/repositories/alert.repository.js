import Alert from "../modules/alert.model.js";

export const getAllAlerts = async () => {
    const alerts = await Alert.find();
    return alerts;
};
