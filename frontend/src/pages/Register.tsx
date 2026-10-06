import React, { useState } from "react";
import type { assignedArenaTypes } from "../types/authTypes";
import { useAuthStore } from "../stores/auth.store";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [assignedArena, setAssignedArena] =
        useState<assignedArenaTypes>("all");
    const [error, setError] = useState("");
    const register = useAuthStore((state) => state.register);
    const loading = useAuthStore((state) => state.loading);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        setError("");

        try {
            await register(username, email, password, assignedArena);
            navigate(`/alerts`, { replace: true });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to register");
        }
    };

    return (
        <main>
            <h1>Create account</h1>

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
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <div>
                    <label htmlFor="assignedArena">AssignedArena</label>
                    <select
                        id="assignedArena"
                        value={assignedArena}
                        onChange={(e) =>
                            setAssignedArena(
                                e.target.value as assignedArenaTypes,
                            )
                        }
                    >
                        <option value="north">North</option>
                        <option value="south">South</option>
                        <option value="center">Center</option>
                        <option value="all">All</option>
                    </select>
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

export default Register;
