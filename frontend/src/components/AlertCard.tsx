import { Link } from "react-router-dom";
import type { AlertResponseType } from "../types/alertTypes";

interface AlertCardProps {
    alert: AlertResponseType;
    onDelete: (id: string) => void;
}

function AlertCard({ alert, onDelete }: AlertCardProps) {
    return (
        <div>
            <h2>{alert.displayName}</h2>
            <p>{alert.description}</p>
            <p>Priority: {alert.priority}</p>
            <p>Status: {alert.status}</p>
            <p>Arena: {alert.arena}</p>

            <Link to={`/alerts/${alert._id}`}>View</Link>
            <button onClick={() => onDelete(alert._id)}>Delete</button>
        </div>
    );
}

export default AlertCard;
