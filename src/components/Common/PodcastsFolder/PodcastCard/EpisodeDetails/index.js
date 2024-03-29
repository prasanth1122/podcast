import React from "react";
import "./styles.css";
import Button from "../../../Button";
export default function EpisodeDetails({
  title,
  description,
  audioFile,
  onClick,
  index,
}) {
  return (
    <div style={{ width: "100%" }}>
      <h1 style={{ textAlign: "left", marginBottom: "0" }}>
        {index}. {title}
      </h1>
      <p style={{ marginLeft: "1.5rem" }} className="podcast-desc">
        {description}
      </p>
      <Button
        text={"play"}
        onClick={() => onClick(audioFile)}
        style={{ width: "100px" }}
      />
    </div>
  );
}
