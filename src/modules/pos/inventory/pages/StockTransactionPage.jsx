// src/modules/inventory/pages/StockTransactionPage.jsx
import React, { useState } from "react";
import StockTransactionModal from "../components/StockTransactionModal";
import "../inventory.css";

const StockTransactionPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState("giris");

  // 🔹 Örnek veriler
  const transactions = [
    {
      docNo: "STF-0001",
      type: "giris",
      date: "2025-11-21",
      warehouse: "MERKEZ",
      account: "Tedarikçi A.Ş.",
      description: "Haftalık içecek girişi",
      rows: [
        { productCode: "880200000001", name: "Coca Cola 330ml", qty: 24, unit: "Adet" },
        { productCode: "880200000002", name: "Fanta 330ml", qty: 12, unit: "Adet" },
      ],
    },
    {
      docNo: "STF-0002",
      type: "cikis",
      date: "2025-11-21",
      warehouse: "MERKEZ",
      account: "Softplay Satış",
      description: "Kiosk POS satışı",
      rows: [
        { productCode: "880200000001", name: "Coca Cola 330ml", qty: 2, unit: "Adet" },
        { productCode: "880300000001", name: "Lay’s Klasik 90g", qty: 3, unit: "Paket" },
      ],
    },
    {
      docNo: "STF-0003",
      type: "fire",
      date: "2025-11-21",
      warehouse: "MERKEZ",
      account: "-",
      description: "Son kullanma tarihi geçmiş ürünler",
      rows: [{ productCode: "880200000003", name: "Ayran 200ml", qty: 5, unit: "Adet" }],
    },
    {
      docNo: "STF-0004",
      type: "sarf",
      date: "2025-11-21",
      warehouse: "MERKEZ",
      account: "-",
      description: "Kafe sarf malzeme kullanımı",
      rows: [{ productCode: "880400000001", name: "Mini Top", qty: 2, unit: "Adet" }],
    },
    {
      docNo: "STF-0005",
      type: "uretim",
      date: "2025-11-21",
      warehouse: "MERKEZ",
      account: "Üretim",
      description: "El yapımı oyuncak üretimi",
      rows: [{ productCode: "880400000006", name: "Sticker Seti", qty: 20, unit: "Paket" }],
    },
    {
      docNo: "STF-0006",
      type: "acilis",
      date: "2025-11-21",
      warehouse: "MERKEZ",
      account: "-",
      description: "Yıl başı açılış fişi",
      rows: [{ productCode: "880200000001", name: "Coca Cola 330ml", qty: 150, unit: "Adet" }],
    },
    {
      docNo: "STF-0007",
      type: "devir",
      date: "2025-12-31",
      warehouse: "MERKEZ",
      account: "-",
      description: "2025 yıl sonu stok devri",
      rows: [{ productCode: "880300000001", name: "Lay’s Klasik 90g", qty: 75, unit: "Paket" }],
    },
  ];

  const getTypeLabel = (type) => {
    switch (type) {
      case "giris": return "Giriş";
      case "cikis": return "Çıkış";
      case "fire": return "Fire";
      case "sarf": return "Sarf";
      case "uretim": return "Üretimden Giriş";
      case "acilis": return "Açılış";
      case "devir": return "Devir";
      default: return "-";
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>📦 Stok Fişleri</h2>
        <div className="actions">
          <button className="btn green" onClick={() => { setType("giris"); setOpenModal(true); }}>
            + Giriş Fişi
          </button>
          <button className="btn orange" onClick={() => { setType("cikis"); setOpenModal(true); }}>
            - Çıkış Fişi
          </button>
          <button className="btn red" onClick={() => { setType("fire"); setOpenModal(true); }}>
            🔥 Fire Fişi
          </button>
          <button className="btn gray" onClick={() => { setType("sarf"); setOpenModal(true); }}>
            🧾 Sarf Fişi
          </button>
          <button className="btn blue" onClick={() => { setType("uretim"); setOpenModal(true); }}>
            🏭 Üretimden Giriş
          </button>
          <button className="btn purple" onClick={() => { setType("acilis"); setOpenModal(true); }}>
            🚀 Açılış Fişi
          </button>
          <button className="btn teal" onClick={() => { setType("devir"); setOpenModal(true); }}>
            🔄 Devir Fişi
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Fiş No</th>
              <th>Tür</th>
              <th>Tarih</th>
              <th>Depo</th>
              <th>Cari Hesap</th>
              <th>Açıklama</th>
              <th>Kalem Sayısı</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i}>
                <td>{t.docNo}</td>
                <td>{getTypeLabel(t.type)}</td>
                <td>{t.date}</td>
                <td>{t.warehouse}</td>
                <td>{t.account}</td>
                <td>{t.description}</td>
                <td>{t.rows.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🧩 Modal */}
      <StockTransactionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        type={type}
      />
    </div>
  );
};

export default StockTransactionPage;