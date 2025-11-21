import React from "react";
import "./Container.css";

const Container = ({ children, maxWidth = "1200px", padding = "20px" }) => {
  return (
    <div className="container" style={{ maxWidth, padding }}>
      {children}
    </div>
  );
};

export default Container;