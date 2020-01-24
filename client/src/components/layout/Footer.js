import React from "react";
import "./layout.css"
import MusicPlayer from "../MusicPlayer/MusicPlayer"


const Footer = () => (

<>
<footer class="footer">
    <div class="container">
        <div class="player">
        <MusicPlayer />
        </div>
        <span class="text-muted">@ Copyright.</span>
    </div>
</footer>
</>
);

export default Footer;

