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

/* 🎯 Varsayılan Ürün Verileri — Gerçek Market POS Simülasyonu */
const defaultProducts = [
  // === İÇECEKLER ===
  {
    id: 1,
    barcode: "880200000001",
    name: "Coca Cola 330ml",
    category: "İçecek",
    brand: "Coca Cola",
    unit: "adet",
    price: 25.0,
    costPrice: 16.0,
    vatRate: 0.10,
    discount: 0.0,
    stock: 120,
    isBestSeller: true,
    image: "/assets/products/cola330.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 2,
    barcode: "880200000002",
    name: "Fanta 330ml",
    category: "İçecek",
    brand: "Coca Cola",
    unit: "adet",
    price: 25.0,
    costPrice: 16.0,
    vatRate: 0.10,
    discount: 0.0,
    stock: 100,
    isBestSeller: false,
    image: "/assets/products/fanta330.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 3,
    barcode: "880200000003",
    name: "Ayran 200ml",
    category: "İçecek",
    brand: "Sütaş",
    unit: "adet",
    price: 15.0,
    costPrice: 8.0,
    vatRate: 0.10,
    discount: 0.0,
    stock: 80,
    isBestSeller: true,
    image: "/assets/products/ayran.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 4,
    barcode: "880200000004",
    name: "Su 500ml",
    category: "İçecek",
    brand: "Nestle",
    unit: "adet",
    price: 10.0,
    costPrice: 4.0,
    vatRate: 0.10,
    discount: 0.0,
    stock: 150,
    isBestSeller: true,
    image: "/assets/products/water.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 5,
    barcode: "880200000005",
    name: "Meyve Suyu (Cappy 200ml)",
    category: "İçecek",
    brand: "Cappy",
    unit: "adet",
    price: 18.0,
    costPrice: 10.0,
    vatRate: 0.10,
    discount: 0.0,
    stock: 60,
    isBestSeller: false,
    image: "/assets/products/juice.png",
    lastUpdated: new Date().toISOString(),
  },

  // === ATIŞTIRMALIKLAR ===
  {
    id: 6,
    barcode: "880300000001",
    name: "Lay’s Klasik 90g",
    category: "Atıştırmalık",
    brand: "Lay’s",
    unit: "paket",
    price: 30.0,
    costPrice: 18.0,
    vatRate: 0.10,
    discount: 0.0,
    stock: 80,
    isBestSeller: true,
    image: "/assets/products/lays.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 7,
    barcode: "880300000002",
    name: "Doritos Nacho 90g",
    category: "Atıştırmalık",
    brand: "Doritos",
    unit: "paket",
    price: 30.0,
    costPrice: 18.0,
    vatRate: 0.10,
    discount: 0.0,
    stock: 70,
    isBestSeller: true,
    image: "/assets/products/doritos.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 8,
    barcode: "880300000003",
    name: "Çubuk Kraker 40g",
    category: "Atıştırmalık",
    brand: "Ülker",
    unit: "paket",
    price: 10.0,
    costPrice: 6.0,
    vatRate: 0.10,
    discount: 0.0,
    stock: 90,
    isBestSeller: false,
    image: "/assets/products/stickcracker.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 9,
    barcode: "880300000004",
    name: "Eti Cin",
    category: "Atıştırmalık",
    brand: "Eti",
    unit: "adet",
    price: 8.0,
    costPrice: 4.0,
    vatRate: 0.10,
    discount: 0.0,
    stock: 200,
    isBestSeller: false,
    image: "/assets/products/cin.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 10,
    barcode: "880300000005",
    name: "Çikolata (Albeni Mini)",
    category: "Atıştırmalık",
    brand: "Ülker",
    unit: "adet",
    price: 12.0,
    costPrice: 7.0,
    vatRate: 0.10,
    discount: 0.0,
    stock: 100,
    isBestSeller: true,
    image: "/assets/products/albeni.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 11,
    barcode: "880300000006",
    name: "Popcorn (Tuzlu)",
    category: "Atıştırmalık",
    brand: "FunSnack",
    unit: "paket",
    price: 20.0,
    costPrice: 10.0,
    vatRate: 0.10,
    discount: 0.0,
    stock: 50,
    isBestSeller: false,
    image: "/assets/products/popcorn.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 12,
    barcode: "880300000007",
    name: "Pamuk Şeker (Renkli)",
    category: "Atıştırmalık",
    brand: "SweetJoy",
    unit: "adet",
    price: 25.0,
    costPrice: 12.0,
    vatRate: 0.10,
    discount: 0.0,
    stock: 40,
    isBestSeller: true,
    image: "/assets/products/cottoncandy.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 13,
    barcode: "880300000008",
    name: "Dondurma (Mini Cup)",
    category: "Atıştırmalık",
    brand: "Algida",
    unit: "adet",
    price: 30.0,
    costPrice: 15.0,
    vatRate: 0.10,
    discount: 0.0,
    stock: 60,
    isBestSeller: true,
    image: "/assets/products/icecream.png",
    lastUpdated: new Date().toISOString(),
  },

  // === OYUNCAK & HEDİYELİK ===
  {
    id: 14,
    barcode: "880400000001",
    name: "Mini Top",
    category: "Oyuncak",
    brand: "ToyZone",
    unit: "adet",
    price: 35.0,
    costPrice: 20.0,
    vatRate: 0.10,
    discount: 0.0,
    stock: 50,
    isBestSeller: false,
    image: "/assets/products/miniball.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 15,
    barcode: "880400000002",
    name: "Balon (Küçük)",
    category: "Oyuncak",
    brand: "PlayGift",
    unit: "adet",
    price: 10.0,
    costPrice: 4.0,
    vatRate: 0.10,
    discount: 0.0,
    stock: 200,
    isBestSeller: false,
    image: "/assets/products/balloon.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 16,
    barcode: "880400000003",
    name: "Mini Araba",
    category: "Oyuncak",
    brand: "ToyZone",
    unit: "adet",
    price: 45.0,
    costPrice: 25.0,
    vatRate: 0.10,
    discount: 0.0,
    stock: 30,
    isBestSeller: false,
    image: "/assets/products/minicar.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 17,
    barcode: "880400000004",
    name: "Sabun Köpüğü Oyuncağı",
    category: "Oyuncak",
    brand: "BubbleFun",
    unit: "adet",
    price: 25.0,
    costPrice: 12.0,
    vatRate: 0.10,
    discount: 0.0,
    stock: 40,
    isBestSeller: false,
    image: "/assets/products/bubbletoy.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 18,
    barcode: "880400000005",
    name: "Anahtarlık (Renkli)",
    category: "Hediyelik",
    brand: "PlayGift",
    unit: "adet",
    price: 15.0,
    costPrice: 5.0,
    vatRate: 0.10,
    discount: 0.0,
    stock: 60,
    isBestSeller: false,
    image: "/assets/products/keychain.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 19,
    barcode: "880400000006",
    name: "Sticker Seti (Renkli)",
    category: "Hediyelik",
    brand: "FunSticker",
    unit: "paket",
    price: 20.0,
    costPrice: 8.0,
    vatRate: 0.10,
    discount: 0.0,
    stock: 70,
    isBestSeller: true,
    image: "/assets/products/sticker.png",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 20,
    barcode: "880400000007",
    name: "Renkli Kalem Seti (3'lü)",
    category: "Hediyelik",
    brand: "ColorFun",
    unit: "set",
    price: 30.0,
    costPrice: 15.0,
    vatRate: 0.10,
    discount: 0.0,
    stock: 50,
    isBestSeller: false,
    image: "/assets/products/penset.png",
    lastUpdated: new Date().toISOString(),
  },
];

