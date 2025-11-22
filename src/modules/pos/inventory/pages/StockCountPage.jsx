// src/modules/inventory/pages/StockCountPage.jsx
import React, { useEffect, useState } from "react";
import productService from "../../../../core/services/productService";
import StockTransactionModal from "../components/StockTransactionModal";
import "../inventory.css";

const StockCountPage = () => {
  const [products, setProducts] = useState([]);
  const [counts, setCounts] = useState({});
  const [adjustments, setAdjustments] = useState({ positive: [], negative: [] });
  const [openModal, setOpenModal] = useState(null); // 'fazla' | 'eksiği'

  useEffect(() => {
    const load = async () => {
      const data = await productService.getAll();
      setProducts(data);
      setCounts(
        Object.fromEntries(data.map((p) => [p.id, { counted: p.stock, diff: 0 }]))
      );
    };
    load();
  }, []);

  const handleChange = (id, val) => {
    const product = products.find((p) => p.id === id);
    const counted = parseFloat(val) || 0;
    const diff = counted - product.stock;
    setCounts({
      ...counts,
      [id]: { counted, diff },
    });
  };

  const handleGenerate = () => {
    const positive = [];
    const negative = [];

    for (const p of products) {
      const { diff } = counts[p.id];
      if (!diff) continue;
      if (diff > 0)
        positive.push({
          productCode: p.barcode,
          name: p.name,
          qty: diff,
          unit: p.unit,
          unitPrice: p.costPrice,
          total: diff * p.costPrice,
        });
      else if (diff < 0)
        negative.push({
          productCode: p.barcode,
          name: p.name,
          qty: Math.abs(diff),
          unit: p.unit,
          unitPrice: p.costPrice,
          total: Math.abs(diff) * p.costPrice,
        });
    }

    setAdjustments({ positive, negative });
    if (positive.length > 0) setOpenModal("fazla");
    else if (negative.length > 0) setOpenModal("eksiği");
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>📊 Sayım İşlemi</h2>
        <button className="btn green" onClick={handleGenerate}>
          Fark Fişi Oluştur
        </button>
      </div>

      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Ürün Kodu</th>
              <th>Ürün Adı</th>
              <th>Mevcut Stok</th>
              <th>Sayım Sonucu</th>
              <th>Fark</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const diff = counts[p.id]?.diff || 0;
              return (
                <tr key={p.id}>
                  <td>{p.barcode}</td>
                  <td>{p.name}</td>
                  <td>{p.stock}</td>
                  <td>
                    <input
                      type="number"
                      className="form-input"
                      value={counts[p.id]?.counted || ""}
                      onChange={(e) => handleChange(p.id, e.target.value)}
                    />
                  </td>
                  <td
                    style={{
                      color: diff > 0 ? "green" : diff < 0 ? "red" : "#555",
                      fontWeight: 500,
                    }}
                  >
                    {diff}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* === SAYIM FAZLASI MODAL === */}
      {openModal === "fazla" && (
        <StockTransactionModal
          open={true}
          onClose={() => setOpenModal("eksiği")}
          type="giris"
          presetRows={adjustments.positive}
          onSave={() => console.log("Sayım fazlası fişi kaydedildi")}
        />
      )}

      {/* === SAYIM EKSİĞİ MODAL === */}
      {openModal === "eksiği" && (
        <StockTransactionModal
          open={true}
          onClose={() => setOpenModal(null)}
          type="cikis"
          presetRows={adjustments.negative}
          onSave={() => console.log("Sayım eksiği fişi kaydedildi")}
        />
      )}
    </div>
  );
};

export default StockCountPage;