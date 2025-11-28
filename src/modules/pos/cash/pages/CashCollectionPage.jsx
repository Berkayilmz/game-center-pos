import React from "react";
import CashForm from "../components/CashForm";
import "../cash.css";

/**
 * Cariden Tahsilat Sayfası
 * Müşteriden (cari hesaptan) tahsilat yapılır.
 */
const CashCollectionPage = () => {
  return (
    <div className="cash-collection-page">
      <CashForm title="Cariden Tahsilat" type="collection" />
    </div>
  );
};

export default CashCollectionPage;