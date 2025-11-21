// src/features/softplay/components/EntryPanel/DurationColumn.jsx
import React from "react";
import { useSelector } from "react-redux";
import "./EntryPanel.css";

const DurationColumn = ({ selectedDuration, setSelectedDuration }) => {
  const { durations } = useSelector((state) => state.softplay);

  if (!durations || durations.length === 0) {
    return (
      <div className="entry-column">
        <h3>SÜRE</h3>
        <p className="empty-msg">⏳ Süre tarifesi bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="entry-column">
      <h3>SÜRE</h3>
      <div className="duration-list">
        {durations.map((d) => (
          <button
            key={d.id}
            className={`duration-btn ${
              selectedDuration === d.value ? "active" : ""
            }`}
            onClick={() => setSelectedDuration(d.value)}
          >
            <span className="duration-label">{d.label}</span>
            <span className="duration-price">
              {d.price} TL
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DurationColumn;