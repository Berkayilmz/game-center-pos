import React, { useState } from "react";
import EntryPanel from "../EntryPanel/EntryPanel";
import CardPanel from "../CardPanel/CardPanel"; // Yeni oluşturacağız
import "./RightPanel.css";

const RightPanel = ({ selectedChild, setSelectedChild }) => {
  const [activeTab, setActiveTab] = useState("softplay"); // 'softplay' | 'card'

  return (
    <div className="right-panel">
      <div className="tab-buttons">
        <button
          className={`tab-btn ${activeTab === "softplay" ? "active" : ""}`}
          onClick={() => setActiveTab("softplay")}
        >
          🧸 Softplay
        </button>
        <button
          className={`tab-btn ${activeTab === "card" ? "active" : ""}`}
          onClick={() => setActiveTab("card")}
        >
          💳 Kart İşlemleri
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "softplay" ? (
          <EntryPanel
            selectedChild={selectedChild}
            setSelectedChild={setSelectedChild}
          />
        ) : (
          <CardPanel />
        )}
      </div>
    </div>
  );
};

export default RightPanel;