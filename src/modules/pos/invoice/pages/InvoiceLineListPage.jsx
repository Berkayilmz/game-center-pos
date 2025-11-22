// src/modules/pos/invoice/pages/InvoiceLineListPage.jsx
import React, { useState } from "react";
import "../invoice.css";

const InvoiceLineListPage = () => {
  const [search, setSearch] = useState("");

  const [lines] = useState([
    {
      docNo: "INV-0001",
      type: "Alış (Fatura-Fiş)",
      date: "2025-11-22",
      account: "ABC GIDA LTD.",
      productCode: "880200000001",
      productName: "Coca Cola 330ml",
      qty: 24,
      unit: "Adet",
      price: 10,
      total: 240,
    },
    {
      docNo: "INV-0002",
      type: "Satış (Fatura-Fiş)",
      date: "2025-11-21",
      account: "Softplay Oyuncak",
      productCode: "880300000001",
      productName: "Lay’s Klasik 90g",
      qty: 5,
      unit: "Paket",
      price: 15,
      total: 75,
    },
    {
      docNo: "INV-0003",
      type: "Alış İade (Fatura-Fiş)",
      date: "2025-11-19",
      account: "ABC GIDA LTD.",
      productCode: "880200000003",
      productName: "Ayran 200ml",
      qty: 5,
      unit: "Adet",
      price: 9,
      total: -45,
    },
  ]);

  const filtered = lines.filter(
    (l) =>
      l.docNo.toLowerCase().includes(search.toLowerCase()) ||
      l.account.toLowerCase().includes(search.toLowerCase()) ||
      l.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>📋 Fatura-Fiş Satır Listesi</h2>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Evrak no, ürün veya cari ara..."
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
              <th>Ürün Kodu</th>
              <th>Ürün Adı</th>
              <th>Miktar</th>
              <th>Birim</th>
              <th>Birim Fiyat</th>
              <th>Tutar (₺)</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="10" className="empty-msg">
                  Fatura satırı bulunamadı.
                </td>
              </tr>
            ) : (
              filtered.map((l, index) => (
                <tr key={index}>
                  <td>{l.docNo}</td>
                  <td>{l.type}</td>
                  <td>{l.date}</td>
                  <td>{l.account}</td>
                  <td>{l.productCode}</td>
                  <td>{l.productName}</td>
                  <td>{l.qty}</td>
                  <td>{l.unit}</td>
                  <td>{l.price.toFixed(2)}</td>
                  <td>{l.total.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceLineListPage;