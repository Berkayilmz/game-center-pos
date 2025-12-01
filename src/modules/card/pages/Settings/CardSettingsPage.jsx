// src/modules/pos/card/pages/CardSettingsPage.jsx
import React, { useEffect, useState } from "react";
import "../CardPage.css";
import cardService from "../../../../core/services/cardService";
import CardModal from "../../components/CardModal/CardModal";
import CardDetailModal from "../../components/CardDetailModal/CardDetailModal";

const CardSettingsPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [detailCard, setDetailCard] = useState(null);

  // 📥 Kartları yükle
  const loadCards = async () => {
    setLoading(true);
    const data = await cardService.getAll();
    setCards(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCards();
  }, []);

  // ♻️ Kartları sıfırla
  const handleReset = () => {
    if (window.confirm("Tüm kartları sıfırlamak istediğine emin misin?")) {
      localStorage.removeItem("arcade_cards");
      window.location.reload();
    }
  };

  // 🎨 Tür renkleri
  const getTypeColor = (type) => {
    switch (type) {
      case "service":
        return "#9b59b6";
      case "customer":
        return "#3498db";
      default:
        return "#95a5a6";
    }
  };

  // 💾 Kart kaydet
  const handleSave = (cardData) => {
    if (editCard) {
      const updated = cards.map((c) =>
        c.id === editCard.id ? { ...c, ...cardData } : c
      );
      setCards(updated);
      localStorage.setItem("arcade_cards", JSON.stringify(updated));
    } else {
      const newCard = {
        ...cardData,
        id: cards.length + 1,
        createdAt: new Date().toISOString(),
      };
      const updated = [...cards, newCard];
      setCards(updated);
      localStorage.setItem("arcade_cards", JSON.stringify(updated));
    }
  };

  // 🧩 Kart sil
  const handleDelete = (id) => {
    if (!window.confirm("Bu kartı silmek istediğine emin misin?")) return;
    const updated = cards.filter((c) => c.id !== id);
    setCards(updated);
    localStorage.setItem("arcade_cards", JSON.stringify(updated));
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2>💳 Kart Yönetimi</h2>
        <div className="header-buttons">
          <button
            className="btn green"
            onClick={() => {
              setEditCard(null);
              setModalOpen(true);
            }}
          >
            + Yeni Kart
          </button>
          <button className="btn red" onClick={handleReset}>
            ♻️ Tüm Kartları Sıfırla
          </button>
        </div>
      </div>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Kart ID</th>
                <th>Tür</th>
                <th>Bakiye</th>
                <th>Servis</th>
                <th>Misafir</th>
                <th>Özel Satış</th>
                <th>Max Bakiye</th>
                <th>Servis Limiti</th>
                <th>Oto. Yükleme</th>
                <th>POS Aktif</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {cards.length === 0 ? (
                <tr>
                  <td colSpan="12" className="empty-msg">
                    Henüz kart tanımlanmamış.
                  </td>
                </tr>
              ) : (
                cards.map((card) => (
                  <tr key={card.id}>
                    <td>{card.id}</td>
                    <td>{card.cardId}</td>
                    <td>
                      <span
                        style={{
                          background: getTypeColor(card.type),
                          color: "#fff",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          fontSize: "0.85rem",
                        }}
                      >
                        {card.type === "service" ? "Servis" : "Müşteri"}
                      </span>
                    </td>
                    <td>{card.balance?.toFixed(2)} ₺</td>
                    <td>{card.serviceCount ?? 0}</td>
                    <td>{card.guestBalance?.toFixed(2)} ₺</td>
                    <td>
                      {card.specialSales?.length > 0 ? (
                        <div>
                          <strong>{card.specialSales.length}</strong> adet
                          <br />
                          <small>
                            Son:{" "}
                            {
                              card.specialSales[
                                card.specialSales.length - 1
                              ]?.name
                            }
                          </small>
                        </div>
                      ) : (
                        <span style={{ color: "#999" }}>—</span>
                      )}
                    </td>
                    <td>{card.maxBalance ?? "-"}</td>
                    <td>{card.serviceLimit ?? "-"}</td>
                    <td>{card.autoLoad ? "✅" : "❌"}</td>
                    <td>{card.isActive ? "✅" : "❌"}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn blue small"
                          onClick={() => setDetailCard(card)}
                        >
                          🪪 Detaylar
                        </button>
                        <button
                          className="btn gray small"
                          onClick={() => {
                            setEditCard(card);
                            setModalOpen(true);
                          }}
                        >
                          Düzenle
                        </button>
                        <button
                          className="btn red small"
                          onClick={() => handleDelete(card.id)}
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <CardModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editCard={editCard}
      />

      <CardDetailModal
        open={!!detailCard}
        onClose={() => setDetailCard(null)}
        card={detailCard}
      />
    </div>
  );
};

export default CardSettingsPage;