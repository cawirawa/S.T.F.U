import React, {Component, useContext, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import MatchCard2 from "./MatchCard2";
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
}));

export default function MatchHistoryPage(props){
  const { currentUser } = useContext(AuthContext);
  const match = props.match;
  //const names = match.name;
  const [state, setState] = useState({
    curTime : new Date().toLocaleString()
  });

  function componentDidMount() {
    setInterval( () => {
      this.setState({
        curTime : new Date().toLocaleString()
      })
    },1000)
  }
  const names = [];
  for (let i = 0; i < match.length; i++){
    if (match[i].time > state.curTime ) {
      //names.push(<p>{match[i].name}</p>)
      // eslint-disable-next-line no-unused-expressions
      for (let j = 0; j < match[i].roster.length; j++) {
        if (match[i].roster[j].email === currentUser.email) {
        names.push(<MatchCard2 match={match[i]}/>);
      }
     }
    }else{
        return(<h2>You don't have any match yet!</h2>)
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

        <p>Current Time : {state.curTime} Current User: {currentUser.email}</p>
        {names}
      </div>
  );
}