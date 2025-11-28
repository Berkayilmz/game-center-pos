import React from "react";
import CashForm from "../components/CashForm";
import "../cash.css";

/**
 * Diğer Tahsilat Sayfası
 * Cari hesaba bağlı olmayan kasa giriş işlemleri (örnek: bonus, iade, vb.)
 */
const CashOtherCollectionPage = () => {
  return (
    <div className="cash-other-collection-page">
      <CashForm title="Diğer Tahsilat" type="collection" />
    </div>
  );
};

export default CashOtherCollectionPage;