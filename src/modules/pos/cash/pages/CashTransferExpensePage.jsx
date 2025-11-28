import React from "react";
import CashForm from "../components/CashForm";
import "../cash.css";

/**
 * Devir Gider Sayfası
 * Önceki dönemden devreden kasa çıkışlarını kaydetmek için kullanılır.
 */
const CashTransferExpensePage = () => {
  return (
    <div className="cash-transfer-expense-page">
      <CashForm title="Devir Gider" type="payment" />
    </div>
  );
};

export default CashTransferExpensePage;