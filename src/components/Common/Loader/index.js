import React from "react";
import "./styles.css";
export default function Loader() {
  return (
    <div className="wrapper">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
