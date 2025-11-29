// src/core/components/Sidebar/Sidebar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (key) => {
    setActiveSection(activeSection === key ? null : key);
  };

  const menuMap = {
    sales: [
      // 🟢 Hızlı Satış ve İade
      { key: "quick-sale", label: "💰 Hızlı Satış", path: "/sales/pos" },
      { key: "quick-sale-return", label: "↩️ Hızlı Satış İade", path: "/sales/return" },
      { key: "price-view", label: "💵 Fiyat Gör (Modal)", path: "#" },

      // 📊 Günlük ve Özet Raporlar
      { key: "daily-summary", label: "📅 Gün Sonu Özet Rapor", path: "/sales/reports/daily-summary" },
      { key: "daily-sales", label: "📈 Günlük Satış Raporu", path: "/sales/reports/daily" },
      { key: "daily-sales-detail", label: "🧾 Günlük Satış Detaylı Rapor", path: "/sales/reports/daily-detail" },

      // 💹 Kar / Zarar Analizleri
      { key: "profit-loss", label: "📊 Kar / Zarar Analizi", path: "/sales/reports/profit-loss" },
      { key: "profit-loss-customer", label: "👤 Kar / Zarar (Cari Bazlı)", path: "/sales/reports/profit-loss/customer" },
      { key: "profit-loss-customer-detail", label: "📋 Kar / Zarar (Cari Detaylı)", path: "/sales/reports/profit-loss/customer-detail" },

      // 📜 Genel ve Liste Raporları
      { key: "general-report", label: "🗂️ Genel Rapor", path: "/sales/reports/general" },
      { key: "sales-list", label: "📑 Satış Listesi", path: "/sales/reports/list" },
    ],

    cari: [
      { key: "account-define", label: "🧾 Hesap Tanımla", path: "/cari/list" },
      { key: "debt-vouchers", label: "💰 Borç Dekontu", path: "/cari/debt-vouchers" },
      { key: "credit-vouchers", label: "💵 Alacak Dekontu", path: "/cari/credit-vouchers" },
      { key: "collections", label: "💰 Tahsilat", path: "/cari/collections" },
      { key: "payments", label: "💳 Ödemeler", path: "/cari/payments" },
      { key: "opening-debt", label: "📗 Açılış Borç", path: "/cari/opening-debt" },
      { key: "opening-credit", label: "📗 Açılış Alacak", path: "/cari/opening-credit" },
      { key: "transfer-debt", label: "📘 Devir Borç", path: "/cari/transfer-debt" },
      { key: "transfer-credit", label: "📗 Devir Alacak", path: "/cari/transfer-credit" },
      { key: "transfer", label: "🔁 Cari Virman", path: "/cari/transfer" },
      { key: "transaction-list", label: "📑 Cari Fiş Listesi", path: "/cari/transactions" },
      { key: "movement-list", label: "📘 Cari Hareket Listesi", path: "/cari/movements" },
      { key: "balance-list", label: "📊 Cari Bakiye Listesi", path: "/cari/balances" },
    ],

    dispatch: [
      { key: "purchase", label: "🟢 Alış İrsaliyesi", path: "/dispatch/purchase" },
      { key: "sales", label: "🟠 Satış İrsaliyesi", path: "/dispatch/sales" },
      { key: "purchaseReturn", label: "🔴 Alış İade İrsaliyesi", path: "/dispatch/purchaseReturn" },
      { key: "salesReturn", label: "🔵 Satış İade İrsaliyesi", path: "/dispatch/salesReturn" },
      { key: "dispatch-list", label: "📋 İrsaliye Listesi", path: "/dispatch/list" },
    ],

    pos: [
      { key: "product-list", label: "📦 Ürün Listesi", path: "/inventory/products" },
      { key: "warehouse-list", label: "🏢 Depo Listesi", path: "/inventory/warehouses" },
      { key: "stock-transactions", label: "🔄 Stok Hareketleri", path: "/inventory/transactions" },
      { key: "stock-count", label: "📊 Sayım İşlemi", path: "/inventory/stock-count" },
      { key: "barcode-print", label: "🏷️ Barkod Yazdır", path: "/inventory/barcode-print" },
      { key: "quick-price", label: "⚡ Hızlı Fiyat Değişikliği", path: "/inventory/quick-price" },
      { key: "product-vouchers", label: "📑 Ürün Fiş Listesi", path: "/inventory/product-vouchers" },
    ],

    cash: [
      { key: "define", label: "🏦 Kasa Tanımla", path: "/cash/define" },
      { key: "from-customer", label: "💰 Cariden Tahsilat", path: "/cash/from-customer" },
      { key: "to-customer", label: "💸 Cariye Ödeme", path: "/cash/to-customer" },
      { key: "other-collection", label: "📥 Diğer Tahsilat", path: "/cash/other-collection" },
      { key: "other-payment", label: "📤 Diğer Ödeme", path: "/cash/other-payment" },
      { key: "period-income", label: "🔁 Devir Gelir", path: "/cash/period-income" },
      { key: "period-expense", label: "🔁 Devir Gider", path: "/cash/period-expense" },
      { key: "opening-income", label: "🚀 Açılış Gelir", path: "/cash/opening-income" },
      { key: "opening-expense", label: "⚙️ Açılış Gider", path: "/cash/opening-expense" },
      { key: "transfer", label: "🔄 Kasa Virman", path: "/cash/transfer" },
      { key: "voucher-list", label: "📑 Kasa Fiş Listesi", path: "/cash/vouchers" },
      { key: "movement-list", label: "📘 Kasa Hareket Listesi", path: "/cash/movements" },
      { key: "balance-list", label: "📊 Kasa Bakiye Listesi", path: "/cash/balances" },
    ],

    invoice: [
      { key: "purchase", label: "📗 Alış (Fatura-Fiş)", path: "/invoice/purchase" },
      { key: "sales", label: "📘 Satış (Fatura-Fiş)", path: "/invoice/sales" },
      { key: "purchaseReturn", label: "📕 Alış İade (Fatura-Fiş)", path: "/invoice/purchaseReturn" },
      { key: "salesReturn", label: "📙 Satış İade (Fatura-Fiş)", path: "/invoice/salesReturn" },
      { key: "invoice-list", label: "📑 Fatura-Fiş Listesi", path: "/invoice/list" },
      { key: "invoice-line-list", label: "📋 Fatura-Fiş Satır Listesi", path: "/invoice/lines" },
    ],

    card: [
      { key: "card-settings", label: "⚙️ Kart Ayarları", path: "/settings/card" },
      { key: "guest-policy", label: "👥 Misafir Limitleri", path: "/settings/guests" },
      { key: "card-types", label: "💳 Kart Tipleri", path: "/settings/card-types" },
    ],

    softplay: [
      { key: "durations", label: "⏱ Süre Tarifeleri", path: "/settings/durations" },
      { key: "families", label: "👨‍👩‍👧 Aile Yönetimi", path: "/settings/families" },
      { key: "rules", label: "📜 Oyun Alanı Kuralları", path: "/settings/rules" },
    ],

    system: [
      { key: "users", label: "👤 Kullanıcılar", path: "/settings/users" },
      { key: "settings", label: "⚙️ Genel Ayarlar", path: "/settings/general" },
      { key: "about", label: "ℹ️ Sistem Bilgisi", path: "/settings/about" },
    ],
  };

  const sections = [
    { key: "sales", title: "🧾 Satış İşlemleri" },
    { key: "cari", title: "💼 Cari İşlemleri" },
    { key: "dispatch", title: "📑 İrsaliye İşlemleri" },
    { key: "pos", title: "🧮 POS & Envanter" },
    { key: "cash", title: "🏦 Kasa İşlemleri" },
    { key: "invoice", title: "🧾 Fatura-Fiş İşlemleri" },
    { key: "card", title: "💳 Kart Yönetimi" },
    { key: "softplay", title: "🧸 Softplay Alanı" },
    { key: "system", title: "⚙️ Sistem Ayarları" },
  ];

  const handleSelect = (path) => {
    if (path !== "#") {
      navigate(path);
      onClose?.();
    } else {
      alert("💡 Bu özellik modal olarak açılacak (yakında).");
    }
  };

  return (
    <>
      <div className={`sidebar-overlay ${open ? "show" : ""}`} onClick={onClose} />

      <aside className={`sidebar ${open ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
        <h3 className="sidebar-title">Ayarlar & Yönetim</h3>

        <div className="sidebar-scroll">
          {sections.map((section) => (
            <div
              key={section.key}
              className={`sidebar-section ${activeSection === section.key ? "active" : ""}`}
            >
              <button className="section-toggle" onClick={() => toggleSection(section.key)}>
                {section.title}
                <span className="arrow">{activeSection === section.key ? "▲" : "▼"}</span>
              </button>

              <div className={`submenu ${activeSection === section.key ? "show" : ""}`}>
                {menuMap[section.key].map((item) => (
                  <button
                    key={item.key}
                    className="side-btn"
                    onClick={() => handleSelect(item.path)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;