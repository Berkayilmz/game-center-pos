// src/core/utils/GlobalBarcodeListener.jsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import productService from "../services/productService";

const BarcodeListener = () => {
  const dispatch = useDispatch();
  const [buffer, setBuffer] = useState("");
  const [lastKeyTime, setLastKeyTime] = useState(0);

  useEffect(() => {
    const handleKeyDown = async (e) => {
      const now = Date.now();

      // 100ms'den uzun ara varsa buffer sıfırla (yeni barkod başlıyor)
      if (now - lastKeyTime > 100) setBuffer("");

      // Enter geldiyse barkodu işle
      if (e.key === "Enter") {
        const barcode = buffer.trim();
        if (barcode.length >= 5) {
          const product = await productService.getByBarcode(barcode);
          if (product) {
            dispatch(addToCart(product));
            new Audio("/sounds/beep.mp3").play().catch(() => {});
          } else {
            console.warn("Barkod bulunamadı:", barcode);
          }
        }
        setBuffer("");
      } 
      else if (/^[0-9]$/.test(e.key)) {
        // Rakam girdiyse buffera ekle
        setBuffer((prev) => prev + e.key);
      }

      setLastKeyTime(now);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch, buffer, lastKeyTime]);

  return null;
};

export default BarcodeListener;