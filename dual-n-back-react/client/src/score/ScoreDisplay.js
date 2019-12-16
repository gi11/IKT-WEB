import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import ScoreList from "./ScoreList";

class ScoreDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      endpoint: process.env.REACT_APP_SITE_URL,
      highscores: [],
      socket: {}
    };
  }

  getScoresFromLocalStorage() {
    console.log("No Internet.. fething highscores from localstorage")
    if (localStorage.hasOwnProperty("dualnback_highscores")) {
      let scores = JSON.parse(localStorage.dualnback_highscores);
      this.setHighscores(scores);
    }
  }

  componentDidMount() {
    const { endpoint } = this.state;
    console.log("Endpoint:");
    console.log(endpoint);
    const socket = socketIOClient(endpoint);
    this.setState({ socket });
    socket.on("scores updated", highscores => {
      this.setHighscores(highscores);
    });

    socket.emit("get scores");
    socket.on("connect_error", error => {
      console.log("connect_error! Fetching scores from localstorage...");
      this.getScoresFromLocalStorage();
    });
    socket.on("reconnect_error", error => {
      console.log("reconnect_error! Fetching scores from localstorage...");
      this.getScoresFromLocalStorage();
    });
  }

  setHighscores = highscores => {
    this.setState({ highscores });
  };

  render() {
    return (
      <div>
        <ScoreList highscores={this.state.highscores} />
      </div>
    );
  }
}
export default ScoreDisplay;
