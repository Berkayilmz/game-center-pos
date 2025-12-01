import React, { useState } from "react";
import "./CardInfoPanel.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // 🆕 yönlendirme için
import {
  addService,
  addGuestBalance,
  addSpecialSale,
} from "../../../../redux/slices/cardSlice";
import CardDetailModal from "../CardDetailModal/CardDetailModal";
import SpecialSaleModal from "../SpecialSaleModal/SpecialSaleModal";

const CardInfoPanel = ({ card }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 🆕
  const { activeCard, pendingAmount } = useSelector((s) => s.card);
  const [detailOpen, setDetailOpen] = useState(false);
  const [saleModalOpen, setSaleModalOpen] = useState(false);

  const safeCard = activeCard || card || {
    cardId: "—",
    type: "-",
    serviceCount: 0,
    balance: 0,
    guestBalance: 0,
    specialSales: [],
  };

  // 🧾 Log fonksiyonu
  const logTransaction = (type, desc, extra = {}) => {
    const log = {
      transactionId: `${type.toUpperCase()}-${Date.now()}`,
      cardId: safeCard.cardId,
      cardType: safeCard.type,
      amount: pendingAmount || extra.amount || 0,
      previousBalance: safeCard.balance,
      newBalance:
        type === "service"
          ? safeCard.balance
          : safeCard.balance + (pendingAmount || extra.amount || 0),
      user: "admin",
      location: "Kiosk-1",
      description: desc,
      date: new Date().toISOString(),
      status: "success",
    };
    console.log("💾 [CARD LOG]", log);
  };

  // ⚙️ Servis yükleme
  const handleServisYukle = () => {
    if (!activeCard) return alert("Lütfen önce bir kart okutun 💳");
    if (activeCard.type !== "service")
      return alert("Bu işlem sadece servis kartlarında geçerlidir ⚙️");
    if (pendingAmount <= 0) return alert("Yüklenecek servis adedini girin 🔢");

    logTransaction("service", "Servis yükleme işlemi");
    dispatch(addService());
    alert(`${activeCard.cardId} kartına ${pendingAmount} servis eklendi ✅`);
  };

  // 👥 Misafir yükleme
  const handleMisafirYukle = () => {
    if (!activeCard) return alert("Lütfen önce bir kart okutun 💳");
    if (activeCard.type !== "customer")
      return alert("Bu işlem sadece müşteri kartlarında geçerlidir 🎫");
    if (pendingAmount <= 0) return alert("Yüklenecek tutarı girin 💰");

    logTransaction("guest", "Misafir bakiyesi yüklendi");
    dispatch(addGuestBalance());
    alert(`${activeCard.cardId} kartına misafir yükleme yapıldı ✅`);
  };

  // 🎟️ Özel satış seçimi
  const handleSpecialSaleSelect = (sale) => {
    if (!activeCard) return alert("Lütfen önce bir kart okutun 💳");
    dispatch(addSpecialSale(sale));
    logTransaction("special-sale", `Özel satış: ${sale.name}`, {
      amount: sale.price,
    });
    alert(
      `${safeCard.cardId} kartına ${sale.name} kampanyasından ${sale.credit} kredi (${sale.price.toFixed(
        2
      )}₺) yüklendi 🎟️`
    );
  };

  return (
    <div className="card-info-panel">
      <h2 className="title">Kart Bilgisi</h2>

      <div className="info-box">
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

        {safeCard.type === "service" && (
          <div className="info-row">
            <span>Servis Adedi:</span>
            <strong>{safeCard.serviceCount || 0}</strong>
          </div>
        )}

        <div className="info-row">
          <span>Toplam Bakiye:</span>
          <strong>{safeCard.balance?.toFixed?.(2) || "0.00"} TL</strong>
        </div>

        <div className="info-row">
          <span>Misafir:</span>
          <strong>{safeCard.guestBalance?.toFixed?.(2) || "0.00"} TL</strong>
        </div>

        <div className="info-row">
          <span>Özel Satış Sayısı:</span>
          <strong>{safeCard.specialSales?.length || 0}</strong>
        </div>

        {safeCard.specialSales?.length > 0 && (
          <div className="info-row">
            <span>Son Özel Satış:</span>
            <strong>
              {
                safeCard.specialSales[safeCard.specialSales.length - 1]
                  .name
              }{" "}
              (
              {
                safeCard.specialSales[safeCard.specialSales.length - 1]
                  .credit
              }{" "}
              kredi)
            </strong>
          </div>
        )}
      </div>

      {/* 🧭 İşlem Butonları */}
      <div className="actions">
        <button className="btn orange" onClick={handleServisYukle}>
          Servis Yükle
        </button>
        <button className="btn gray" onClick={handleMisafirYukle}>
          Misafir Yükle
        </button>

        <button className="btn gray" onClick={() => setSaleModalOpen(true)}>
          Özel Satış
        </button>

        <button className="btn green" onClick={() => console.log("📊 [RAPORLAR] görüntülendi")}>
          Raporlar
        </button>

        <button
          className="btn blue"
          onClick={() => {
            if (!safeCard.cardId || safeCard.cardId === "—") {
              alert("Önce geçerli bir kart okutun 💳");
              return;
            }
            setDetailOpen(true);
          }}
        >
          Kart Raporu
        </button>

        {/* 🧾 Fiş Ayarları */}
        <button
          className="btn purple"
          onClick={() => navigate("/settings/qr-voucher")}
        >
          🎟️ Fiş Ayarları
        </button>
      </div>

      {/* 🪪 Kart Detay Modal */}
      <CardDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        card={safeCard}
      />

      {/* 🎟️ Özel Satış Modal */}
      <SpecialSaleModal
        open={saleModalOpen}
        onClose={() => setSaleModalOpen(false)}
        onSelect={handleSpecialSaleSelect}
      />
    </div>
  );
};

export default CardInfoPanel;