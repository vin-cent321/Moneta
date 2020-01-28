import React from "react";
import "./container.css";


const PhotoAlbum = props => <div className="photoContainer card row col-12"
                                    role="img"
                                //     aria-label="click item"
                                    id= {(props.id)}
                                    style={{ backgroundImage: `url("${props.image}")`}}
                                    className={`click-item ${props.name} `}>{props.children}
                            </div>;

export default PhotoAlbum;
