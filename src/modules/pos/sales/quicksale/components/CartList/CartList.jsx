// src/features/pos/components/CartList/CartList.jsx
import React from "react";
import "./CartList.css";
import { useDispatch, useSelector } from "react-redux";
import { updateQty, removeFromCart } from "../../../../../../redux/slices/cartSlice";

const CartList = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  return (
    <div className="cart-pos-list">
      <div className="cart-header">
        <span>Ürün</span>
        <span>Birim Fiyat (₺)</span>
        <span>KDV %</span>
        <span>Adet</span>
        <span>Ara Toplam</span>
        <span></span>
      </div>

      <div className="cart-body">
        {items.length === 0 ? (
          <p className="empty-cart">🛒 Henüz ürün eklenmedi</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="cart-item">
              <span className="item-name">{item.name}</span>
              <span className="item-price">
                {item.unitPrice.toFixed(2)}
              </span>
              <span className="item-vat">{(item.vatRate * 100).toFixed(0)}%</span>

              <div className="item-qty">
                <button onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))}>
                  -
                </button>
                <span>{item.qty}</span>
                <button onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))}>
                  +
                </button>
              </div>

              <span className="item-total">
                {(item.subtotal + item.vatAmount - item.discount).toFixed(2)}₺
              </span>

              <button
                className="remove-btn"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                ✖
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartList;