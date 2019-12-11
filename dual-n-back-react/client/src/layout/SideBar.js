import React, { useState } from "react";
import { styled } from "@material-ui/core/styles";
import { Drawer, List, ListItem } from "@material-ui/core";
import { withRouter, Link } from "react-router-dom";
import { useAuthDispatch, useAuthState, logOut } from "../context/AuthContext";

const SideMenuItems = styled(List)({
  width: 200
});

function SideBar(props) {
  var authDispatch = useAuthDispatch();

  function SideMenuItem(props) {
    if (props.link) {
      return (
        <ListItem button divider component={Link} to={props.link}>
          {props.text}
        </ListItem>
      );
    } else if (props.action == "logout") {
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
          {props.items.map(btn => {
            return (
              <SideMenuItem
                text={btn.text}
                link={btn.link}
                action={btn.action}
                history={props.history}
              />
            );
          })}
        </SideMenuItems>
      </div>
    </Drawer>
  );
}

export default withRouter(SideBar);
