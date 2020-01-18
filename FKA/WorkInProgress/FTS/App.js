import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
class App extends Component {
  state = {
    selectedFile: null
  }

  fileSelectHandler = event => {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0]
    })
  }
  
  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
    axios.post('https://www.youtube.com/watch?v=b6Oe2puTdMQ',fd,{
      onUploadProgress: progressEvent => {
        console.log("Upload Progress", Math.round(progressEvent.loaded / progressEvent.total * 100)+'%')
      }
    }) // used firebase in demo
      .then (res => {
        console.log(res)
      });
  }

  render() {
    return (
      <div className="App">
        <input type="file" onChange={this.fileSelectHandler} />
        <button onClick={this.fileUploadHandler}>Upload</button>
      </div>
    )
  }
}

export default App;
