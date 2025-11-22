// src/modules/pos/invoice/pages/InvoiceListPage.jsx
import React, { useState } from "react";
import "../invoice.css";
import { useNavigate } from "react-router-dom";

const InvoiceListPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

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

  const filtered = invoices.filter(
    (i) =>
      i.docNo.toLowerCase().includes(search.toLowerCase()) ||
      i.account.toLowerCase().includes(search.toLowerCase()) ||
      i.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>📑 Fatura-Fiş Listesi</h2>
        <button className="btn green" onClick={() => navigate("/invoice/purchase")}>
          + Yeni Fatura / Fiş
        </button>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Fatura no, cari veya tür ara..."
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
                  <td>{i.total.toFixed(2)}</td>
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