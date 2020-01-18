import React from "react";
import family from "./family.json";

function Wrapper(props) {
    state = {
        family
      };
  
    return <div className="wrapper">{props.children}</div>;
}

export default Wrapper;