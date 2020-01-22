import React, { Component } from "react";
// Music goes in PUBLIC folder
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

function MusicP2() {    
    return (
        <>
        <h1>The Good Music Player</h1>
        <button onClick={()=>vol('1')}>^</button>
        <button onClick={()=> play_pause()}>{n}</button>
        <button onClick={()=>vol('0')}>v</button>
        </>
    )
}
export default MusicP2;