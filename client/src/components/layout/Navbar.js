import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from './logofinal.png';
import home from './home.png';
import "./layout.css";



class Navbar extends Component {
  render() {
    
    return (
      <div className="navbar-fixed">
      <div className="row">
      <nav className="z-depth-3">
        <div className="nav-wrapper">
        <Link
            to="/"
            > 
          <div className="logoMaster">  
            <span className="tag">Moneta
            <img className="logo" src={logo} alt="Logo" />
            </span>
            <span className="tagline">
              Memory and mindfulness. 
            </span>
            </div>
        </Link>
        </div>

      </nav>
      </div>
    </div>
    );
  }
}
export default Navbar;
