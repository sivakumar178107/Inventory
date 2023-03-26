import React from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import './Navbar.css';
import { Link } from 'react-router-dom';
function Navbar() {
    
  return (
    <React.Fragment>
    <nav>
      <h2>Inventory Managment Tool</h2>
      <ul className="nav-links">
        <li className="nav-link"><Link to="/">Home</Link></li>
        <li className="nav-link"><Link to="/About">About</Link></li>
        <li className="nav-link"><Link to='/inventory'>Inventory</Link></li>
        <li className="nav-link live-scores"><Link to="/Cricket_Score">Live Cricket Scores</Link></li>
      </ul>
      <div className="tab-content">
        hi
      </div>
    </nav>
    </React.Fragment>
  );
}

export default Navbar;
