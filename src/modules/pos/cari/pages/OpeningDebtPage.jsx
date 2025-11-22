// src/modules/pos/cari/pages/OpeningDebtPage.jsx
import React, { useState } from "react";
import OpeningDebtModal from "../components/OpeningDebtModal";
import "../cari.css";

const OpeningDebtPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [records, setRecords] = useState([
    {
      docNo: "AÇB-0001",
      date: "2025-11-22",
      dueDate: "2025-12-01",
      amount: 5000,
      description: "Önceki dönemden devreden borç",
      account: "ABC GIDA LTD.",
      debt: 5000,
      credit: 0,
      balance: -5000,
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
        { ...data, docNo: `AÇB-${String(prev.length + 1).padStart(4, "0")}` },
      ]);
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Bu açılış borcunu silmek istediğine emin misin?")) {
      setRecords(records.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>📘 Açılış Borçları</h2>
        <button
          className="btn green"
          onClick={() => {
            setEditItem(null);
            setOpenModal(true);
          }}
        >
          + Yeni Açılış Borcu
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
                  Henüz açılış borcu kaydı yok.
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

      <OpeningDebtModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
        editItem={editItem}
      />
    </div>
  );
};

export default OpeningDebtPage;