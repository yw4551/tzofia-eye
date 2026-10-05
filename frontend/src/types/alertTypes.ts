export type PriorityType = "low" | "medium" | "high" | "critical";
export type ArenaType = "north" | "south" | "center";
export type StatusType = "active" | "handled";

export interface AlertResponseType {
    _id: string;
    displayName: string;
    description: string;
    priority: PriorityType;
    arena: ArenaType;
    status: StatusType;
    lon: number;
    lat: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateAlertData {
    displayName: string;
    description: string;
    priority: PriorityType;
    arena: ArenaType;
    status: StatusType;
    lon: number;
    lat: number;
}

export type UpdateAlertData = Partial<CreateAlertData>;
