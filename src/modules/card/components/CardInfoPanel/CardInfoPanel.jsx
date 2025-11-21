// src/modules/pos/components/CardInfoPanel/CardInfoPanel.jsx
import React from "react";
import "./CardInfoPanel.css";
import { useDispatch, useSelector } from "react-redux";
import { addService, addGuestBalance } from "../../../../redux/slices/cardSlice";

const CardInfoPanel = ({ card }) => {
  const dispatch = useDispatch();
  const { activeCard, pendingAmount } = useSelector((s) => s.card);

  // Eğer kart okutulmadıysa placeholder değerler göster
  const safeCard = activeCard || card || {
    cardId: "—",
    type: "-",
    serviceCount: 0,
    balance: 0,
    guestBalance: 0,
    specialSale: 0,
  };

  // ⚙️ Servis yükleme
  const handleServisYukle = () => {
    if (!activeCard) return alert("Lütfen önce bir kart okutun 💳");
    if (activeCard.type !== "service")
      return alert("Bu işlem sadece servis kartlarında geçerlidir ⚙️");
    if (pendingAmount <= 0) return alert("Yüklenecek servis adedini girin 🔢");

    dispatch(addService());
    alert(`${activeCard.cardId} kartına ${pendingAmount} servis eklendi ✅`);
  };

  // 👥 Misafir yükleme
  const handleMisafirYukle = () => {
    if (!activeCard) return alert("Lütfen önce bir kart okutun 💳");
    if (activeCard.type !== "customer")
      return alert("Bu işlem sadece müşteri kartlarında geçerlidir 🎫");
    if (pendingAmount <= 0) return alert("Yüklenecek tutarı girin 💰");

    dispatch(addGuestBalance());
    alert(`${activeCard.cardId} kartına misafir yükleme yapıldı ✅`);
  };

  return (
    <div className="card-info-panel">
      <h2 className="title">Kart Bilgisi</h2>

      <div className="info-box">
        {/* 🔹 Kart Numarası */}
        <div className="info-row">
          <span>Kart Numarası:</span>
          <strong>{safeCard.cardId}</strong>
        </div>

        {/* 🔹 Kart Tipi */}
        <div className="info-row">
          <span>Kart Tipi:</span>
          <strong>
            {safeCard.type === "service" ? "Servis Kartı" : "Müşteri Kartı"}
          </strong>
        </div>

        {/* 🔹 Servis kartlarında servis sayısı */}
        {safeCard.type === "service" && (
          <div className="info-row">
            <span>Servis Adedi:</span>
            <strong>{safeCard.serviceCount || 0}</strong>
          </div>
        )}

        {/* 🔹 Toplam bakiye */}
        <div className="info-row">
          <span>Toplam Bakiye:</span>
          <strong>{safeCard.balance?.toFixed?.(2) || "0.00"} TL</strong>
        </div>

        {/* 🔹 Misafir bakiyesi (her zaman gösterilir) */}
        <div className="info-row">
          <span>Misafir:</span>
          <strong>{safeCard.guestBalance?.toFixed?.(2) || "0.00"} TL</strong>
        </div>

        {/* 🔹 Özel satış alanı */}
        <div className="info-row">
          <span>Özel Satış:</span>
          <strong>{safeCard.specialSale?.toFixed?.(2) || "0.00"} TL</strong>
        </div>
      </div>

      {/* 🧭 Aksiyon butonları */}
      <div className="actions">
        <button className="btn orange" onClick={handleServisYukle}>
          Servis Yükle
        </button>
        <button className="btn gray" onClick={handleMisafirYukle}>
          Misafir Yükle
        </button>
        <button className="btn gray">Özel Satış</button>
        <button className="btn green">Raporlar</button>
        <button className="btn blue">Kart Raporu</button>
      </div>
    </div>
  );
};

export default CardInfoPanel;