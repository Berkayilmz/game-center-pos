import React from "react";
import CashForm from "../components/CashForm";
import "../cash.css";

/**
 * Diğer Ödeme Sayfası
 * Cari hesaba bağlı olmayan kasa çıkış işlemleri (örnek: kira, masraf, maaş, vb.)
 */
const CashOtherPaymentPage = () => {
  return (
    <div className="cash-other-payment-page">
      <CashForm title="Diğer Ödeme" type="payment" />
    </div>
  );
};

export default CashOtherPaymentPage;