import React, { useState } from "react";
import "../invoice.css";
import { useNavigate } from "react-router-dom";
import { ExcelService } from "../../../../core/services/ExcelService"; // ✅ Excel servisi dahil edildi

const InvoiceListPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // 🔹 Örnek veri
  const [invoices] = useState([
    {
      docNo: "INV-0001",
      type: "Alış (Fatura-Fiş)",
      date: "2025-11-22",
      account: "ABC GIDA LTD.",
      description: "Haftalık mal alımı",
      itemCount: 4,
      total: 7400,
    },
    {
      docNo: "INV-0002",
      type: "Satış (Fatura-Fiş)",
      date: "2025-11-21",
      account: "Softplay Oyuncak",
      description: "POS satışları",
      itemCount: 6,
      total: 5250,
    },
    {
      docNo: "INV-0003",
      type: "Alış İade (Fatura-Fiş)",
      date: "2025-11-20",
      account: "ABC GIDA LTD.",
      description: "İade edilen ürünler",
      itemCount: 2,
      total: -600,
    },
  ]);

  // 🔍 Filtreleme
  const filtered = invoices.filter(
    (i) =>
      i.docNo.toLowerCase().includes(search.toLowerCase()) ||
      i.account.toLowerCase().includes(search.toLowerCase()) ||
      i.type.toLowerCase().includes(search.toLowerCase())
  );

  // 🔸 Excel kolon tanımları
  const excelColumns = [
    { key: "docNo", header: "Evrak No" },
    { key: "type", header: "Tür" },
    { key: "date", header: "Tarih", format: "date" },
    { key: "account", header: "Cari Hesap" },
    { key: "description", header: "Açıklama" },
    { key: "itemCount", header: "Kalem Sayısı" },
    { key: "total", header: "Tutar (₺)", format: "currency" },
  ];

  // 📤 Excel'e Aktar
  const handleExport = () => {
    if (filtered.length === 0) {
      alert("Aktarılacak veri bulunamadı!");
      return;
    }
    ExcelService.exportToExcel(filtered, excelColumns, "FaturaFisListesi");
  };

  return (
    <div className="settings-page">
      {/* 🔹 Başlık ve Butonlar */}
      <div className="settings-header">
        <h2>📑 Fatura-Fiş Listesi</h2>
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
            onClick={() => navigate("/invoice/purchase")}
          >
            + Yeni Fatura / Fiş
          </button>
        </div>
      </div>

      {/* 🔍 Arama Alanı */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Fatura no, cari veya tür ara..."
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
                  Kayıtlı fatura/fiş bulunamadı.
                </td>
              </tr>
            ) : (
              filtered.map((i, index) => (
                <tr key={index}>
                  <td>{i.docNo}</td>
                  <td>{i.type}</td>
                  <td>{i.date}</td>
                  <td>{i.account}</td>
                  <td>{i.description}</td>
                  <td>{i.itemCount}</td>
                  <td
                    style={{
                      color: i.total < 0 ? "red" : "black",
                      fontWeight: 600,
                    }}
                  >
                    {Number(i.total || 0).toFixed(2)}
                  </td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn gray small"
                        onClick={() => navigate(`/invoice/${i.type}`)}
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

export default InvoiceListPage;