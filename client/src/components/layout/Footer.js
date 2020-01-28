import React from "react";
import "./layout.css"
import MusicPlayer from "../MusicPlayer/MusicPlayer"
import home from './home.png';
import { Link } from "react-router-dom";


const Footer = (props) => (

<>
<footer className="footer">
    <div className="container">
        <div className="player">
        <MusicPlayer changeSong={props.changeSong} volu={props.volu} vold={props.vold} toggleButton={props.toggleButton} buttonImg={props.buttonImg} buttonType={props.buttonType} />
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

