// src/core/services/softplayService.js
const STORAGE_KEYS = {
  families: "softplay_families",
  children: "softplay_children",
  durations: "softplay_durations",
};

// 📦 LocalStorage'dan oku veya default veriyi yükle
const loadFromStorage = (key, defaultValue) => {
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  localStorage.setItem(key, JSON.stringify(defaultValue));
  return defaultValue;
};

// 📤 LocalStorage'a kaydet
const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// 👩‍👦 Gerçekçi bireysel veliler
const defaultFamilies = [
  { id: 1, name: "Ahmet Arslan", role: "BABA", phone: "0532 110 3345" },
  { id: 2, name: "Zeynep Koç", role: "ANNE", phone: "0535 444 9288" },
  { id: 3, name: "Murat Yalın", role: "BABA", phone: "0541 222 7711" },
  { id: 4, name: "Emine Çelik", role: "ANNE", phone: "0534 901 6632" },
  { id: 5, name: "Ali Demir", role: "BABA", phone: "0537 555 1199" },
  { id: 6, name: "Aylin Öz", role: "ANNE", phone: "0539 660 4433" },
  { id: 7, name: "Serkan Aksoy", role: "BABA", phone: "0538 999 5521" },
  { id: 8, name: "Fatma Polat", role: "ANNE", phone: "0543 101 8810" },
  { id: 9, name: "Mehmet Kara", role: "BABA", phone: "0531 706 4412" },
  { id: 10, name: "Ayşe Aydın", role: "ANNE", phone: "0542 882 2211" },
];

