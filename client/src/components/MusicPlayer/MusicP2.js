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

var n = 'PLAY';
var x;

function play_pause(){
    if (n==='PAUSE'){
        bgMusic.pause()
        n ="PLAY"
    }
    else if (n==='PLAY'){
        bgMusic.play()
        n = 'PAUSE'
    }
}

function vol(chg) {
    if ( (chg ==='1') & (bgMusic.volume < .95) ) {
        bgMusic.volume = bgMusic.volume + .05
        console.log(bgMusic.volume)
    }
    if (chg === '0') {
        bgMusic.volume = bgMusic.volume - .05
        console.log(bgMusic.volume)
    }
}
function status() {
    x = bgMusic.currentTime
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
            <h1>The Good Music Player</h1>
            <button onClick={()=>vol('1')}>^</button>
            <button onClick={this.toggleButton, ()=>play_pause()} id="demo">
                <img
                    src={this.state.buttonImg} 
                    alt={this.state.buttonType}/>
            </button>
            <button onClick={()=>vol('0')}>v</button>
            </section>
        )
    }
   
}
export default MusicP2;