import React, { useState } from "react";
import "../dispatch.css";
import { useNavigate } from "react-router-dom";

const DispatchListPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // 🔹 Örnek irsaliye verileri
  const [dispatches] = useState([
    {
      docNo: "IRS-0001",
      type: "Alış İrsaliyesi",
      date: "2025-11-22",
      account: "ABC GIDA LTD.",
      description: "Haftalık tedarik",
      itemCount: 3,
      total: 5400,
    },
    {
      docNo: "IRS-0002",
      type: "Satış İrsaliyesi",
      date: "2025-11-21",
      account: "Softplay Oyuncak",
      description: "Kiosk POS satışları",
      itemCount: 5,
      total: 3250,
    },
    {
      docNo: "IRS-0003",
      type: "Alış İade İrsaliyesi",
      date: "2025-11-19",
      account: "ABC GIDA LTD.",
      description: "Hasarlı ürün iadesi",
      itemCount: 2,
      total: -450,
    },
  ]);

  // 🔍 Filtreleme
  const filtered = dispatches.filter(
    (d) =>
      d.docNo.toLowerCase().includes(search.toLowerCase()) ||
      d.account.toLowerCase().includes(search.toLowerCase()) ||
      d.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>📑 İrsaliye Listesi</h2>
        <button
          className="btn green"
          onClick={() => navigate("/dispatch/purchase")}
        >
          + Yeni İrsaliye
        </button>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="İrsaliye no, cari veya tür ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Evrak No</th>
              <th>Tür</th>
              <th>Tarih</th>
              <th>Cari Hesap</th>
              <th>Açıklama</th>
              <th>Kalem Sayısı</th>
              <th>Tutar (₺)</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-msg">
                  Kayıtlı irsaliye bulunamadı.
                </td>
              </tr>
            ) : (
              filtered.map((d, i) => (
                <tr key={i}>
                  <td>{d.docNo}</td>
                  <td>{d.type}</td>
                  <td>{d.date}</td>
                  <td>{d.account}</td>
                  <td>{d.description}</td>
                  <td>{d.itemCount}</td>
                  <td>{d.total.toFixed(2)}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn gray small"
                        onClick={() => navigate(`/dispatch/${d.type}`)}
                      >
                        Görüntüle
                      </button>
                      <button
                        className="btn red small"
                        onClick={() => alert("Silme işlemi henüz aktif değil.")}
                      >
                        Sil
                      </button>
                    </div>
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

export default DispatchListPage;