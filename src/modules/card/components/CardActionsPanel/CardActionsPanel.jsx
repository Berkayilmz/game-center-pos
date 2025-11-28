import React, { useState } from "react";
import "./CardActionsPanel.css";
import { useSelector } from "react-redux";

const CardActionsPanel = ({ onScan, onReset, onTopUp, disabled }) => {
  const [paymentType, setPaymentType] = useState(null);
  const { activeCard, pendingAmount } = useSelector((s) => s.card);

  const resetPaymentType = () => setPaymentType(null);

  const handleScan = () => {
    onScan?.();
    resetPaymentType();
  };

  const handleReset = () => {
    onReset?.();
    resetPaymentType();
  };

  const handleTopUp = () => {
    if (!activeCard) {
      alert("Önce bir kart okutun 💳");
      return;
    }
    if (pendingAmount <= 0) {
      alert("Geçerli bir tutar girin 💰");
      return;
    }

    // 🔹 Loglama (gerçek backend’de POST edilecek formatta)
    const log = {
      transactionId: `TOPUP-${Date.now()}`,
      cardId: activeCard.cardId,
      cardType: activeCard.type,
      user: "admin",
      paymentType: paymentType || "unknown",
      amountLoaded: pendingAmount,
      previousBalance: activeCard.balance,
      newBalance: activeCard.balance + pendingAmount,
      totalGuestBalance: activeCard.guestBalance || 0,
      location: "Kiosk-1",
      terminalId: "POS-01",
      description:
        paymentType === "cash"
          ? "Nakit bakiye yükleme"
          : paymentType === "card"
          ? "Kredi kartı ile bakiye yükleme"
          : "Bilinmeyen ödeme tipiyle yükleme",
      date: new Date().toISOString(),
      status: "success",
    };

    console.log("💾 [CARD TOPUP LOG]", log);

    onTopUp?.(paymentType);
    resetPaymentType();
  };

  return (
    <div className="card-actions-panel">
      <button className="btn orange" onClick={handleScan}>
        Kartı Tara
      </button>
      <button className="btn gray" onClick={handleReset}>
        Kartı Sıfırla
      </button>
      <button
        className="btn red"
        onClick={() => {
          alert("Yükleme iptal edildi ❌");
          console.log("🚫 [CANCEL LOG]", {
            action: "TopUp Cancelled",
            user: "admin",
            cardId: activeCard?.cardId || "—",
            date: new Date().toISOString(),
          });
          resetPaymentType();
        }}
      >
        Yükleme İptali
      </button>

      <div className="divider" />

      <button
        className={`btn payment ${paymentType === "cash" ? "active" : ""}`}
        onClick={() => setPaymentType("cash")}
      >
        Nakit
      </button>
      <button
        className={`btn payment ${paymentType === "card" ? "active" : ""}`}
        onClick={() => setPaymentType("card")}
      >
        Kredi Kartı
      </button>

      <button
        className="btn primary"
        onClick={handleTopUp}
        disabled={disabled}
      >
        Bakiye Yükle
      </button>
    </div>
  );
};

export default CardActionsPanel;