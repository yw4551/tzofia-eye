import React, { useState } from "react";
import { useAuthStore } from "../stores/auth.store";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const login = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.loading);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        setError("");

        try {
            await login(username, password);
            navigate("/alerts", { replace: true });
        } catch (error) {
            setError(error instanceof Error ? error.message : "Login failed");
        }
    };

    return (
        <main>
            <h1>Login to account</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p>{error}</p>}

                <button disabled={loading} type="submit">
                    {loading ? "Creating..." : "Register"}
                </button>
            </form>

            <p>
                Already registered? <Link to="/login">Login</Link>
            </p>
        </main>
    );
}

export default Login;
