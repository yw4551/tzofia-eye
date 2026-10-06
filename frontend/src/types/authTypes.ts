type roleTypes = "arena_user" | "general_user" | "admin";
export type assignedArenaTypes = "north" | "south" | "center" | "all";

export interface UserTypes {
    id: string;
    username: string;
    email: string;
    role: roleTypes;
    assignedArena: assignedArenaTypes;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    assignedArena: assignedArenaTypes;
}

export interface LoginData {
    username: string;
    password: string;
}
