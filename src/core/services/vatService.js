// === VAT SERVICE (src/core/services/vatService.js) ===

const STORAGE_KEY = "pos_vat_rates";

/* 🔹 LocalStorage Yardımcıları */
const loadFromStorage = (key, defaultValue) => {
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  localStorage.setItem(key, JSON.stringify(defaultValue));
  return defaultValue;
};

const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

/* 🎯 Varsayılan KDV Oranları */
const defaultRates = [
  {
    id: 1,
    code: "VAT18",
    description: "Standart %18 KDV",
    rate: 0.18,
    includedInPrice: true,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    code: "VAT08",
    description: "Gıda ve temel ihtiyaç ürünleri %8",
    rate: 0.08,
    includedInPrice: true,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    code: "VAT01",
    description: "İndirimli oran %1",
    rate: 0.01,
    includedInPrice: false,
    active: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    code: "VAT00",
    description: "Vergisiz satış / ihracat",
    rate: 0.0,
    includedInPrice: false,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

/* 📦 Veriyi Bellekten Çek */
let vatRates = loadFromStorage(STORAGE_KEY, defaultRates);

/* 🕓 Fake Delay */
const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));

/* 🧠 Servis Metodları */
const vatService = {
  // 🔹 Tüm oranları getir
  async getAll() {
    await delay();
    return vatRates;
  },

  // 🔹 Tek oran getir (code ile)
  async getByCode(code) {
    await delay(100);
    return vatRates.find((v) => v.code === code) || null;
  },

  // 🔹 Yeni oran ekle
  async add(vat) {
    const exists = vatRates.some((x) => x.code === vat.code);
    if (exists) throw new Error("Bu kod zaten tanımlı.");
    const newVat = {
      ...vat,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    vatRates.push(newVat);
    saveToStorage(STORAGE_KEY, vatRates);
    return newVat;
  },

  // 🔹 Güncelle
  async update(code, data) {
    const index = vatRates.findIndex((v) => v.code === code);
    if (index === -1) throw new Error("Vergi bulunamadı.");
    vatRates[index] = {
      ...vatRates[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    saveToStorage(STORAGE_KEY, vatRates);
    return vatRates[index];
  },

  // 🔹 Sil
  async remove(code) {
    vatRates = vatRates.filter((v) => v.code !== code);
    saveToStorage(STORAGE_KEY, vatRates);
    return true;
  },
};

export default vatService;