// src/modules/inventory/pages/QuickPriceChangePage.jsx
import React, { useEffect, useState } from "react";
import productService from "../../../../core/services/productService";
import "../inventory.css";

const QuickPriceChangePage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState({ barcode: "", name: "", category: "" });
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState({});

  // 🔹 Ürünleri yükle
  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
      setFiltered(data);
      setLoading(false);
    })();
  }, []);

  // 🔍 Arama filtreleme
  const handleSearch = () => {
    let result = [...products];
    if (search.barcode)
      result = result.filter((p) =>
        p.barcode.toLowerCase().includes(search.barcode.toLowerCase())
      );
    if (search.name)
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.name.toLowerCase())
      );
    if (search.category)
      result = result.filter((p) =>
        p.group?.toLowerCase().includes(search.category.toLowerCase())
      );
    setFiltered(result);
  };

  // 💰 Fiyat değişikliği
  const handleChangePrice = (id, newPrice) => {
    setChanged({ ...changed, [id]: parseFloat(newPrice) || 0 });
  };

  // 💾 Toplu kaydet
  const handleSaveAll = async () => {
    const updates = Object.entries(changed);
    if (updates.length === 0) return alert("Değişiklik yapılmadı!");

    for (const [id, newPrice] of updates) {
      const product = products.find((p) => p.id.toString() === id.toString());
      if (product) {
        await productService.updateStock(product.id, product.stock); // stok dokunmadan
        product.price = newPrice;
      }
    }

    alert("Fiyatlar güncellendi!");
    setChanged({});
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>⚡ Hızlı Fiyat Değişikliği</h2>
        <button className="btn green" onClick={handleSaveAll}>
          💾 Tümünü Kaydet
        </button>
      </div>

      <div className="filter-bar">
        <input
          placeholder="Barkod"
          value={search.barcode}
          onChange={(e) => setSearch({ ...search, barcode: e.target.value })}
        />
        <input
          placeholder="Ürün Adı"
          value={search.name}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
        />
        <input
          placeholder="Kategori"
          value={search.category}
          onChange={(e) => setSearch({ ...search, category: e.target.value })}
        />
        <button className="btn green" onClick={handleSearch}>
          🔍 Sorgula
        </button>
      </div>

      <div className="table-container">
        {loading ? (
          <div className="empty-msg">Yükleniyor...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-msg">Kayıt bulunamadı.</div>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>Barkod</th>
                <th>Ürün Adı</th>
                <th>Kategori</th>
                <th>Marka</th>
                <th>Eski Fiyat (₺)</th>
                <th>Yeni Fiyat (₺)</th>
                <th>Fark</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const newPrice = changed[p.id] ?? p.price;
                const diff = (newPrice - p.price).toFixed(2);
                const diffColor =
                  diff > 0 ? "var(--color-success)" : diff < 0 ? "var(--color-error)" : "#888";
                return (
                  <tr key={p.id}>
                    <td>{p.barcode}</td>
                    <td>{p.name}</td>
                    <td>{p.group}</td>
                    <td>{p.brand}</td>
                    <td>{p.price.toFixed(2)}</td>
                    <td>
                      <input
                        type="number"
                        className="form-input"
                        value={newPrice}
                        onChange={(e) => handleChangePrice(p.id, e.target.value)}
                      />
                    </td>
                    <td style={{ color: diffColor }}>
                      {diff > 0 ? `+${diff}` : diff}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default QuickPriceChangePage;