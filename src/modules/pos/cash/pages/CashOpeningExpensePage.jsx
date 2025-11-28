import React from "react";
import CashForm from "../components/CashForm";
import "../cash.css";

/**
 * Açılış Gider Sayfası
 * Yeni dönemin başında yapılan başlangıç kasa çıkışlarını kaydetmek için kullanılır.
 */
const CashOpeningExpensePage = () => {
  return (
    <div className="cash-opening-expense-page">
      <CashForm title="Açılış Gider" type="payment" />
    </div>
  );
};

export default CashOpeningExpensePage;