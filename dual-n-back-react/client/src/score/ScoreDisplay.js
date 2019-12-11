import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class ScoreDisplay extends Component {
  constructor() {
    super();
    this.state = {

      endpoint: "http://localhost:5000",
      highScores : [],
      score: {'score': 1000, 'name': "user1"},
      socket : {}
    };
  }

  componentDidMount(){
    const {endpoint} = this.state;
    const socket = socketIOClient(endpoint);
    this.setState({socket});
    // testing for socket connections
    socket.on('scores updated', (highScores) => {
      this.setHighScores(highScores);
    })
  }

  // sending sockets
  send = () => {
    const {socket} = this.state;
    socket.emit('new score', this.state.score)
  }

  
  // adding the function
  setHighScores = (highScores) => {
    this.setState({ highScores })
  }

  render() {
    const highscoreList = this.state.highScores.map(score  => {
      return (
        <li>{score.score}, {score.name}</li>
        )
    })
  
    return (
      <div>
        <button onClick={() => this.send() }>Send Score</button>
        <ol>
          {highscoreList}
        </ol>
      </div>
    )
  }
}
export default ScoreDisplay;