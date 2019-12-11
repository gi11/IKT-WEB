import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Grid } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useAuthDispatch, useAuthState, logOut } from "../context/AuthContext";
import { styled } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";

const OpenMenuIcon = styled(MenuIcon)({
  padding: 0,
  color: "white",
  cursor: "pointer"
});

// const classes = {
//   topMenuItem: {
//     paddingRight: 30,
//     cursor: "pointer"
//   }
// };

function TopBar(props) {
  var { isAuthenticated, currentUser } = useAuthState();
  var authDispatch = useAuthDispatch();

  function TopMenuButton(props) {
    if (props.link) {
      return (
        <Button
          component={Link}
          to={props.link}
          variant="contained"
          color="primary"
        >
          {props.text}
        </Button>
      );
    } else if (props.action == "logout") {
      return (
        <Button
          onClick={() => logOut(authDispatch, props.history)}
          variant="contained"
          color="primary"
        >
          {props.text}
        </Button>
      );
    }
  }

  return (
    <AppBar>
      <Toolbar>
        {props.menuButtonVisible && (
          <OpenMenuIcon onClick={() => props.menuButtonClicked()} />
        )}
        <Typography variant="h5" style={{ flexGrow: 1 }}>
          Dual-n-Back
        </Typography>
        {isAuthenticated ? (
          <Typography variant="subtitle2">
            Logged in as {currentUser.username}
            {/* Hello {currentUser.username} */}
          </Typography>
        ) : (
          <Typography variant="subtitle2">You not logged in</Typography>
        )}
        {props.menuItemsVisible &&
          props.items.map(btn => {
            return (
              <TopMenuButton
                text={btn.text}
                link={btn.link}
                action={btn.action}
                history={props.history}
              />
            );
          })}
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(TopBar);
