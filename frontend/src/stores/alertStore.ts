import { deleteAlert, getAllAlerts } from "../api/alertApi";
import type { AlertResponseType } from "../types/alertTypes";
import { create } from "zustand";

interface AlertStore {
    alerts: AlertResponseType[];
    loading: boolean;
    error: string | null;
    loadAlerts: () => Promise<void>;
    removeAlert: (id: string) => Promise<void>;
}

export const useAlertStore = create<AlertStore>((set) => ({
    alerts: [],
    loading: false,
    error: null,
    loadAlerts: async () => {
        try {
            set({
                loading: true,
                error: null,
            });

            const alerts = await getAllAlerts();

            set({
                alerts,
                loading: false,
            });
        } catch (err) {
            set({
                loading: false,
                error:
                    err instanceof Error ? err.message : "Something went wrong",
            });
        }
    },
    removeAlert: async (id: string) => {
        await deleteAlert(id);

        set((state) => ({
            alerts: state.alerts.filter((alert) => alert._id !== id),
        }));
    },
}));
