import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import API from "../../utils/API";
import "./Dashboard.css";
import Weather from "../Weather/Weather";
import Moment from "react-moment";
import Upload from "../Uploader/Upload";
import { Link } from "react-router-dom";


class Dashboard extends Component {
  state = {
    images: []
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    // this.loadImages();
  }



  render() {
    const { user } = this.props.auth;

    return (
      <div style={{ height: "75vh" }} className="container">
        <div className="row">
          <div style={{ maxWidth: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {this.state.images.map(img => (
              <div>
                <p>{img.name}</p>
                <img src={img.url} style={{ width: '150px' }} alt=" " />
              </div>
            ))}
          </div>
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hello,</b> {user.name.split(" ")[0]}
            </h4>
            <div class="card">
              <div class="card-body">
                <p className="flow-text grey-text text-darken-2">Today is <Moment format="LLLL" local /></p>
                <Weather />
                <Upload className="upper" userId={user.id} />
              </div>
            </div>
            <Link to="/mood" role="button"
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}

              className="gameswitch btn btn-large waves-effect waves-light hoverable accent-3"
            >
              Lets play!
            </Link>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
                margin: "1rem 0 0 50px"
              }}
              onClick={this.onLogoutClick}
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
