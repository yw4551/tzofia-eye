import Alert from "../modules/alert.model.js";

export const getAllAlerts = async () => {
    const alerts = await Alert.find();
    return alerts;
};

export const getById = async (id) => {
    const alert = await Alert.findById(id);
    return alert;
};
