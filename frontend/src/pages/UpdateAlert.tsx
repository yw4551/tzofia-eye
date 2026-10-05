import type React from "react";
import { useState } from "react";
import type {
    ArenaType,
    StatusType,
    PriorityType,
    AlertResponseType,
} from "../types/alertTypes";
import { updateAlert } from "../api/alertApi";

function UpdateAlert() {
    const [alert, setAlert] = useState<AlertResponseType | null>(null);
    const [displayName, setDisplayName] = useState(alert?.displayName || "");
    const [description, setDescription] = useState(alert?.description || "");
    const [priority, setPriority] = useState<PriorityType>(
        alert?.priority || "low",
    );
    const [arena, setArena] = useState<ArenaType>(alert?.arena || "center");
    const [status, setStatus] = useState<StatusType>(alert?.status || "active");
    const [lon, setLon] = useState(alert?.lon || 0);
    const [lat, setLat] = useState(alert?.lat || 0);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        const updatedAlert = {
            displayName,
            description,
            priority,
            arena,
            status,
            lon,
            lat,
        };

        if (!alert) return;

        await updateAlert(alert._id, updatedAlert);
    };
    return (
        <main>
            <h1>Create Alert</h1>
            <form>
                <div>
                    <label htmlFor="name">Display name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter the display name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        placeholder="Enter your description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={(e) =>
                            setPriority(e.target.value as PriorityType)
                        }
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="arena">Arena</label>
                    <select
                        id="arena"
                        value={arena}
                        onChange={(e) => setArena(e.target.value as ArenaType)}
                    >
                        <option value="center">Center</option>
                        <option value="south">South</option>
                        <option value="north">North</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value as StatusType)
                        }
                    >
                        <option value="active">Active</option>
                        <option value="handled">Handled</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="lon">Longitude</label>
                    <input
                        type="number"
                        id="lon"
                        value={lon}
                        onChange={(e) => setLon(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label htmlFor="lat">Latitude</label>
                    <input
                        type="number"
                        id="lat"
                        value={lat}
                        onChange={(e) => setLat(Number(e.target.value))}
                    />
                </div>
                <button type="submit" onClick={() => handleSubmit}>
                    Update
                </button>
            </form>
        </main>
    );
}

export default UpdateAlert;
