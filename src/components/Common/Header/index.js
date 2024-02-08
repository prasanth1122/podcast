import React from "react";
import "./styles.css";
import { Link, useLocation } from "react-router-dom";
export default function Header() {
  const location = useLocation();
  let currentPath = location.pathname;
  console.log(currentPath);
  return (
    <div className="nav-bar">
      <div className="gradient"></div>
      <div className="links">
        <Link to="/" className={currentPath == "/" ? "active" : ""}>
          SignUp
        </Link>
        <Link
          to="/podcasts"
          className={currentPath == "/podcasts" ? "active" : ""}
        >
          Podcasts
        </Link>
        <Link
          to="/create-a-podcast"
          className={currentPath == "/create-a-podcast" ? "active" : ""}
        >
          Start A Podcast
        </Link>
        <Link
          to="/profile"
          className={currentPath == "/profile" ? "active" : ""}
        >
          Profile
        </Link>
      </div>
    </div>
  );
}
