import React, { useState } from "react";
import "../reports.css";

const DailySalesDetailReport = () => {
  const [startDate, setStartDate] = useState("2025-11-27");
  const [endDate, setEndDate] = useState("2025-11-29");
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);

  // 🔹 Sahte veri: her fiş ayrı
  const mockData = [
    {
      date: "2025-11-27",
      time: "09:15:10",
      user: "Kadir",
      receipt: "FŞ0001",
      customer: "Ali Yılmaz",
      saleAmount: 250,
      returnAmount: 0,
    },
    {
      date: "2025-11-27",
      time: "10:50:42",
      user: "Ahmet",
      receipt: "FŞ0002",
      customer: "Elif Demir",
      saleAmount: 400,
      returnAmount: 0,
    },
    {
      date: "2025-11-28",
      time: "11:22:15",
      user: "Kadir",
      receipt: "FŞ0003",
      customer: "Oyun Merkezi",
      saleAmount: 1100,
      returnAmount: 100,
    },
    {
      date: "2025-11-28",
      time: "12:40:05",
      user: "Ahmet",
      receipt: "FŞ0004",
      customer: "Zeynep K.",
      saleAmount: 600,
      returnAmount: 0,
    },
    {
      date: "2025-11-29",
      time: "13:05:47",
      user: "Kadir",
      receipt: "FŞ0005",
      customer: "Mehmet T.",
      saleAmount: 950,
      returnAmount: 0,
    },
    {
      date: "2025-11-29",
      time: "14:20:32",
      user: "Ahmet",
      receipt: "FŞ0006",
      customer: "Oyun Merkezi",
      saleAmount: 800,
      returnAmount: 200,
    },
  ];

  const handleQuery = () => {
    const filtered = mockData.filter(
      (item) =>
        item.date >= startDate &&
        item.date <= endDate &&
        (!user || item.user === user)
    );
    setData(filtered);
  };

  const handleCancel = () => {
    setUser("");
    setData([]);
  };

  const totalSales = data.reduce((acc, x) => acc + x.saleAmount, 0);
  const totalReturns = data.reduce((acc, x) => acc + x.returnAmount, 0);

  return (
    <div className="report-container">
      {/* 🔹 Filtre Alanı */}
      <div className="report-filter-bar">
        <div className="filter-group">
          <label>Başlangıç Tarihi:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Bitiş Tarihi:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Kullanıcı:</label>
          <select value={user} onChange={(e) => setUser(e.target.value)}>
            <option value="">Tümü</option>
            <option value="Kadir">Kadir</option>
            <option value="Ahmet">Ahmet</option>
          </select>
        </div>

        <div className="filter-actions">
          <button className="btn btn-blue" onClick={handleQuery}>
            🔍 Sorgula
          </button>
        </div>
      </div>

      {/* 🔹 Tablo */}
      <div className="report-result">
        <h3 className="report-title">GÜNLÜK SATIŞ DETAYLI RAPORU</h3>

        <table className="report-table">
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Saat</th>
              <th>Kullanıcı</th>
              <th>Fiş No</th>
              <th>Adı / Ünvanı</th>
              <th>Satış</th>
              <th>İade</th>
              <th>Toplam</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.time}</td>
                  <td>{row.user}</td>
                  <td>{row.receipt}</td>
                  <td>{row.customer}</td>
                  <td>{row.saleAmount.toFixed(2)} ₺</td>
                  <td>{row.returnAmount.toFixed(2)} ₺</td>
                  <td>{(row.saleAmount - row.returnAmount).toFixed(2)} ₺</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">
                  Gösterilecek veri yok
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {data.length > 0 && (
          <div className="report-footer">
            <strong>TOPLAM SATIŞ:</strong> {totalSales.toFixed(2)} ₺ &nbsp; | &nbsp;
            <strong>TOPLAM İADE:</strong> {totalReturns.toFixed(2)} ₺ &nbsp; | &nbsp;
            <strong>NET:</strong> {(totalSales - totalReturns).toFixed(2)} ₺
          </div>
        )}
      </div>

      {/* 🔹 Alt Butonlar */}
      <div className="report-bottom-buttons">
        <button
          className="btn btn-gray"
          onClick={() => alert("Çıktı tasarımı yakında!")}
        >
          🧾 Çıktı Tasarla
        </button>
        <button className="btn btn-red" onClick={handleCancel}>
          ❌ İptal
        </button>
      </div>
    </div>
  );
};

export default DailySalesDetailReport;