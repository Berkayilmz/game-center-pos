// src/modules/pos/cari/pages/CreditVoucherPage.jsx
import React, { useState } from "react";
import CreditVoucherModal from "../components/CreditVoucherModal";
import "../cari.css";

const CreditVoucherPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [vouchers, setVouchers] = useState([
    {
      docNo: "AD-0001",
      date: "2025-11-22",
      dueDate: "2025-12-05",
      amount: 1200,
      description: "Müşteriden alınan peşinat",
      account: "Softplay Oyuncak",
      debt: 0,
      credit: 1200,
      balance: 1200,
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
        { ...data, docNo: `AD-${String(prev.length + 1).padStart(4, "0")}` },
      ]);
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Bu alacak dekontunu silmek istiyor musunuz?")) {
      setVouchers(vouchers.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>💵 Alacak Dekontları</h2>
        <button
          className="btn green"
          onClick={() => {
            setEditItem(null);
            setOpenModal(true);
          }}
        >
          + Yeni Alacak Dekontu
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
                  Henüz alacak dekontu bulunmuyor.
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

      <CreditVoucherModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
        editItem={editItem}
      />
    </div>
  );
};

export default CreditVoucherPage;