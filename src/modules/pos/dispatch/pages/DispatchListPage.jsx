import React, { useState } from "react";
import "../dispatch.css";
import { useNavigate } from "react-router-dom";
import { ExcelService } from "../../../../core/services/ExcelService";

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

  // 🔸 Excel kolonları
  const excelColumns = [
    { key: "docNo", header: "Evrak No" },
    { key: "type", header: "İrsaliye Türü" },
    { key: "date", header: "Tarih", format: "date" },
    { key: "account", header: "Cari Hesap" },
    { key: "description", header: "Açıklama" },
    { key: "itemCount", header: "Kalem Sayısı" },
    { key: "total", header: "Toplam Tutar", format: "currency" },
  ];

  // 📤 Excel'e Aktar
  const handleExport = () => {
    if (filtered.length === 0) {
      alert("Aktarılacak veri bulunamadı!");
      return;
    }
    ExcelService.exportToExcel(filtered, excelColumns, "IrsaliyeListesi");
  };

  return (
    <div className="settings-page">
      {/* 🔹 Başlık ve Butonlar */}
      <div className="settings-header">
        <h2>📑 İrsaliye Listesi</h2>
        <div className="header-buttons">
          <button
            className="btn blue"
            onClick={handleExport}
            disabled={filtered.length === 0}
          >
            📤 Excel'e Aktar
          </button>

          <button
            className="btn green"
            onClick={() => navigate("/dispatch/purchase")}
          >
            + Yeni İrsaliye
          </button>
        </div>
      </div>

      {/* 🔍 Arama Alanı */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="İrsaliye no, cari veya tür ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 📋 Tablo */}
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
                  <td
                    style={{
                      color: d.total < 0 ? "red" : "black",
                      fontWeight: 600,
                    }}
                  >
                    {Number(d.total || 0).toFixed(2)}
                  </td>
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