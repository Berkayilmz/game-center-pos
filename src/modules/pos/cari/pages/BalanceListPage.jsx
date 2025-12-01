import React, { useState } from "react";
import "../cari.css";
import { ExcelService } from "../../../../core/services/ExcelService";

const BalanceListPage = () => {
  const [filters, setFilters] = useState({
    code: "",
    name: "",
    startDate: "",
    endDate: "",
    group: "",
    balanceType: "all",
  });

  const [balances, setBalances] = useState([
    {
      name: "Softplay Oyuncak",
      code: "CAR-002",
      group: "Müşteri",
      phone: "0212 333 22 11",
      debt: 0,
      credit: 850,
      balance: 850,
    },
    {
      name: "ABC GIDA LTD.",
      code: "CAR-001",
      group: "Tedarikçi",
      phone: "0312 555 44 33",
      debt: 1200,
      credit: 0,
      balance: -1200,
    },
  ]);

  const handleSearch = () => {
    console.log("Filtreleme:", filters);
  };

  // 🔹 Excel Kolonları
  const excelColumns = [
    { key: "name", header: "Cari Hesap Adı" },
    { key: "code", header: "Cari Hesap Kodu" },
    { key: "group", header: "Cari Grubu" },
    { key: "phone", header: "Telefon No" },
    { key: "debt", header: "Borç Tutar", format: "currency" },
    { key: "credit", header: "Alacak Tutar", format: "currency" },
    { key: "balance", header: "Bakiye", format: "currency" },
  ];

  // 🔸 Excel'e Aktar
  const handleExport = () => {
    const filtered = filterBalances();
    if (filtered.length === 0) {
      alert("Aktarılacak veri bulunamadı!");
      return;
    }
    ExcelService.exportToExcel(filtered, excelColumns, "CariBakiyeListesi");
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

      // 🧮 Bakiye otomatik hesaplanır (debt - credit)
      const normalized = imported.map((item) => ({
        ...item,
        debt: Number(item.debt) || 0,
        credit: Number(item.credit) || 0,
        balance: (Number(item.credit) || 0) - (Number(item.debt) || 0),
      }));

      setBalances((prev) => [...prev, ...normalized]);
      alert(`📥 ${normalized.length} cari bakiye kaydı başarıyla aktarıldı!`);
    } catch (err) {
      console.error("Excel import hatası:", err);
      alert("Excel dosyası okunamadı!");
    }

    e.target.value = ""; // input reset
  };

  // 🔍 Filtreleme
  const filterBalances = () => {
    if (filters.balanceType === "debt")
      return balances.filter((b) => b.balance < 0);
    if (filters.balanceType === "credit")
      return balances.filter((b) => b.balance > 0);
    if (filters.balanceType === "zero")
      return balances.filter((b) => b.balance === 0);
    return balances;
  };

  const displayed = filterBalances();

  return (
    <div className="settings-page">
      {/* 🔹 Başlık + Excel Butonları */}
      <div className="settings-header">
        <h2>📊 Cari Hesap Bakiye Listesi</h2>
        <div className="header-buttons">
          {/* Gizli Excel Dosya Seçici */}
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
            disabled={displayed.length === 0}
          >
            📤 Excel'e Aktar
          </button>
        </div>
      </div>

      {/* 🔍 Filtre Alanı */}
      <div
        className="filter-bar"
        style={{ flexWrap: "wrap", alignItems: "center", gap: "10px" }}
      >
        <input
          placeholder="Cari Hesap Kodu"
          value={filters.code}
          onChange={(e) => setFilters({ ...filters, code: e.target.value })}
        />
        <input
          placeholder="Cari Hesap Adı"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <label>Tarih:</label>
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
          placeholder="Cari Grubu"
          value={filters.group}
          onChange={(e) => setFilters({ ...filters, group: e.target.value })}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderLeft: "1px solid var(--color-border)",
            paddingLeft: "10px",
          }}
        >
          <label>
            <input
              type="radio"
              name="balanceType"
              value="all"
              checked={filters.balanceType === "all"}
              onChange={(e) =>
                setFilters({ ...filters, balanceType: e.target.value })
              }
            />
            Tüm Hesaplar
          </label>
          <label>
            <input
              type="radio"
              name="balanceType"
              value="credit"
              checked={filters.balanceType === "credit"}
              onChange={(e) =>
                setFilters({ ...filters, balanceType: e.target.value })
              }
            />
            Alacak Bakiyesi Olan
          </label>
          <label>
            <input
              type="radio"
              name="balanceType"
              value="debt"
              checked={filters.balanceType === "debt"}
              onChange={(e) =>
                setFilters({ ...filters, balanceType: e.target.value })
              }
            />
            Borç Bakiyesi Olan
          </label>
          <label>
            <input
              type="radio"
              name="balanceType"
              value="zero"
              checked={filters.balanceType === "zero"}
              onChange={(e) =>
                setFilters({ ...filters, balanceType: e.target.value })
              }
            />
            Bakiyesi Sıfır Olan
          </label>
        </div>

        <button className="btn blue small" onClick={handleSearch}>
          🔍 Sorgula
        </button>
        <button className="btn orange small">Cari Hareket</button>
      </div>

      {/* 📋 Tablo */}
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Cari Hesap Adı</th>
              <th>Cari Hesap Kodu</th>
              <th>Cari Grubu</th>
              <th>Telefon No</th>
              <th>Borç Tutar</th>
              <th>Alacak Tutar</th>
              <th>Bakiye</th>
            </tr>
          </thead>
          <tbody>
            {displayed.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-msg">
                  Gösterilecek veri yok.
                </td>
              </tr>
            ) : (
              displayed.map((b, i) => (
                <tr key={i}>
                  <td>{b.name}</td>
                  <td>{b.code}</td>
                  <td>{b.group}</td>
                  <td>{b.phone}</td>
                  <td>{Number(b.debt || 0).toFixed(2)} ₺</td>
                  <td>{Number(b.credit || 0).toFixed(2)} ₺</td>
                  <td
                    style={{
                      color:
                        b.balance > 0
                          ? "green"
                          : b.balance < 0
                          ? "red"
                          : "gray",
                      fontWeight: 600,
                    }}
                  >
                    {Number(b.balance || 0).toFixed(2)} ₺
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

export default BalanceListPage;