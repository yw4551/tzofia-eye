import { Link, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

function ProtectedRoute() {
    const user = useAuthStore((state) => state.user);

    if (!user) {
        <Link to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
