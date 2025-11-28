import React from "react";
import "../cash.css";
import CashForm from "../components/CashForm";

/**
 * 💱 Kasa Virman Sayfası
 * Kasalar arası para aktarımı yapmak için kullanılır.
 * Bir kasadan çıkış (borçlu), diğerine giriş (alacaklı) yapılır.
 */
const CashTransferPage = () => {
  return (
    <div className="cash-transfer-page">
      <CashForm title="Kasa Virman" type="transfer" />
    </div>
  );
};

export default CashTransferPage;