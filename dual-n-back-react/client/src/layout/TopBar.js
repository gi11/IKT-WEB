import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useAuthDispatch, useAuthState, logOut } from "../context/AuthContext";
import { styled } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";

const OpenMenuIcon = styled(MenuIcon)({
  padding: 0,
  color: "white",
  cursor: "pointer",
  marginRight: 10
});

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
          // color="white"
          style={props.style}
        >
          {props.text}
        </Button>
      );
    } else if (props.action == "logout") {
      return (
        <Button
          onClick={() => logOut(authDispatch, props.history)}
          variant="contained"
          // color="white"
          style={props.style}
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
        <Typography variant="h5" style={{marginRight: 30}}>
          Dual-n-Back
        </Typography>
        <span>
          {props.menuItemsVisible &&
            props.items.map(btn => {
              return (
                btn.visible == "always" && (
                  <TopMenuButton key={btn.text}
                    text={btn.text}
                    link={btn.link}
                    action={btn.action}
                    history={props.history}
                    style={{ margin: 5 }}
                  />
                )
              );
            })}
        </span>
        <div style={{marginLeft: 'auto'}}>
          {isAuthenticated ? (
            <Typography variant="subtitle2">
              Logged in as {currentUser.username}
            </Typography>
          ) : (
            <Typography variant="subtitle2">You are not logged in</Typography>
          )}
          {props.menuItemsVisible &&
            props.items.map(btn => {
              return (
                btn.visible ==
                  (isAuthenticated ? "authenticated" : "not_authenticated") && (
                  <TopMenuButton key={btn.text}
                    text={btn.text}
                    link={btn.link}
                    action={btn.action}
                    history={props.history}
                    style={{ margin: 5 }}
                  />
                )
              );
            })}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(TopBar);
