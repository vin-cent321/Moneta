import React from "react";
import "./click.css"


const Click = props => (
  <div
    role="img"
    aria-label="click item"
    onClick={() => props.handleClick(props.id)}
    style={{ backgroundImage: `url("${props.image}")` }}
    className={`click-item ${props.name} `}
  />
);

export default Click;