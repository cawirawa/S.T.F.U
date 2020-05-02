import React from 'react';
import sports from '../Constant/Sports';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import { CardActions, Button } from '@material-ui/core';
import './MatchCard.css';

const styles = (theme) => ({
  card: {
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
  },
  name: {
    textTransform: 'capitalize',
  }
})

// https://developers.google.com/maps/documentation/geocoding/intro
const MatchCard = props => {
    const match = props.match;
    const {classes} = props;
    var time = /-\d\d-\d\d/.exec(match.time)[0] + '-' + /\d\d\d\d/.exec(match.time)[0];
    time = time.replace('-', '');

    const viewMatchHandler = () => {
      
    }

    return (
      <Button id='card' className={classes.card} onClick={viewMatchHandler}>
        <Card  className={classes.card} >
          <h3 className={classes.matchName} >{match.name}</h3>
          <p><b>Type:</b> {sports[match.type]} <br/>
             <b>Location:</b> {match.city} <br/>
             <b>Date:</b> {time} <br/>
             <b>Players:</b> {match.roster.length}/{match.maxPlayers}<br/>
             <div className={classes.name}><b>Host:</b> {match.roster[0].first_name}</div> </p>
          {/* <CardActions >
            <div>
              <Button className={classes.button} onClick={viewMatchHandler} size="small" color="primary" >View Match</Button>
            </div>
          </CardActions> */}
        </Card>
      </Button>
  );
}


export default withStyles(styles)(MatchCard);