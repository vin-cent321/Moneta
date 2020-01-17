import React from "react";
import ReactDOM from "react-dom";

const song = "./files/7empest.mp3";


function getTime(time) {
    if (!isNaN(time)) {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }
}

class MusicPlayer extends React.Component {
    state = {
        selectedTrack: null,
        player: "playing",
        currentTime: null,
        duration: null
    };

    componentDidMount() {
        this.player.addEventListener("timeupdate", e => {
            this.setState({
                currentTime: e.target.currentTime,
                duration: e.target.duration
            });
        });
    }

    componentWillUnmount() {
        this.player.removeEventListener("timeupdate", () => {});
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedTrack !== prevState.selectedTrack) {
            let track;
            switch (this.state.selectedTrack) {
                case "7empest":
                    track = song;
                    break;
                    default:
                        break;
            }
            if (track) {
                this.player.src = track;
                this.player.play();
                this.setState({
                 player: "playing",
                 duration: this.player.duration   
                });
            }
        }
            if (this.state.player !== prevState.player) {
                if (this.state.player === "paused") {
                    this.player.pause();
                } else if (this.state.player === "stopped")
                    this.player.pause();
                    this.player.currentTime = 0;
                    this.setState({
                        selectedTrack: null
                    });
                 } else if (
                     this.state.player === "playing" && prevState.player === "paused"
                 ) {
                     this.player.play();
                 }
    }

  render() {
      const list = [{ id: 1, title: ""},{id: 2, title: ""}].map(item => {
          return (
              <li
                key={item.id}
              >
              {item.title}
              </li>
          );
      });

      const currentTime = getTime(this.state.currentTime);
      const duration = getTime(this.state.duration);
      
      return (
          <>
          <div className="row">
          <div className="col s12">
            <p>Music Player</p>
            
                  <button onClick={ () => this.setState({
                      player: "playing"
                  })}>Play</button>
              
            <ul>{list}</ul>
            

                  <button onClick={ () => this.setState({
                      player: "paused"
                  })}>Pause</button>
              
              {this.state.player === "playing" || this.state.player === "paused" ? (
                  <button onClick={ () => this.setState({
                      player: "stopped"
                  })}>Stop</button>
              ) : (
                ""
                )}
            
            
            {this.state.player === "playing" || this.state.player === "paused" ? (
                <div>
                    {currentTime} / {duration}
                </div>
            ) : (
              ""  
            )}
            <audio ref={ref => (this.player = ref)} />
            </div>
            </div>
          </>
      );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<MusicPlayer />, rootElement);
export default MusicPlayer;
