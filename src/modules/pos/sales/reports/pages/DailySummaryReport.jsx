import React, { useState } from "react";
import "../reports.css";

const DailySummaryReport = () => {
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().slice(0, 10),
    end: new Date().toISOString().slice(0, 10),
  });

  // 🔹 Simüle edilmiş backend verisi
  const [data, setData] = useState({
    userSummary: [],
    generalSummary: [],
  });

  const handleChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleQuery = () => {
    // 🧠 İlerde buraya API çağrısı gelecek
    // Şimdilik mock veri üretelim
    const mockUser = [
      { user: "Admin", date: "2025-11-28", sales: 1450, refund: 50, balance: 1400 },
      { user: "Kasiyer 1", date: "2025-11-28", sales: 980, refund: 0, balance: 980 },
    ];
    const mockGeneral = [
      { date: "2025-11-28", sales: 2430, refund: 50, balance: 2380 },
    ];

    setData({ userSummary: mockUser, generalSummary: mockGeneral });
  };

  return (
    <div className="daily-summary-report">
      <div className="header">
        <h2>🧾 Gün Sonu Özet Rapor</h2>
        <div className="filter-area">
          <label>Tarih Aralığı:</label>
          <input
            type="date"
            name="start"
            value={dateRange.start}
            onChange={handleChange}
          />
          <span> / </span>
          <input
            type="date"
            name="end"
            value={dateRange.end}
            onChange={handleChange}
          />
          <button className="btn blue" onClick={handleQuery}>
            Sorgula
          </button>
          <button className="btn gray">Kapat</button>
        </div>
      </div>

      <div className="tables-container">
        {/* 🔸 Kullanıcıya Göre Özet */}
        <div className="summary-box">
          <div className="summary-header gray-bg">KULLANICIYA GÖRE ÖZET BİLGİ</div>
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
              {data.userSummary.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty">
                    &lt;Gösterilecek veri yok&gt;
                  </td>
                </tr>
              ) : (
                data.userSummary.map((row, i) => (
                  <tr key={i}>
                    <td>{row.user}</td>
                    <td>{row.date}</td>
                    <td>{row.sales.toFixed(2)}</td>
                    <td>{row.refund.toFixed(2)}</td>
                    <td>{row.balance.toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 🔹 Genel Özet Bilgi */}
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
              {data.generalSummary.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty">
                    &lt;Gösterilecek veri yok&gt;
                  </td>
                </tr>
              ) : (
                data.generalSummary.map((row, i) => (
                  <tr key={i}>
                    <td>{row.date}</td>
                    <td>{row.sales.toFixed(2)}</td>
                    <td>{row.refund.toFixed(2)}</td>
                    <td>{row.balance.toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DailySummaryReport;