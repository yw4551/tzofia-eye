import { create } from "zustand";
import type { assignedArenaTypes, UserTypes } from "../types/authTypes";
import { getMeApi, loginApi, registerApi } from "../api/authApi";

interface AuthStoreTypes {
    user: UserTypes | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    initialize: () => Promise<void>;
    login: (username: string, password: string) => Promise<void>;
    register: (
        username: string,
        email: string,
        password: string,
        assignedArena: assignedArenaTypes,
    ) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthStoreTypes>((set) => ({
    user: null,
    token: localStorage.getItem("auth_token"),
    loading: false,
    error: null,
    initialize: async () => {
        const token = localStorage.getItem("auth_token");
        if (!token) {
            return;
        }

        set({
            loading: true,
            error: null,
        });

        try {
            const user = await getMeApi(token);
            set({
                user,
                token,
                loading: false,
            });
        } catch {
            localStorage.removeItem("auth_token");
            set({
                user: null,
                token: null,
                loading: false,
            });
        }
    },
    login: async (username, password) => {
        set({
            loading: false,
            error: null,
        });
        try {
            const result = await loginApi({ username, password });
            localStorage.setItem("auth_token", result.token);
            set({
                user: result.user,
                token: result.token,
                loading: false,
            });
        } catch (err) {
            set({
                error: err instanceof Error ? err.message : "Login Failed",
                loading: false,
            });
        }
    },
    register: async (username, email, password, assignedArena) => {
        set({
            loading: true,
            error: null,
        });

        try {
            const result = await registerApi({
                username,
                email,
                password,
                assignedArena,
            });
            localStorage.setItem("auth_token", result.token);
            set({
                user: result.user,
                token: result.token,
                loading: false,
            });
        } catch (err) {
            set({
                error:
                    err instanceof Error ? err.message : "Registration failed",
                loading: false,
            });
        }
    },
    logout: () => {
        localStorage.removeItem("auth_token");
        set({
            user: null,
            token: null,
        });
    },
}));
