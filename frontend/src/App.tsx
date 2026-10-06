import { Navigate, Route, Routes } from "react-router-dom";
import AlertList from "./pages/AlertList";
import NewAlert from "./pages/NewAlert";
import AlertDetails from "./pages/AlertDetails";
import UpdateAlert from "./pages/UpdateAlert";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/alerts" replace />} />
                <Route path="/alerts" element={<AlertList />} />
                <Route path="/alerts/new" element={<NewAlert />} />
                <Route path="/alerts/:id" element={<AlertDetails />} />
                <Route path="/alerts/:id/edit" element={<UpdateAlert />} />
            </Routes>
        </>
    );
}

export default App;
