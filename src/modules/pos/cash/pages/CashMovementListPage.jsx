import React, { useState } from "react";
import "../cash.css";

const CashMovementListPage = () => {
  const [filters, setFilters] = useState({
    docNo: "",
    dateFrom: "",
    dateTo: "",
    customer: "",
    dueFrom: "",
    dueTo: "",
    type: "Tümü",
    transactionType: "Tümü",
    description: "",
  });

  const [records, setRecords] = useState([]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    console.log("🔍 [KASA HAREKET LİSTESİ] Filtre:", filters);
    // TODO: backend geldiğinde /cash-movements endpointine istek atılacak
  };

  return (
    <div className="cash-list-page">
      <div className="header">
        <h2>📊 Kasa Hareket Listesi</h2>
        <button className="btn gray" onClick={() => alert("Kapatma eklenecek")}>Kapat ✖</button>
      </div>

      {/* 🔍 Filtre Alanı */}
      <div className="filter-panel">
        <div className="filter-grid">
          <label>Kasa / Evrak No:</label>
          <input
            name="docNo"
            value={filters.docNo}
            onChange={handleFilterChange}
            placeholder="Kasa adı veya evrak no..."
          />

          <label>Evrak Tarihi:</label>
          <div className="date-range">
            <input type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} />
            <span>/</span>
            <input type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange} />
          </div>

          <label>Cari Hesap:</label>
          <input
            name="customer"
            value={filters.customer}
            onChange={handleFilterChange}
            placeholder="Cari hesap adı..."
          />

          <label>Vade Tarihi:</label>
          <div className="date-range">
            <input type="date" name="dueFrom" value={filters.dueFrom} onChange={handleFilterChange} />
            <span>/</span>
            <input type="date" name="dueTo" value={filters.dueTo} onChange={handleFilterChange} />
          </div>

          <label>Hareket Tipi:</label>
          <select name="type" value={filters.type} onChange={handleFilterChange}>
            <option>Tümü</option>
            <option>Tahsilat</option>
            <option>Ödeme</option>
            <option>Virman</option>
            <option>Açılış</option>
            <option>Devir</option>
          </select>

          <label>Hareket Türü:</label>
          <select name="transactionType" value={filters.transactionType} onChange={handleFilterChange}>
            <option>Tümü</option>
            <option>Nakit</option>
            <option>POS</option>
            <option>EFT</option>
            <option>Havale</option>
          </select>

          <label>Açıklama:</label>
          <input
            name="description"
            value={filters.description}
            onChange={handleFilterChange}
            placeholder="Açıklama ara..."
          />

          <button className="btn blue" onClick={handleSearch}>Sorgula</button>
        </div>
      </div>

      {/* 🟨 Araç Çubuğu */}
      <div className="toolbar">
        <div className="left">
          <button className="btn gray">Düzenle</button>
          <button className="btn gray">İncele</button>
        </div>
        <div className="right">
          <button className="btn gray">Kolon Gizle/Göster</button>
          <button className="btn yellow" onClick={() => alert("Excel aktarımı hazırlanıyor 📊")}>
            Excel'e Aktar
          </button>
        </div>
      </div>

      {/* 📋 Liste Alanı */}
      <div className="cash-table">
        {records.length === 0 ? (
          <div className="empty">📭 Gösterilecek veri yok</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Kasa Adı</th>
                <th>Hareket Tipi</th>
                <th>Evrak Tarihi</th>
                <th>Evrak No</th>
                <th>İşlem Şekli</th>
                <th>İşlem Türü</th>
                <th>Gelir Tutar</th>
                <th>Gider Tutar</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id}>
                  <td>{r.cashAccount}</td>
                  <td>{r.operationLabel}</td>
                  <td>{r.date}</td>
                  <td>{r.docNo}</td>
                  <td>{r.transactionMethod}</td>
                  <td>{r.transactionType}</td>
                  <td>{r.sign === "+" ? r.amount.toFixed(2) : "—"}</td>
                  <td>{r.sign === "-" ? r.amount.toFixed(2) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CashMovementListPage;