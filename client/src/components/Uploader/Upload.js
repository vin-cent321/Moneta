import React, { Component } from "react";
import axios from "axios";
// const DefaultImg = "bird.jpg";
// const BASE_URL = `${process.env.MONGODB_URI||"mongodb://localhost/beef"}`;



// import '.App.css';


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

    // setDefaultImage(uploadType) {
    //     if (uploadType === "multer") {
    //         this.setState({
    //             multerImage: DefaultImg,
    //             multerdata: null
    //         })
    //     }
    // }
    // USING THIS ONE
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
                console.log("fuck", err);
            });
        });
    }

    render() {
        return (
        <div className="image-container">
            <div className ="process">
                <h4 className="process-heading" >Mummies say beep beep</h4>
                <p className="process-details" >Upload images here</p>
                <input
                    className="form-control"
                    type="file" 
                    onChange={this.selectImages}
                    multiple
                />
                <p className="process-details">Name?</p>
                <input
                    className="form-control"
                    type="text" 
                    name="imageName"
                    value={this.state.imageName}
                    onChange={this.handleInputChange}
                />
            </div>
            <p className="text-info">{this.state.message}</p>
            <br/><br/><br/>
            <div className="col-sm-4">
                <button
                    className="btn btn-primary"
                    value="Submit" 
                    onClick={this.uploadImages}
                >Submit</button>
            </div>
            {/* <input type="file" className="process_upload-btn" onChange={(e) => this.uploadImages(e, "multer")} /> */}
            {/* <img className="process-name" src={this.state.multerImage} alt="uploaded" /> */}
            
            {this.state.imageUrl ? (
                <div className="row col-lg-12">
                    <div className="col-lg-2">
                        <img
                            src={this.state.imageUrl}
                            className="process-name"
                            alt="not available"
                        />
                        <br/>
                    </div>
                </div>
            ) : null}

        </div>
        )
    }


    // render() {
    //     return (
    //     <div>
    //         <br/>
    //         <div className="col-sm-12">
    //         <h1>Image Uploader</h1><hr/>
    //         <div className="col-sm-4">
    //         <input className="form-control " type="file" 
    //         onChange={this.selectImages} multiple/>
    //         </div>
    //         <p className="text-info">{this.state.message}</p>
    //         <br/><br/><br/>
    //         <div className="col-sm-4">
    //         <button className="btn btn-primary" value="Submit" 
    //         onClick={this.uploadImages}>Submit</button>
    //         </div>
    //         </div>
    //         <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><hr/><br/>
    //         <div className="row col-lg-12">
    //         { 
    //         this.state.imageUrls.map((url, i) => (
    //         <div className="col-lg-2" key={i}>
    //         <img src={url} className="img-rounded img-responsive"
    //         alt="not available"/><br/>
    //         </div>
    //         ))
    //         }
    //         </div>
    //     </div>
    //     );
    //     }

}

export default Upload;