import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = ({ onToggleSidebar }) => {
    const modules = [
        { key: "card", label: "🎫 Kart", path: "/card" },
        { key: "softplay", label: "🧒 Softplay", path: "/softplay" },
        { key: "pos", label: "💳 POS", path: "/pos" },
        { key: "reports", label: "📊 Raporlar", path: "/reports" },
    ];

    const now = new Date().toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <header className="app-header">
            {/* Sol taraf */}
            <div className="left">
                <button className="menu-toggle" onClick={onToggleSidebar}>
                    ☰
                </button>
                <span className="logo">🎮 Oyun Merkezi POS</span>
            </div>

            {/* Orta menü */}
            <div className="center">
                {modules.map((mod) => (
                    <NavLink
                        key={mod.key}
                        to={mod.path}
                        className={({ isActive }) =>
                            `mod-btn ${isActive ? "active" : ""}`
                        }
                    >
                        {mod.label}
                    </NavLink>
                ))}
            </div>

            {/* Sağ taraf */}
            <div className="right">
                <span className="clock">{now}</span>
                <button className="user-btn">Kasiyer</button>
            </div>
        </header>
    );
};

export default Header;