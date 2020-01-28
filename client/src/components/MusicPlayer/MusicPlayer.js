import React, { Component } from "react";
import vol1 from "../MusicPlayer/images/vol1.png";
import vol2 from "../MusicPlayer/images/vol2.png";
import "./MusicPlayer.css"


// Music goes in PUBLIC folder
var fileResource = 'relaxed.mp3';
var bgMusic = new Audio(fileResource);

bgMusic.volume = 1;
bgMusic.loop = true;


//EVERYTHING IN STATE AND FUNCTIONS TO APP.JS
class MusicP2 extends Component {


    render() {
        return (
            <section>
                <img className="playerButtons" id="playMaster" onClick={this.props.toggleButton} src={this.props.buttonImg} alt={this.props.buttonType} />
                <img className="playerButtons" onClick={this.props.vold} src={vol2} alt='vol-down' />
                <img className="playerButtons" onClick={this.props.volu} src={vol1} alt='vol-up' />
            </section>
        )
    }

}
export default MusicP2;