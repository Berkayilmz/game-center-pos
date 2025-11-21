import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// 🎨 Temalar
import "./core/theme/colors.css";
import "./core/theme/base.css";

// 🧱 Layout
import MainLayout from "./core/layout/MainLayout/MainLayout";
import CardContainer from "./core/components/CardContainer/CardContainer";

// 🔹 Ana Modül Sayfaları
import CardPage from "./modules/card/pages/CardPage";
import SoftplayPage from "./modules/softplay/pages/SoftplayPage";
import PosPage from "./modules/pos/pages/PosPage";

// ⚙️ POS Ayarları
import ProductsPage from "./modules/pos/pages/Settings/ProductsPage/ProductsPage";
import CategoriesPage from "./modules/pos/pages/Settings/CategoriesPage/CategoriesPage";
import VatSettingsPage from "./modules/pos/pages/Settings/VatSettingsPage/VatSettingsPage";
import EndOfDayPage from "./modules/pos/pages/Settings/EndOfDayPage/EndOfDayPage";

// 💳 Kart Ayarları
import CardSettingsPage from "./modules/card/pages/Settings/CardSettingsPage/CardSettingsPage";
import CardTypesPage from "./modules/card/pages/Settings/CardTypesPage/CardTypesPage";
import GuestPolicyPage from "./modules/card/pages/Settings/GuestPolicyPage/GuestPolicyPage";

// 🧸 Softplay Ayarları
import DurationSettingsPage from "./modules/softplay/pages/Settings/DurationSettingsPage/DurationSettingsPage";
import FamiliesPage from "./modules/softplay/pages/Settings/FamiliesPage/FamiliesPage";
import RulesPage from "./modules/softplay/pages/Settings/RulesPage/RulesPage";



const App = () => {
  return (
    <Router>
      <MainLayout>
        <CardContainer>
          <Routes>
            {/* 🌟 Varsayılan yönlendirme */}
            <Route path="/" element={<Navigate to="/pos" />} />

            {/* 🧩 Ana Modül Sayfaları */}
            <Route path="/pos" element={<PosPage />} />
            <Route path="/card" element={<CardPage />} />
            <Route path="/softplay" element={<SoftplayPage />} />

            {/* ⚙️ POS Ayarları */}
            <Route path="/settings/products" element={<ProductsPage />} />
            <Route path="/settings/categories" element={<CategoriesPage />} />
            <Route path="/settings/vat" element={<VatSettingsPage />} />
            <Route path="/settings/endofday" element={<EndOfDayPage />} />

            {/* 💳 Kart Ayarları */}
            <Route path="/settings/card" element={<CardSettingsPage />} />
            <Route path="/settings/card-types" element={<CardTypesPage />} />
            <Route path="/settings/guests" element={<GuestPolicyPage />} />

            {/* 🧸 Softplay Ayarları */}
            <Route path="/settings/durations" element={<DurationSettingsPage />} />
            <Route path="/settings/families" element={<FamiliesPage />} />
            <Route path="/settings/rules" element={<RulesPage />} />



            {/* 🚫 404 */}
            <Route path="*" element={<div>Sayfa bulunamadı</div>} />
          </Routes>
        </CardContainer>
      </MainLayout>
    </Router>
  );
};

export default App;