// src/modules/inventory/components/StockTransactionModal.jsx
import React, { useState } from "react";
import "../inventory.css";
import productService from "../../../../core/services/productService";

const StockTransactionModal = ({ open, onClose, type = "giris", onSave }) => {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    docNo: `STF-${Date.now().toString().slice(-4)}`,
    warehouse: "MERKEZ",
    account: "",
    reason: "",
    description: "",
    deliveredBy: "",
    receivedBy: "",
  });

  if (!open) return null;

  const getTitle = () => {
    switch (type) {
      case "fire":
        return "🔥 Fire Fişi";
      case "sarf":
        return "🧾 Sarf Fişi";
      case "uretim":
        return "🏭 Üretimden Giriş";
      case "acilis":
        return "🚀 Stok Açılış Fişi";
      case "devir":
        return "🔄 Stok Devir Fişi";
      case "giris":
        return "📦 Stok Giriş Fişi";
      case "cikis":
        return "📤 Stok Çıkış Fişi";
      default:
        return "📦 Stok Fişi";
    }
  };

  // 🔹 Satır işlemleri
  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      { productCode: "", name: "", qty: 1, unit: "", unitPrice: 0, total: 0 },
    ]);
  };

  const handleDeleteRow = (i) => setRows(rows.filter((_, idx) => idx !== i));

  const handleChange = (i, key, val) => {
    const updated = [...rows];
    updated[i][key] = val;

    if (key === "qty" || key === "unitPrice") {
      const qty = parseFloat(updated[i].qty) || 0;
      const price = parseFloat(updated[i].unitPrice) || 0;
      updated[i].total = qty * price;
    }

    setRows(updated);
  };

  // 🔹 Kaydetme mantığı
  const handleSubmit = async () => {
    const effectType =
      type === "fire" || type === "sarf" || type === "cikis"
        ? "cikis"
        : "giris";

    for (const r of rows) {
      const found = await productService.getByBarcode(r.productCode);
      if (found) {
        const newStock =
          effectType === "giris"
            ? found.stock + Number(r.qty)
            : Math.max(0, found.stock - Number(r.qty));
        await productService.updateStock(found.id, newStock);
      }
    }

    onSave?.();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box large">
        <h3>{getTitle()}</h3>

        <div className="form-two-column">
          {/* === SOL KOLON === */}
          <div className="form-col">
            <label>Tarih</label>
            <input
              type="date"
              className="form-input"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

            <label>Evrak No</label>
            <input
              className="form-input"
              value={form.docNo}
              onChange={(e) => setForm({ ...form, docNo: e.target.value })}
            />

            <label>Depo</label>
            <select
              className="form-input"
              value={form.warehouse}
              onChange={(e) => setForm({ ...form, warehouse: e.target.value })}
            >
              <option value="MERKEZ">MERKEZ</option>
              <option value="ŞUBE-1">ŞUBE-1</option>
            </select>

            {/* 🔹 Türüne göre ek alanlar */}
            {(type === "fire" || type === "sarf" || type === "uretim") && (
              <>
                <label>
                  {type === "fire"
                    ? "Fire Nedeni"
                    : type === "sarf"
                    ? "Kullanım Amacı"
                    : "Üretim Açıklaması"}
                </label>
                <input
                  className="form-input"
                  value={form.reason}
                  onChange={(e) =>
                    setForm({ ...form, reason: e.target.value })
                  }
                />
              </>
            )}

            {(type === "acilis" || type === "devir") && (
              <>
                <label>
                  {type === "acilis"
                    ? "Açılış Dönemi"
                    : "Devir Edilen Dönem"}
                </label>
                <input
                  className="form-input"
                  placeholder={
                    type === "acilis"
                      ? "Örn: 2025 1. Dönem"
                      : "Örn: 2025 → 2026"
                  }
                  value={form.reason}
                  onChange={(e) =>
                    setForm({ ...form, reason: e.target.value })
                  }
                />
              </>
            )}
          </div>

          {/* === SAĞ KOLON === */}
          <div className="form-col">
            <label>Cari Hesap</label>
            <input
              className="form-input"
              value={form.account}
              onChange={(e) => setForm({ ...form, account: e.target.value })}
              placeholder="Tedarikçi veya müşteri adı"
            />

            <label>Açıklama</label>
            <input
              className="form-input"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <label>Teslim Eden</label>
            <input
              className="form-input"
              value={form.deliveredBy}
              onChange={(e) =>
                setForm({ ...form, deliveredBy: e.target.value })
              }
            />

            <label>Teslim Alan</label>
            <input
              className="form-input"
              value={form.receivedBy}
              onChange={(e) =>
                setForm({ ...form, receivedBy: e.target.value })
              }
            />
          </div>

          {/* === ÜRÜN TABLOSU === */}
          <div className="form-col full-width">
            <div className="actions" style={{ justifyContent: "flex-end" }}>
              <button className="btn gray small" onClick={handleAddRow}>
                + Ürün Satırı Ekle
              </button>
            </div>

            <table className="product-table">
              <thead>
                <tr>
                  <th>Barkod</th>
                  <th>Ürün Adı</th>
                  <th>Miktar</th>
                  <th>Birim</th>
                  <th>Birim Fiyat</th>
                  <th>Tutar</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty-msg">
                      Henüz ürün eklenmedi.
                    </td>
                  </tr>
                ) : (
                  rows.map((r, i) => (
                    <tr key={i}>
                      <td>
                        <input
                          className="form-input"
                          value={r.productCode}
                          onChange={(e) =>
                            handleChange(i, "productCode", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="form-input"
                          value={r.name}
                          onChange={(e) =>
                            handleChange(i, "name", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="form-input"
                          type="number"
                          value={r.qty}
                          onChange={(e) =>
                            handleChange(i, "qty", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="form-input"
                          value={r.unit}
                          onChange={(e) =>
                            handleChange(i, "unit", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="form-input"
                          type="number"
                          value={r.unitPrice}
                          onChange={(e) =>
                            handleChange(i, "unitPrice", e.target.value)
                          }
                        />
                      </td>
                      <td>{r.total.toFixed(2)}</td>
                      <td>
                        <button
                          className="btn red small"
                          onClick={() => handleDeleteRow(i)}
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* === BUTONLAR === */}
          <div className="form-actions two-column">
            <button className="btn gray" onClick={onClose}>
              İptal
            </button>
            <button className="btn green" onClick={handleSubmit}>
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTransactionModal;