import React, { useState } from "react";
import "../reports.css";

const ProfitLossByCustomerDetail = () => {
  const [startDate, setStartDate] = useState("2025-11-27");
  const [endDate, setEndDate] = useState("2025-11-29");
  const [user, setUser] = useState("");
  const [costType, setCostType] = useState("ORTALAMA ALIŞ");
  const [data, setData] = useState([]);

  // 🔹 Sahte veri: müşteri bazında toplamlar
  const mockSales = [
    {
      customer: "Ali Yılmaz",
      user: "Kadir",
      saleTotal: 1500,
      costTotal: 1100,
    },
    {
      customer: "Oyun Merkezi",
      user: "Ahmet",
      saleTotal: 2000,
      costTotal: 1700,
    },
    {
      customer: "Elif Demir",
      user: "Kadir",
      saleTotal: 800,
      costTotal: 950,
    },
    {
      customer: "Zeynep K.",
      user: "Ahmet",
      saleTotal: 500,
      costTotal: 400,
    },
  ];

  const handleQuery = () => {
    const filtered = mockSales.filter(
      (x) => (!user || x.user === user) && startDate && endDate
    );
    setData(filtered);
  };

  const handleCancel = () => {
    setUser("");
    setCostType("ORTALAMA ALIŞ");
    setData([]);
  };

  const totalSales = data.reduce((acc, x) => acc + x.saleTotal, 0);
  const totalCost = data.reduce((acc, x) => acc + x.costTotal, 0);
  const totalProfit = totalSales - totalCost;

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

        <div className="filter-group">
          <label>Maliyet Fiyatı:</label>
          <select
            value={costType}
            onChange={(e) => setCostType(e.target.value)}
          >
            <option>ORTALAMA ALIŞ</option>
            <option>ORTALAMA SATIŞ</option>
            <option>STOK ALIŞ FİYATI</option>
            <option>STOK SATIŞ FİYATI</option>
            <option>STOK FİYAT 1</option>
            <option>STOK FİYAT 2</option>
            <option>STOK FİYAT 3</option>
            <option>HIZLI SATIŞ FİYATI</option>
            <option>EN SON ALIŞ FİYATI</option>
            <option>EN SON SATIŞ FİYATI</option>
            <option>ORTALAMA AĞIRLIKLI ALIŞ</option>
            <option>ORTALAMA AĞIRLIKLI SATIŞ</option>
            <option>EN UCUZ ALIŞ FİYATI</option>
            <option>EN PAHALI ALIŞ FİYATI</option>
          </select>
        </div>

        <div className="filter-actions">
          <button className="btn btn-blue" onClick={handleQuery}>
            🔍 Raporla
          </button>
        </div>
      </div>

      {/* 🔹 Tablo Alanı */}
      <div className="report-result">
        <h3 className="report-title">KAR / ZARAR ANALİZİ (CARİ DETAYLI)</h3>

        <table className="report-table">
          <thead>
            <tr>
              <th>Müşteri / Cari Adı</th>
              <th>Kullanıcı</th>
              <th>Toplam Satış</th>
              <th>Toplam Maliyet</th>
              <th>Kâr / Zarar</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, i) => {
                const profit = row.saleTotal - row.costTotal;
                return (
                  <tr key={i}>
                    <td>{row.customer}</td>
                    <td>{row.user}</td>
                    <td>{row.saleTotal.toFixed(2)} ₺</td>
                    <td>{row.costTotal.toFixed(2)} ₺</td>
                    <td
                      style={{
                        color: profit >= 0 ? "green" : "red",
                        fontWeight: "600",
                      }}
                    >
                      {profit.toFixed(2)} ₺
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  Gösterilecek veri yok
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {data.length > 0 && (
          <div className="report-footer">
            <strong>TOPLAM SATIŞ:</strong> {totalSales.toFixed(2)} ₺ &nbsp; | &nbsp;
            <strong>TOPLAM MALİYET:</strong> {totalCost.toFixed(2)} ₺ &nbsp; | &nbsp;
            <strong>KAR / ZARAR:</strong>{" "}
            <span style={{ color: totalProfit >= 0 ? "green" : "red" }}>
              {totalProfit.toFixed(2)} ₺
            </span>
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

export default ProfitLossByCustomerDetail;