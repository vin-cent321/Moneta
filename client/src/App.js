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
    file: 'relaxed.mp3'
  }

  hanldeMusicChange = (type) => {
    switch(type) {
      case 'relaxed': //setState => correct type to be read in footer;
        break;
      default: this.setState({file: 'relaxed.mp3'});
    }
  }
//PUT THIS UNDER MOOD ROUTE AFTER HEROKU DEPLY -MATT hanldeMusicChange={this.hanldeMusicChange} 
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
              component={(props) => <Mood {...props} setColor={this.setColor} />}
                />
              <PrivateRoute exact path="/gamepage" component={Gamepage} />
            </Switch>
            <Footer file={this.state.file} />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
