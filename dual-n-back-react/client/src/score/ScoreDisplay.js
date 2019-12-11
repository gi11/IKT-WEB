import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import ScoreList from "./ScoreList";

class ScoreDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      endpoint: "http://localhost:5000",
      highscores: [],
      score: { score: 10000, name: "BEST" },
      socket: {}
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    this.setState({ socket });
    socket.emit("new score", this.props.score);

    // testing for socket connections
    socket.on("scores updated", highscores => {
      this.setHighscores(highscores);
    });
  }

  // sending sockets
  send = () => {
    const { socket } = this.state;
    socket.emit("new score", this.state.score);
  };

  setHighscores = highscores => {
    this.setState({ highscores });
  };

  render() {
    return (
      <div>
        <button onClick={() => this.send()}>Send Score</button>
        <ScoreList highscores={this.state.highscores} />
      </div>
    );
  }
}
export default ScoreDisplay;
