import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChild, setChildOutside } from "../../../../redux/slices/sofplaySlice";
import { deductBalance } from "../../../../redux/slices/cardSlice"; // 🔄 Güncel fonksiyon
import "./ChildCard.css";

const colorPalette = [
  "#f94144", "#f3722c", "#f9c74f", "#90be6d",
  "#43aa8b", "#577590", "#277da1", "#b5179e",
  "#7209b7", "#480ca8",
];

const ChildCard = ({ child, active, onSelect }) => {
  const dispatch = useDispatch();
  const { activeCard } = useSelector((s) => s.card);
  const { durations, children } = useSelector((s) => s.softplay);

  const [showMenu, setShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

  // 🎨 Aile etiketi
  const familyColor = colorPalette[(child.familyId - 1) % colorPalette.length];
  const familyLabel = `A${child.familyId}`;

  // 🔍 Sadece softplay içinde olan kardeş sayısı
  const insideChildren = children.filter((c) => c.isSoftplay);
  const sameFamilyInsideCount = insideChildren.filter(
    (c) => c.familyId === child.familyId
  ).length;

  const showFamilyTag = sameFamilyInsideCount > 1;

  // 🔹 Sağ tık menüsü
  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowMenu(true);
    setMenuPos({ x: e.pageX, y: e.pageY });
  };

  useEffect(() => {
    const close = () => setShowMenu(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  // ➕ 30 DK EKLE
  const handleAddExtraTime = () => {
    const extra = durations.find((d) => d.value === 30);
    if (!extra) return alert("30 dk bulunamadı.");
    if (!activeCard) return alert("Kart okutulmadı!");

    // 💰 Önce toplam bakiyeyi hesapla (misafir + normal)
    const totalAvailable =
      (activeCard.guestBalance || 0) + (activeCard.balance || 0);
    if (totalAvailable < extra.price)
      return alert(`Yetersiz bakiye! (${extra.price}₺ gerekiyor, mevcut ${totalAvailable.toFixed(2)}₺)`);

    // 💳 Ortak düşüm fonksiyonunu çağır
    dispatch(deductBalance({ amount: extra.price }));

    // ⏱️ Çocuğun süresini uzat
    dispatch(
      updateChild({
        id: child.id,
        updates: { duration: child.duration + 30 * 60 },
      })
    );

    alert(`${child.name} için +30 dk eklendi 🎟️`);
    setShowMenu(false);
  };

  // 🚻 WC MOLASI
  const handleFreeze = () => {
    if (child.isFrozen) return alert("Zaten mola aktif!");

    dispatch(
      updateChild({ id: child.id, updates: { isFrozen: true, freezeStart: Date.now() } })
    );
    alert(`${child.name} için WC molası başladı ⏸️`);

    setTimeout(() => {
      dispatch(
        updateChild({
          id: child.id,
          updates: {
            isFrozen: false,
            totalFrozenTime: (child.totalFrozenTime || 0) + (Date.now() - child.freezeStart),
            freezeStart: null,
          },
        })
      );
      alert(`${child.name} için mola bitti ⏱️`);
    }, 5 * 60 * 1000);

    setShowMenu(false);
  };

  // 🧸 Dışarı al
  const handleExit = () => {
    if (window.confirm(`${child.name} dışarı alınsın mı?`)) {
      dispatch(setChildOutside(child.id));
      alert(`${child.name} dışarı alındı 🧸`);
      setShowMenu(false);
    }
  };

  const timeClass =
    child.remainingMinutes < 0
      ? "overtime"
      : child.remainingMinutes <= 5
      ? "warning"
      : "";

  return (
    <>
      <div
        className={`child-card ${active ? "active" : ""}`}
        onClick={onSelect}
        onContextMenu={handleContextMenu}
      >
        {showFamilyTag && (
          <div
            className="family-tag"
            style={{ backgroundColor: familyColor }}
            title={`Aile ${familyLabel}\nVeli: ${child.parent}\nBu aileden içeride ${sameFamilyInsideCount} çocuk var`}
          >
            {familyLabel}
          </div>
        )}

        {child.isFrozen && (
          <div className="wc-icon" title="WC Molasında">
            🚻
          </div>
        )}

        <div className={`child-circle ${timeClass}`}>
          <div className="progress">
            {child.remainingMinutes >= 0 ? "KALAN SÜRE" : "GEÇEN SÜRE"}
            <br />
            <strong>
              {child.remainingMinutes >= 0
                ? `${child.remainingMinutes} dk`
                : `-${Math.abs(child.remainingMinutes)} dk`}
            </strong>
          </div>
        </div>

        <div className="child-info">
          <h4>{child.name}</h4>
          <span>{child.parent}</span>
        </div>
      </div>

      {showMenu && (
        <div className="context-menu" style={{ top: menuPos.y, left: menuPos.x }}>
          <div className="menu-item" onClick={handleAddExtraTime}>
            ➕ 30 Dakika Ekle
          </div>
          <div className="menu-item" onClick={handleFreeze}>
            🚻 WC Molası (5 dk)
          </div>
          <div className="menu-separator" />
          <div className="menu-item exit" onClick={handleExit}>
            🧸 Dışarı Al
          </div>
          <div className="menu-item cancel" onClick={() => setShowMenu(false)}>
            ❌ Kapat
          </div>
        </div>
      )}
    </>
  );
};

export default ChildCard;