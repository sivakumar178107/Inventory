import React from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
function Navbar() {
    
  return (
    <React.Fragment>
    <nav>
      <h2>Inventory Managment Tool</h2>
      <ul className="nav-links">
        
        <li className="nav-link"><Link to="/About">About</Link></li>
        <li className="nav-link"><Link to='/inventory'>Inventory</Link></li>
        <li className="nav-link live-scores"><Link to="/Cricket_Score">Live Score</Link></li>
       {localStorage.getItem("isAuthenticated")=='true'?<li>
       <Link to="/user"><FontAwesomeIcon icon={faUser}/></Link>
       </li> :<li className="nav-link"><Link to="/login">Login</Link></li>}
      </ul>
      <div className="tab-content">
        hi
      </div>
    </nav>
    </React.Fragment>
  );
}

export default Navbar;
