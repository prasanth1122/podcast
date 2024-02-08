import React from "react";
import "./styles.css";
export default function Button({ text, onClick, disabled, style }) {
  return (
    <div
      className="custom-btn"
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {text}
    </div>
  );
}
