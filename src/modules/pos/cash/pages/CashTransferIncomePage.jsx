import React from "react";
import CashForm from "../components/CashForm";
import "../cash.css";

/**
 * Devir Gelir Sayfası
 * Önceki dönemden devreden kasa girişlerini kaydetmek için kullanılır.
 */
const CashTransferIncomePage = () => {
  return (
    <div className="cash-transfer-income-page">
      <CashForm title="Devir Gelir" type="collection" />
    </div>
  );
};

export default CashTransferIncomePage;