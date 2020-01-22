import React, { Component } from "react";
import play from "../MusicPlayer/images/play.png"
import pause from "../MusicPlayer/images/pause.png"
// Music goes in PUBLIC folder


//var bgmusic = document.getElementsByName("Audio");
var audio = new Audio('7empest.mp3'); 

var butn = document.getElementById("demo");
/*butn.style.background = `url(${play}) no-repeat`;
function Play() {
    if(audio.paused) {
        audio.play();
        butn.style.background = `url(${play}) no-repeat`;
    }
    else {
        audio.pause();
        butn.style.background = `url(${pause}) no-repeat`;
    }}




*/
var bgMusic = new Audio('7empest.mp3'); 
bgMusic.volume = 1;
bgMusic.loop = true;
function startMusic() {
    bgMusic.play();
}
function stopMusic() {
    bgMusic.pause();
    //bgMusic.currentTime = 0;
}
function vol(chg) {
    if ( (chg ==='1') & (bgMusic.volume < .9) ) {
        bgMusic.volume = bgMusic.volume + .05
        console.log(bgMusic.volume)
    }
    if (chg === '0') {
        bgMusic.volume = bgMusic.volume - .05
        console.log(bgMusic.volume)
    }
}
function status() {
    var x = bgMusic.currentTime
    return x
}
class MusicP2 extends Component {  
    state = {
        buttonType: 'play',
        buttonImg: play
    } 
    

    toggleButton = () => {
        let {buttonImg, buttonType} = this.state;
        buttonImg === play ? buttonImg = pause : buttonImg = play;
        buttonType === 'play' ?  buttonType = 'pause' : buttonType = 'play';

        this.setState({buttonImg, buttonType});
    }
    render() {
         return (
            <section>
            <button onClick={this.toggleButton} id="demo">
                <img 
                    src={this.state.buttonImg} 
                    alt={this.state.buttonType}/>
            </button>
            <h1>The Good Music Player</h1>
            <button onClick={()=>vol('1')}>^</button>
            <button onClick={()=>startMusic()}>play</button>
            <button onClick={()=>stopMusic()}>stop</button>
            <button onClick={()=>vol('0')}>v</button>
            </section>
        )
    }
   
}
export default MusicP2;