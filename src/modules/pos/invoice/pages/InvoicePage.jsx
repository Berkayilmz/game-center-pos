import React, { useState } from "react";
import "../invoice.css";
import { useParams } from "react-router-dom";

const InvoicePage = () => {
  const { type } = useParams(); // örn: purchase, sales, purchaseReturn, salesReturn
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({
    docNo: "",
    date: new Date().toISOString().slice(0, 10),
    account: "",
    desc: "",
    total: 0,
    vat: 0,
    discount: 0,
  });

  const titleMap = {
    purchase: "Alış (Fatura-Fiş)",
    sales: "Satış (Fatura-Fiş)",
    purchaseReturn: "Alış İade (Fatura-Fiş)",
    salesReturn: "Satış İade (Fatura-Fiş)",
  };

  const addRow = () =>
    setRows([...rows, { code: "", name: "", qty: 1, price: 0, vat: 0, total: 0 }]);

  const updateTotal = () => {
    const subtotal = rows.reduce((s, r) => s + r.qty * r.price, 0);
    const vat = subtotal * 0.20;
    setForm({ ...form, total: subtotal, vat });
  };

  return (
    <div className="invoice-page">
      <h2>📄 {titleMap[type] || "Fatura-Fiş"}</h2>

      <div className="invoice-form">
        <div className="form-row">
          <label>Evrak No:</label>
          <input
            value={form.docNo}
            onChange={(e) => setForm({ ...form, docNo: e.target.value })}
          />
          <label>Tarih:</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <div className="form-row">
          <label>Cari Hesap:</label>
          <input
            value={form.account}
            onChange={(e) => setForm({ ...form, account: e.target.value })}
          />
          <label>Açıklama:</label>
          <input
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
          />
        </div>
      </div>

      <div className="invoice-table">
        <div className="table-actions">
          <button className="btn green" onClick={addRow}>+ Ürün Ekle</button>
          <button className="btn orange" onClick={updateTotal}>Toplamı Güncelle</button>
        </div>

        <table className="product-table">
          <thead>
            <tr>
              <th>Ürün Kodu</th>
              <th>Ürün Adı</th>
              <th>Miktar</th>
              <th>Birim Fiyat</th>
              <th>KDV %</th>
              <th>Tutar</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-msg">Henüz satır eklenmemiş.</td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i}>
                  <td><input value={r.code} /></td>
                  <td><input value={r.name} /></td>
                  <td><input type="number" value={r.qty} /></td>
                  <td><input type="number" value={r.price} /></td>
                  <td><input type="number" value={r.vat} /></td>
                  <td>{(r.qty * r.price).toFixed(2)} ₺</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="invoice-summary">
        <div>Toplam: {form.total.toFixed(2)} ₺</div>
        <div>KDV: {form.vat.toFixed(2)} ₺</div>
        <div>Genel Toplam: {(form.total + form.vat).toFixed(2)} ₺</div>
      </div>

      <div className="form-actions">
        <button className="btn gray">İptal</button>
        <button className="btn green">Kaydet</button>
      </div>
    </div>
  );
};

export default InvoicePage;