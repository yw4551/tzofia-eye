import { Navigate, Route, Routes } from "react-router-dom";
import AlertList from "./pages/AlertList";
import NewAlert from "./pages/NewAlert";
import AlertDetails from "./pages/AlertDetails";
import UpdateAlert from "./pages/UpdateAlert";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";

function App() {
    return (
        <>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/"
                        element={<Navigate to="/alerts" replace />}
                    />
                    <Route path="/alerts" element={<AlertList />} />
                    <Route path="/alerts/new" element={<NewAlert />} />
                    <Route path="/alerts/:id" element={<AlertDetails />} />
                    <Route path="/alerts/:id/edit" element={<UpdateAlert />} />
                </Route>

                <Route path="/" element={<Navigate to="/alerts" replace />} />
                <Route path="*" element={<Navigate to="/alerts" replace />} />
            </Routes>
        </>
    );
}

export default App;
