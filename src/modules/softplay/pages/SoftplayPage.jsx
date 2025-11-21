import React, { useEffect, useState } from "react";
import "./SoftplayPage.css";
import ChildCard from "../components/ChildCard/ChildCard";
import RightPanel from "../components/RightPanel/RightPanel";
import { useDispatch, useSelector } from "react-redux";
import { fetchSoftplayData } from "../../../redux/slices/sofplaySlice";

const SoftplayPage = () => {
  const dispatch = useDispatch();
  const { children } = useSelector((state) => state.softplay);
  const [selectedChild, setSelectedChild] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // 📥 Verileri yükle
  useEffect(() => {
    dispatch(fetchSoftplayData());
  }, [dispatch]);

  // 🔹 İçerideki çocuklar
  const insideChildren = children.filter((c) => c.isSoftplay);

  // 🔁 Her dakika bir kez güncelle (gereksiz CPU yükü olmadan)
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 60000); // 1 dakikada bir tetiklenir
    return () => clearInterval(interval);
  }, []);

  // ⏱️ Süre hesaplama (mola sürelerini hariç tut)
  const childrenWithTime = insideChildren.map((child) => {
    const totalFrozen = child.totalFrozenTime || 0; // toplam donmuş süre (ms)
    let elapsed;

    if (child.isFrozen && child.freezeStart) {
      // hâlâ moladaysa, o ana kadar olan süreden freezeStart'ı çıkar
      elapsed = child.freezeStart - child.entryTime - totalFrozen;
    } else {
      // normal durumda geçen süre
      elapsed = Date.now() - child.entryTime - totalFrozen;
    }

    const remainingMinutes = Math.floor((child.duration * 1000 - elapsed) / 60000);
    return { ...child, remainingMinutes };
  });

  // 📄 Sayfalama
  const totalPages = Math.ceil(childrenWithTime.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const visibleChildren = childrenWithTime.slice(start, start + itemsPerPage);

  return (
    <div className="softplay-page">
      <div className="softplay-content">
        {/* SOL: İçerideki çocuklar */}
        <div className="left-section">
          <div className="child-grid">
            {visibleChildren.length === 0 ? (
              <p className="empty-msg">🧸 Şu anda içeride çocuk yok</p>
            ) : (
              visibleChildren.map((child) => (
                <ChildCard
                  key={child.id}
                  child={child}
                  active={selectedChild?.id === child.id}
                  onSelect={() => setSelectedChild(child)}
                />
              ))
            )}
          </div>

          {/* Sayfa Kontrol */}
          {totalPages > 1 && (
            <div className="pagination">
              <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
                ⬅️ Geri
              </button>
              <span>
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              >
                İleri ➡️
              </button>
            </div>
          )}
        </div>

        {/* SAĞ: sekmeli panel */}
        <div className="right-section">
          <RightPanel
            selectedChild={selectedChild}
            setSelectedChild={setSelectedChild}
          />
        </div>
      </div>
    </div>
  );
};

export default SoftplayPage;