import React, { useEffect, useState } from "react";
import "./CashReportPage.css";

const CashReportPage = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Backend yapısına uygun örnek veri formatı
  // Bu yapı ileride backend’den birebir gelecek şekilde düşünülmüştür.
  // Örneğin GET /api/reports/cash endpoint’inden:
  // {
  //   "totalSales": 54837.0,
  //   "totalCancel": 3857.0,
  //   "totalBonus": 7300.0,
  //   "totalCredit": 0.0,
  //   "totalSpecialSales": 0.0,
  //   "totalPromotion": 0.0,
  //   "totalGuest": 819.0,
  //   "depositReceived": 550.0,
  //   "depositRefund": 120.0
  // }

  useEffect(() => {
    // ⬇️ Geçici simülasyon (backend geldiğinde fetch ile değiştirilecek)
    const mockResponse = {
      totalSales: 54837.0,
      totalCancel: 3857.0,
      totalBonus: 7300.0,
      totalCredit: 0.0,
      totalSpecialSales: 0.0,
      totalPromotion: 0.0,
      totalGuest: 819.0,
      depositReceived: 550.0,
      depositRefund: 120.0,
    };

    setTimeout(() => {
      setReport(mockResponse);
      setLoading(false);
    }, 400);
  }, []);

  if (loading) {
    return <div className="report-page"><p>Yükleniyor...</p></div>;
  }

  if (!report) {
    return <div className="report-page"><p>Rapor verisi bulunamadı.</p></div>;
  }

  // 🔹 Görüntülenecek satırları tanımlıyoruz (backend field -> label eşleşmesi)
  const reportFields = [
    { key: "totalSales", label: "Toplam Satış" },
    { key: "totalCancel", label: "Toplam İptal" },
    { key: "totalBonus", label: "Toplam Bonus" },
    { key: "totalCredit", label: "Toplam Kredi" },
    { key: "totalSpecialSales", label: "Toplam Özel Satış" },
    { key: "totalPromotion", label: "Toplam Promosyon" },
    { key: "totalGuest", label: "Toplam Misafir" },
    { key: "depositReceived", label: "Depozito Alım" },
    { key: "depositRefund", label: "Depozito İade" },
  ];

  return (
    <div className="report-page">
      <h2 className="report-title">🧾 Genel Kasa Raporu</h2>

      <div className="report-table">
        {reportFields.map((field) => (
          <div key={field.key} className="report-row">
            <span className="report-label">{field.label}</span>
            <span className="report-value">
              {report[field.key]?.toFixed(2) ?? "0.00"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CashReportPage;