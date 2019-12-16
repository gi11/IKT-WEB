import React, { Component } from "react";
import { Button, Paper } from "@material-ui/core";
import Board from "./Board";

const gridCellStyle = {
  display: "inline-block",
  margin: "2px",
  textAlign: "center",
  textJustify: "center",
  width: "18%",
  fontSize: "30px"
};

const gridRowStyle = {
  display: "block",
  padding: 0,
  textAlign: "center",
  fontSize: 0
};

class Game extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const nextState = { board: prevState.board };

    if (
      prevState.board.rows !== nextProps.rows ||
      prevState.board.columns !== nextProps.columns
    ) {
      prevState.board.stop();
      nextState.board = new Board(nextProps.rows, nextProps.columns);
      nextState.running = false;
    }

    if (nextProps.onScoreChange) {
      nextState.board.onScoreChange = nextProps.onScoreChange;
    }

    if (nextProps.running) {
      nextState.running = true;
    }

    return nextState;
  }

  constructor(props) {
    super(props);

    this.state = {
      board: new Board(this.props.rows, this.props.columns),
      currentFlash: undefined
    };

    this.tryPosition = this.tryPosition.bind(this);
    this.trySound = this.trySound.bind(this);
    this.onFlash = this.onFlash.bind(this);
    this.speak = this.speak.bind(this);
  }

  componentWillUnmount() {
    this.state.board.stop();
  }

  componentDidUpdate(prevProps, prevState, snapshot?) {
    if (!prevProps.running && this.props.running) {
      this.state.board.start(this.onFlash);
    }

    if (prevProps.running && !this.props.running) {
      this.state.board.stop();
    }
  }

  isMarked(i, j) {
    return (
      this.state.board.highlight &&
      this.state.board.highlight[0] === i &&
      this.state.board.highlight[1] === j
    );
  }
  render() {
    const props = {};
    if (this.state.currentFlash) {
      this.state.board.highlight = this.state.currentFlash.position;
    }

    const rows = [];
    for (let i = 0; i < this.state.board.rows; ++i) {
      const columns = [];
      for (let j = 0; j < this.state.board.columns; ++j) {
        const bgColor = this.isMarked(i, j) ? "green" : "lightblue";
        const tile_num = i * this.state.board.columns + j + 1;
        columns.push(
          <div key={j+1} style={gridCellStyle}>
            <Paper
              style={{
                paddingBottom: "50%",
                backgroundColor: bgColor
              }}
            >
              {tile_num}
            </Paper>
          </div>
        );
      }
      rows.push(<div key={i+1} style={gridRowStyle}>{columns}</div>);
    }

    return (
      <div>
        <div>{rows}</div>
        <br />
        <Button
          size="large"
          color="primary"
          variant="contained"
          disabled={!this.props.running}
          onClick={this.tryPosition}
        >
          Position
        </Button>
        <Button
          size="large"
          color="secondary"
          variant="contained"
          disabled={!this.props.running}
          onClick={this.trySound}
          style={{ marginLeft: "15px" }}
        >
          Sound
        </Button>
      </div>
    );
  }

  tryPosition() {
    this.state.board.samePosition();
  }

  trySound() {
    this.state.board.sameSound();
  }

  onFlash(newFlash) {
    this.setState({ currentFlash: newFlash });
    this.speak(newFlash.sound.toString());
  }

  speak(text) {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = text;
      utterance.voice = speechSynthesis.getVoices().filter(voice => {
        return voice.name === "Allison";
      })[0];
      window.speechSynthesis.speak(utterance);
    }
  }
}

export default Game;
