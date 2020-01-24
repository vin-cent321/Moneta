import React, { Component } from "react";
import play from "../MusicPlayer/images/play.png"
import pause from "../MusicPlayer/images/pause.png"
// Music goes in PUBLIC folder


//var bgmusic = document.getElementsByName("Audio");
// var audio = new Audio('7empest.mp3'); 

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
    bgMusic.currentTime += 5
    console.log(bgMusic.currentTime)
}

class MusicP2 extends Component {  
    state = {
        buttonType: 'play',
        buttonImg: play,
        time: bgMusic.currentTime
    }   
    
    updateTime = () => {
        let x = bgMusic.currentTime
        this.setState.time({x})
    }

    toggleButton = () => {
        play_pause()
        let {buttonImg, buttonType} = this.state;
        buttonImg === play ? buttonImg = pause : buttonImg = play;
        buttonType === 'play' ?  buttonType = 'pause' : buttonType = 'play';

        this.setState({buttonImg, buttonType});
    }
    render() {
         return (
            <section>
            <button onClick={()=>vol('1')}>^</button>
                <img onClick={this.toggleButton} id="demo"
                    src={this.state.buttonImg} 
                    alt={this.state.buttonType}/>
            <button onClick={()=>vol('0')}>v</button>
            <button onClick={()=>status()}>  +  </button>
            </section>
        )
    }
   
}
export default MusicP2;