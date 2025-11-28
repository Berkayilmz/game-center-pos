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
import PosPage from "./modules/pos/quicksale/pages/PosPage";

// 💳 Kart Ayarları
import CardSettingsPage from "./modules/card/pages/Settings/CardSettingsPage/CardSettingsPage";
import CardTypesPage from "./modules/card/pages/Settings/CardTypesPage/CardTypesPage";
import GuestPolicyPage from "./modules/card/pages/Settings/GuestPolicyPage/GuestPolicyPage";

// 🧸 Softplay Ayarları
import DurationSettingsPage from "./modules/softplay/pages/Settings/DurationSettingsPage/DurationSettingsPage";
import FamiliesPage from "./modules/softplay/pages/Settings/FamiliesPage/FamiliesPage";
import RulesPage from "./modules/softplay/pages/Settings/RulesPage/RulesPage";

// 🧾 POS & Envanter Sayfaları
import ProductListPage from "./modules/pos/inventory/pages/ProductListPage";
import StockTransactionPage from "./modules/pos/inventory/pages/StockTransactionPage";
import StockCountPage from "./modules/pos/inventory/pages/StockCountPage";
import BarcodePrintPage from "./modules/pos/inventory/pages/BarcodePrintPage";
import QuickPriceChangePage from "./modules/pos/inventory/pages/QuickPriceChangePage";
import ProductVoucherListPage from "./modules/pos/inventory/pages/ProductVoucherListPage";

//Cari
import CariListPage from "./modules/pos/cari/pages/CariListPage";
import DebtVoucherPage from "./modules/pos/cari/pages/DebtVoucherPage";
import CreditVoucherPage from "./modules/pos/cari/pages/CreditVoucherPage";
import CollectionPage from "./modules/pos/cari/pages/CollectionPage";
import PaymentPage from "./modules/pos/cari/pages/PaymentPage"
import OpeningDebtPage from "./modules/pos/cari/pages/OpeningDebtPage";
import OpeningCreditPage from "./modules/pos/cari/pages/OpeningCreditPage";
import TransferDebtPage from "./modules/pos/cari/pages/TransferDebtPage";
import TransferCreditPage from "./modules/pos/cari/pages/TransferCreditPage";
import TransferPage from "./modules/pos/cari/pages/TransferPage";
import TransactionListPage from "./modules/pos/cari/pages/TransactionListPage";
import MovementListPage from "./modules/pos/cari/pages/MovementListPage";
import BalanceListPage from "./modules/pos/cari/pages/BalanceListPage";
import DispatchPage from "./modules/pos/dispatch/pages/DispatchPage";
import DispatchListPage from "./modules/pos/dispatch/pages/DispatchListPage";
import InvoicePage from "./modules/pos/invoice/pages/InvoicePage";
import InvoiceListPage from "./modules/pos/invoice/pages/InvoiceListPage";
import InvoiceLineListPage from "./modules/pos/invoice/pages/InvoiceLineListPage";
import CashReportPage from "./modules/report/pages/CashReportPage";

