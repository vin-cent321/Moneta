import React, { Component } from "react";
import data from "../../data.json"
import Container from "../Container/Container"
import Click from "../Click/Click";
import API from '../../utils/API';
import { connect } from "react-redux";

class MatchIt extends Component {
    state = {
        data: data,
        score: 0,
        hiddenAnswer: Math.floor(Math.random() * 12 ),
        disabled: false,
        message: '',
        name: '',
    }

    componentDidMount() {
        this.loadImages();
    }

    loadImages = () => {
        const { user } = this.props.auth;
        API.getImages(user.id)
        .then(res => {
            this.mergeImages(res.data)
        })
        .catch(err => console.log("oops"));
    }

    mergeImages = (images) => {
        // mix images in w/ data from JSON file
        const { data } = this.state;
        let mergedImages = [ 
            ...data.slice(images.length),
            ...images
        ];
        mergedImages = mergedImages.map((img, i) => ({ ...img, id: i+1 }));
        mergedImages.length = 12;
        this.setState({ data: mergedImages }, () => {
            this.shuffleData(this.state.data);
            this.selectHiddenAnswer();
        });
    }
    
    selectHiddenAnswer() {
        const randomId = Math.floor(Math.random() * this.state.data.length) + 1;
        this.setState({
            hiddenAnswer: this.state.data.find(e => e.id === randomId)
        })
    }

    correctGuess = () => {
        const { score } = this.state;
        this.setState({ 
            score: score + 1,
            message: `Yes this is ${this.state.hiddenAnswer.name}`} );
    };

    incorrectGuess = clickedName => {
        const { score } = this.state;
        this.setState({ 
            score: score + 0,
            message: `No this is ${clickedName}`});
    };

    resetData = data => {
        return this.shuffleData(this.state.data);
    };

    shuffleData = data => {
        let i = data.length - 1;

        while (i > -1) {
            let j = Math.floor(Math.random() * i);
            let temporary = data[i];
            data[i] = data[j];
            data[j] = temporary;
            i--;
        }
    };

    clickHandler = id => {
        const { data, hiddenAnswer } = this.state;
        const clickedName = data.find(e => e.id === id).name;
        if (hiddenAnswer.id === id) {
            this.correctGuess()
        } else {
            this.incorrectGuess(clickedName);
        }
        this.setState({ disabled: true})
        setTimeout(() => {
            this.shuffleData(data);
            this.selectHiddenAnswer();
            this.setState({ disabled: false,
            message:'' })
        }, 3000);
    };

    render() {
        return (
            
            <div><br></br>
                <Container>
                    <div className="black-text">Click The Picture of {this.state.hiddenAnswer.name}! {this.state.message}</div>
                    
                </Container>
                <Container>    
                    <div className="black-text">Score: {this.state.score}</div>
                </Container>
                <Container>
                    {this.state.data.map(item => (
                        <Click
                            key={item.id}
                            id={item.id}
                            opacity={1}
                            name={item.name}
                            handleClick={this.state.disabled ? () => {} : this.clickHandler}
                            image={item.url}
                        />
                    ))}
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(MatchIt);