import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
});

class ScoreList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    const highscoreList = this.props.highscores.map(score => {
      return (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>{score.name[0].toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={score.score.toString()}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    User: &nbsp;
                  </Typography>
                  {score.name}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      );
    });

    return (
      <Container maxWidth="sm">
        <Typography variant="h3" className={classes.title} color="primary">
          Top Scores
        </Typography>
        <Divider />
        <List className={classes.root}>{highscoreList}</List>
      </Container>
    );
  }
}
export default withStyles(styles, { withTheme: true })(ScoreList);
