import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from './logofinal.png';
import "./layout.css"



class Navbar extends Component {
  render() {
    
    return (
      <div className="navbar-fixed">
      <nav className="z-depth-3">
        <div className="nav-wrapper">
            <span className="tag">Moneta
            <img className="logo" src={logo} alt="Logo" />
            </span>
            <span className="tagline">
              Memory and mindfulness. 
            <Link
            to="/"
            > 
            Home
            </Link>
            </span>
        </div>
      </nav>
    </div>
    );
  }
}
export default Navbar;
