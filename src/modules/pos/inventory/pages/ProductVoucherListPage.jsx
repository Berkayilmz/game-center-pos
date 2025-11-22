// src/modules/inventory/pages/ProductVoucherListPage.jsx
import React, { useEffect, useState } from "react";
import productService from "../../../../core/services/productService";
import "../inventory.css";

const ProductVoucherListPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await productService.getAll();
      setProducts(data);
    })();
  }, []);

  // 📜 Örnek fiş geçmişi (ileride backend’den gelecek)
  const allTransactions = [
    {
      docNo: "STF-0001",
      type: "Giriş",
      date: "2025-11-21",
      productCode: "880200000001",
      productName: "Coca Cola 330ml",
      qty: 24,
      unit: "Adet",
    },
    {
      docNo: "STF-0002",
      type: "Çıkış",
      date: "2025-11-21",
      productCode: "880200000001",
      productName: "Coca Cola 330ml",
      qty: -2,
      unit: "Adet",
    },
    {
      docNo: "STF-0003",
      type: "Giriş",
      date: "2025-11-21",
      productCode: "880200000002",
      productName: "Fanta 330ml",
      qty: 12,
      unit: "Adet",
    },
  ];

  const handleSelectProduct = (code) => {
    setSelectedProduct(code);
    const filtered = allTransactions.filter((t) => t.productCode === code);
    setTransactions(filtered);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>📑 Ürün Fiş Listesi</h2>
      </div>

      {/* 🔍 Ürün Seçimi */}
      <div className="filter-bar">
        <select
          className="form-input"
          onChange={(e) => handleSelectProduct(e.target.value)}
          defaultValue=""
        >
          <option value="">Bir ürün seçiniz...</option>
          {products.map((p) => (
            <option key={p.id} value={p.barcode}>
              {p.name} ({p.barcode})
            </option>
          ))}
        </select>
      </div>

      {/* 📋 Fiş Listesi */}
      {selectedProduct ? (
        <div className="table-container">
          {transactions.length === 0 ? (
            <div className="empty-msg">Bu ürün için fiş kaydı bulunamadı.</div>
          ) : (
            <table className="product-table">
              <thead>
                <tr>
                  <th>Fiş No</th>
                  <th>Tür</th>
                  <th>Tarih</th>
                  <th>Miktar</th>
                  <th>Birim</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr key={i}>
                    <td>{t.docNo}</td>
                    <td>{t.type}</td>
                    <td>{t.date}</td>
                    <td
                      style={{
                        color: t.qty > 0 ? "var(--color-success)" : "var(--color-error)",
                      }}
                    >
                      {t.qty > 0 ? `+${t.qty}` : t.qty}
                    </td>
                    <td>{t.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div className="empty-msg">Lütfen bir ürün seçiniz.</div>
      )}
    </div>
  );
};

export default ProductVoucherListPage;