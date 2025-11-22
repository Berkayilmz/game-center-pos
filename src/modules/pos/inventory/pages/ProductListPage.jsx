// src/modules/pos/inventory/pages/ProductListPage.jsx
import React, { useEffect, useState } from "react";
import productService from "../../../../core/services/productService";
import ProductModal from "../components/ProductModal";
import "../inventory.css";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    const data = await productService.getAll();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSearch = async (e) => {
    const keyword = e.target.value;
    setSearch(keyword);

    if (!keyword.trim()) {
      loadProducts();
      return;
    }

    const results = await productService.search(keyword);
    setProducts(results);
  };

  const handleSave = async (product) => {
    if (editItem) {
      await productService.updateProduct(editItem.id, product);
    } else {
      await productService.addProduct(product);
    }
    loadProducts();
    setEditItem(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu ürünü silmek istediğinizden emin misiniz?")) return;
    await productService.deleteProduct(id);
    loadProducts();
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>📦 Ürün Yönetimi</h2>
        <button
          className="btn green"
          onClick={() => {
            setEditItem(null);
            setOpenModal(true);
          }}
        >
          + Yeni Ürün
        </button>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Ürün adı, marka veya barkod ara..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="table-container">
        {loading ? (
          <div className="empty-msg">Yükleniyor...</div>
        ) : products.length === 0 ? (
          <div className="empty-msg">Kayıtlı ürün bulunamadı.</div>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>📷</th>
                <th>Kod</th>
                <th>Ad</th>
                <th>Grup</th>
                <th>Üretici</th>
                <th>Marka</th>
                <th>Alış (₺)</th>
                <th>Satış (₺)</th>
                <th>Hızlı Satış</th>
                <th>KDV</th>
                <th>Stok</th>
                <th>🔥</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="thumb"
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 6,
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{p.code || "-"}</td>
                  <td>{p.name}</td>
                  <td>{p.group || "-"}</td>
                  <td>{p.producer || "-"}</td>
                  <td>{p.brand || "-"}</td>
                  <td>{p.costPrice?.toFixed(2) || "0.00"}</td>
                  <td>{p.price?.toFixed(2) || "0.00"}</td>
                  <td>{p.quickSalePrice?.toFixed(2) || "0.00"}</td>
                  <td>{p.vatRate || 0}%</td>
                  <td>{p.stock || 0}</td>
                  <td>{p.isBestSeller ? "🔥" : "-"}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn gray small"
                        onClick={() => {
                          setEditItem(p);
                          setOpenModal(true);
                        }}
                      >
                        Düzenle
                      </button>
                      <button
                        className="btn red small"
                        onClick={() => handleDelete(p.id)}
                      >
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {openModal && (
        <ProductModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setEditItem(null);
          }}
          onSave={handleSave}
          editItem={editItem}
        />
      )}
    </div>
  );
};

export default ProductListPage;