// 👶 Her veliye 1–3 çocuk (toplam 20)
const defaultChildren = [
  // 1️⃣ Ahmet Arslan (2 çocuk)
  { id: 1, name: "Ege Arslan", age: 6, familyId: 1, parent: "Ahmet Arslan", isSoftplay: false, isFrozen: false, freezeStart: null, totalFrozenTime: 0 },
  { id: 2, name: "Elif Arslan", age: 4, familyId: 1, parent: "Ahmet Arslan", isSoftplay: false, isFrozen: false, freezeStart: null, totalFrozenTime: 0 },

  // 2️⃣ Zeynep Koç (3 çocuk)
  { id: 3, name: "Deniz Koç", age: 8, familyId: 2, parent: "Zeynep Koç", isSoftplay: false, isFrozen: false, freezeStart: null, totalFrozenTime: 0 },
  { id: 4, name: "Ecem Koç", age: 5, familyId: 2, parent: "Zeynep Koç", isSoftplay: false, isFrozen: false, freezeStart: null, totalFrozenTime: 0 },
  { id: 5, name: "Arda Koç", age: 3, familyId: 2, parent: "Zeynep Koç", isSoftplay: false, isFrozen: false, freezeStart: null, totalFrozenTime: 0 },

  // 3️⃣ Murat Yalın (2 çocuk)
  { id: 6, name: "Mira Yalın", age: 6, familyId: 3, parent: "Murat Yalın", isSoftplay: false, isFrozen: false, freezeStart: null, totalFrozenTime: 0 },
  { id: 7, name: "Efe Yalın", age: 3, familyId: 3, parent: "Murat Yalın", isSoftplay: false, isFrozen: false, freezeStart: null, totalFrozenTime: 0 },

  // 4️⃣ Emine Çelik (1 çocuk)
  { id: 8, name: "Duru Çelik", age: 5, familyId: 4, parent: "Emine Çelik", isSoftplay: false, isFrozen: false, freezeStart: null, totalFrozenTime: 0 },

  // 5️⃣ Ali Demir (3 çocuk)
  { id: 9, name: "Kerem Demir", age: 9, familyId: 5, parent: "Ali Demir", isSoftplay: false, isFrozen: false, freezeStart: null, totalFrozenTime: 0 },
  { id: 10, name: "Asya Demir", age: 7, familyId: 5, parent: "Ali Demir", isSoftplay: false, isFrozen: false, freezeStart: null, totalFrozenTime: 0 },
  { id: 11, name: "Efe Demir", age: 4, familyId: 5, parent: "Ali Demir", isSoftplay: false, isFrozen: false, freezeStart: null, totalFrozenTime: 0 },

  // 6️⃣ Aylin Öz (2 çocuk)
  { id: 12, name: "Berra Öz", age: 5, familyId: 6, parent: "Aylin Öz", isSoftplay: false, isFrozen: false, freezeStart: null, totalFrozenTime: 0 },
  { id: 13, name: "Kaan Öz", age: 2, familyId: 6, parent: "Aylin Öz", isSoftplay: false, isFrozen: false, freezeStart: null, totalFrozenTime: 0 },

  // 7️⃣ Serkan Aksoy (2 çocuk)
  { id: 14, name: "Defne Aksoy", age: 8, familyId: 7, parent: "Serkan Aksoy", isSoftplay: false, isFrozen: false, freezeStart: null, totalFrozenTime: 0 },
  { id: 15, name: "Aras Aksoy", age: 5, familyId: 7, parent: "Serkan Aksoy", isSoftplay: false, isFrozen: false, freezeStart: null, totalFrozenTime: 0 },

  // 8️⃣ Fatma Polat (1 çocuk)
  { id: 16, name: "Eymen Polat", age: 7, familyId: 8, parent: "Fatma Polat", isSoftplay: false, isFrozen: false, freezeStart: null, totalFrozenTime: 0 },

  // 9️⃣ Mehmet Kara (2 çocuk)
  { id: 17, name: "Can Kara", age: 9, familyId: 9, parent: "Mehmet Kara", isSoftplay: false, isFrozen: false, freezeStart: null, totalFrozenTime: 0 },
  { id: 18, name: "Yaren Kara", age: 4, familyId: 9, parent: "Mehmet Kara", isSoftplay: false, isFrozen: false, freezeStart: null, totalFrozenTime: 0 },

  // 🔟 Ayşe Aydın (2 çocuk)
  { id: 19, name: "Lina Aydın", age: 6, familyId: 10, parent: "Ayşe Aydın", isSoftplay: false, isFrozen: false, freezeStart: null, totalFrozenTime: 0 },
  { id: 20, name: "Can Aydın", age: 3, familyId: 10, parent: "Ayşe Aydın", isSoftplay: false, isFrozen: false, freezeStart: null, totalFrozenTime: 0 },
];

const defaultDurations = [
  { id: 1, label: "30 DK", value: 30, price: 50 },
  { id: 2, label: "1 SAAT", value: 60, price: 90 },
  { id: 3, label: "1,5 SAAT", value: 90, price: 120 },
  { id: 4, label: "2 SAAT", value: 120, price: 150 },
  { id: 5, label: "2,5 SAAT", value: 150, price: 180 },
  { id: 6, label: "3 SAAT", value: 180, price: 210 },
];

// 🧠 Verileri yükle
let families = loadFromStorage(STORAGE_KEYS.families, defaultFamilies);
let children = loadFromStorage(STORAGE_KEYS.children, defaultChildren);
let durations = loadFromStorage(STORAGE_KEYS.durations, defaultDurations);

// ⏳ gecikme simülasyonu
const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));

const softplayService = {
  async getFamilies() {
    await delay();
    return families;
  },
  async getChildren() {
    await delay();
    return children;
  },
  async getDurations() {
    await delay();
    return durations;
  },

  saveFamilies(newList) {
    families = newList;
    saveToStorage(STORAGE_KEYS.families, families);
  },
  saveChildren(newList) {
    children = newList;
    saveToStorage(STORAGE_KEYS.children, children);
  },
  saveDurations(newList) {
    durations = newList;
    saveToStorage(STORAGE_KEYS.durations, durations);
  },

  async getChildrenByFamilyId(familyId) {
    await delay();
    return children.filter((c) => c.familyId === familyId);
  },
};

export default softplayService;