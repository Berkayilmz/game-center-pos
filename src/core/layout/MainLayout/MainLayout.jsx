import React, { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "./MainLayout.css";

const MainLayout = ({ children }) => {
  // 🔹 aktif modül (pos, softplay, card)
  const [active, setActive] = useState("pos");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout-wrapper">
      {/* 🔸 Üst Header */}
      <Header
        active={active}
        onSelect={setActive}
        onToggleSidebar={() => setSidebarOpen(true)}
      />

      {/* 🔸 Sayfa Gövdesi */}
      <div className="layout-body">{children}</div>

      {/* 🔸 Sol Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
};

export default MainLayout;