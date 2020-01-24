import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./Dashboard.css";
import Weather from "../Weather/Weather";
import Moment from "react-moment";
import Upload from "../Uploader/Upload";
 


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
            <b>Hello,</b> {user.name.split(" ")[0]}
            <Upload />
            </h4>
              <div class="card">
                <div class="card-body">
              <p className="flow-text grey-text text-darken-2">Today is</p> <Moment local></Moment>
              <p className="flow-text grey-text text-darken-2">Here's details about the weather</p><Weather />
              </div>
             </div>
            
            <Link to="/mood" role="button"
            //<a href="/mood" role="button"
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
            </Link>
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
          <Upload />
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
