import type {
    AlertResponseType,
    CreateAlertData,
    UpdateAlertData,
} from "../types/alertTypes";

const VITE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

interface AllAlertsResponse {
    success: true;
    data: {
        alerts: AlertResponseType[];
    };
}

interface AlertResponse {
    success: true;
    data: {
        alert: AlertResponseType;
    };
}

export const getAllAlerts = async (): Promise<AlertResponseType[]> => {
    const response = await fetch(`${VITE_URL}/alerts`);

    if (!response.ok) {
        throw new Error("Failed to load alerts");
    }

    const result: AllAlertsResponse = await response.json();

    return result.data.alerts;
};

export const getAlert = async (id: string): Promise<AlertResponseType> => {
    const response = await fetch(`${VITE_URL}/alerts/${id}`);

    if (!response.ok) {
        throw new Error("Failed to load the alert");
    }

    const result: AlertResponse = await response.json();

    return result.data.alert;
};

export const createAlert = async (
    data: CreateAlertData,
): Promise<AlertResponseType> => {
    const response = await fetch(`${VITE_URL}/alerts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to create an alert");
    }

    const result: AlertResponse = await response.json();

    return result.data.alert;
};

export const updateAlert = async (
    id: string,
    data: UpdateAlertData,
): Promise<AlertResponseType> => {
    const response = await fetch(`${VITE_URL}/alerts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to update alert");
    }

    const result: AlertResponse = await response.json();

    return result.data.alert;
};

export const deleteAlert = async (id: string): Promise<void> => {
    const response = await fetch(`${VITE_URL}/alerts/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete alert");
    }
};
