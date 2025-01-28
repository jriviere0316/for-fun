// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/About">About</Link>
        </li>
        <li>
          <Link to="/info">Info</Link>
        </li>
      </ul>
    </nav>
  );
}

export default About;
