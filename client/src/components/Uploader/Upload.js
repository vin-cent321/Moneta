import React, { Component } from "react";
import axios from "axios";
import PhotoAlbum from "../../components/PhotoAlbum/PhotoAlbum";
import Click from "../Click/Click"
import data from "../../data.json"
import API from '../../utils/API';
import { connect } from "react-redux";

class Upload extends Component {
    state = {
        images: [{url: ""}],
        imageUrl: "",
        message: '',
        data: data,
        imageName:"Name of image"
    }
    loadImages = () => {
        const { user } = this.props.auth;
        alert('hello')
        API.getImages(user.id)
        .then(res => {
           this.mergeImages(res.data)
        })
        .catch(err => console.log("oops"));
    }
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value});        
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

            });
        });this.loadImages()
    }

    render() {
        return (
        <div className="image-container">
            <div className ="process">
                {/* <h4 className="process-heading" >Mummies say beep beep</h4>
                <p className="process-details" >Upload images here</p> */}
                <br></br>
                <input
                    className="form-control"
                    type="file" 
                    onChange={this.selectImages}
                    multiple
                />
                {/* <p className="process-details">Name?</p> */}
                <input
                    className="form-control"
                    type="text" 
                    name="imageName"
                    placeholder={this.state.imageName}
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
            {this.state.images.map(item => (
                        <Click
                            key='7'
                            id={item.id}
                            name={item.name}
                            image={this.state.imageUrl}
                        />
                    ))}
            {/*<PhotoAlbum>
            { this.state.images.map(item => (
                <div className="row col-lg-12">
                    <div className="col-lg-2">
                        <img
                            src={item.name}
                            name={item.imageName}
                            alt="not available"
                            style={this.props.image}
                            opacity={this.props.opactiy}
                            id={this.props.id}
                        />
                        <br/>
                    </div>
                </div>
                ))} 
            </PhotoAlbum> */}
        </div>
        )
    }

}
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Upload);