// src/core/services/productService.js

const STORAGE_KEY = "pos_products";

/* 🔹 Local Storage Yardımcıları */
const loadFromStorage = (key, defaultValue) => {
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  localStorage.setItem(key, JSON.stringify(defaultValue));
  return defaultValue;
};

const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

/* 📦 Varsayılan Ürün Verileri (formdaki tüm alanları içerir) */
const defaultProducts = [
  {
    id: 1,
    code: "UR001",
    name: "Coca Cola 330ml",
    group: "İçecek",
    barcode: "880200000001",
    producerCode: "CCO-330",
    producer: "Coca Cola Company",
    type: "Tüketim",
    brand: "Coca Cola",
    model: "Classic",
    unit: "Adet",
    vatRate: 10,
    vatIncluded: true,
    costPrice: 16.0,
    price: 25.0,
    quickSalePrice: 25.0,
    price1: 26.0,
    price2: 24.0,
    price3: 23.0,
    special1: "Kola",
    special2: "Kutu",
    special3: "330ml",
    weight: "0.33",
    shelf: "A1",
    eye: "Üst",
    minQty: 10,
    maxQty: 500,
    notes: "Soğuk servis edilir.",
    stock: 120,
    isBestSeller: true,
    image: "/assets/products/cola330.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 2,
    code: "UR002",
    name: "Fanta 330ml",
    group: "İçecek",
    barcode: "880200000002",
    producerCode: "FAN-330",
    producer: "Coca Cola Company",
    type: "Tüketim",
    brand: "Fanta",
    model: "Portakal",
    unit: "Adet",
    vatRate: 10,
    vatIncluded: true,
    costPrice: 16.0,
    price: 25.0,
    quickSalePrice: 25.0,
    price1: 26.0,
    price2: 24.0,
    price3: 23.0,
    special1: "Gazlı İçecek",
    special2: "Portakal",
    special3: "330ml",
    weight: "0.33",
    shelf: "A2",
    eye: "Orta",
    minQty: 10,
    maxQty: 400,
    notes: "Soğuk servis edilir.",
    stock: 100,
    isBestSeller: false,
    image: "/assets/products/fanta330.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 3,
    code: "UR003",
    name: "Lay’s Klasik 90g",
    group: "Atıştırmalık",
    barcode: "880300000001",
    producerCode: "LAY-K90",
    producer: "PepsiCo",
    type: "Tüketim",
    brand: "Lay’s",
    model: "Klasik",
    unit: "Paket",
    vatRate: 10,
    vatIncluded: true,
    costPrice: 18.0,
    price: 30.0,
    quickSalePrice: 30.0,
    price1: 31.0,
    price2: 29.0,
    price3: 28.0,
    special1: "Patates Cipsi",
    special2: "Tuzlu",
    special3: "90g",
    weight: "0.09",
    shelf: "B1",
    eye: "Üst",
    minQty: 20,
    maxQty: 200,
    notes: "Açıldıktan sonra taze tüketiniz.",
    stock: 80,
    isBestSeller: true,
    image: "/assets/products/lays.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 4,
    code: "UR004",
    name: "Doritos Nacho 90g",
    group: "Atıştırmalık",
    barcode: "880300000002",
    producerCode: "DOR-N90",
    producer: "PepsiCo",
    type: "Tüketim",
    brand: "Doritos",
    model: "Nacho",
    unit: "Paket",
    vatRate: 10,
    vatIncluded: true,
    costPrice: 18.0,
    price: 30.0,
    quickSalePrice: 30.0,
    price1: 31.0,
    price2: 29.0,
    price3: 28.0,
    special1: "Mısır Cipsi",
    special2: "Baharatlı",
    special3: "90g",
    weight: "0.09",
    shelf: "B2",
    eye: "Orta",
    minQty: 20,
    maxQty: 200,
    notes: "Baharatlı atıştırmalık.",
    stock: 70,
    isBestSeller: true,
    image: "/assets/products/doritos.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 5,
    code: "UR005",
    name: "Mini Top",
    group: "Oyuncak",
    barcode: "880400000001",
    producerCode: "TOY-MB",
    producer: "ToyZone",
    type: "Oyuncak",
    brand: "ToyZone",
    model: "Mini Ball",
    unit: "Adet",
    vatRate: 10,
    vatIncluded: true,
    costPrice: 20.0,
    price: 35.0,
    quickSalePrice: 35.0,
    price1: 36.0,
    price2: 33.0,
    price3: 32.0,
    special1: "Plastik Top",
    special2: "Renkli",
    special3: "Küçük Boy",
    weight: "0.1",
    shelf: "C1",
    eye: "Alt",
    minQty: 5,
    maxQty: 100,
    notes: "3 yaş üstü çocuklar için uygundur.",
    stock: 50,
    isBestSeller: false,
    image: "/assets/products/miniball.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 6,
    code: "UR006",
    name: "Anahtarlık (Renkli)",
    group: "Hediyelik",
    barcode: "880400000005",
    producerCode: "GIF-KEY",
    producer: "PlayGift",
    type: "Hediyelik",
    brand: "PlayGift",
    model: "ColorKey",
    unit: "Adet",
    vatRate: 10,
    vatIncluded: true,
    costPrice: 5.0,
    price: 15.0,
    quickSalePrice: 15.0,
    price1: 16.0,
    price2: 14.0,
    price3: 13.0,
    special1: "Anahtarlık",
    special2: "Plastik",
    special3: "Renkli",
    weight: "0.05",
    shelf: "D1",
    eye: "Alt",
    minQty: 5,
    maxQty: 300,
    notes: "Renkler karışık gelir.",
    stock: 60,
    isBestSeller: false,
    image: "/assets/products/keychain.png",
    lastUpdated: new Date().toISOString(),
  },
];

/* 📦 Bellek + Storage Yönetimi */
let products = loadFromStorage(STORAGE_KEY, defaultProducts);

/* 🧠 Servis */
const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));

const productService = {
  async getAll() {
    await delay();
    return [...products];
  },

  async getById(id) {
    await delay(100);
    return products.find((p) => p.id === id) || null;
  },

  async getBestSellers() {
    await delay(100);
    return products.filter((p) => p.isBestSeller);
  },

  async addProduct(product) {
    await delay(100);
    const newProduct = {
      id: Date.now(),
      ...product,
      lastUpdated: new Date().toISOString(),
    };
    products.push(newProduct);
    saveToStorage(STORAGE_KEY, products);
    return newProduct;
  },

  async updateProduct(id, updates) {
    await delay(100);
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Ürün bulunamadı");
    products[index] = {
      ...products[index],
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    saveToStorage(STORAGE_KEY, products);
    return products[index];
  },

  async deleteProduct(id) {
    await delay(100);
    products = products.filter((p) => p.id !== id);
    saveToStorage(STORAGE_KEY, products);
    return true;
  },

  async search(keyword) {
    await delay(100);
    const q = keyword.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.barcode.includes(q) ||
        p.group.toLowerCase().includes(q)
    );
  },
};

export default productService;