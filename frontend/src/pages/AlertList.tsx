import { useEffect } from "react";
import { useAlertStore } from "../stores/alertStore";
import { Link, useNavigate } from "react-router-dom";
import AlertCard from "../components/AlertCard";

function AlertList() {
    const { alerts, loading, error, loadAlerts, removeAlert } = useAlertStore();
    const navigate = useNavigate();

    useEffect(() => {
        loadAlerts();
    }, [loadAlerts]);

    const handleDelete = async (id: string) => {
        try {
            await removeAlert(id);
        } catch {
            throw new Error("Could not delete the alert");
        }
    };

    const handleUpdate = async (id: string) => {
        try {
            navigate(`/alerts/${id}/edit`);
        } catch {
            throw new Error("Could not delete the alert");
        }
    };
    return (
        <main>
            <h1>Alerts</h1>
            <Link to={"/alerts/new"}>Create Alert</Link>

            {loading && <p>Loading...</p>}

            {error && <p>{error}</p>}

            {!loading && alerts.length === 0 && <p>No alerts yet</p>}

            {alerts.map((alert) => (
                <div key={alert._id}>
                    <AlertCard
                        alert={alert}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                </div>
            ))}
        </main>
    );
}

export default AlertList;
