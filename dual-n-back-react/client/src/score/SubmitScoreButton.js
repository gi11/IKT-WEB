import React from "react";
import { useAuthState } from "../context/AuthContext";
import { Button } from "@material-ui/core";

function SubmitScoreButton(props) {
  var { isAuthenticated, currentUser } = useAuthState();

  function submitScore() {
    const score = {
      score: props.score,
      name: currentUser.username
    };
    props.onSubmitScore(score);
  }

  return (
    <>
      {isAuthenticated && (
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            submitScore();
          }}
        >
          Submit Score
        </Button>
      )}
    </>
  );
}

export default SubmitScoreButton;
