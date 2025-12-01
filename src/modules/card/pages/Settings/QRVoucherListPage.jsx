// src/modules/pos/qr/pages/QRVoucherListPage.jsx
import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import qrService from "../../../../core/services/qrService";
import "../CardPage.css";

const QRVoucherListPage = () => {
  const [qrList, setQrList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📥 QR fişlerini yükle
  const loadQRFisler = async () => {
    setLoading(true);
    const data = await qrService.getAll();
    setQrList(data);
    setLoading(false);
  };

  useEffect(() => {
    loadQRFisler();
  }, []);

  // ✅ Fişi kullanıldı işaretle
  const handleUse = async (id) => {
    await qrService.updateStatus(id, "Kullanıldı");
    loadQRFisler();
  };

  // ♻️ Tüm fişleri sıfırla
  const handleReset = async () => {
    if (window.confirm("Tüm fişleri silmek istiyor musun?")) {
      await qrService.clearAll();
      loadQRFisler();
    }
  };

  return (
    <div className="card-page">
      {/* 🔹 Sol Panel (Liste) */}
      <div className="panel qr-list">
        <div className="settings-header" style={{ justifyContent: "space-between" }}>
          <h2>🎟️ QR Fiş Listesi</h2>
          <button className="btn red" onClick={handleReset}>
            Temizle
          </button>
        </div>

        {loading ? (
          <p>Yükleniyor...</p>
        ) : qrList.length === 0 ? (
          <p>Henüz fiş oluşturulmadı.</p>
        ) : (
          <div className="table-container" style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <table className="product-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tutar</th>
                  <th>Token</th>
                  <th>Durum</th>
                  <th>Oluşturulma</th>
                  <th>QR Kod</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {qrList.map((q, i) => (
                  <tr key={q.id}>
                    <td>{i + 1}</td>
                    <td>{q.amount} ₺</td>
                    <td style={{ fontFamily: "monospace", fontSize: "0.9rem" }}>
                      {q.token}
                    </td>
                    <td>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          color: "#fff",
                          fontWeight: 600,
                          backgroundColor:
                            q.status === "Bekliyor"
                              ? "var(--color-warning)"
                              : q.status === "Kullanıldı"
                              ? "var(--color-success)"
                              : "var(--color-border2)",
                        }}
                      >
                        {q.status}
                      </span>
                    </td>
                    <td>{new Date(q.createdAt).toLocaleString("tr-TR")}</td>
                    <td>
                      <QRCodeCanvas
                        value={q.token}
                        size={60}
                        bgColor="#fff"
                        fgColor="#000"
                        level="M"
                      />
                    </td>
                    <td>
                      {q.status === "Bekliyor" && (
                        <button
                          className="btn green small"
                          onClick={() => handleUse(q.id)}
                        >
                          Kullanıldı İşaretle
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 🔹 Sağ Panel (QR Bilgi veya Gelecek Özellikler) */}
      <div className="panel qr-info">
        <h3 style={{ marginBottom: "1rem" }}>🧾 QR Fiş Özeti</h3>
        <p>
          Bu sayfada oluşturulan tüm <strong>QR fişleri</strong> listelenir.
          <br />
          Her bir fiş, belirli bir <strong>tutar</strong> karşılığı sistemde
          oluşturulur ve müşteriye verilen QR etiketiyle oyuna başlanır.
        </p>

        <ul style={{ marginTop: "1rem", lineHeight: "1.6" }}>
          <li>🕒 Durumu “Bekliyor” olan fişler aktif ve geçerlidir.</li>
          <li>✅ “Kullanıldı” olan fişler bir kez okutulmuştur.</li>
          <li>♻️ “Temizle” butonu tüm geçmiş kayıtları siler.</li>
        </ul>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <QRCodeCanvas
            value="SAMPLE-QR-SIMULATION"
            size={140}
            fgColor="var(--color-primary)"
          />
          <p style={{ marginTop: "0.6rem", color: "var(--color-text-soft)" }}>
            Örnek QR Görünümü
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRVoucherListPage;