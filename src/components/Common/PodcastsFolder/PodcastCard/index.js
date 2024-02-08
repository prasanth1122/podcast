import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { collection, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../../../../firebase";
export default function PodcastCard({ id, title, displayImage }) {
  return (
    <Link to={`/podcast/${id}`}>
      <div className="podcast-card">
        <img className="displayimg-podcast" src={displayImage} />
        <p className="title-podcast">Title: {title}</p>
      </div>
    </Link>
  );
}
