import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./layout.css"


class Navbar extends Component {
  render() {
    
    return (
      
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper">
            <Link
              to="/"
              style={{
                fontFamily: "Lucida Sans Typewriter"
              }}
              // className="col s5 brand-logo black-text"
            > 
            Moneta
            </Link>
          </div>
        </nav>
      </div>
      
    );
  }
}
export default Navbar;
