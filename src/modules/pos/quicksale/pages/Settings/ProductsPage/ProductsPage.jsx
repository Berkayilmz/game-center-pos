import React, { useEffect, useState } from "react";
import productService from "../../../../../core/services/productService";
import ProductModal from "./ProductModal"; // ✅ modal import edildi
import "./ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // 🔹 Ürünleri yükle
  const loadProducts = async () => {
    setLoading(true);
    const data = await productService.getAll();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // 🔹 Ürün arama
  const handleSearch = async (e) => {
    const keyword = e.target.value;
    setSearch(keyword);
    if (keyword.trim() === "") {
      loadProducts();
    } else {
      const results = await productService.search(keyword);
      setProducts(results);
    }
  };

  // 🔹 Ürün kaydet (yeni veya düzenleme)
  const handleSave = async (product) => {
    if (editItem) {
      // Düzenleme
      const updated = products.map((p) =>
        p.id === product.id ? { ...product } : p
      );
      localStorage.setItem("pos_products", JSON.stringify(updated));
      setProducts(updated);
    } else {
      // Yeni ürün
      await productService.addProduct(product);
      loadProducts();
    }
    setEditItem(null);
  };

  // 🔹 Silme
  const handleDelete = (id) => {
    if (window.confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
      const updated = products.filter((p) => p.id !== id);
      localStorage.setItem("pos_products", JSON.stringify(updated));
      setProducts(updated);
    }
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

      {/* 🔍 Arama ve filtre */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Ürün adı, marka veya barkod ara..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* 🔹 Tablo */}
      <div className="table-container">
        {loading ? (
          <div className="empty-msg">Yükleniyor...</div>
        ) : products.length === 0 ? (
          <div className="empty-msg">Kayıtlı ürün bulunamadı.</div>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>Görsel</th>
                <th>Ad</th>
                <th>Barkod</th>
                <th>Kategori</th>
                <th>Marka</th>
                <th>Birim</th>
                <th>Alış (₺)</th>
                <th>Satış (₺)</th>
                <th>KDV</th>
                <th>İndirim</th>
                <th>Stok</th>
                <th>Durum</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="thumb" />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{p.name}</td>
                  <td>{p.barcode}</td>
                  <td>{p.category}</td>
                  <td>{p.brand}</td>
                  <td>{p.unit}</td>
                  <td>{p.costPrice.toFixed(2)}</td>
                  <td>{p.price.toFixed(2)}</td>
                  <td>{(p.vatRate * 100).toFixed(0)}%</td>
                  <td>{p.discount}</td>
                  <td>{p.stock}</td>
                  <td>{p.isBestSeller ? "🔥 Çok Satan" : "-"}</td>
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

      {/* 🧩 Modal */}
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

export default ProductsPage;