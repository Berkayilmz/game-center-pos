// src/features/softplay/components/EntryPanel/EntryPanel.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FamilyColumn from "./FamilyColumn";
import ChildrenColumn from "./ChildrenColumn";
import DurationColumn from "./DurationColumn";
import CalculationColumn from "./CalculationColumn";
import { setChildInside } from "../../../../redux/slices/sofplaySlice";
import { deductBalance } from "../../../../redux/slices/cardSlice";
import "./EntryPanel.css";

const EntryPanel = ({ selectedChild, setSelectedChild }) => {
  const dispatch = useDispatch();
  const [selectedDuration, setSelectedDuration] = useState(null);

  // 💳 Aktif kart
  const { activeCard } = useSelector((state) => state.card);
  // 🕓 Süre listesi Redux’tan
  const { durations } = useSelector((state) => state.softplay);

  const handleEnterSoftplay = () => {
    // 🧩 Gerekli alan kontrolleri
    if (!selectedChild) return alert("Lütfen bir çocuk seçin 👶");
    if (!selectedDuration) return alert("Lütfen bir süre seçin ⏱️");
    if (!activeCard) return alert("Kart okutulmadı! 💳");

    // 📦 Süre objesini Redux’taki durations listesinden bul
    const durationObj = durations.find((d) => d.value === selectedDuration);
    if (!durationObj) return alert("Süre bilgisi bulunamadı!");

    const { price, value } = durationObj;

    // 💰 Bakiye kontrolü
    if (activeCard.balance < price) {
      alert(`Yetersiz bakiye! (${price}₺ gerekiyor, mevcut ${activeCard.balance}₺)`);
      return;
    }

    // 💳 Karttan ücreti düş
    dispatch(deductBalance({ amount: price }));

    // 🕓 Süreyi saniyeye çevirerek kaydet (örn. 30 dk → 1800 sn)
    const durationInSeconds = value * 60;

    // 🧸 Çocuğu içeri al
    dispatch(setChildInside({ id: selectedChild.id, duration: durationInSeconds }));

    alert(`${selectedChild.name} içeri alındı ve karttan ${price}₺ düşüldü 🎟️`);

    // 🔁 Seçimleri sıfırla
    setSelectedChild(null);
    setSelectedDuration(null);
  };

  return (
    <div className="entry-panel">
      {/* ÜST: Aile + Çocuklar */}
      <div className="entry-row top-row">
        <div className="half-column">
          <FamilyColumn />
        </div>
        <div className="half-column">
          <ChildrenColumn
            selectedChild={selectedChild}
            setSelectedChild={setSelectedChild}
          />
        </div>
      </div>

      {/* ORTA: Süre + Hesaplama */}
      <div className="entry-row middle-row">
        <div className="half-column">
          <DurationColumn
            selectedDuration={selectedDuration}
            setSelectedDuration={setSelectedDuration}
          />
        </div>
        <div className="half-column">
          <CalculationColumn />
        </div>
      </div>

      {/* ALT: İçeri Al Butonu */}
      <div className="entry-bottom">
        <button className="submit-btn" onClick={handleEnterSoftplay}>
          🧸 İÇERİ AL
        </button>
      </div>
    </div>
  );
};

export default EntryPanel;