// src/modules/pos/cari/pages/TransferPage.jsx
import React, { useState } from "react";
import TransferModal from "../components/TransferModal";
import "../cari.css";

const TransferPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [records, setRecords] = useState([
    {
      docNo: "VIR-0001",
      date: "2025-11-22",
      amount: 1000,
      description: "Cari virman - borç/alacak aktarımı",
      fromAccount: "ABC GIDA LTD.",
      toAccount: "Softplay Oyuncak",
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
        { ...data, docNo: `VIR-${String(prev.length + 1).padStart(4, "0")}` },
      ]);
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Bu virman kaydını silmek istiyor musun?")) {
      setRecords(records.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>🔁 Cari Virman</h2>
        <button
          className="btn green"
          onClick={() => {
            setEditItem(null);
            setOpenModal(true);
          }}
        >
          + Yeni Virman
        </button>
      </div>

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Evrak No</th>
              <th>Tarih</th>
              <th>Borçlu Hesap</th>
              <th>Alacaklı Hesap</th>
              <th>Tutar</th>
              <th>Açıklama</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-msg">
                  Henüz cari virman kaydı yok.
                </td>
              </tr>
            ) : (
              records.map((r, i) => (
                <tr key={i}>
                  <td>{r.docNo}</td>
                  <td>{r.date}</td>
                  <td>{r.fromAccount}</td>
                  <td>{r.toAccount}</td>
                  <td>{r.amount.toFixed(2)} ₺</td>
                  <td>{r.description}</td>
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

      <TransferModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
        editItem={editItem}
      />
    </div>
  );
};

export default TransferPage;