import React from "react";
import "./container.css";


const PhotoAlbum = props => <div className="gameContainer card row col-12"
                                    role="img"
                                    aria-label="click item"
                                    id= {(props.id)}
                                    style={{ backgroundImage: `url("${props.image}")`, opacity: props.opacity }}
                                    className={`click-item ${props.name} `}>{props.children}
                            </div>;

export default PhotoAlbum;
