import React, { Component } from "react";
//import '.App.css';

class App extends Component {
    state = {
        selectedFile:null
    }
    fileSelectHandler = event => {
        this.setState ({
            selectedFile: event.target.files[0]
        })
        console.log(event.target.files[0]);
    }

    fileUploaderHandler = () => {
        
    }
    render() {
        return (
            <div className ="App">
            <input type="file" onChange={this.fileSelectHandler} />
            </div>
        )
    }
}

export default App;