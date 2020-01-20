import React from "react";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import "./layout.css"
import MusicP2 from "../MusicPlayer/MusicP2"
import MatchIt from "../MatchIt/MatchIt"

const Footer = () => (

<>
<div className="row">
<div className="col s12"></div>
  <div className="card-body">
      <MusicPlayer />
      <MusicP2 />
      <MatchIt />
  </div>
  </div>
</>
);

export default Footer;