// 💵 Kasa Modülü Sayfaları
import CashDefinePage from "./modules/pos/cash/pages/CashDefinePage";
import CashCollectionPage from "./modules/pos/cash/pages/CashCollectionPage";
import CashPaymentPage from "./modules/pos/cash/pages/CashPaymentPage";
import CashOtherCollectionPage from "./modules/pos/cash/pages/CashOtherCollectionPage";
import CashOtherPaymentPage from "./modules/pos/cash/pages/CashOtherPaymentPage";
import CashTransferPage from "./modules/pos/cash/pages/CashTransferPage";
import CashVoucherListPage from "./modules/pos/cash/pages/CashVoucherListPage";
import CashMovementListPage from "./modules/pos/cash/pages/CashMovementListPage";
import CashBalanceListPage from "./modules/pos/cash/pages/CashBalanceListPage";
import CashTransferIncomePage from "./modules/pos/cash/pages/CashTransferIncomePage";
import CashTransferExpensePage from "./modules/pos/cash/pages/CashTransferExpensePage";
import CashOpeningIncomePage from "./modules/pos/cash/pages/CashOpeningIncomePage";
import CashOpeningExpensePage from "./modules/pos/cash/pages/CashOpeningExpensePage";

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
            <Route path="/reports" element={<CashReportPage/>}/>

            {/* 💳 Kart Ayarları */}
            <Route path="/settings/card" element={<CardSettingsPage />} />
            <Route path="/settings/card-types" element={<CardTypesPage />} />
            <Route path="/settings/guests" element={<GuestPolicyPage />} />

            {/* 🧸 Softplay Ayarları */}
            <Route path="/settings/durations" element={<DurationSettingsPage />} />
            <Route path="/settings/families" element={<FamiliesPage />} />
            <Route path="/settings/rules" element={<RulesPage />} />

            {/* 🧾 POS & Envanter */}
            <Route path="/inventory/products" element={<ProductListPage />} />
            <Route path="/inventory/transactions" element={<StockTransactionPage />} />
            <Route path="/inventory/stock-count" element={<StockCountPage />} />
            <Route path="/inventory/barcode-print" element={<BarcodePrintPage />} />
            <Route path="/inventory/quick-price" element={<QuickPriceChangePage />} />
            <Route path="/inventory/product-vouchers" element={<ProductVoucherListPage />} />

             {/* 💵 KASA MODÜLÜ */}
             <Route path="/cash/define" element={<CashDefinePage />} />
            <Route path="/cash/from-customer" element={<CashCollectionPage />} />
            <Route path="/cash/to-customer" element={<CashPaymentPage />} />
            <Route path="/cash/other-collection" element={<CashOtherCollectionPage />} />
            <Route path="/cash/period-income" element={<CashTransferIncomePage />} />
            <Route path="/cash/other-payment" element={<CashOtherPaymentPage />} />
            <Route path="/cash/transfer" element={<CashTransferPage />} />
            <Route path="/cash/opening-income" element={<CashOpeningIncomePage />} />
            <Route path="/cash/opening-expense" element={<CashOpeningExpensePage />} />
            <Route path="/cash/period-expense" element={<CashTransferExpensePage />} />
            <Route path="/cash/vouchers" element={<CashVoucherListPage />} />
            <Route path="/cash/movements" element={<CashMovementListPage />} />
            <Route path="/cash/balances" element={<CashBalanceListPage />} />

            {/* CARİ */}
            <Route path="/cari/list" element={<CariListPage />} />
            <Route path="/cari/debt-vouchers" element={<DebtVoucherPage />} />
            <Route path="/cari/credit-vouchers" element={<CreditVoucherPage />} />
            <Route path="/cari/collections" element={<CollectionPage />} />
            <Route path="/cari/payments" element={<PaymentPage />} />
            <Route path="/cari/opening-debt" element={<OpeningDebtPage />} />
            <Route path="/cari/opening-credit" element={<OpeningCreditPage />} />
            <Route path="/cari/transfer-debt" element={<TransferDebtPage />} />
            <Route path="/cari/transfer-credit" element={<TransferCreditPage />} />
            <Route path="/cari/transfer" element={<TransferPage />} />
            <Route path="/cari/transactions" element={<TransactionListPage />} />
            <Route path="/cari/movements" element={<MovementListPage />} />
            <Route path="/cari/balances" element={<BalanceListPage />} />

            {/* İRSALİYE */}
            <Route path="/dispatch/:type" element={<DispatchPage />} />
            <Route path="/dispatch/list" element={<DispatchListPage />} />

            {/* FATURA-FİŞ */}
            <Route path="/invoice/:type" element={<InvoicePage />} />
            <Route path="/invoice/list" element={<InvoiceListPage />} />
            <Route path="/invoice/lines" element={<InvoiceLineListPage />} />

            {/* 🚫 404 */}
            <Route path="*" element={<div>Sayfa bulunamadı</div>} />
          </Routes>
        </CardContainer>
      </MainLayout>
    </Router>
  );
};

export default App;