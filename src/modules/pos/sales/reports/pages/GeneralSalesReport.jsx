import React, { useState } from "react";
import "../reports.css";

const GeneralReport = () => {
  const [startDate, setStartDate] = useState("2025-11-27");
  const [endDate, setEndDate] = useState("2025-11-29");
  const [data, setData] = useState([]);

  // 🔹 Sahte veri (kullanıcı bazlı özet)
  const mockData = [
    { user: "Kadir", totalSales: 4800, totalCost: 3600, totalReturns: 150 },
    { user: "Ahmet", totalSales: 3200, totalCost: 2600, totalReturns: 0 },
    { user: "Elif", totalSales: 1200, totalCost: 950, totalReturns: 80 },
  ];

  const handleQuery = () => {
    setData(mockData);
  };

  const handleCancel = () => {
    setData([]);
  };

  const totalSales = data.reduce((a, x) => a + x.totalSales, 0);
  const totalCost = data.reduce((a, x) => a + x.totalCost, 0);
  const totalReturns = data.reduce((a, x) => a + x.totalReturns, 0);
  const totalProfit = totalSales - totalCost - totalReturns;
  const profitRate =
    totalSales > 0 ? ((totalProfit / totalSales) * 100).toFixed(1) : 0;

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
            🔍 Raporla
          </button>
        </div>
      </div>

      {/* 🔹 Tablo Alanı */}
      <div className="report-result">
        <h3 className="report-title">GENEL RAPOR</h3>

        <table className="report-table">
          <thead>
            <tr>
              <th>Kullanıcı</th>
              <th>Toplam Satış</th>
              <th>Toplam Maliyet</th>
              <th>Toplam İade</th>
              <th>Net Kâr</th>
              <th>Kâr Oranı (%)</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, i) => {
                const netProfit =
                  row.totalSales - row.totalCost - row.totalReturns;
                const rate =
                  row.totalSales > 0
                    ? ((netProfit / row.totalSales) * 100).toFixed(1)
                    : 0;
                return (
                  <tr key={i}>
                    <td>{row.user}</td>
                    <td>{row.totalSales.toFixed(2)} ₺</td>
                    <td>{row.totalCost.toFixed(2)} ₺</td>
                    <td>{row.totalReturns.toFixed(2)} ₺</td>
                    <td
                      style={{
                        color: netProfit >= 0 ? "green" : "red",
                        fontWeight: "600",
                      }}
                    >
                      {netProfit.toFixed(2)} ₺
                    </td>
                    <td>{rate} %</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  Gösterilecek veri yok
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {data.length > 0 && (
          <div className="report-footer">
            <strong>GENEL SATIŞ:</strong> {totalSales.toFixed(2)} ₺ &nbsp; | &nbsp;
            <strong>GENEL MALİYET:</strong> {totalCost.toFixed(2)} ₺ &nbsp; | &nbsp;
            <strong>GENEL İADE:</strong> {totalReturns.toFixed(2)} ₺ &nbsp; | &nbsp;
            <strong>NET KÂR:</strong>{" "}
            <span style={{ color: totalProfit >= 0 ? "green" : "red" }}>
              {totalProfit.toFixed(2)} ₺
            </span>{" "}
            &nbsp; | &nbsp;
            <strong>KÂR ORANI:</strong> {profitRate} %
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

export default GeneralReport;