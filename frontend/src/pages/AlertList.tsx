import { useEffect } from "react";
import { useAlertStore } from "../stores/alertStore";
import { Link } from "react-router-dom";
import AlertCard from "../components/AlertCard";

function AlertList() {
    const { alerts, loading, error, loadAlerts, removeAlert } = useAlertStore();

    useEffect(() => {
        loadAlerts();
    }, [loadAlerts]);

    const handleDelete = async (id: string) => {
        try {
            await removeAlert(id);
        } catch {
            alert("Could not delete the alert");
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
                <AlertCard
                    key={alert._id}
                    alert={alert}
                    onDelete={handleDelete}
                />
            ))}
        </main>
    );
}

export default AlertList;
