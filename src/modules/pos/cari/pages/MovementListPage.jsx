// src/modules/pos/cari/pages/MovementListPage.jsx
import React, { useState } from "react";
import "../cari.css";

const MovementListPage = () => {
  const [filters, setFilters] = useState({
    docNo: "",
    startDate: "",
    endDate: "",
    account: "",
    type: "Tümü",
    description: "",
    dueDate: "",
  });

  const [movements, setMovements] = useState([
    {
      type: "Tahsilat",
      docNo: "COL-0001",
      date: "2025-11-22",
      account: "Softplay Oyuncak",
      code: "CAR-002",
      debt: 0,
      credit: 850,
    },
    {
      type: "Borç Dekontu",
      docNo: "DEBT-0002",
      date: "2025-11-20",
      account: "ABC GIDA LTD.",
      code: "CAR-001",
      debt: 1200,
      credit: 0,
    },
  ]);

  const handleSearch = () => {
    console.log("Filtreleme:", filters);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>📘 Cari Hareket Listesi</h2>
        <button className="btn gray">Excel'e Aktar</button>
      </div>

      {/* 🔍 Filtre Barı */}
      <div className="filter-bar" style={{ flexWrap: "wrap", gap: "10px" }}>
        <input
          placeholder="Evrak No"
          value={filters.docNo}
          onChange={(e) => setFilters({ ...filters, docNo: e.target.value })}
        />

        <label>Evrak Tarihi:</label>
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
        />
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />

        <input
          placeholder="Cari Hesap"
          value={filters.account}
          onChange={(e) => setFilters({ ...filters, account: e.target.value })}
        />

        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option>Tümü</option>
          <option>Tahsilat</option>
          <option>Ödeme</option>
          <option>Borç Dekontu</option>
          <option>Devir</option>
          <option>Virman</option>
        </select>

        <input
          placeholder="Açıklama"
          value={filters.description}
          onChange={(e) =>
            setFilters({ ...filters, description: e.target.value })
          }
        />

        <label>Vade Tarihi:</label>
        <input
          type="date"
          value={filters.dueDate}
          onChange={(e) => setFilters({ ...filters, dueDate: e.target.value })}
        />

        <button className="btn blue small" onClick={handleSearch}>
          Sorgula
        </button>
      </div>

      {/* 📋 Tablo */}
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>İşlem Türü</th>
              <th>Evrak No</th>
              <th>Evrak Tarihi</th>
              <th>Cari Adı / Ünvanı</th>
              <th>Cari Kodu</th>
              <th>Borç Tutar</th>
              <th>Alacak Tutar</th>
            </tr>
          </thead>
          <tbody>
            {movements.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-msg">
                  Gösterilecek veri yok.
                </td>
              </tr>
            ) : (
              movements.map((m, i) => (
                <tr key={i}>
                  <td>{m.type}</td>
                  <td>{m.docNo}</td>
                  <td>{m.date}</td>
                  <td>{m.account}</td>
                  <td>{m.code}</td>
                  <td>{m.debt.toFixed(2)} ₺</td>
                  <td>{m.credit.toFixed(2)} ₺</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovementListPage;