import React, { useState } from "react";
import "../cash.css";

const CashBalanceListPage = () => {
  const [filters, setFilters] = useState({
    cashAccount: "",
    dateFrom: "",
    dateTo: "",
    movementType: "Tümü",
    transactionType: "Tümü",
    balanceFilter: "all", // all | income | expense | zero
  });

  const [balances, setBalances] = useState([]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    console.log("🔍 [KASA BAKİYE FİLTRESİ]", filters);

    // ⚙️ Simülasyon — backend geldiğinde API çağrısı olacak.
    const sampleData = [
      { name: "KREDİ KARTI", income: 0, expense: 0, balance: 0 },
      { name: "NAKİT", income: 0, expense: 0, balance: 0 },
      { name: "SENET", income: 0, expense: 0, balance: 0 },
      { name: "ÇEK", income: 0, expense: 0, balance: 0 },
    ];

    // Filtreye göre listeyi şekillendir
    let filtered = sampleData;
    if (filters.balanceFilter === "income") {
      filtered = filtered.filter((b) => b.balance > 0);
    } else if (filters.balanceFilter === "expense") {
      filtered = filtered.filter((b) => b.balance < 0);
    } else if (filters.balanceFilter === "zero") {
      filtered = filtered.filter((b) => b.balance === 0);
    }

    setBalances(filtered);
  };

  return (
    <div className="cash-list-page">
      <div className="header">
        <h2>💰 Kasa Bakiye Listesi</h2>
        <div className="right-buttons">
          <button className="btn yellow" onClick={() => alert("Excel aktarımı eklenecek 📊")}>
            Excel'e Aktar
          </button>
          <button className="btn gray" onClick={() => alert("Kapatma eklenecek")}>Kapat ✖</button>
        </div>
      </div>

      {/* 🔍 Filtre Alanı */}
      <div className="filter-panel">
        <div className="filter-grid">
          <label>Kasa Hesabı:</label>
          <select name="cashAccount" value={filters.cashAccount} onChange={handleChange}>
            <option value="">Tümü</option>
            <option value="NAKIT">NAKİT</option>
            <option value="KREDI">KREDİ KARTI</option>
            <option value="SENET">SENET</option>
            <option value="CEK">ÇEK</option>
          </select>

          <label>Evrak Tarihi:</label>
          <div className="date-range">
            <input type="date" name="dateFrom" value={filters.dateFrom} onChange={handleChange} />
            <span>/</span>
            <input type="date" name="dateTo" value={filters.dateTo} onChange={handleChange} />
          </div>

          <label>Hareket Tipi:</label>
          <select name="movementType" value={filters.movementType} onChange={handleChange}>
            <option>Tümü</option>
            <option>Tahsilat</option>
            <option>Ödeme</option>
            <option>Virman</option>
            <option>Açılış</option>
            <option>Devir</option>
          </select>

          <label>Hareket Türü:</label>
          <select name="transactionType" value={filters.transactionType} onChange={handleChange}>
            <option>Tümü</option>
            <option>Nakit</option>
            <option>POS</option>
            <option>EFT</option>
            <option>Havale</option>
          </select>

          {/* Sağ taraftaki radyo filtreleri */}
          <div className="balance-filters">
            <label>
              <input
                type="radio"
                name="balanceFilter"
                value="all"
                checked={filters.balanceFilter === "all"}
                onChange={handleChange}
              />
              Tüm Hesaplar
            </label>
            <label>
              <input
                type="radio"
                name="balanceFilter"
                value="expense"
                checked={filters.balanceFilter === "expense"}
                onChange={handleChange}
              />
              Gider Bakiyesi Olan Hesaplar
            </label>
            <label>
              <input
                type="radio"
                name="balanceFilter"
                value="income"
                checked={filters.balanceFilter === "income"}
                onChange={handleChange}
              />
              Gelir Bakiyesi Olan Hesaplar
            </label>
            <label>
              <input
                type="radio"
                name="balanceFilter"
                value="zero"
                checked={filters.balanceFilter === "zero"}
                onChange={handleChange}
              />
              Bakiyesi Sıfır Olan Hesaplar
            </label>
          </div>

          <div className="filter-actions">
            <button className="btn blue" onClick={handleSearch}>
              Sorgula
            </button>
            <button
              className="btn gray"
              onClick={() => alert("Kasa hareket ekranına yönlendirilecek")}
            >
              Kasa Hareket
            </button>
          </div>
        </div>
      </div>

      {/* 📋 Tablo Alanı */}
      <div className="cash-table">
        {balances.length === 0 ? (
          <div className="empty">📭 Gösterilecek veri yok</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Kasa Adı</th>
                <th>Gelir Tutar</th>
                <th>Gider Tutar</th>
                <th>Bakiye</th>
              </tr>
            </thead>
            <tbody>
              {balances.map((b, i) => (
                <tr key={i}>
                  <td>{b.name}</td>
                  <td>{b.income.toFixed(2)}</td>
                  <td>{b.expense.toFixed(2)}</td>
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
                    {b.balance.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CashBalanceListPage;