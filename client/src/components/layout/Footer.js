import React from "react";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import "./layout.css";
import MusicP2 from "../MusicPlayer/MusicP2";
import MatchIt from "../MatchIt/MatchIt";
import Weather from "../Weather/Weather";
const Footer = () => (

<>
<div className="row">
<div className="col s12"></div>
  <div className="card-body">
      <MusicP2 />
      <Weather />
  </div>
  </div>
</>
);

export default Footer;

