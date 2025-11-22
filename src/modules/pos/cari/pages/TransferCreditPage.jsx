// src/modules/pos/cari/pages/TransferCreditPage.jsx
import React, { useState } from "react";
import TransferCreditModal from "../components/TransferCreditModal";
import "../cari.css";

const TransferCreditPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [records, setRecords] = useState([
    {
      docNo: "DEVA-0001",
      date: "2025-11-22",
      dueDate: "2025-12-01",
      amount: 4200,
      description: "Cari alacak devri (önceki dönemden)",
      account: "Softplay Oyuncak",
      debt: 0,
      credit: 4200,
      balance: 4200,
    },
  ]);

  const handleSave = (data) => {
    if (editItem) {
      setRecords((prev) =>
        prev.map((r) => (r.docNo === editItem.docNo ? data : r))
      );
    } else {
      setRecords((prev) => [
        ...prev,
        { ...data, docNo: `DEVA-${String(prev.length + 1).padStart(4, "0")}` },
      ]);
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Bu devir alacağı kaydını silmek istediğine emin misin?")) {
      setRecords(records.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>📗 Devir Alacakları</h2>
        <button
          className="btn green"
          onClick={() => {
            setEditItem(null);
            setOpenModal(true);
          }}
        >
          + Yeni Devir Alacak
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
              <th>Tutar</th>
              <th>Bakiye</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-msg">
                  Henüz devir alacağı kaydı yok.
                </td>
              </tr>
            ) : (
              records.map((r, i) => (
                <tr key={i}>
                  <td>{r.docNo}</td>
                  <td>{r.date}</td>
                  <td>{r.dueDate || "-"}</td>
                  <td>{r.account}</td>
                  <td>{r.description}</td>
                  <td>{r.amount.toFixed(2)} ₺</td>
                  <td>{r.balance.toFixed(2)} ₺</td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn gray small"
                        onClick={() => {
                          setEditItem(r);
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

      <TransferCreditModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
        editItem={editItem}
      />
    </div>
  );
};

export default TransferCreditPage;