// core/components/icons/CalculatorIcon.jsx

import React from "react";

const CalculatorIcon = ({ size = 20, stroke = "currentColor" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Dış çerçeve */}
      <rect x="5" y="3" width="14" height="18" rx="2" />

      {/* Üst display alanı */}
      <rect x="7" y="5.5" width="10" height="3.5" rx="0.7" />

      {/* Tuşlar – 3x3 grid + altta geniş tuş */}
      {/* 1. satır */}
      <rect x="7.2" y="10" width="3" height="3" rx="0.6" />
      <rect x="10.8" y="10" width="3" height="3" rx="0.6" />
      <rect x="14.4" y="10" width="3" height="3" rx="0.6" />

      {/* 2. satır */}
      <rect x="7.2" y="13.6" width="3" height="3" rx="0.6" />
      <rect x="10.8" y="13.6" width="3" height="3" rx="0.6" />
      <rect x="14.4" y="13.6" width="3" height="3" rx="0.6" />

      {/* 3. satır */}
      <rect x="7.2" y="17.2" width="3" height="3" rx="0.6" />
      <rect x="10.8" y="17.2" width="3" height="3" rx="0.6" />

      {/* Sağ altta uzun "=" tuşu */}
      <rect x="14.4" y="17.2" width="3" height="3" rx="0.6" />
    </svg>
  );
};

export default CalculatorIcon;