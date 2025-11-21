import React, { useEffect, useState } from "react";
import "./PosPage.css";
import ProductScanPanel from "../components/ProductScanPanel/ProductScanPanel";
import CartList from "../components/CartList/CartList";
import BarcodeListener from "../../../core/utils/BarcodeListener";
import SummaryPanel from "../components/SummaryPanel/SummaryPanel";
import BestSellers from "../components/BestSellers/BestSellers";
import PaymentActions from "../components/PaymentActions/PaymentActions";
import productService from "../../../core/services/productService";

const PosPage = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🧠 Çok satan ürünleri çek
  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        const data = await productService.getBestSellers();
        setBestSellers(data);
      } catch (err) {
        console.error("Best seller ürünler yüklenemedi:", err);
        setError("Ürünler yüklenirken bir hata oluştu!");
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <div className="pos-page">
      <BarcodeListener />

      <div className="pos-content">
        {/* Sol panel */}
        <div className="left-pos-section">
          <ProductScanPanel onScan={(code) => console.log("Barkod okundu:", code)} />
          <CartList />
          <SummaryPanel />
        </div>

        {/* Sağ panel: çok satanlar + ödeme */}
        <div className="right-pos-section">
          <BestSellers
            items={bestSellers}
            loading={loading}
            error={error}
          />
          <PaymentActions />
        </div>
      </div>
    </div>
  );
};

export default PosPage;