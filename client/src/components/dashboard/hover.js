import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./mood.css";

var buttonOne = document.getElementById('relaxedSwitch');
var buttonTwo = document.getElementById('excitedSwitch');
var buttonThree = document.getElementById('happySwitch');
var buttonFour = document.getElementById('focusedSwitch');
var body = document.body;

'relaxedSwitch'.onmouseover = function() {
  body.className = 'hovered';
}

buttonOne.onmouseout = function() {
  body.className = '';
}

export default "./mood.js";