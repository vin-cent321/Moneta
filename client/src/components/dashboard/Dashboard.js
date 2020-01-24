import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./Dashboard.css";
import Weather from "../Weather/Weather";
import Moment from "react-moment";
 


class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
  


    return (
      <div style={{ height: "75vh" }} className="container">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <div class="card">
                <div class="card-body">
              <p className="flow-text grey-text text-darken-1">
                What would you like to do today? 
              </p>
              <p className="flow-text grey-text text-darken-1">Today is today</p>
            <Moment local />
              <p className="flow-text grey-text text-darken-1">The weather for today is whatever it looks and feels like outside</p>
            <Weather />
              </div>
             </div>
            </h4>
            <a href="/mood" role="button"
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              //onClick={"./mood/mood"}
              //id=""
              className="gameswitch btn btn-large waves-effect waves-light hoverable accent-3"
            >
              Lets play!
            </a>
            <br></br>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
             // id=""
              className="logout btn btn-large waves-effect waves-light hoverable accent-3"
            >
              Logout
            </button>
          </div>
        </div>
        <div className='row'>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
