import React, { useState } from "react";
import "../reports.css";

const SaleListPage = () => {
  const [startDate, setStartDate] = useState("2025-11-29");
  const [endDate, setEndDate] = useState("2025-11-29");
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);

  const mockSales = [
    {
      date: "2025-11-28",
      time: "09:35:42",
      user: "Kadir",
      receipt: "FŞ0001",
      customer: "Ali Yılmaz",
      saleAmount: 245.5,
      returnAmount: 0,
    },
    {
      date: "2025-11-29",
      time: "10:20:10",
      user: "Kadir",
      receipt: "FŞ0002",
      customer: "Elif Demir",
      saleAmount: 780.0,
      returnAmount: 80.0,
    },
    {
      date: "2025-11-29",
      time: "11:15:08",
      user: "Ahmet",
      receipt: "FŞ0003",
      customer: "Oyun Merkezi",
      saleAmount: 1200.0,
      returnAmount: 0,
    },
  ];

  const handleQuery = () => {
    const filtered = mockSales.filter(
      (item) =>
        (!user || item.user === user) &&
        item.date >= startDate &&
        item.date <= endDate
    );
    setData(filtered);
  };

  const handleCancel = () => {
    setUser("");
    setData([]);
  };

  const totalSale = data.reduce((acc, x) => acc + x.saleAmount, 0);
  const totalReturn = data.reduce((acc, x) => acc + x.returnAmount, 0);

  return (
    <div className="report-container">
      {/* 🔹 Filtre ve Sorgu Alanı */}
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
        <h3 className="report-title">SATIŞ DÖKÜMÜ</h3>

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
            <strong>TOPLAM SATIŞ:</strong> {totalSale.toFixed(2)} ₺ &nbsp; | &nbsp;
            <strong>TOPLAM İADE:</strong> {totalReturn.toFixed(2)} ₺ &nbsp; | &nbsp;
            <strong>NET:</strong> {(totalSale - totalReturn).toFixed(2)} ₺
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

export default SaleListPage;