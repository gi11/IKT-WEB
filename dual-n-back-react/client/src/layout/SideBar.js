import React from "react";
import { styled } from "@material-ui/core/styles";
import { Drawer, List, ListItem, Divider} from "@material-ui/core";
import { withRouter, Link } from "react-router-dom";
import { useAuthDispatch, useAuthState, logOut } from "../context/AuthContext";

const SideMenuItems = styled(List)({
  width: 200
});

function SideBar(props) {
  var authDispatch = useAuthDispatch();
  var { isAuthenticated, currentUser } = useAuthState();

  function SideMenuItem(props) {
    if (props.link) {
      return (
        <ListItem button divider component={Link} to={props.link}>
          {props.text}
        </ListItem>
      );
    } else if (props.action === "logout") {
      return (
        <ListItem
          button
          divider
          onClick={() => logOut(authDispatch, props.history)}
        >
          {props.text}
        </ListItem>
      );
    }
  }

  return (
    <Drawer
      open={props.isOpen}
      onClose={() => props.onClose()}
      onOpen={() => props.onOpen()}
    >
      <div role="button" onClick={() => props.onClose()}>
        <SideMenuItems>
          <p style={{ marginTop: 40 }}>Dual-n-back</p>
          <Divider />
          {props.items.map(btn => {
            return (
              btn.visible === "always" && (
                <SideMenuItem key={btn.text}
                  text={btn.text}
                  link={btn.link}
                  action={btn.action}
                  history={props.history}
                />
              )
            );
          })}
          {isAuthenticated ? (
            <p style={{ marginTop: 50 }}>Logged in as {currentUser.username}</p>
          ) : (
            <p style={{ marginTop: 50 }}>You are not logged in</p>
          )}
          <Divider />
          {props.items.map(btn => {
            return (
              btn.visible ===
                (isAuthenticated ? "authenticated" : "not_authenticated") && (
                <SideMenuItem key={btn.text}
                  text={btn.text}
                  link={btn.link}
                  action={btn.action}
                  history={props.history}
                />
              )
            );
          })}
        </SideMenuItems>
      </div>
    </Drawer>
  );
}

export default withRouter(SideBar);
