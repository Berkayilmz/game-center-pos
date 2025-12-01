import React, { useState } from "react";
import "../cari.css";
import { ExcelService } from "../../../../core/services/ExcelService";

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

  // 🔹 Excel Kolonları (import & export ortak)
  const excelColumns = [
    { key: "docNo", header: "Evrak No" },
    { key: "date", header: "Evrak Tarihi" },
    { key: "account", header: "Cari Adı / Ünvanı" },
    { key: "type", header: "İşlem Türü" },
    { key: "code", header: "Cari Kodu" },
    { key: "description", header: "Açıklama" },
    { key: "amount", header: "İşlem Tutarı", format: "currency" },
  ];

  // 🔍 Filtreleme
  const handleSearch = () => {
    console.log("Filtreleme:", filters);
  };

  // ❌ Silme
  const handleDelete = (index) => {
    if (window.confirm("Bu cari fişi silinsin mi?")) {
      setTransactions(transactions.filter((_, i) => i !== index));
    }
  };

  // 📤 Excel’e Aktar
  const handleExport = () => {
    if (transactions.length === 0) {
      alert("Aktarılacak veri bulunamadı!");
      return;
    }
    ExcelService.exportToExcel(transactions, excelColumns, "CariFisListesi");
  };

  // 📥 Excel’den Aktar
  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imported = await ExcelService.importFromExcel(file, excelColumns);
      if (!Array.isArray(imported) || imported.length === 0) {
        alert("Excel dosyasında veri bulunamadı!");
        return;
      }

      // mevcut verilerin üstüne ekler
      setTransactions((prev) => [...prev, ...imported]);
      alert(`📥 ${imported.length} cari fiş başarıyla aktarıldı!`);
    } catch (err) {
      console.error("Excel import hatası:", err);
      alert("Excel dosyası okunamadı!");
    }

    e.target.value = ""; // input reset
  };

  return (
    <div className="settings-page">
      {/* Başlık + Butonlar */}
      <div className="settings-header">
        <h2>📑 Cari Fiş Listesi</h2>
        <div className="header-buttons">
          {/* Gizli dosya input */}
          <input
            type="file"
            id="excel-import"
            accept=".xlsx,.xls"
            style={{ display: "none" }}
            onChange={handleImport}
          />

          <button
            className="btn orange"
            onClick={() => document.getElementById("excel-import").click()}
          >
            📥 Excel'den Aktar
          </button>

          <button
            className="btn blue"
            onClick={handleExport}
            disabled={transactions.length === 0}
          >
            📤 Excel'e Aktar
          </button>
        </div>
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
          🔍 Sorgula
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