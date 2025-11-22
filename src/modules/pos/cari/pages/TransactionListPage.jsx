// src/modules/pos/cari/pages/TransactionListPage.jsx
import React, { useState } from "react";
import "../cari.css";

const TransactionListPage = () => {
  const [filters, setFilters] = useState({
    docNo: "",
    startDate: "",
    endDate: "",
    account: "",
    type: "Tümü",
    description: "",
    dueDate: "",
  });

  const [transactions, setTransactions] = useState([
    {
      docNo: "COL-0001",
      date: "2025-11-22",
      type: "Tahsilat",
      account: "Softplay Oyuncak",
      code: "CAR-002",
      description: "Nakit tahsilat",
      amount: 850,
    },
    {
      docNo: "PAY-0003",
      date: "2025-11-21",
      type: "Ödeme",
      account: "ABC GIDA LTD.",
      code: "CAR-001",
      description: "Tedarikçi ödemesi",
      amount: 1200,
    },
  ]);

  const handleSearch = () => {
    console.log("Filtreleme:", filters);
  };

  const handleDelete = (index) => {
    if (window.confirm("Bu cari fişi silinsin mi?")) {
      setTransactions(transactions.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>📑 Cari Fiş Listesi</h2>
        <button className="btn gray">Excel'e Aktar</button>
      </div>

      {/* 🔍 Filtre Alanı */}
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
              <th>Evrak No</th>
              <th>Evrak Tarihi</th>
              <th>Cari Adı / Ünvanı</th>
              <th>İşlem Türü</th>
              <th>Cari Kodu</th>
              <th>Açıklama</th>
              <th>İşlem Tutarı</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-msg">
                  Gösterilecek veri yok.
                </td>
              </tr>
            ) : (
              transactions.map((t, i) => (
                <tr key={i}>
                  <td>{t.docNo}</td>
                  <td>{t.date}</td>
                  <td>{t.account}</td>
                  <td>{t.type}</td>
                  <td>{t.code}</td>
                  <td>{t.description}</td>
                  <td>{t.amount.toFixed(2)} ₺</td>
                  <td>
                    <div className="actions">
                      <button className="btn gray small">İncele</button>
                      <button
                        className="btn red small"
                        onClick={() => handleDelete(i)}
                      >
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionListPage;