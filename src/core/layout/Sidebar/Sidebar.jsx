import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();

  // 🔹 Menü grupları
  const menuMap = {
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
    pos: [
      { key: "products", label: "📦 Ürün Yönetimi", path: "/settings/products" },
      { key: "categories", label: "🗂 Kategori Yönetimi", path: "/settings/categories" },
      { key: "vat", label: "💰 KDV Ayarları", path: "/settings/vat" },
      { key: "endofday", label: "📅 Gün Sonu Raporu", path: "/settings/endofday" },
    ],
    system: [
      { key: "users", label: "👤 Kullanıcılar", path: "/settings/users" },
      { key: "settings", label: "⚙️ Genel Ayarlar", path: "/settings/general" },
      { key: "about", label: "ℹ️ Sistem Bilgisi", path: "/settings/about" },
    ],
  };

  const sections = [
    { key: "pos", title: "🧾 POS & Envanter" },
    { key: "card", title: "💳 Kart Yönetimi" },
    { key: "softplay", title: "🧸 Softplay Alanı" },
    { key: "system", title: "⚙️ Sistem Ayarları" },
  ];

  const handleSelect = (path) => {
    navigate(path);
    onClose?.();
  };

  return (
    <>
      {/* Arka plan */}
      <div
        className={`sidebar-overlay ${open ? "show" : ""}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`sidebar left ${open ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="sidebar-title">Ayarlar & Yönetim</h3>

        <div className="sidebar-scroll">
          {sections.map((section) => (
            <div key={section.key} className="sidebar-section">
              <h4 className="section-title">{section.title}</h4>
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
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;