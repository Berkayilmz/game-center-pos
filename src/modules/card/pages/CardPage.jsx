import React from "react";
import "./CardPage.css";
import CardInfoPanel from "../components/CardInfoPanel/CardInfoPanel";
import NumericPad from "../components/NumericPad/NumericPad";
import CardActionsPanel from "../components/CardActionsPanel/CardActionsPanel";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCardById,
  clearActiveCard,
  setPendingAmount,
  addBalance,
} from "../../../redux/slices/cardSlice";

const CardPage = () => {
  const dispatch = useDispatch();
  const { activeCard, loading, pendingAmount } = useSelector((s) => s.card);

  const handleScanCard = () => {
    const id = prompt("Kart ID girin (örnek: FACR-1001)");
    if (id) dispatch(fetchCardById(id));
  };

  const handleReset = () => dispatch(clearActiveCard());
  const handleTopUp = () => dispatch(addBalance());

  return (
    <div className="card-page">
      <CardInfoPanel card={activeCard} loading={loading} />
      <NumericPad onChange={(val) => dispatch(setPendingAmount(val))} />
      <CardActionsPanel
        onScan={handleScanCard}
        onReset={handleReset}
        onTopUp={handleTopUp}
        disabled={!activeCard || pendingAmount <= 0}
      />
    </div>
  );
};

export default CardPage;