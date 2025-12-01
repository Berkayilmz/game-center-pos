// src/modules/pos/components/SpecialSaleModal/SpecialSaleModal.jsx
import React from "react";
import "./SpecialSaleModal.css";

const STORAGE_KEY = "special_sales";

const SpecialSaleModal = ({ open, onClose, onSelect }) => {
  if (!open) return null;

  const sales = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  return (
    <div className="modal-overlay">
      <div className="modal special-sale-modal">
        <h3>🎟️ Özel Satış</h3>

        <table className="sale-table">
          <thead>
            <tr>
              <th>Ad</th>
              <th>Kredi</th>
              <th>Tutar (₺)</th>
            </tr>
          </thead>
          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td colSpan="3" className="empty-msg">
                  Tanımlı özel satış bulunamadı.
                </td>
              </tr>
            ) : (
              sales.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => {
                    onSelect(s);
                    onClose();
                  }}
                >
                  <td>{s.name}</td>
                  <td>{s.credit}</td>
                  <td>{s.price.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="modal-actions">
          <button className="btn green" onClick={() => onClose()}>
            Yükle
          </button>
          <button className="btn red" onClick={onClose}>
            Çıkış
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialSaleModal;