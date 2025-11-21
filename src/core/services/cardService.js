// src/core/services/cardService.js
const STORAGE_KEY = "arcade_cards";

/* 🧩 LocalStorage okuma/yazma yardımcıları */
const load = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) return JSON.parse(data);

  // 🎯 Default kartlar: 8 müşteri, 2 servis
  const defaults = [
    ...Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      cardId: `FACR-100${i}`,
      type: "customer",
      balance: Math.floor(Math.random() * 300),
      guestBalance: 0, // Misafir bakiyesi
      serviceCount: 0,
      isGuest: false,
      createdAt: new Date().toISOString(),
    })),
    {
      id: 9,
      cardId: "SRV-1001",
      type: "service",
      balance: 0,
      guestBalance: 0,
      serviceCount: 10,
      isGuest: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 10,
      cardId: "SRV-1002",
      type: "service",
      balance: 0,
      guestBalance: 0,
      serviceCount: 5,
      isGuest: false,
      createdAt: new Date().toISOString(),
    },
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
  return defaults;
};

let cards = load();

const save = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
};

/*  Servis nesnesi */
const cardService = {
  //  Kart bul
  async getByCardId(cardId) {
    return cards.find((c) => c.cardId === cardId) || null;
  },

  // Kart güncelle
  async updateCard(id, updates) {
    cards = cards.map((c) => (c.id === id ? { ...c, ...updates } : c));
    save();
    return cards.find((c) => c.id === id);
  },

  //  Kart listesi (opsiyonel)
  async getAll() {
    return cards;
  },

  // Bakiye yükle
  async addBalance(id, amount) {
    const card = cards.find((c) => c.id === id);
    if (!card || card.type !== "customer") throw new Error("Bakiye sadece müşteri kartına yüklenebilir!");
    card.balance += amount;
    card.updatedAt = new Date().toISOString();
    save();
    return card;
  },

  //  Servis yükle
  async addService(id, count) {
    const card = cards.find((c) => c.id === id);
    if (!card || card.type !== "service") throw new Error("Bu kart servis kartı değil!");
    card.serviceCount += count;
    card.updatedAt = new Date().toISOString();
    save();
    return card;
  },

  // Misafir yükle
  async addGuestBalance(id, amount) {
    const card = cards.find((c) => c.id === id);
    if (!card || card.type !== "customer")
      throw new Error("Misafir yükleme sadece müşteri kartına yapılabilir!");
    card.guestBalance += amount;
    card.updatedAt = new Date().toISOString();
    save();
    return card;
  },
};


export default cardService;