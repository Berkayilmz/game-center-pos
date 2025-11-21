import React from "react";
import "./CardActionsPanel.css";

const CardActionsPanel = ({ onScan, onReset, onTopUp, disabled }) => {
  return (
    <div className="card-actions-panel">
      <button className="btn orange" onClick={onScan}>
        Kartı Tara
      </button>
      <button className="btn gray" onClick={onReset}>
        Kartı Sıfırla
      </button>
      <button className="btn gray">Yükleme İptali</button>

      <div className="divider" />

      <button className="btn green">Nakit</button>
      <button className="btn blue">Kredi Kartı</button>
      <button
        className="btn primary"
        onClick={onTopUp}
        disabled={disabled}
      >
        Bakiye Yükle
      </button>
    </div>
  );
};

export default CardActionsPanel;