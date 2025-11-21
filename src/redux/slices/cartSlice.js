// src/redux/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  discountRate: 0,
  lastAdded: null,
};

// 💰 Ürün satır hesaplamaları (tüm KDV ve indirim dahil)
const calculateItemTotals = (item) => {
  const unitNet = item.unitPrice ?? item.price / (1 + item.vatRate); // fallback eklendi
  const subtotal = unitNet * item.qty;
  const vatAmount = subtotal * item.vatRate;
  const discount = item.discount ?? 0;
  const total = subtotal + vatAmount - discount;

  return {
    ...item,
    unitPrice: unitNet, // her ihtimale karşı normalize ediyoruz
    subtotal,
    vatAmount,
    discount,
    total,
  };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((i) => i.id === product.id);

      if (existing) {
        existing.qty += 1;
        Object.assign(existing, calculateItemTotals(existing));
      } else {
        const newItem = calculateItemTotals({
          ...product,
          qty: 1,
        });
        state.items.push(newItem);
        state.lastAdded = newItem;
      }
    },

    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.qty = Math.max(1, qty);
        Object.assign(item, calculateItemTotals(item));
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
      state.discountRate = 0;
    },

    applyCartDiscount: (state, action) => {
      state.discountRate = action.payload;
    },
  },
});

export const {
  addToCart,
  updateQty,
  removeFromCart,
  clearCart,
  applyCartDiscount,
} = cartSlice.actions;
export default cartSlice.reducer;