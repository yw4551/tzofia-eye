import { Navigate, Route, Routes } from "react-router-dom";
import AlertList from "./pages/AlertList";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/alerts" replace />} />
                <Route path="/alerts" element={<AlertList />} />
            </Routes>
        </>
    );
}

export default App;
