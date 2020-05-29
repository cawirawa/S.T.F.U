import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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
    button: {
        textTransform: "none"
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
    let filter_match = props.match;
    filter_match = filter_match.filter(filter_match=>{
        return props.type == '' || props.type == filter_match.type;
    });

    let card = filter_match.map((match) => {
        return (
        <div key={match.id}>
            <MatchCard match={match} />
        </div>
        );})

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [txt, setTxt] = useState("None");

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleRecent = () => {
        setAnchorEl(null);
        setTxt("Most Recent");
      };

    const handleSkill = () => {
        setAnchorEl(null);
        setTxt("Skill Level");
      };

    const handleDist = () => {
        setAnchorEl(null);
        setTxt("Distance");
      };


    
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

                        <Button className={classes.button} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            Sort by: {txt}
                        </Button>

                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleRecent}>Most Recent</MenuItem>
                            <MenuItem onClick={handleSkill}>Skill level</MenuItem>
                            <MenuItem onClick={handleDist}>Distance</MenuItem>
                        </Menu>

                    </Grid>
                </Grid>
                                    
                <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                        {card}
                </Grid>
            </div>

        </React.Fragment>

    );
}