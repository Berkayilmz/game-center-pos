import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Calculator from "../../components/Calculator/Calculator";
import "./Header.css";
import CalculatorIcon from "../../components/Calculator/CalculatorIcon";

const Header = ({ onToggleSidebar }) => {
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

    const modules = [
        { key: "card", label: "🎫 Kart", path: "/card" },
        { key: "softplay", label: "🧒 Softplay", path: "/softplay" },
        { key: "pos", label: "💳 POS", path: "/pos" },
        { key: "reports", label: "📊 Raporlar", path: "/reports" },
    ];

    // 🔥 AKTİF SAAT STATE
    const [time, setTime] = useState(
        new Date().toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
        })
    );

    // 🔥 HER SANİYE GÜNCEL SAAT
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(
                new Date().toLocaleTimeString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

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
                {/* 🔥 GERÇEK ZAMANLI SAAT */}
                <span className="clock">{time}</span>

                {/* Hesap makinesi açma butonu */}
                <button
                    className="icon-btn"
                    onClick={() => setIsCalculatorOpen(true)}
                    title="Hesap Makinesi"
                >
                    <CalculatorIcon size={22} />
                </button>
            </div>

            {/* Açılır kapanır hesap makinesi */}
            <Calculator
                open={isCalculatorOpen}
                onClose={() => setIsCalculatorOpen(false)}
            />
        </header>
    );
};

export default Header;