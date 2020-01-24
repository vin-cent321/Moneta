import React, { Component } from "react";
import axios from "axios";
const DefaultImg = "bird.jpg"


// import '.App.css';


class Upload extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            multerImage: DefaultImg
        }
    }

    setDefaultImage(uploadType) {
        if (uploadType === "multer") {
            this.setState({
                multerImage: DefaultImg
            })
        }
    }
    uploadImage(e, method) {
        let imageObj = {};
        if (method === "multer") {
            let imageFormObj = new FormData();
            imageFormObj.append("imageName", "multer-image-" + Date.now());
            imageFormObj.append("imageData", e.target.files[0]);

            this.setState({
                multerImage: URL.createObjectURL(e.target.files[0])
            });
            axios.post(`${process.env.MONGODB_URI||"mongodb://localhost/beef"}/image/uploadmulter`, imageFormObj)
                .then((data) => {
                    if(data.data.success) {
                        alert("Image beep beep!");
                        this.setDefaultImage('multer');
                    }
                })
                .catch((err) => {
                    alert("Uh oh boop boop");
                    this.setDefaultImage('multer');
                })
        }
    }
    render() {
        return (
        <div className="image-container">
            <div className ="process">
                <h4 className="process-heading">Mummies say beep beep</h4>
                <p className="process-details">Upload images here</p>
            <input type="file" className="process_upload-btn" onChange={(e) => this.uploadImage(e, "multer")} />
            <img className="process-name" src={this.state.multerImage} alt="upload-image" />
            </div>
        </div>
        )
    }
}

export default Upload;