import React, { Component } from "react";
import data from "../../data2.json"
import Container from "../Container/Container"
import Click from "../Click/Click";

class MatchIt extends Component {
    state = {
        data,
        score: 0,
        hiddenAnswer: [],
        disabled: false
    }


componentDidMount() {
    this.shuffleData(this.state.data);
    this.selectHiddenAnswer();
}

selectHiddenAnswer() {
    let randomId = Math.ceil(Math.random() * this.state.data.length)
    this.setState({
        hiddenAnswer: this.state.data.find(e => e.id === randomId)
    })
}

correctGuess = newData => {
    const { score } = this.state;
    this.setState({ score: score + 1 });
    // update score, message
};

incorrectGuess = data => {
    const { score } = this.state;
    this.setState({ score: score + 0 });
};

resetData = data => {
    // const resetData = data.map(item => ({ ...item, match: true}));
    return this.shuffleData(this.state.data);
};

shuffleData = data => {
    let i = data.length -1;
    while (i > 0) {
        const j = Math.floor(Math.random() * (i + 1));
        const temporary = data[i];
        data[i] = data[j];
        data[j] = temporary;
        i--;
    }
    return data;
};

clickHandler = id => {
    if (this.state.hiddenAnswer.id === id) {
        this.correctGuess()

    } else {
        this.incorrectGuess();

    }
    this.setState({ disabled: true})
    setTimeout(() => {
        this.shuffleData(this.state.data);
        this.selectHiddenAnswer();
        this.setState({ disabled: false })
    }, 3000);
};

render() {
    return (
        <div><br></br>
            <Container>
                <div class="black-text">Click The Picture of {this.state.hiddenAnswer.name}!</div>
            </Container>
            <Container>    
                <div class="black-text">Score: {this.state.score}</div>
            </Container>
            <Container>
                {this.state.data.map(item => (
                    <Click
                    key={item.id}
                    id={item.id}
                    fade={!this.state.score}
                    handleClick={this.state.disabled ? () => {} : this.clickHandler}
                    image={item.image}
                    />
                ))}
            </Container>
        </div>
        )
    }
}
export default MatchIt;