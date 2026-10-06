import type { LoginData, RegisterData, UserTypes } from "../types/authTypes";

const VITE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

interface AuthResponse {
    success: true;
    data: {
        token: string;
        user: UserTypes;
    };
}

export const registerApi = async (
    data: RegisterData,
): Promise<AuthResponse["data"]> => {
    const response = await fetch(`${VITE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to register user");
    }

    const result = response.json();
    return result;
};

export const loginApi = async (
    data: LoginData,
): Promise<AuthResponse["data"]> => {
    const response = await fetch(`${VITE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    const result = await response.json();
    return result;
};

export const getMeApi = async (token: string) => {
    const response = await fetch(`${VITE_URL}/auth/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to load the user me");
    }

    const result = await response.json();
    return result;
};
