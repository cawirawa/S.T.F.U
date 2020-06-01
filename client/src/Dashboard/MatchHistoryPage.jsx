import React, {Component, useContext, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import MatchCard2 from "./MatchCard2";
import MatchCard3 from "./MatchCard3";
import {Grid} from "@material-ui/core";
import {AuthContext} from "../auth/Auth";

const useStyles = makeStyles((theme) => ({
  h2: {
    fontFamily: "Open Sans",
    color: "gray",
    lineHeight: 1.5,
    fontWeight: 400,
    letterSpacing: "3px",
    margin: "50px",
  },
  matchBox: {
    marginLeft: 150,
  }
}));

export default function MatchHistoryPage(props){
  const { currentUser } = useContext(AuthContext);
  const match = props.match;
  //const names = match.name;
  const [state, setState] = useState({
    curTime : new Date().toLocaleString()
  });

  /*function componentDidMount() {
    setInterval( () => {
      this.setState({
        curTime : new Date().toLocaleString()
      })
    },1000)
  }*/

  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  if(dd<10)
  {
    dd='0'+dd;
  }

  if(mm<10)
  {
    mm='0'+mm;
  }
  today = mm+'-'+dd+'-'+yyyy;
  const names = [];
  const activeMatch = [];
  var date;
  var time;
  var year;
  var month;
  var day;

  for (let i = 0; i < match.length; i++){
    date = /-\d\d-\d\d/.exec(match[i].time) + "/" + /\d\d\d\d/.exec(match[i].time);
    date = date.toString().replace("-", "");
    date = date.toString().replace("-", "/");
    time = /T\d\d:\d\d/.exec(match[i].time);
    time = time.toString().replace("T", "");
    date = date.toString().replace("-", "/");
    year = /\d\d\d\d/.exec(date);
    day = /\/\d\d/.exec(date);
    day = day.toString().replace("/", "");
    month = /\d\d/.exec(date);

    if (parseInt(year) <= parseInt(yyyy) && (parseInt(month) < parseInt(mm) || (parseInt(month) == parseInt(mm) && parseInt(day) < parseInt(dd)))) {
      //names.push(<p>{match[i].name}</p>)
      // eslint-disable-next-line no-unused-expressions
      for (let j = 0; j < match[i].roster.length; j++) {
        if (match[i].roster[j].email === currentUser.email) {
        names.push(<MatchCard2 match={match[i]}/>);
      }
     }
    }
  }

  for (let i = 0; i < match.length; i++){
    date = /-\d\d-\d\d/.exec(match[i].time) + "/" + /\d\d\d\d/.exec(match[i].time);
    date = date.toString().replace("-", "");
    date = date.toString().replace("-", "/");
    time = /T\d\d:\d\d/.exec(match[i].time);
    time = time.toString().replace("T", "");
    date = date.toString().replace("-", "/");
    year = /\d\d\d\d/.exec(date);
    day = /\/\d\d/.exec(date);
    day = day.toString().replace("/", "");
    month = /\d\d/.exec(date);

    if (parseInt(year) >= parseInt(yyyy) && (parseInt(month) > parseInt(mm) || (parseInt(month) == parseInt(mm) && parseInt(day) > parseInt(dd)))) {
      //names.push(<p>{match[i].name}</p>)
      // eslint-disable-next-line no-unused-expressions
      for (let j = 0; j < match[i].roster.length; j++) {
        if (match[i].roster[j].email === currentUser.email) {
          activeMatch.push(<MatchCard3 match={match[i]}/>);
        }
      }
    }
  }

  return (
      <div>
        {/* <h2 className={classes.h2}>Active Matches</h2>
            <MatchCard />
            <h2 className={classes.h2}>Past Matches</h2>
            <MatchCard />
            <MatchCard /> */

        }

        <p>Current Date : {today} Current User Email: {currentUser.email}</p>
        <h1>Active Match</h1>

        {activeMatch}
        <h1>Old Match</h1>
        {names}
      </div>
  );
}