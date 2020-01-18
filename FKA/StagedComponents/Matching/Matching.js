import React, { Component } from "react";

function Images(props) {
    return (
        <div className="card" onClick={() => props.removeFriend(props.id)}>
            <div className="img-container">
                <img alt={props.name} src={props.image} />
            </div>
        </div>
    )
}

export default Images