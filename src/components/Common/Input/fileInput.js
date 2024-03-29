import React, { useState } from "react";
import "./styles.css";
export default function FileInput({ accept, id, fileHandleFnc, text }) {
  const [fileSelected, setFileSelected] = useState("");
  const onChange = (e) => {
    console.log(e.target.files);
    setFileSelected(e.target.files[0].name);
    fileHandleFnc(e.target.files[0]);
  };
  return (
    <>
      <label
        className={`custom-input ${!fileSelected ? "label-input" : "active"}`}
        htmlFor={id}
      >
        {fileSelected ? `File ${fileSelected} was selected` : text}
      </label>
      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </>
  );
}
