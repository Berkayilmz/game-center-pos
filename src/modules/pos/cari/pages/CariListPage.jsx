// src/modules/pos/cari/pages/CariListPage.jsx
import React, { useState } from "react";
import CariModal from "../components/CariModal";
import "../cari.css";

const CariListPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [accounts, setAccounts] = useState([
    {
      code: "CAR-001",
      title: "ABC GIDA LTD.",
      group: "Tedarikçi",
      city: "Ankara",
      phone1: "0312 555 44 33",
      taxOffice: "Çankaya VD",
      taxNumber: "1234567890",
    },
    {
      code: "CAR-002",
      title: "Softplay Oyuncak",
      group: "Müşteri",
      city: "İstanbul",
      phone1: "0212 333 22 11",
      taxOffice: "Beşiktaş VD",
      taxNumber: "9876543210",
    },
  ]);

  const handleSave = (data) => {
    if (editItem) {
      setAccounts((prev) =>
        prev.map((a) => (a.code === editItem.code ? data : a))
      );
    } else {
      setAccounts((prev) => [...prev, { ...data, code: `CAR-${prev.length + 1}` }]);
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>📘 Cari Hesap Listesi</h2>
        <button
          className="btn green"
          onClick={() => {
            setEditItem(null);
            setOpenModal(true);
          }}
        >
          + Yeni Cari Hesap
        </button>
      </div>

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Cari Kodu</th>
              <th>Ünvan</th>
              <th>Grup</th>
              <th>Şehir</th>
              <th>Telefon</th>
              <th>Vergi Dairesi</th>
              <th>Vergi No</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {accounts.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-msg">
                  Henüz cari hesap tanımlanmamış.
                </td>
              </tr>
            ) : (
              accounts.map((a, i) => (
                <tr key={i}>
                  <td>{a.code}</td>
                  <td>{a.title}</td>
                  <td>{a.group}</td>
                  <td>{a.city}</td>
                  <td>{a.phone1}</td>
                  <td>{a.taxOffice}</td>
                  <td>{a.taxNumber}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn gray small"
                        onClick={() => {
                          setEditItem(a);
                          setOpenModal(true);
                        }}
                      >
                        Düzenle
                      </button>
                      <button
                        className="btn red small"
                        onClick={() =>
                          setAccounts(accounts.filter((_, idx) => idx !== i))
                        }
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

      <CariModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
        editItem={editItem}
      />
    </div>
  );
};

export default CariListPage;