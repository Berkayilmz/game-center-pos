// src/modules/pos/components/CardPanel/CardPanel.jsx
import React, { useState } from "react";
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
  const [paymentType, setPaymentType] = useState(null);

  const resetPaymentType = () => setPaymentType(null);

  const handleScanCard = () => {
    const id = prompt("Kart ID girin (örnek: FACR-1001)");
    if (id) {
      dispatch(fetchCardById(id.trim()));
      resetPaymentType();
    }
  };

  const handleResetCard = () => {
    dispatch(clearActiveCard());
    resetPaymentType();
  };

  const handleTopUp = () => {
    if (!activeCard) return alert("Önce kart okutun 💳");
    if (pendingAmount <= 0) return alert("Geçerli bir tutar girin 💰");

    // 💾 Simüle edilmiş işlem kaydı (gerçek backend'de POST edilecek payload)
    const transaction = {
      transactionId: `TX-${Date.now()}`,
      cardId: activeCard.cardId,
      cardType: activeCard.type,
      user: "admin", // login'den gelecek
      date: new Date().toISOString(),
      paymentType: paymentType || "unknown",
      amount: pendingAmount,
      previousBalance: activeCard.balance,
      newBalance: activeCard.balance + pendingAmount,
      guestBalance: activeCard.guestBalance || 0,
      location: "Kiosk-1",
      description: "Manuel bakiye yükleme",
      status: "success",
    };

    console.log("💾 [CARD TRANSACTION LOG]", transaction);

    dispatch(addBalance());
    alert(`${pendingAmount}₺ yüklendi ✅`);
    resetPaymentType();
  };

  const handleServiceTopUp = () => {
    if (!activeCard) return alert("Kart okutun 💳");

    const log = {
      transactionId: `SRV-${Date.now()}`,
      cardId: activeCard.cardId,
      type: "service",
      date: new Date().toISOString(),
      user: "admin",
      description: "Servis yükleme işlemi",
      amount: pendingAmount || 1,
      status: "success",
    };
    console.log("⚙️ [SERVICE TOPUP LOG]", log);

    dispatch(addService());
    alert("Servis yükleme tamamlandı ⚙️");
    resetPaymentType();
  };

  const handleGuestTopUp = () => {
    if (!activeCard) return alert("Kart okutun 💳");

    const log = {
      transactionId: `GST-${Date.now()}`,
      cardId: activeCard.cardId,
      type: "guest",
      date: new Date().toISOString(),
      user: "admin",
      amount: pendingAmount || 0,
      description: "Misafir bakiyesi eklendi",
      status: "success",
    };
    console.log("👥 [GUEST BALANCE LOG]", log);

    dispatch(addGuestBalance());
    alert("Misafir yükleme tamamlandı 👥");
    resetPaymentType();
  };

  const safeCard = activeCard || {
    cardId: "—",
    type: "customer",
    balance: 0,
    guestBalance: 0,
  };

  return (
    <div className="mini-card-panel">
      {/* Kart Bilgileri */}
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

      {/* Ana Panel */}
      <div className="panel-main">
        <div className="top-area">
          {/* Sayısal Tuş Takımı */}
          <div className="pad-section">
            <NumericPad
              onChange={(val) =>
                dispatch(setPendingAmount(parseFloat(val) || 0))
              }
              showQuickAmounts={false}
            />
          </div>

          {/* Aksiyon Butonları */}
          <div className="action-section">
            <button className="btn orange" onClick={handleScanCard}>
              Tara
            </button>
            <button className="btn gray" onClick={handleResetCard}>
              Sıfırla
            </button>
            <button
              className="btn red"
              onClick={() => {
                alert("Yükleme iptal edildi ❌");
                resetPaymentType();
                console.log("❌ [CANCELLED TRANSACTION]");
              }}
            >
              Yükleme İptali
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

        {/* Alt Bölüm */}
        <div className="bottom-section">
          <button
            className={`btn payment ${
              paymentType === "cash" ? "active" : ""
            }`}
            onClick={() => setPaymentType("cash")}
          >
            Nakit
          </button>

          <button
            className={`btn payment ${
              paymentType === "card" ? "active" : ""
            }`}
            onClick={() => setPaymentType("card")}
          >
            Kredi Kartı
          </button>

          <button
            className="btn green"
            onClick={handleTopUp}
            disabled={!activeCard || pendingAmount <= 0}
          >
            Yükle
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPanel;