import React, { Component } from "react";
import { Grid, withStyles } from "@material-ui/core";
import axios from "axios";

import TopBar from "./TopBar";
import SideBar from "./SideBar";

const layoutStyleSheet = {
  content: {
    flexGrow: 1,
    paddingTop: 70,
    paddingLeft: 50,
    paddingRight: 50,
    minHeight: "100vh",
    width: `100vw`,
  }
};

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { narrowScreen: false, drawerOpen: false };
  }

  componentWillMount() {
    //Change state depending on window size
    this.setState({ narrowScreen: window.innerWidth <= 800 });
    window.addEventListener("resize", () => {
      this.setState({ narrowScreen: window.innerWidth <= 800 });
    });

    //Fetch highscores via regular api and save in local storage for offline use
    console.log("Fetching current highscore via api");
    const url = "/api/scores/";
    axios.get(url).then(res => {
      localStorage.dualnback_highscores = JSON.stringify(res.data);
      console.log("Highscores saved to local storage");
    });
  }

  render() {
    var items = [
      { text: "Play Game", link: "/game", visible: "always" },
      { text: "Highscores", link: "/scores", visible: "always" },
      { text: "Login", link: "/login", visible: "not_authenticated" },
      { text: "Register", link: "/register", visible: "not_authenticated" },
      { text: "My Profile", link: "/profile", visible: "authenticated" },
      { text: "Logout", action: "logout", visible: "authenticated" }
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
        <div className={this.props.classes.content}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            style={{ minHeight: "80vh" }}
          >
            {this.props.children}
          </Grid>
        </div>
      </>
    );
  }
}

export default withStyles(layoutStyleSheet)(Layout);
