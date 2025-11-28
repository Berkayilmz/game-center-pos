import React from "react";
import CashForm from "../components/CashForm";
import "../cash.css";

/**
 * Cariye Ödeme Sayfası
 * Müşteriye veya tedarikçiye ödeme yapılır (para çıkışı).
 */
const CashPaymentPage = () => {
  return (
    <div className="cash-payment-page">
      <CashForm title="Cariye Ödeme" type="payment" />
    </div>
  );
};

export default CashPaymentPage;