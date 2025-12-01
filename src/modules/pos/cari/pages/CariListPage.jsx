import React, { useState } from "react";
import CariModal from "../components/CariModal";
import "../cari.css";
import { ExcelService } from "../../../../core/services/ExcelService";

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

  // ✅ Ortak Excel kolon tanımları (import & export ikisi de bunu kullanır)
  const excelColumns = [
    { key: "code", header: "Cari Kodu" },
    { key: "title", header: "Ünvan" },
    { key: "group", header: "Grup" },
    { key: "city", header: "Şehir" },
    { key: "phone1", header: "Telefon" },
    { key: "taxOffice", header: "Vergi Dairesi" },
    { key: "taxNumber", header: "Vergi No" },
  ];

  // 📤 Excel'e Aktar
  const handleExport = () => {
    ExcelService.exportToExcel(accounts, excelColumns, "CariHesapListesi");
  };

  // 📥 Excel'den Aktar
  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const imported = await ExcelService.importFromExcel(file, excelColumns);
      if (!Array.isArray(imported) || imported.length === 0) {
        alert("Excel dosyasında veri bulunamadı!");
        return;
      }
      setAccounts((prev) => [...prev, ...imported]);
      alert(`📥 ${imported.length} kayıt başarıyla içe aktarıldı!`);
    } catch (err) {
      console.error("Excel Import Hatası:", err);
      alert("Excel verisi okunamadı!");
    }
    e.target.value = ""; // dosya input reset
  };

  // 💾 Yeni cari kaydet
  const handleSave = (data) => {
    if (editItem) {
      setAccounts((prev) =>
        prev.map((a) => (a.code === editItem.code ? data : a))
      );
    } else {
      setAccounts((prev) => [
        ...prev,
        { ...data, code: `CAR-${String(prev.length + 1).padStart(3, "0")}` },
      ]);
    }
  };

  return (
    <div className="settings-page">
      {/* 🔹 Başlık + Butonlar */}
      <div className="settings-header">
        <h2>📘 Cari Hesap Listesi</h2>

        <div className="header-buttons">
          {/* Gizli dosya inputu */}
          <input
            type="file"
            id="excel-import"
            accept=".xlsx,.xls"
            style={{ display: "none" }}
            onChange={handleImport}
          />

          <button
            className="btn orange"
            onClick={() => document.getElementById("excel-import").click()}
          >
            📥 Excel'den Aktar
          </button>

          <button
            className="btn blue"
            onClick={handleExport}
            disabled={accounts.length === 0}
          >
            📤 Excel'e Aktar
          </button>

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
      </div>

      {/* 🔹 Tablo */}
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

      {/* 🔹 Modal */}
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