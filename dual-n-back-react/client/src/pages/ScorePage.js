import React, { Component } from "react";
import ScoreDisplay from "../score/ScoreDisplay";

class ScorePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{width: "500px", paddingTop: "50px"}}>
        <ScoreDisplay/>
      </div>
    );
  }
}

export default ScorePage;
