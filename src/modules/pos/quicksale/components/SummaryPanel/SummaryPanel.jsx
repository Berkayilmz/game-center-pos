// src/features/pos/components/SummaryPanel/SummaryPanel.jsx
import React from "react";
import { useSelector } from "react-redux";
import "./SummaryPanel.css";

const SummaryPanel = () => {
  const { items, discountRate } = useSelector((state) => state.cart);

  // 💰 Hesaplamalar
  const subtotal = items.reduce((sum, i) => sum + (i.subtotal || 0), 0);
  const vatTotal = items.reduce((sum, i) => sum + (i.vatAmount || 0), 0);
  const lineDiscounts = items.reduce((sum, i) => sum + (i.discount || 0), 0);
  const generalDiscount = subtotal * (discountRate / 100);
  const total = subtotal + vatTotal - lineDiscounts - generalDiscount;

  return (
    <div className="summary-pos-panel">
      <h3>🧾 Özet Bilgiler</h3>

      <div className="summary-row">
        <span>Ara Toplam (KDV Hariç)</span>
        <strong>{subtotal.toFixed(2)} ₺</strong>
      </div>

      <div className="summary-row">
        <span>KDV Toplamı</span>
        <strong>{vatTotal.toFixed(2)} ₺</strong>
      </div>

      <div className="summary-row">
        <span>İndirimler</span>
        <strong className="discount">
          -{(lineDiscounts + generalDiscount).toFixed(2)} ₺
        </strong>
      </div>

      <div className="divider" />

      <div className="summary-row total">
        <span>GENEL TOPLAM</span>
        <strong>{total.toFixed(2)} ₺</strong>
      </div>
    </div>
  );
};

export default SummaryPanel;