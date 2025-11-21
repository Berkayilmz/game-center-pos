import React from "react";
import "./CardPanel.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCardById,
  clearActiveCard,
  setPendingAmount,
  addBalance,
  addService,
  addGuestBalance,
} from "../../../../redux/slices/cardSlice";
import NumericPad from "../../../card/components/NumericPad/NumericPad";

const CardPanel = () => {
  const dispatch = useDispatch();
  const { activeCard, pendingAmount } = useSelector((s) => s.card);

  const handleScanCard = () => {
    const id = prompt("Kart ID girin (örnek: FACR-1001)");
    if (id) dispatch(fetchCardById(id.trim()));
  };

  const handleResetCard = () => dispatch(clearActiveCard());

  const handleTopUp = () => {
    if (!activeCard) return alert("Önce kart okutun 💳");
    if (pendingAmount <= 0) return alert("Geçerli bir tutar girin 💰");
    dispatch(addBalance());
    alert(`${pendingAmount}₺ yüklendi ✅`);
  };

  const handleServiceTopUp = () => {
    if (!activeCard) return alert("Kart okutun 💳");
    dispatch(addService());
    alert("Servis yükleme tamamlandı ⚙️");
  };

  const handleGuestTopUp = () => {
    if (!activeCard) return alert("Kart okutun 💳");
    dispatch(addGuestBalance());
    alert("Misafir yükleme tamamlandı 👥");
  };

  // 🧩 Varsayılan (kart yoksa)
  const safeCard = activeCard || {
    cardId: "—",
    type: "customer",
    balance: 0,
    guestBalance: 0,
  };

  return (
    <div className="mini-card-panel">
      <h3>💳 Kart Bilgisi</h3>

      {/* 🧾 Bilgi Kutusu */}
      <div className="mini-info-box">
        <div className="info-row">
          <span>Kart Numarası:</span>
          <strong>{safeCard.cardId}</strong>
        </div>
        <div className="info-row">
          <span>Kart Tipi:</span>
          <strong>
            {safeCard.type === "service" ? "Servis Kartı" : "Müşteri Kartı"}
          </strong>
        </div>
        <div className="info-row">
          <span>Toplam Bakiye:</span>
          <strong>{safeCard.balance?.toFixed?.(2)} TL</strong>
        </div>
        <div className="info-row">
          <span>Misafir:</span>
          <strong>{safeCard.guestBalance?.toFixed?.(2)} TL</strong>
        </div>
      </div>

      {/* 🔹 Sayısal tuş takımı ve aksiyonlar */}
      <div className="panel-main">
        <div className="pad-section">
          <NumericPad
            onChange={(val) => dispatch(setPendingAmount(parseFloat(val) || 0))}
          />
        </div>

        <div className="action-section">
          <button className="btn orange" onClick={handleScanCard}>
            Tara
          </button>
          <button className="btn gray" onClick={handleResetCard}>
            Sıfırla
          </button>
          <button
            className="btn green"
            onClick={handleTopUp}
            disabled={!activeCard || pendingAmount <= 0}
          >
            Yükle
          </button>

          <div className="divider" />

          <button className="btn blue" onClick={handleGuestTopUp}>
            Misafir
          </button>
          <button className="btn purple" onClick={handleServiceTopUp}>
            Servis
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPanel;