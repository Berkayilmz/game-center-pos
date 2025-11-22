import React, { useState } from "react";
import "./PaymentActions.css";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../../../../redux/slices/cartSlice";
import productService from "../../../../../core/services/productService";

const PaymentActions = () => {
  const dispatch = useDispatch();
  const { items, discountRate } = useSelector((state) => state.cart);

  // 💰 Toplam hesaplama
  const subtotal = items.reduce((sum, i) => sum + (i.subtotal || 0), 0);
  const vatTotal = items.reduce((sum, i) => sum + (i.vatAmount || 0), 0);
  const lineDiscounts = items.reduce((sum, i) => sum + (i.discount || 0), 0);
  const generalDiscount = subtotal * (discountRate / 100);
  const total = subtotal + vatTotal - lineDiscounts - generalDiscount;

  // 🧠 Local state
  const [mode, setMode] = useState("single"); // single | split
  const [selectedType, setSelectedType] = useState("cash");
  const [currentAmount, setCurrentAmount] = useState("");
  const [payments, setPayments] = useState([]);

  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const remaining = Math.max(total - totalPaid, 0);

  // 💵 Parçalı ödeme ekleme
  const handleAddPayment = (type) => {
    const amountNum = parseFloat(currentAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert("Lütfen geçerli bir tutar girin!");
      return;
    }
    if (amountNum > remaining) {
      alert("Girilen tutar kalan toplamdan fazla olamaz!");
      return;
    }

    setPayments([...payments, { type, amount: amountNum }]);
    setCurrentAmount("");
  };

  // ✅ Satışı tamamla
  const handleCompleteSale = async () => {
    if (items.length === 0) {
      alert("Sepet boş!");
      return;
    }

    if (mode === "split" && remaining > 0) {
      alert("Tüm ödeme tamamlanmadı!");
      return;
    }

    // 🔻 Stok azalt
    for (const item of items) {
      const newStock = item.stock - item.qty;
      await productService.updateStock(item.id, Math.max(newStock, 0));
    }

    // 💾 Satışı kaydet
    const oldSales = JSON.parse(localStorage.getItem("pos_sales") || "[]");
    const saleRecord = {
      id: Date.now(),
      date: new Date().toISOString(),
      items,
      total,
      payments:
        mode === "split"
          ? payments
          : [{ type: selectedType, amount: total }],
      mode,
    };
    localStorage.setItem("pos_sales", JSON.stringify([...oldSales, saleRecord]));

    dispatch(clearCart());
    setPayments([]);
    setCurrentAmount("");
    alert("Satış başarıyla tamamlandı 🧾");
  };

  return (
    <div className="payment-actions-panel">
      <h3>💳 Ödeme</h3>

      {/* Ödeme modu seçimi */}
      <div className="payment-mode-toggle">
        <label>
          <input
            type="radio"
            name="mode"
            checked={mode === "single"}
            onChange={() => setMode("single")}
          />
          Tek Ödeme
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            checked={mode === "split"}
            onChange={() => setMode("split")}
          />
          Parçalı Ödeme
        </label>
      </div>

      <div className="payment-total">
        <span>Toplam:</span>
        <strong>{total.toFixed(2)} ₺</strong>
      </div>

      {/* --- PARÇALI ÖDEME MODU --- */}
      {mode === "split" ? (
        <>
          <div className="payment-list">
            {payments.map((p, i) => (
              <div key={i} className="payment-row">
                <span>{p.type === "cash" ? "💵 Nakit" : "💳 Kart"}</span>
                <span>{p.amount.toFixed(2)} ₺</span>
              </div>
            ))}
            {payments.length === 0 && (
              <p className="empty">Henüz ödeme eklenmedi</p>
            )}
          </div>

          <div className="payment-input">
            <input
              type="number"
              placeholder="Tutar gir..."
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
            />
            <button className="btn cash" onClick={() => handleAddPayment("cash")}>
              💵 Nakit
            </button>
            <button className="btn card" onClick={() => handleAddPayment("card")}>
              💳 Kart
            </button>
          </div>

          <div className="payment-summary">
            <div>
              <span>Toplam Ödenen:</span>
              <strong>{totalPaid.toFixed(2)} ₺</strong>
            </div>
            <div>
              <span>Kalan:</span>
              <strong className={remaining > 0 ? "warning" : "done"}>
                {remaining.toFixed(2)} ₺
              </strong>
            </div>
          </div>
        </>
      ) : (
        /* --- TEK ÖDEME MODU --- */
        <div className="single-payment-options">
          <button
            className={`btn cash ${selectedType === "cash" ? "active" : ""}`}
            onClick={() => setSelectedType("cash")}
          >
            💵 Nakit
          </button>
          <button
            className={`btn card ${selectedType === "card" ? "active" : ""}`}
            onClick={() => setSelectedType("card")}
          >
            💳 Kart
          </button>
        </div>
      )}

      <div className="payment-buttons">
        <button className="btn gray" onClick={() => setPayments([])}>
          🔁 İptal Et
        </button>
        <button
          className="btn green"
          disabled={items.length === 0}
          onClick={handleCompleteSale}
        >
          ✅ Satışı Tamamla
        </button>
      </div>
    </div>
  );
};

export default PaymentActions;