import React, { useState } from "react";
import "../reports.css";

const DailySalesReport = () => {
  const [startDate, setStartDate] = useState("2025-11-20");
  const [endDate, setEndDate] = useState("2025-11-29");
  const [data, setData] = useState([]);
  const [general, setGeneral] = useState([]);

  // 🔹 Sahte veri (günlük kullanıcı satış & iade)
  const mockData = [
    { date: "2025-11-27", user: "Kadir", sales: 1500, returns: 200 },
    { date: "2025-11-27", user: "Ahmet", sales: 800, returns: 0 },
    { date: "2025-11-28", user: "Kadir", sales: 1200, returns: 100 },
    { date: "2025-11-28", user: "Ahmet", sales: 450, returns: 50 },
    { date: "2025-11-29", user: "Kadir", sales: 900, returns: 0 },
    { date: "2025-11-29", user: "Ahmet", sales: 1100, returns: 300 },
  ];

  const handleQuery = () => {
    // Kullanıcı bazında
    const filtered = mockData.filter(
      (x) => x.date >= startDate && x.date <= endDate
    );
    setData(filtered);

    // Gün bazında genel toplam
    const grouped = {};
    filtered.forEach((x) => {
      if (!grouped[x.date])
        grouped[x.date] = { date: x.date, sales: 0, returns: 0 };
      grouped[x.date].sales += x.sales;
      grouped[x.date].returns += x.returns;
    });
    setGeneral(Object.values(grouped));
  };

  const handleCancel = () => {
    setData([]);
    setGeneral([]);
  };

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

        <div className="filter-actions">
          <button className="btn btn-blue" onClick={handleQuery}>
            🔍 Sorgula
          </button>
        </div>
      </div>

      {/* 🔹 Tablo Alanı */}
      <div className="daily-summary-report">
        <div className="header">
          <h3>GÜNLÜK SATIŞ RAPORU</h3>
        </div>

        <div className="tables-container">
          {/* === Kullanıcıya Göre === */}
          <div className="summary-box">
            <div className="summary-header gray-bg">
              KULLANICIYA GÖRE ÖZET BİLGİ
            </div>
            <table>
              <thead>
                <tr>
                  <th>Kullanıcı</th>
                  <th>Tarih</th>
                  <th>Satış</th>
                  <th>İade</th>
                  <th>Bakiye</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((row, i) => (
                    <tr key={i}>
                      <td>{row.user}</td>
                      <td>{row.date}</td>
                      <td>{row.sales.toFixed(2)} ₺</td>
                      <td>{row.returns.toFixed(2)} ₺</td>
                      <td>{(row.sales - row.returns).toFixed(2)} ₺</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty">
                      Gösterilecek veri yok
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* === Genel Özet === */}
          <div className="summary-box">
            <div className="summary-header blue-bg">GENEL ÖZET BİLGİ</div>
            <table>
              <thead>
                <tr>
                  <th>Tarih</th>
                  <th>Satış</th>
                  <th>İade</th>
                  <th>Bakiye</th>
                </tr>
              </thead>
              <tbody>
                {general.length > 0 ? (
                  general.map((g, i) => (
                    <tr key={i}>
                      <td>{g.date}</td>
                      <td>{g.sales.toFixed(2)} ₺</td>
                      <td>{g.returns.toFixed(2)} ₺</td>
                      <td>{(g.sales - g.returns).toFixed(2)} ₺</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="empty">
                      Gösterilecek veri yok
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
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

export default DailySalesReport;