import React from "react";
import "./BestSellers.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../../../redux/slices/cartSlice";

const BestSellers = ({ items = [], loading, error }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    new Audio("/sounds/beep.mp3").play().catch(() => {});
  };

  if (loading) return <div className="bestsellers-panel">Yükleniyor...</div>;
  if (error) return <div className="bestsellers-panel error">{error}</div>;
  if (!items.length) return <div className="bestsellers-panel empty">Hiç ürün bulunamadı 🛒</div>;

  return (
    <div className="bestsellers-panel">

      <div className="bestsellers-grid">
        {items.map((p) => (
          <div
            key={p.id}
            className="bestseller-item"
            onClick={() => handleAddToCart(p)}
            title={`${p.name} - ${p.price.toFixed(2)}₺`}
          >
            <div className="name">{p.name}</div>
            <div className="price">{p.price.toFixed(2)} ₺</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;