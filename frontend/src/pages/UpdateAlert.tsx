import type React from "react";
import { useEffect, useState } from "react";
import type {
    ArenaType,
    StatusType,
    PriorityType,
    AlertResponseType,
} from "../types/alertTypes";
import { getAlert, updateAlert } from "../api/alertApi";
import { useNavigate, useParams } from "react-router-dom";

function UpdateAlert() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [alert, setAlert] = useState<AlertResponseType | null>(null);
    const [displayName, setDisplayName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<PriorityType>("low");
    const [arena, setArena] = useState<ArenaType>("center");
    const [status, setStatus] = useState<StatusType>("active");
    const [lon, setLon] = useState(34.7818);
    const [lat, setLat] = useState(32.0853);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) {
            return;
        }

        const loadAlert = async () => {
            try {
                const data = await getAlert(id);
                setAlert(data);
                setDisplayName(data.displayName);
                setDescription(data.description);
                setPriority(data.priority);
                setArena(data.arena);
                setStatus(data.status);
                setLon(data.lon);
                setLat(data.lat);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Could not load alert",
                );
            } finally {
                setLoading(false);
            }
        };

        void loadAlert();
    }, [id]);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        if (!alert) {
            return;
        }

        setError("");

        try {
            await updateAlert(alert._id, {
                displayName: displayName.trim(),
                description: description.trim(),
                priority,
                arena,
                status,
                lon: Number(lon),
                lat: Number(lat),
            });

            navigate(`/alerts/${alert._id}`);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Could not update alert",
            );
        }
    };

    {
        loading && <p>Loading...</p>;
    }
    {
        !alert && <p>{error}</p>;
    }

    return (
        <main>
            <h1>Update Alert</h1>
            <form onSubmit={handleSubmit}>
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
                    <label htmlFor="lat">Latitude</label>
                    <input
                        type="number"
                        id="lat"
                        step="any"
                        min="29.4"
                        max="33.4"
                        value={lat}
                        onChange={(e) => setLat(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label htmlFor="lon">Longitude</label>
                    <input
                        type="number"
                        id="lon"
                        step="any"
                        min="34.2"
                        max="35.95"
                        value={lon}
                        onChange={(e) => setLon(Number(e.target.value))}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </main>
    );
}

export default UpdateAlert;
