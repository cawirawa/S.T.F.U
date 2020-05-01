import React from 'react';
import sports from '../Constant/Sports';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import { CardActions, Button } from '@material-ui/core';
import './MatchCard.css';

const styles = (theme) => ({
  card: {
    margin: 30,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'center',
    justiifyContent: 'center',
    width: 250,
  },
  matchName: {
    textTransform: 'uppercase',
  }
})

// https://developers.google.com/maps/documentation/geocoding/intro
const MatchCard = props => {
    const match = props.match;
    const {classes} = props;
    var time = /-\d\d-\d\d/.exec(match.time)[0] + '-' + /\d\d\d\d/.exec(match.time)[0];
    time = time.replace('-', '');
    return (
      <form>
        <Card id='card' className={classes.card} >
          <h3 className={classes.matchName} >{match.name}</h3>
          <p><b>Type:</b> {sports[match.type]} <br/>
             <b>Location:</b> San Diego <br/>
             <b>Time:</b> {time} <br/>
             <b>Players:</b> {match.roster.length}/{match.maxPlayers}<br/>
            <b>Host:</b> {match.roster[0].first_name} </p>
          <CardActions >
            <div>
              <Button className={classes.button} size="small" color="primary" >View Match</Button>
            </div>
          </CardActions>
        </Card>
      </form>
  );
}


export default withStyles(styles)(MatchCard);