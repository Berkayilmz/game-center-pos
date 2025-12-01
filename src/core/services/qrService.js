// src/core/services/qrService.js
const STORAGE_KEY = "arcade_qr_fisler";

/* 📦 LocalStorage yardımcıları */
const load = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("❌ QR load error:", err);
    return [];
  }
};

const save = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/* 🧩 Ana servis nesnesi */
const qrService = {
  async create(amount) {
    if (!amount || isNaN(amount) || amount <= 0)
      throw new Error("Geçerli bir tutar girilmelidir!");

    const qrFisler = load();
    const newQR = {
      id: `QR-${Date.now()}`,
      amount: Number(amount),
      token: (
        Math.random().toString(36).substring(2, 6) +
        "-" +
        Math.random().toString(36).substring(2, 6)
      ).toUpperCase(),
      status: "Bekliyor",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 dk
    };

    qrFisler.push(newQR);
    save(qrFisler);
    return newQR;
  },

  async getAll() {
    const qrFisler = load();
    // ⏰ Süresi geçmiş fişleri filtreleme
    const now = Date.now();
    return qrFisler.map((q) => ({
      ...q,
      expired: new Date(q.expiresAt).getTime() < now,
    }));
  },

  async updateStatus(id, status) {
    const qrFisler = load();
    const updated = qrFisler.map((q) =>
      q.id === id ? { ...q, status } : q
    );
    save(updated);
  },

  async clearAll() {
    save([]);
  },
};

export default qrService;