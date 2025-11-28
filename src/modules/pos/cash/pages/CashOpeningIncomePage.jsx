import React from "react";
import CashForm from "../components/CashForm";
import "../cash.css";

/**
 * Açılış Gelir Sayfası
 * Yeni dönemin başlangıcında kasa bakiyesini girmek için kullanılır.
 */
const CashOpeningIncomePage = () => {
  return (
    <div className="cash-opening-income-page">
      <CashForm title="Açılış Gelir" type="collection" />
    </div>
  );
};

export default CashOpeningIncomePage;