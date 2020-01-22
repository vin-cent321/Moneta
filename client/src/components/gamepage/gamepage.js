import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./gamepage.css";
import MatchIt2 from '../../components/MatchIt2/MatchIt2';

class Mood extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

window.onload = function() {
var buttonOne = document.getElementById('relaxedSwitch');
var buttonTwo = document.getElementById('excitedSwitch');
var buttonThree = document.getElementById('happySwitch');
var buttonFour = document.getElementById('focusedSwitch');
var body = document.body;

buttonOne.onmouseover = function() {
  body.className = 'hoveredOne';
}
buttonOne.onmouseout = function() {
  body.className = '';
}

buttonTwo.onmouseover = function() {
  body.className = 'hoveredTwo';
}
buttonTwo.onmouseout = function() {
  body.className = '';
}

buttonThree.onmouseover = function() {
  body.className = 'hoveredThree';
}
buttonThree.onmouseout = function() {
  body.className = '';
}

buttonFour.onmouseover = function() {
  body.className = 'hoveredFour';
}
buttonFour.onmouseout = function() {
  body.className = '';
}
};

    return (
  
      <div style={{ height: "75vh" }} id="background" className="container valign-wrapper">
        <div className="row">
          <MatchIt2 />
          <div className="landing-copy col s12 center-align">
            <h4>
              {user.name.split(" ")[0]}<b>, let's start by setting the mood.</b>
            </h4>
            <div class="card">
              <div class="card-body shadow lg">
                <p className="flow-text grey-text text-darken-1">
                    GAMEPAGE
              </p>


                <a href="/mood" role="button"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    margin: "1rem",
                  }}
                  onClick={"/mood"}
                  id="relaxedSwitch"
                  className="gameswitch btn btn-large waves-effect waves-light hoverable accent-3"
                >
                  Relaxed
                </a>

                <a href="/mood" role="button"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    margin: "1rem",
                  }}
                  onClick={"/mood"}
                  id="excitedSwitch"
                  className="gameswitch btn btn-large waves-effect waves-light hoverable accent-3"
                >
                  Excited
            </a>

                <a href="/mood" role="button"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    margin: "1rem",
                  }}
                  onClick={"/mood"}
                  id="happySwitch"
                  className="gameswitch btn btn-large waves-effect waves-light hoverable accent-3"
                >
                  Happy
            </a>

                <a href="/mood" role="button"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    margin: "1rem",
                  }}
                  onClick={"/mood"}
                  id="focusedSwitch"
                  className="gameswitch btn btn-large waves-effect waves-light hoverable accent-3"
                >
                  Focused
            </a>


              </div>
            </div>
     
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Mood.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Mood);

