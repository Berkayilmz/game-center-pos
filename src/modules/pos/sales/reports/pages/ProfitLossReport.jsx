import React, { useState } from "react";
import "../reports.css";

const ProfitLossReport = () => {
  const [startDate, setStartDate] = useState("2025-11-27");
  const [endDate, setEndDate] = useState("2025-11-29");
  const [user, setUser] = useState("");
  const [costType, setCostType] = useState("ORTALAMA ALIŞ");
  const [data, setData] = useState([]);

  const mockData = [
    {
      date: "2025-11-27",
      user: "Kadir",
      product: "Softplay Bileti",
      quantity: 5,
      salePrice: 150,
      costPrice: 110,
    },
    {
      date: "2025-11-28",
      user: "Ahmet",
      product: "Jeton Kart Yükleme",
      quantity: 10,
      salePrice: 100,
      costPrice: 80,
    },
    {
      date: "2025-11-29",
      user: "Kadir",
      product: "İçecek Satışı",
      quantity: 8,
      salePrice: 40,
      costPrice: 30,
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
    setCostType("ORTALAMA ALIŞ");
    setData([]);
  };

  const totalSale = data.reduce(
    (acc, x) => acc + x.salePrice * x.quantity,
    0
  );
  const totalCost = data.reduce(
    (acc, x) => acc + x.costPrice * x.quantity,
    0
  );
  const totalProfit = totalSale - totalCost;

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
        <h3 className="report-title">KAR / ZARAR ANALİZİ</h3>

        <table className="report-table">
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Kullanıcı</th>
              <th>Ürün Adı</th>
              <th>Miktar</th>
              <th>Satış Fiyatı</th>
              <th>Maliyet Fiyatı</th>
              <th>Satış Toplam</th>
              <th>Maliyet Toplam</th>
              <th>Kâr / Zarar</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, i) => {
                const saleTotal = row.salePrice * row.quantity;
                const costTotal = row.costPrice * row.quantity;
                const profit = saleTotal - costTotal;
                return (
                  <tr key={i}>
                    <td>{row.date}</td>
                    <td>{row.user}</td>
                    <td>{row.product}</td>
                    <td>{row.quantity}</td>
                    <td>{row.salePrice.toFixed(2)} ₺</td>
                    <td>{row.costPrice.toFixed(2)} ₺</td>
                    <td>{saleTotal.toFixed(2)} ₺</td>
                    <td>{costTotal.toFixed(2)} ₺</td>
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
                <td colSpan="9" className="no-data">
                  Gösterilecek veri yok
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {data.length > 0 && (
          <div className="report-footer">
            <strong>TOPLAM SATIŞ:</strong> {totalSale.toFixed(2)} ₺ &nbsp; | &nbsp;
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

export default ProfitLossReport;