import React, { Component } from "react";
import data from "../../data.json"
import Container from "../Container/Container"
import Click from "../Click/Click";

class MatchIt extends Component {
    state = {
        data: data,
        score: 0,
        hiddenAnswer: Math.floor(Math.random() * 12 ),
        disabled: false,
        message:'',
        name:'',
    }

componentDidMount() {
    this.shuffleData(this.state.data);
    this.selectHiddenAnswer();
}

selectHiddenAnswer() {
    const randomId = Math.floor(Math.random() * this.state.data.length) + 1
    console.log('randomId', randomId)
    this.setState({
        hiddenAnswer: this.state.data.find(e => e.id === randomId)
    })
    console.log('hidden',this.state.hiddenAnswer)
}

correctGuess = () => {
    const { score } = this.state;
    this.setState({ 
        score: score + 1,
        message: `Yes this is ${this.state.hiddenAnswer.name}`} );
    // update score, message
};

incorrectGuess = clickedId => {
    const { score } = this.state;
    this.setState({ 
        score: score + 0, 
        message: `No this is ${this.state.data.find(e => e.id === clickedId).name}`});
        // update score, message
};
resetData = data => {
    // const resetData = data.map(item => ({ ...item, match: true}));
    return this.shuffleData(this.state.data);
};

shuffleData = data => {
    /*  === === === === === === === === === === === === === === === === === === === ===
            MAY INTEGRATE THIS CODE TO PREVENT DUPLICATE INDEXES ASSIGNED VALUES 
            AS DATA DOES NOT SEEM TO BE AN ARRAY BUT CAPABLE OF STORING VALUES AT 
            DUP-INDEXS TO BE AUTO SORTED SOMEHOW. 
        === === === === === === === === === === === === === === === === === === === ===
    function rand(x){
        return Math.floor(Math.random() * x);
    }

    let x;
    
    while (disorder.length != order.length) {
        x = order[rand(order.length)];
        (disorder.includes(x) ? '' : disorder.push(x))
    };
    */


    let i = data.length - 1;
    //console.log("initial i",i,'\n',"initial data.length", data.length)
    while (i > -1) {
        let j = Math.floor(Math.random() * i);
        let temporary = data[i];
        data[i] = data[j];
        data[j] = temporary;
        this.setState({
            name: data[i].name
        })
        console.log("i",i,"j",j,this.state.name, data[i].name)
        i--;
    }
    console.log(data)
    return data;
};

clickHandler = id => {
    console.log('id', id)
    if (this.state.hiddenAnswer.id === id) {
        console.log("right",id, this.state.hiddenAnswer.id, this.state.name)
        this.correctGuess()
    } else {
        console.log('wrong',id, this.state.hiddenAnswer.id, this.state.name)
        this.incorrectGuess(id);
    }
    //console.log(this.state.name)
    this.setState({ disabled: true})
    setTimeout(() => {
        this.shuffleData(this.state.data);
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
                    image={item.image}
                    />
                ))}
            </Container>
        </div>
        )
    }
}
export default MatchIt;