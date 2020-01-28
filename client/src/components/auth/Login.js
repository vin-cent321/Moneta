import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import {Animated} from "react-animated-css";
import "./Auth.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
        <Animated animationIn="fadeInDown" animationInDelay="1000" isVisible={true}>
            <div className="col s12" id="header" style={{ paddingLeft: "11.250px" }}>
              <h4>Welcome to Moneta</h4>
              <p id="tagline">A personalized image/word association game <br></br>for memory and mindfulness.</p>
            </div>

            <div className="row">
            <div className="col s4"></div>
              <div className="input-field col s4">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="email"
                  className={classnames("", {
                    invalid: errors.name || errors.namenotfound
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="col s4"></div>
            </div>
            <form noValidate onSubmit={this.onSubmit}>

            <div className="row">
            <div className="col s4"></div>
              <div className="input-field col s4">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="col s4"></div>
              </div>

              <div className="row">
              <div className="col s4"></div>
              <div className="input-field col s4">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s4"></div>
              </div>

              <div className="row">
              <div className="col s3"></div>
              <div className="col s3" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="login btn btn-large waves-effect waves-light hoverable accent-3"
                >
                  Login
                </button>
                </div>

                <div className="col s3" style={{ paddingLeft: "11.250px" }}>
                <Link to="/register">
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="signUp btn btn-large waves-effect waves-light hoverable accent-3"
                >
                  Sign Up
                </button>
                </Link>
              </div>
              <div className="col s3"></div>
              </div>
            </form>
            </Animated>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
