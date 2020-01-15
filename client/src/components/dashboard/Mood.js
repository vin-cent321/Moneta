import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Mood extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              {user.name.split(" ")[0]}<b>, let's start by setting the mood.</b> 
              </h4>
               <div class="card">
                <div class="card-body">
              <p className="flow-text grey-text text-darken-1">
                How are you feeling today? 
              </p>
            
            
            <a href="/mood" role="button"
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                margin: "1rem",
              }}
              onClick={"/mood"}
              id="gameswitch"
              className="btn btn-large waves-effect waves-light hoverable accent-3"
            >
              Relaxed
            </a> <a href="/mood" role="button"
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                margin: "1rem",
              }}
              onClick={"/mood"}
              id="gameswitch"
              className="btn btn-large waves-effect waves-light hoverable accent-3"
            >
              Excited
            </a> <a href="/mood" role="button"
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                margin: "1rem",
              }}
              onClick={"/mood"}
              id="gameswitch"
              className="btn btn-large waves-effect waves-light hoverable accent-3"
            >
              Happy
            </a> <a href="/mood" role="button"
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                margin: "1rem",
              }}
              onClick={"/mood"}
              id="gameswitch"
              className="btn btn-large waves-effect waves-light hoverable accent-3"
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
