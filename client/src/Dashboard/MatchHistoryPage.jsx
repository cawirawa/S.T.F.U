import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MatchCard2 from "./MatchCard2";
import MatchCard from "./MatchCard";
import {Grid} from "@material-ui/core";
import {AuthContext} from "../auth/Auth";
import { GridList } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "../Landing/modules/components/Typography";

const styles = makeStyles((theme) => ({
  root: {
    display: "stretch",
    backgroundColor: theme.palette.common.white,
    // overflow: "hidden",
  },
  container: {
    // display: "stretch",
    // marginTop: theme.spacing(6),
    // marginBottom: theme.spacing(4),
    position: "relative",
    alignSelf: "left",
    justifyContent: "left",
    height: "50%",
    flexDirection: "column",
  },
  gridContainer: {
    align: "left",
    // flexWrap: "nowrap",
    // height: 275,
    justifyContent: "center",
  },
  cardContainer: {
    align: "left",
    // flexWrap: "nowrap",
    height: 275,
    justifyContent: "center",
    marginTop: "40px",
    marginBottom: "40px",
    // overflowY: "hidden",
  }
}));

function MatchHistoryPage(props) {
  const { classes } = props;
  const { currentUser } = useContext(AuthContext);
  const match = props.match;
  const [state, setState] = useState({
    curTime: new Date().toLocaleString(),
  });

  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  today = mm+'-'+dd+'-'+yyyy;
  const pastMatch = [];
  const activeMatch = [];
  var date;
  var time;
  var year;
  var month;
  var day;

  for (let i = 0; i < match.length; i++) {
    date =
      /-\d\d-\d\d/.exec(match[i].time) + "/" + /\d\d\d\d/.exec(match[i].time);
    date = date.toString().replace("-", "");
    date = date.toString().replace("-", "/");
    time = /T\d\d:\d\d/.exec(match[i].time);
    time = time.toString().replace("T", "");
    date = date.toString().replace("-", "/");
    year = /\d\d\d\d/.exec(date);
    day = /\/\d\d/.exec(date);
    day = day.toString().replace("/", "");
    month = /\d\d/.exec(date);

    if (
      parseInt(year) <= parseInt(yyyy) &&
      (parseInt(month) < parseInt(mm) ||
        (parseInt(month) === parseInt(mm) && parseInt(day) < parseInt(dd)))
    ) {
        for (let j = 0; j < match[i].roster.length; j++) {
          if (match[i].roster[j].email === currentUser.email) {
          pastMatch.push(match[i]);
        }
      }
    }
  }

  for (let i = 0; i < match.length; i++) {
    date =
      /-\d\d-\d\d/.exec(match[i].time) + "/" + /\d\d\d\d/.exec(match[i].time);
    date = date.toString().replace("-", "");
    date = date.toString().replace("-", "/");
    time = /T\d\d:\d\d/.exec(match[i].time);
    time = time.toString().replace("T", "");
    date = date.toString().replace("-", "/");
    year = /\d\d\d\d/.exec(date);
    day = /\/\d\d/.exec(date);
    day = day.toString().replace("/", "");
    month = /\d\d/.exec(date);

    if (parseInt(year) >= parseInt(yyyy) && (parseInt(month) > parseInt(mm) || (parseInt(month) == parseInt(mm) && parseInt(day) >= parseInt(dd)))) {
      //names.push(<p>{match[i].name}</p>)
      // eslint-disable-next-line no-unused-expressions
      for (let j = 0; j < match[i].roster.length; j++) {
        if (match[i].roster[j].email === currentUser.email) {
          console.log("match found");
          activeMatch.push(match[i]);
          console.log("match details", match[i]);
          // activeMatch.push(<MatchCard match={match[i]}/>);
        }
      }
    }
  }

  return (

      <Container className={classes.container}>
        <p>
          Current Date : {today} Current User Email: {currentUser.email}
        </p>
        <Typography
          variant="h4"
          marked="center"
          align="center"
          component="h2"
          color="inherit"
          border="auto"
          style={{ paddingBottom: 50, paddingTop: 25 }}
        >
          Active Matches
        </Typography>
        <GridList className={classes.gridContainer} cols={1}>
          {activeMatch.map((match) => {
            return (
              <div key={match.id}>
                <MatchCard className={classes.cardContainer} match={match} disabled={true} />
              </div>
            );
          })}
        </GridList>
        <Typography
          variant="h4"
          marked="center"
          align="center"
          component="h2"
          color="inherit"
          border="auto"
          style={{ paddingBottom: 50, paddingTop: 25 }}
        >
          Past Matches
        </Typography>
        <GridList className={classes.gridContainer} cols={1}>
          {pastMatch.map((match) => {
            return (
              <div key={match.id}>
                <MatchCard2 className={classes.cardContainer} match={match} disabled={true} />
              </div>
            );
          })}
        </GridList>
      </Container>
  );
}

export default withStyles(styles)(MatchHistoryPage);
