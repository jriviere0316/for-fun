// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; 
import Home from './Home';
import ToDo from './ToDo';
import Calculator from './Calculator';
import Journal from './Journal';
import './App.css';


function App() {
  return (
    <Router>
      {/* Render the Navbar on all pages */}
      <Navbar />

      {/* Define routes for different pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ToDo" element={<ToDo />} />
        <Route path="/Calculator" element={<Calculator />} />
        <Route path="/Journal" element={<Journal />} />



        
      </Routes>
    </Router>
  );
}

export default App;
