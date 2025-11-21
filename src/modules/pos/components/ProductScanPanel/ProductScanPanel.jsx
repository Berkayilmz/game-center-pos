// src/features/pos/components/ProductScanPanel/ProductScanPanel.jsx
import React, { useState } from "react";
import "./ProductScanPanel.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../redux/slices/cartSlice";
import productService from "../../../../core/services/productService";

const ProductScanPanel = () => {
  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleAddProduct = async () => {
    if (!barcode.trim()) return;

    setLoading(true);
    const product = await productService.getByBarcode(barcode.trim());
    setLoading(false);

    if (!product) {
      alert("❌ Ürün bulunamadı!");
      return;
    }

    dispatch(addToCart(product));
    setBarcode("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAddProduct();
  };

  return (
    <div className="product-scan-panel">
      <div className="scan-input-box">
        <input
          type="text"
          placeholder="Barkod okutun veya yazın..."
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <button onClick={handleAddProduct} disabled={loading}>
          {loading ? "Ekleniyor..." : "Ekle"}
        </button>
      </div>
    </div>
  );
};

export default ProductScanPanel;