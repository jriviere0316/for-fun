import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Ensure this is correctly imported

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/ToDo">To Do</Link>
        </li>
        <li>
          <Link to="/Calculator">Calculator</Link>
        </li>
        <li>
          <Link to="/Journal">Journal</Link>
        </li>
        <li>
          <Link to="/ChatWrapper">Chat Wrapper</Link>
        </li>
        <li>
          <Link to="/StoryGenerator">Story Generator</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
