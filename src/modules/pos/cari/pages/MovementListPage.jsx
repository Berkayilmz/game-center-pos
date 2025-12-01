import React, { useState } from "react";
import "../cari.css";
import { ExcelService } from "../../../../core/services/ExcelService";

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

  // 🔹 Excel Kolon Tanımı
  const excelColumns = [
    { key: "type", header: "İşlem Türü" },
    { key: "docNo", header: "Evrak No" },
    { key: "date", header: "Evrak Tarihi" },
    { key: "account", header: "Cari Adı / Ünvanı" },
    { key: "code", header: "Cari Kodu" },
    { key: "debt", header: "Borç Tutarı", format: "currency" },
    { key: "credit", header: "Alacak Tutarı", format: "currency" },
  ];

  // 🔍 Filtreleme
  const handleSearch = () => {
    console.log("Filtreleme:", filters);
  };

  // 📤 Excel'e Aktar
  const handleExport = () => {
    if (movements.length === 0) {
      alert("Aktarılacak veri bulunamadı!");
      return;
    }
    ExcelService.exportToExcel(movements, excelColumns, "CariHareketListesi");
  };

  // 📥 Excel'den Aktar
  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imported = await ExcelService.importFromExcel(file, excelColumns);
      if (!Array.isArray(imported) || imported.length === 0) {
        alert("Excel dosyasında veri bulunamadı!");
        return;
      }

      setMovements((prev) => [...prev, ...imported]);
      alert(`📥 ${imported.length} cari hareket başarıyla aktarıldı!`);
    } catch (err) {
      console.error("Excel import hatası:", err);
      alert("Excel dosyası okunamadı!");
    }

    e.target.value = ""; // input reset
  };

  return (
    <div className="settings-page">
      {/* 🔹 Başlık + Excel Butonları */}
      <div className="settings-header">
        <h2>📘 Cari Hareket Listesi</h2>
        <div className="header-buttons">
          {/* Gizli Dosya Seçici */}
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
            disabled={movements.length === 0}
          >
            📤 Excel'e Aktar
          </button>
        </div>
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
          🔍 Sorgula
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
              <th>Borç Tutarı</th>
              <th>Alacak Tutarı</th>
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
                  <td>{Number(m.debt || 0).toFixed(2)} ₺</td>
                  <td>{Number(m.credit || 0).toFixed(2)} ₺</td>
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