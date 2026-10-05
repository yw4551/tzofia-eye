import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { AlertResponseType } from "../types/alertTypes";
import { getAlert } from "../api/alertApi";

function AlertDetails() {
    const { id } = useParams();
    const [alert, setAlert] = useState<AlertResponseType | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadAlert = async () => {
            if (!id) {
                setLoading(false);
                return;
            }

            try {
                const alertData = await getAlert(id);
                setAlert(alertData);
            } catch {
                setAlert(null);
            } finally {
                setLoading(false);
            }
        };

        loadAlert();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!alert) {
        return (
            <main>
                <p>Alert not found</p>
                <Link to="/alerts">Back to alerts</Link>
            </main>
        );
    }

    return (
        <main>
            <h1>{alert.displayName}</h1>
            <p>{alert.description}</p>
            <p>Priority: {alert.priority}</p>
            <p>Status: {alert.status}</p>
            <p>Arena: {alert.arena}</p>
            <p>Latitude: {alert.lat}</p>
            <p>Longitude: {alert.lon}</p>

            <Link to="/alerts">Back to alerts</Link>
        </main>
    );
}

export default AlertDetails;
