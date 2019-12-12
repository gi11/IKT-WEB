import React, { Component } from "react";
import { withStyles } from "@material-ui/core";

import TopBar from "./TopBar";
import SideBar from "./SideBar";

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

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { narrowScreen: false, drawerOpen: false };
  }

  componentWillMount() {
    this.setState({ narrowScreen: window.innerWidth <= 800 });
    window.addEventListener("resize", () => {
      this.setState({ narrowScreen: window.innerWidth <= 800 });
    });
  }

  render() {
    var items = [
      { text: "Play", link: "/play" },
      { text: "Highscores", link: "/scores" },
      { text: "Login", link: "/login" },
      { text: "Register", link: "/register" },
      { text: "Profile", link: "/profile" },
      { text: "Logout", action: "logout" },
    ];

    
    return (
      <>
        <TopBar
          menuButtonVisible={this.state.narrowScreen}
          menuButtonClicked={() => {
            this.setState({ drawerOpen: true });
          }}
          menuItemsVisible={!this.state.narrowScreen}
          items={items}
          history={this.props.history}
        />
        {this.state.narrowScreen && (
          <SideBar
            isOpen={this.state.drawerOpen}
            onClose={() => {
              this.setState({ drawerOpen: false });
            }}
            onOpen={() => {
              this.setState({ drawerOpen: true });
            }}
            items={items}
            history={this.props.history}
          />
        )}
        <div className={this.props.classes.content}>{this.props.children}</div>
      </>
    );
  }
}

export default withStyles(styleSheet)(Layout);
