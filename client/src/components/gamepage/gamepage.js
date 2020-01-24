import React, { Component } from "react";
import "./gamepage.css";
import MatchIt from '../MatchIt/MatchIt';

class GamePage extends Component {
 

  render() {
    
    return (
  
      <div style={{ height: "75vh" }} id="background" className="container">
        <div className="row">
          <MatchIt />
        </div>
        </div>
    );
  }
}
export default GamePage;


