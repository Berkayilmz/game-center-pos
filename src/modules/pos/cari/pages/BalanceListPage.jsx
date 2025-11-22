// src/modules/pos/cari/pages/BalanceListPage.jsx
import React, { useState } from "react";
import "../cari.css";

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
      <div className="settings-header">
        <h2>📊 Cari Hesap Bakiye Listesi</h2>
        <button className="btn gray">Excel'e Aktar</button>
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
          Sorgula
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
                  <td>{b.debt.toFixed(2)} ₺</td>
                  <td>{b.credit.toFixed(2)} ₺</td>
                  <td
                    style={{
                      color: b.balance > 0 ? "green" : b.balance < 0 ? "red" : "gray",
                      fontWeight: 600,
                    }}
                  >
                    {b.balance.toFixed(2)} ₺
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