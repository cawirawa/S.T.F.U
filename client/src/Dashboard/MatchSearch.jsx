import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid';
import MatchCard from './MatchCard';

const useStyles = makeStyles(theme => ({
    root: {
        width: '70%',
        marginTop: 30,
        marginBottom: 25,
        margin: '0 auto',
        alignItems: 'center',
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
}));

// const options = [
//     'Woiks Friendly Match',
//     'FIFA2020 GAME ON',
//     'Bored in the house?',
//     'In the house bored'
// ];

export default function MatchSearch(props) {
    const classes = useStyles();
    // const [, updateState] = React.useState();
    // const forceUpdate = React.useCallback(() => updateState({}), []);
    const [match, setMatch] = React.useState(null);
    // const [card, setCard] = React.useState(
    //     match.map((match) => {
    //     return (
    //     <div key={match.id}>
    //         <MatchCard match={match} />
    //     </div>
    //     );}));
    let options = props.match.map(a => {
        let username = a.roster[0] ? " - " + a.roster[0].username : "";
        return (a.name + username + " (" + a.id + ")");
    });
    const [value, setValue] = useState(options[0]);
    // let updatedMatch;
    // let card;
    // useEffect(() => {
    //         if (updatedMatch) {setMatch(updatedMatch);}
    //         else {setMatch(props.match);}
    //         setCard(match.map((match) => {
    //             return (
    //             <div key={match.id}>
    //                 <MatchCard match={match} />
    //             </div>
    //             );}))

    // },[match, value]);
    // let card = match.map((match) => {
    //     return (
    //     <div key={match.id}>
    //         <MatchCard match={match} />
    //     </div>
    //     );})

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Autocomplete
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                                console.log("newvalue: " + newValue)
                                let matchId = /\d\d\d-\d\d\d\d/.exec(newValue);
                                let filteredMatch;
                                if (newValue) {
                                    filteredMatch = props.match.filter(match => matchId == match.id)
                                }
                                console.log(filteredMatch)
                                setMatch(filteredMatch);
                            }}
                            id="controllable-states-demo"
                            options={options}
                            renderInput={(params) => <TextField {...params} label="Search available matches" variant="outlined" />}
                        />
                        <TextField
                            fullWidth
                            label="Sort by"
                            margin="dense"
                            name="sportsType"
                            variant="outlined"
                            select
                        >
                            <MenuItem value="" selected="selected">Sort by</MenuItem>
                            <MenuItem value="soccer">Most recent</MenuItem>
                            <MenuItem value="basketball">Skill level</MenuItem>
                            <MenuItem value="football">Distance</MenuItem>
                        </TextField>

                    </Grid>
                    <div>
                        {match ?
                            match.map((currMatch) => {
                                console.log(currMatch.name)
                                return (
                                    <div key={currMatch.id}>
                                        <MatchCard match={currMatch} />
                                    </div>
                                );
                            })
                            :
                            props.match.map((match) => {
                                return (
                                    <div key={match.id}>
                                        <MatchCard match={match} />
                                    </div>
                                );
                            })
                        }

                    </div>
                </Grid>
            </div>

        </React.Fragment>

    );
}