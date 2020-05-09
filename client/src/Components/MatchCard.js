import React, { Component } from "react";
import { Redirect } from "react-dom";
import sports from "../Constant/Sports";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import "./MatchCard.css";
import honeycomb from "../Assets/HoneyComb.png";

const styles = (theme) => ({
  button: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    display: "inline",
    justifyContent: "center",
    flex: 1,
    padding: 0,
    margin: 0,
    backgroundColor: theme.palette.primary.light,
  },

  card: {
    backgroundImage: `url(${honeycomb})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    // paddingLeft: 25,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textTransform: "capitalize",
    width: 385,
    height: 220,
    fontWeight: "normal",
  },
  matchName: {
    textTransform: "uppercase",
  },
});

// https://developers.google.com/maps/documentation/geocoding/intro
class MatchCard extends Component {
  state = {
    redirect: false,
  };

  viewMatchHandler = () => {
    this.setState({ redirect: true });
  };

  render() {
    const match = this.props.match;
    const { classes } = this.props;
    var time =
      /-\d\d-\d\d/.exec(match.time)[0] + "-" + /\d\d\d\d/.exec(match.time)[0];
    time = time.replace("-", "");

    if (this.state.redirect) {
      return <Redirect to={{ pathname: "/matchdetail/", match: match.id }} />;
    }

    return (
      <Button
        id="card"
        className={classes.button}
        onClick={this.viewMatchHandler}
      >
        <Card className={classes.card}>
          <h3 className={classes.matchName}>{match.name}</h3>
          <label>
            {" "}
            <b>Type:</b> {sports[match.type]}{" "}
          </label>
          <label>
            {" "}
            <b>Location:</b> {match.city}{" "}
          </label>
          <label>
            {" "}
            <b>Date:</b> {time}{" "}
          </label>
          <label>
            {" "}
            <b>Players:</b> {match.roster.length}/{match.maxPlayers}{" "}
          </label>
          <div>
            {" "}
            <label>
              {" "}
              <b>Host:</b>
            </label>{" "}
            <label>{match.roster[0].first_name}</label>
          </div>
        </Card>
      </Button>
    );
  }
}

export default withStyles(styles)(MatchCard);
