// src/modules/inventory/pages/BarcodePrintPage.jsx
import React, { useEffect, useState } from "react";
import productService from "../../../../core/services/productService";
import Barcode from "react-barcode";
import "../inventory.css";

const BarcodePrintPage = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState({ barcode: "", name: "", category: "" });
  const [sortBy, setSortBy] = useState("barcode");

  useEffect(() => {
    (async () => {
      const list = await productService.getAll();
      setProducts(list);
      setFiltered(list);
    })();
  }, []);

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
        p.category?.toLowerCase().includes(search.category.toLowerCase())
      );
    if (sortBy === "barcode")
      result.sort((a, b) => a.barcode.localeCompare(b.barcode));
    else result.sort((a, b) => a.name.localeCompare(b.name));
    setFiltered(result);
  };

  const handleToggleSelect = (p) => {
    if (selected.some((x) => x.barcode === p.barcode))
      setSelected(selected.filter((x) => x.barcode !== p.barcode));
    else setSelected([...selected, p]);
  };

  const handlePrint = () => window.print();

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>🏷️ Barkod Yazdır</h2>
      </div>

      {/* Sekmeler */}
      <div className="tab-header">
        <button
          className={activeTab === "list" ? "active" : ""}
          onClick={() => setActiveTab("list")}
        >
          Ürün Listesi
        </button>
        <button
          className={activeTab === "print" ? "active" : ""}
          onClick={() => setActiveTab("print")}
        >
          Barkod Yazdır
        </button>
      </div>

      {activeTab === "list" && (
        <>
          <div className="filter-bar">
            <input
              placeholder="Barkod"
              value={search.barcode}
              onChange={(e) =>
                setSearch({ ...search, barcode: e.target.value })
              }
            />
            <input
              placeholder="Ürün Adı"
              value={search.name}
              onChange={(e) => setSearch({ ...search, name: e.target.value })}
            />
            <input
              placeholder="Kategori"
              value={search.category}
              onChange={(e) =>
                setSearch({ ...search, category: e.target.value })
              }
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-input"
            >
              <option value="barcode">Barkod Koduna Göre</option>
              <option value="name">Ürün Adına Göre</option>
            </select>

            <button className="btn green" onClick={handleSearch}>
              🔍 Sorgula
            </button>

            <button
              className="btn gray"
              onClick={() => setSelected(filtered)}
              style={{ marginLeft: "auto" }}
            >
              Barkod Listesine Tüm Ürünleri Aktar
            </button>
          </div>

          <div className="table-container">
            <table className="product-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Ürün Adı</th>
                  <th>Barkod</th>
                  <th>Kategori</th>
                  <th>Alış Fiyatı</th>
                  <th>Satış Fiyatı</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty-msg">
                      Gösterilecek veri yok.
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.barcode}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selected.some((x) => x.barcode === p.barcode)}
                          onChange={() => handleToggleSelect(p)}
                        />
                      </td>
                      <td>{p.name}</td>
                      <td>{p.barcode}</td>
                      <td>{p.category || "-"}</td>
                      <td>{p.costPrice?.toFixed(2) || "0.00"}</td>
                      <td>{p.price?.toFixed(2) || "0.00"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === "print" && (
        <div className="barcode-print-area">
          <div className="actions" style={{ justifyContent: "flex-end" }}>
            <button className="btn green" onClick={handlePrint}>
              🖨️ Yazdır
            </button>
          </div>

          {selected.length === 0 ? (
            <div className="empty-msg">Henüz ürün seçilmedi.</div>
          ) : (
            <div className="barcode-grid">
              {selected.map((p, i) => (
                <div key={i} className="barcode-item">
                  <strong>{p.name}</strong>
                  <Barcode value={p.barcode || "000000"} height={60} />
                  <small>{p.price?.toFixed(2) || "0.00"} ₺</small>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BarcodePrintPage;