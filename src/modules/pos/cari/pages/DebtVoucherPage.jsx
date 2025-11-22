// src/modules/pos/cari/pages/DebtVoucherPage.jsx
import React, { useState } from "react";
import DebtVoucherModal from "../components/DebtVoucherModal";
import "../cari.css";

const DebtVoucherPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [vouchers, setVouchers] = useState([
    {
      docNo: "BD-0001",
      date: "2025-11-22",
      dueDate: "2025-12-01",
      amount: 1500,
      description: "Ofis kırtasiye alımı borç kaydı",
      account: "ABC GIDA LTD.",
      debt: 1500,
      credit: 0,
      balance: 1500,
    },
    {
      docNo: "BD-0002",
      date: "2025-11-22",
      dueDate: "2025-12-15",
      amount: 750,
      description: "Softplay malzeme tedariki",
      account: "Softplay Oyuncak",
      debt: 750,
      credit: 0,
      balance: 750,
    },
  ]);

  const handleSave = (data) => {
    if (editItem) {
      setVouchers((prev) =>
        prev.map((v) => (v.docNo === editItem.docNo ? data : v))
      );
    } else {
      setVouchers((prev) => [
        ...prev,
        { ...data, docNo: `BD-${String(prev.length + 1).padStart(4, "0")}` },
      ]);
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Bu borç dekontunu silmek istiyor musunuz?")) {
      setVouchers(vouchers.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>📘 Borç Dekontları</h2>
        <button
          className="btn green"
          onClick={() => {
            setEditItem(null);
            setOpenModal(true);
          }}
        >
          + Yeni Borç Dekontu
        </button>
      </div>

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Evrak No</th>
              <th>Tarih</th>
              <th>Vade Tarihi</th>
              <th>Cari Hesap</th>
              <th>Açıklama</th>
              <th>İşlem Tutarı</th>
              <th>Bakiye</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-msg">
                  Henüz borç dekontu bulunmuyor.
                </td>
              </tr>
            ) : (
              vouchers.map((v, i) => (
                <tr key={i}>
                  <td>{v.docNo}</td>
                  <td>{v.date}</td>
                  <td>{v.dueDate || "-"}</td>
                  <td>{v.account}</td>
                  <td>{v.description}</td>
                  <td>{v.amount.toFixed(2)} ₺</td>
                  <td>{v.balance.toFixed(2)} ₺</td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn gray small"
                        onClick={() => {
                          setEditItem(v);
                          setOpenModal(true);
                        }}
                      >
                        Düzenle
                      </button>
                      <button
                        className="btn red small"
                        onClick={() => handleDelete(i)}
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

      <DebtVoucherModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
        editItem={editItem}
      />
    </div>
  );
};

export default DebtVoucherPage;