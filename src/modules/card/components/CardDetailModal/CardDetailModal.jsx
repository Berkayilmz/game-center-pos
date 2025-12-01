// src/modules/pos/card/components/CardDetailModal.jsx
import React, { useState } from "react";
import "./cardDetailModal.css";

const CardDetailModal = ({ open, onClose, card }) => {
  if (!open || !card) return null;

  // 🔹 Sahte veri
  const mockLoads = [
    { amount: 300, bonus: 50, total: 350, date: "2025-11-25 14:32" },
    { amount: 500, bonus: 0, total: 500, date: "2025-11-27 18:44" },
  ];
  const mockUses = [
    { name: "Air Hockey", price: 50, credit: 0, extra: 0, date: "2025-11-28 13:20" },
    { name: "VR Simülatör", price: 75, credit: 0, extra: 0, date: "2025-11-29 11:55" },
  ];

  return (
    <div className="modal-overlay">
      <div className="modal card-detail-modal">
        <h3>Kart Detay Tablosu</h3>

        <div className="card-detail-content">
          {/* 🩵 Sol Bilgi Alanı */}
          <div className="card-summary">
            <div><strong>Toplam Bakiye:</strong> {card.balance.toFixed(2)} ₺</div>
            <div><strong>Misafir:</strong> {card.guestBalance.toFixed(2)} ₺</div>
            <div><strong>Depozit:</strong> 10.00 ₺</div>
            <div><strong>Kupon:</strong> 0</div>
            <div><strong>Özel Satış:</strong> 0 Kredi</div>
            <div><strong>Kredi:</strong> 0 Kredi</div>
            <div><strong>Toplam Yükleme:</strong> 800.00 ₺</div>
            <div><strong>Toplam Bonus:</strong> 50.00 ₺</div>
            <div className="card-num">
              <strong>Kart Numarası:</strong> {card.cardId}
            </div>
          </div>

          {/* 🔸 Sağ Tablolar */}
          <div className="card-detail-tables">
            {/* Yüklemeler */}
            <div className="card-table-block">
              <div className="table-title">Yükleme Geçmişi</div>
              <table>
                <thead>
                  <tr>
                    <th>Tutar</th>
                    <th>Bonus</th>
                    <th>Toplam</th>
                    <th>Tarih</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLoads.map((l, i) => (
                    <tr key={i}>
                      <td>{l.amount.toFixed(2)} ₺</td>
                      <td>{l.bonus.toFixed(2)} ₺</td>
                      <td>{l.total.toFixed(2)} ₺</td>
                      <td>{l.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Harcamalar */}
            <div className="card-table-block">
              <div className="table-title">Oyun / Harcama Geçmişi</div>
              <table>
                <thead>
                  <tr>
                    <th>Adı</th>
                    <th>Fiyat</th>
                    <th>Kredi</th>
                    <th>Ek Ücret</th>
                    <th>Tarih</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUses.map((u, i) => (
                    <tr key={i}>
                      <td>{u.name}</td>
                      <td>{u.price.toFixed(2)} ₺</td>
                      <td>{u.credit}</td>
                      <td>{u.extra.toFixed(2)} ₺</td>
                      <td>{u.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 🔹 Alt Filtre */}
        <div className="card-detail-footer">
          <div>
            <label>Başlangıç Tarihi</label>
            <input type="date" />
          </div>
          <div>
            <label>Bitiş Tarihi</label>
            <input type="date" />
          </div>
          <button className="btn blue">Getir</button>
        </div>

        {/* Alt Butonlar */}
        <div className="modal-actions">
          <button className="btn gray" onClick={onClose}>Kapat</button>
        </div>
      </div>
    </div>
  );
};

export default CardDetailModal;