import React, { Component } from "react";
import play from "../MusicPlayer/images/play.png";
import pause from "../MusicPlayer/images/pause.png";
import vol1 from "../MusicPlayer/images/vol1.png";
import vol2 from "../MusicPlayer/images/vol2.png";


// Music goes in PUBLIC folder
var fileResource = 'relaxed.mp3';
var bgMusic = new Audio(fileResource); 
/* switch(Mood) {
        case ""
    }
*/

 /*Audio = (e) => {
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



function vol(chg) {
    if ( (chg ==='1') & (bgMusic.volume < .95) ) {
        bgMusic.volume = bgMusic.volume + .05
        console.log(bgMusic.volume)
    }
    if ((chg === '0') & (bgMusic.volume > .05)){
        bgMusic.volume = bgMusic.volume - .05
        console.log(bgMusic.volume)
    }
}
//EVERYTHING IN STATE W/FUNCTION SHOULD BE IN APP.JS READ 
//REDUX FOR GLOBAL VARIABLESMOVE 
//EVERYTHING IN STATE AND FUNCTIONS TO APP.JS
class MusicP2 extends Component {  
    //constructor({file}) {
      //  super({file})
        state = {
            buttonType: 'play',
            buttonImg: play,
            time: bgMusic.currentTime,
            bgMusic: new Audio("relaxed.mp3"),
            n: "PLAY",
            file: this.props.file,
            volume: 1
        }  
    //}

    componentDidUpdate(prevProps, prevState) {
       

       /* if(prevProps !== props) {
// then => reassign file to correct string
            fileResource = this.file;
        }
    }*/
}
    play_pause = () => {
        this.state.bgMusic.loop = true;
        if (this.state.n ==='PAUSE'){
            this.state.bgMusic.pause()
            this.setState({n: "PLAY"})
        }
        else if (this.state.n ==='PLAY'){
            this.state.bgMusic.play()
            this.setState({n: "PAUSE"})
        }
    }

    volu = ()=> {
        if ((this.state.volume < .95) ) {
            this.setState({volume: this.state.volume + .05})
            this.state.bgMusic.volume=this.state.volume 
            console.log(this.state.volume)
        }
    }
    vold = ()=> {
        if ((this.state.volume > .05)){
            this.setState({volume: this.state.volume - .05})
            this.state.bgMusic.volume=this.state.volume
            console.log(this.state.volume)
        }
    }


    changeSong = (song) => {
        //this.bgMusic.src= 'happy.mp3'
        let bgMusic= new Audio('happy.mp3')
        this.state.bgMusic.pause()
        this.setState({bgMusic, n:'PLAY'})
    }
    //call change song with an actual song instead of using string happy.mp3 use song variable
    //use state in app.js
    updateTime = () => {
        let x = bgMusic.currentTime
        this.setState.time({x})
        return x
    }

    toggleButton = () => {
        this.play_pause();
        let {buttonImg, buttonType} = this.state;
        buttonImg === play ? buttonImg = pause : buttonImg = play;
        buttonType === 'play' ?  buttonType = 'pause' : buttonType = 'play';

        this.setState({buttonImg, buttonType});
    }
    render() {
         return (
            <section>
            <img onClick={this.vold} src={vol2} alt='vol-down' />
            <img onClick={this.toggleButton} src={this.state.buttonImg} alt={this.state.buttonType}/>
            <img onClick={this.volu} src={vol1} alt='vol-up' />
            <button onClick={this.changeSong}>change song</button>
            </section> 
        )
    }
   
}
export default MusicP2;