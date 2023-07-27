import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import axios from "axios";

export default function App() {
    // localStorage.setItem("token", "");
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

if (document.getElementById("app")) {
    const rootElement = document.getElementById("app");
    const root = createRoot(rootElement);
    axios.defaults.baseURL = import.meta.env.REACT_APP_API_URL;
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
