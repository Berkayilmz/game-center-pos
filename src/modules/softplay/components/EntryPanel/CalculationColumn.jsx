// src/features/softplay/components/EntryPanel/CalculationColumn.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCardById,
  clearActiveCard,
} from "../../../../redux/slices/cardSlice";
import "./EntryPanel.css";

const CalculationColumn = () => {
  const dispatch = useDispatch();
  const { activeCard, loading } = useSelector((state) => state.card);

  // 🧠 CardPage'dekiyle aynı mantık
  const handleScanCard = () => {
    const id = prompt("Kart ID girin (örnek: FACR-1001)");
    if (id) dispatch(fetchCardById(id.trim()));
  };

  const handleResetCard = () => {
    dispatch(clearActiveCard());
  };

  return (
    <div className="entry-column card-column">
      <h3 className="card-column-title">💳 KART BİLGİSİ</h3>

      <div className="card-box">
        {loading ? (
          <div className="empty-card-info">⏳ Kart okunuyor...</div>
        ) : activeCard ? (
          <>
            <div className="card-info-row">
              <span>Kart Numarası:</span>
              <strong>{activeCard.cardId}</strong>
            </div>
            <div className="card-info-row">
              <span>Bakiye:</span>
              <strong className="card-balance">
                {activeCard.balance.toFixed(2)} TL
              </strong>
            </div>
          </>
        ) : (
          <div className="empty-card-info">💡 Henüz kart okutulmadı.</div>
        )}
      </div>

      <div className="button-row bottom">
        <button className="btn orange" onClick={handleScanCard}>
          Kartı Tara
        </button>
        <button className="btn gray" onClick={handleResetCard}>
          Kartı Sıfırla
        </button>
      </div>
    </div>
  );
};

export default CalculationColumn;