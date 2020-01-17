import React from "react";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import MusicP2 from "../MusicPlayer/MusicP2";


const Footer = () => (
<>
  <div className="card-body">
      <MusicPlayer />
      <p>MUSIC PLAYER HERE</p>
  </div>
  <div className= "card-body"> <MusicP2 /> </div>
</>
);

export default Footer;

