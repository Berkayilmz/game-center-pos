import React, { useState } from "react";
import "./CardActionsPanel.css";
import { useSelector } from "react-redux";
import qrService from "../../../../core/services/qrService";

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

  // 💳 Bakiye yükleme işlemi
  const handleTopUp = () => {
    if (!activeCard) return alert("Önce bir kart okutun 💳");
    if (pendingAmount <= 0) return alert("Geçerli bir tutar girin 💰");
    if (!paymentType)
      return alert("Lütfen ödeme tipini seçin (Nakit veya Kredi Kartı) 💳");

    const log = {
      transactionId: `TOPUP-${Date.now()}`,
      cardId: activeCard.cardId,
      cardType: activeCard.type,
      user: "admin",
      paymentType,
      amountLoaded: pendingAmount,
      previousBalance: activeCard.balance,
      newBalance: activeCard.balance + pendingAmount,
      totalGuestBalance: activeCard.guestBalance || 0,
      location: "Kiosk-1",
      terminalId: "POS-01",
      description:
        paymentType === "cash"
          ? "Nakit bakiye yükleme"
          : "Kredi kartı ile bakiye yükleme",
      date: new Date().toISOString(),
      status: "success",
    };

    console.log("💾 [CARD TOPUP LOG]", log);
    onTopUp?.(paymentType);
    resetPaymentType();
  };

  // 🎟️ QR Fiş oluşturma işlemi
  const handleCreateQR = async () => {
    if (pendingAmount <= 0) return alert("Fiş için geçerli bir tutar girin 💰");
    if (!paymentType)
      return alert("Lütfen ödeme tipini seçin (Nakit veya Kredi Kartı) 💳");

    const newQR = await qrService.create(pendingAmount);
    console.log("🧾 [QR FİŞ OLUŞTURULDU]", newQR);
    alert(
      `🎟️ QR fiş oluşturuldu!\n\nTutar: ${pendingAmount}₺\nÖdeme Tipi: ${
        paymentType === "cash" ? "Nakit" : "Kredi Kartı"
      }\nToken: ${newQR.token}`
    );
  };

  return (
    <div className="card-actions-panel">
      {/* 🧭 Ana kontrol butonları */}
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

      {/* 💳 Ödeme tipi seçimi */}
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

      {/* 🎟️ Fiş Ver */}
      <button
        className="btn blue"
        onClick={handleCreateQR}
        disabled={pendingAmount <= 0 || !paymentType}
      >
        🎟️ Fiş Ver
      </button>

      {/* 💰 Bakiye Yükle */}
      <button
        className="btn green"
        onClick={handleTopUp}
        disabled={disabled || !paymentType}
      >
        Bakiye Yükle
      </button>
    </div>
  );
};

export default CardActionsPanel;