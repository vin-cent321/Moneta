import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import 'moment-timezone';
 
import Navbar from "./components/layout/Navbar";
// import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Mood from "./components/mood/mood";
import Gamepage from "./components/gamepage/gamepage";
import Footer from "./components/layout/Footer";
import play from "./components/MusicPlayer/images/play.png";
import pause from "./components/MusicPlayer/images/pause.png";
import "./App.css";



// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    //todo: document.body.style.backgroundColor = 'white';
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  state = {
    buttonType: 'play',
    buttonImg: play,
    // time: bgMusic.currentTime,
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
let bgMusic= new Audio(song)
this.state.bgMusic.pause()
this.setState({bgMusic, n:'PAUSE'}, () => {
  this.state.bgMusic.play()
})
}
//call change song with an actual song instead of using string happy.mp3 use song variable
//use state in app.js
updateTime = () => {
let x = this.state.bgMusic.currentTime
this.setState.time({x})
return x
}

toggleButton = () => {
console.log("toggleButton");
  this.play_pause();
let {buttonImg, buttonType} = this.state;
buttonImg === play ? buttonImg = pause : buttonImg = play;
buttonType === 'play' ?  buttonType = 'pause' : buttonType = 'play';

this.setState({buttonImg, buttonType});
}
  // state = {
  //   file: 'relaxed.mp3'
  // }

  handleMusicChange = (type) => {
    this.changeSong(type)
    // switch(type) {
    //   case 'relaxed': //setState => correct type to be read in footer;
    //     break;
    //   default: this.setState({file: 'relaxed.mp3'});
    // }
  }
  //explore redux
  //need to execute change song, cant do with current build only available on musicplayer
  //pass down this.state.file to musicplayer
//PUT THIS UNDER MOOD ROUTE AFTER HEROKU DEPLY -MATT 
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            {/* <Scene /> */}
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/mood"
              component={(props) => <Mood {...props} handleMusicChange={this.handleMusicChange}  setColor={this.setColor} />}
                />
              <PrivateRoute exact path="/gamepage" component={Gamepage} />
            </Switch>
            <Footer  changeSong={this.changeSong} volu={this.volu} vold={this.vold} toggleButton={this.toggleButton} buttonImg={this.state.buttonImg} buttonType={this.state.buttonType}/>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
