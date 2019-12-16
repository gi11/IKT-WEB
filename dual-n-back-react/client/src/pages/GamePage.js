import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Game from "../game/Game";
import socketIOClient from "socket.io-client";
import SubmitscoreButton from "../score/SubmitScoreButton";
import { withRouter } from "react-router-dom";
import { withStyles, Grid } from "@material-ui/core";

const styleSheet = {
  content: {
    flexGrow: 1,
    paddingTop: 70,
    paddingLeft: 50,
    paddingRight: 50,
    width: `100vw`,
    minHeight: "100vh"
  }
};

class GamePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameRunning: false,
      gameComplete: false,
      gridSize: 3,
      score: 0,
      socket: {},
      endpoint: process.env.REACT_APP_SITE_URL
    };

    this.setGridSize = this.setGridSize.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onScoreChange = this.onScoreChange.bind(this);
    this.onGameComplete = this.onGameComplete.bind(this);
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    this.setState({ socket });
  }

  render() {
    return (
      <div
        style={{
          width: "50%",
          maxWidth: "800px",
          minWidth: "420px",
          textAlign: "center",
          textJustify: "center"
        }}
      >
        <p>Dual-n-back game</p>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <span style={{ marginLeft: "20px", marginRight: "20px" }}>
              <Button
                color="primary"
                variant="outlined"
                className={this.state.gameRunning ? "hidden" : ""}
                onClick={this.onPlay}
              >
                Play
              </Button>
              <Button
                color="primary"
                variant="outlined"
                className={!this.state.gameRunning ? "hidden" : ""}
                onClick={this.onPause}
                style={{ marginLeft: "15px" }}
              >
                Pause
              </Button>
            </span>
          </Grid>

          <Grid item xs={6}>
            <div>Grid size:</div>
            <input
              type="range"
              min="3"
              max="5"
              value={this.state.gridSize}
              onInput={this.setGridSize}
              onChange={this.setGridSize}
            />
          </Grid>

          <Grid item xs={6}>
            <span>
              <div>Score: {this.state.score}</div>
              <SubmitscoreButton
                score={this.state.score}
                onSubmitScore={this.submitScore}
              />
            </span>
          </Grid>

          <Grid item xs={12}>
            <Game
              rows={this.state.gridSize}
              columns={this.state.gridSize}
              running={this.state.gameRunning}
              onScoreChange={this.onScoreChange}
            />
          </Grid>
        </Grid>
      </div>
    );
  }

  submitScore = score => {
    const { socket } = this.state;
    socket.emit("new score", score);
    this.props.history.push("/scores");
  };

  onGameComplete() {
    this.setState({ gameComplete: true });
  }

  setGridSize(e) {
    this.setState({ gridSize: e.target.value });
  }

  onPlay(e) {
    this.setState({ gameRunning: true });
  }

  onPause(e) {
    this.setState({ gameRunning: false });
  }

  onScoreChange(prevScore, nextScore) {
    this.setState({ score: nextScore });
  }
}

export default withStyles(styleSheet)(withRouter(GamePage));
