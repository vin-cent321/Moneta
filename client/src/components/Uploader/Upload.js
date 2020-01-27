import React, { Component } from "react";
import axios from "axios";
import PhotoAlbum from "../../components/PhotoAlbum/PhotoAlbum";

class Upload extends Component {
    state = {
        images: [],
        imageUrl: "",
        message: ''
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    selectImages = (event) => {
        let images = []
        for (var i = 0; i < event.target.files.length; i++) {
            images[i] = event.target.files.item(i);
        }
        images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
        let message = `${images.length} valid image(s) selected`
        this.setState({ images, message })
    }

    uploadImages = () => {
        console.log("imgname",this.state.imageName)
        const uploaders = this.state.images.map(image => {
            const data = new FormData();
            data.append("image", image, image.name);
            
            // Make an AJAX upload request using Axios
            return axios.post("/api/uploads", data)
            .then(response => {
                this.setState({
                    imageUrl: response.data.imageUrl
                });
                axios.put("/api/users/images/" + this.props.userId, {
                    url: response.data.imageUrl,
                    name: this.state.imageName
                })
                .then(r => console.log(r))
                .catch(err => console.log(err));
            })
            .catch((err) => {
                console.log(err);
            });
        });
    }

    render() {
        return (
        <div className="image-container">
            <div className ="process">
                <p className="process-details" >Upload images here</p>
                <input
                    className="form-control"
                    type="file" 
                    onChange={this.selectImages}
                    multiple
                />
                <p className="process-details">Give this Photo a Name</p>
                <input
                    className="form-control"
                    placeholder="Enter name here"
                    type="text" 
                    name="imageName"
                    value={this.state.imageName}
                    onChange={this.handleInputChange}
                />
            </div>
            <p className="text-info">{this.state.message}</p>
            <div className="col-sm-4">
                <button
                    className="btn btn-primary"
                    value="Submit" 
                    onClick={this.uploadImages}
                >Submit</button>
            </div>
            
           {this.state.imageUrl ? (
                <div className="row col-lg-12">
                    <div className="col-lg-2">
                        <img
                            src={this.state.imageUrl}
                            alt="not available"
                        />
                        <br/>
                    </div>
                </div>
                ) : (<div>
                    <h4>Thats not right</h4>
                    </div>)}
             </div>
        )
    
    }
}

export default Upload;