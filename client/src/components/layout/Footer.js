import React from "react";
import "./layout.css"
import MusicPlayer from "../MusicPlayer/MusicPlayer"


const Footer = ({file}) => (

<>
<footer className="footer">
    <div className="container">
        <div className="player">
        <MusicPlayer file={file} />
        </div>
        <span className="text-muted">@ Copyright.</span>
    </div>
</footer>
</>
);

export default Footer;

