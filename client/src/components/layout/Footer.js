import React from "react";
import "./layout.css"
import MusicPlayer from "../MusicPlayer/MusicPlayer"
import home from './home.png';
import { Link } from "react-router-dom";


const Footer = ({file}) => (

<>
<footer className="footer">
    <div className="container">
        <div className="player">
        <MusicPlayer file={file} />
        </div>
        <Link
            to="/"
            > 
            <img className="home" content="width=device-width, initial-scale=1.0" src={home} alt="Home" />

            </Link>
    </div>
</footer>
</>
);

export default Footer;

