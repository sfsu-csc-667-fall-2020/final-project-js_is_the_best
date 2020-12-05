import React from "react";
import "../../App.css";

const Footer = () => {
  return (
    <div
      style={{
        padding: 20,
        backgroundColor: "#1d1d1d",
        color: "#ffffff",
        position: "fixed",
        bottom: 0,
        width: "100%"
      }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        &copy; JS is the Best
      </div>
    </div>
  );
};

export default Footer;
