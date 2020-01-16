import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./layout.css"


class Navbar extends Component {
  render() {
    
    return (
      
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper blue">

            <Link
              to="/"
              style={{
                fontFamily: "Lucida Sans Typewriter"
              }}
              // className="col s5 brand-logo black-text"
            >
        <img
        id="logo"
        src={require('./logo.png')}
        width="100"
        height="100"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
        href="/"
      />
            </Link>
          </div>
        </nav>
      </div>
      
    );
  }
}
export default Navbar;