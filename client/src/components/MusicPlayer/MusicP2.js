import React, { Component } from "react";
// Music goes in PUBLIC folder
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
function MusicP2() {    
    return (
        <>
        <h1>The Good Music Player</h1>
        <button onClick={()=>vol('1')}>^</button>
        <button onClick={()=>startMusic()}>play</button>
        <button onClick={()=>stopMusic()}>stop</button>
        <button onClick={()=>vol('0')}>v</button>
        </>
    )
}
export default MusicP2;