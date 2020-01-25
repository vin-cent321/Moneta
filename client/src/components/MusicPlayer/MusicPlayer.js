import React, { Component } from "react";
import play from "../MusicPlayer/images/play.png"
import pause from "../MusicPlayer/images/pause.png"
import vol1 from "../MusicPlayer/images/vol1.png"
import vol2 from "../MusicPlayer/images/vol2.png"


// Music goes in PUBLIC folder
var bgMusic = new Audio('focused.mp3'); 
   /* switch(Mood) {
        case ""
    }
 Audio = (e) => {
        switch(e.target.id) {
            case 'relaxedSwitch': Audio  = '/relaxed.mp3';
              break;
            case 'excitedSwitch':  Audio = 'excited.mp3';
            break;
            case 'happySwitch':  Audio = 'happy.mp3';
            break;
            case 'focusedSwitch':  Audio = 'focused.mp3';
            break;
            default: Audio = '';
          }    
        }
*/




bgMusic.volume = 1;
bgMusic.loop = true;

var n = 'PLAY';

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
            <img onClick={()=>vol('1')} src={vol2} alt='vol-down' />
            <img onClick={this.toggleButton} src={this.state.buttonImg} alt={this.state.buttonType}/>
            <img onClick={()=>vol('0')} src={vol1} alt='vol-up' />
            </section>
        )
    }
   
}
export default MusicP2;