/* 📦 Bellek + Storage Yönetimi */
let products = loadFromStorage(STORAGE_KEY, defaultProducts);

/* ⏳ Fake backend delay */
const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));

/* 🧠 Servis */
const productService = {
  // 🔹 Tüm ürünleri getir
  async getAll() {
    await delay();
    return products;
  },

  // 🔹 Barkodla ürünü getir
  async getByBarcode(barcode) {
    await delay(100);
    const found = products.find((p) => p.barcode === barcode);
    return found
      ? {
          ...found,
          // Vergisiz birim fiyatı hesapla
          unitPrice: Number((found.price / (1 + found.vatRate)).toFixed(2)),
          vatAmount: Number((found.price - found.price / (1 + found.vatRate)).toFixed(2)),
          grossMargin: Number((found.price - found.costPrice).toFixed(2)), // brüt kâr
        }
      : null;
  },

  // 🔹 Çok satan ürünleri getir
  async getBestSellers() {
    await delay(100);
    return products.filter((p) => p.isBestSeller);
  },

  // 🔹 Stok güncelle
  async updateStock(id, newStock) {
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products[index].stock = newStock;
      products[index].lastUpdated = new Date().toISOString();
      saveToStorage(STORAGE_KEY, products);
      return products[index];
    }
    return null;
  },

  // 🔹 Ürün ekle
  async addProduct(product) {
    const newProduct = {
      ...product,
      id: Date.now(),
      lastUpdated: new Date().toISOString(),
      grossMargin: product.price - product.costPrice,
    };
    products.push(newProduct);
    saveToStorage(STORAGE_KEY, products);
    return newProduct;
  },

  // 🔹 Ürün arama (isim veya barkod)
  async search(keyword) {
    await delay(100);
    const q = keyword.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.barcode.includes(q)
    );
  },
};

export default productService;