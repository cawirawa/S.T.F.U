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
    var test_lat = 32.8801;
    var test_lon = -117.2361;

    let options = props.match.map(a => {
        let username = a.roster[0] ? " - " + a.roster[0].username : "";
        return (a.name + username + " (" + a.id + ")");
    });
    
    const [value, setValue] = useState(options[0]);
    let filter_match = props.match;
    filter_match = filter_match.filter(filter_match=>{
        return props.type == '' || props.type == filter_match.type;
    });

    filter_match = filter_match.filter(filter_match=>{
        return props.level == 0 || (props.level >= filter_match.minSkill && props.level <= filter_match.maxSkill);
    });

    filter_match = filter_match.filter(filter_match=>{
        var lat1 = test_lat * (Math.PI/180);
        var lat2= filter_match.lat * (Math.PI/180);
        var long1 = test_lon * (Math.PI/180);
        var long2 = filter_match.lon * (Math.PI/180);

        var dlat = lat2 - lat1;
        var dlong = long2 - long1;

        var dist = Math.pow(Math.sin(dlat/2),2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlong/2), 2);
        dist = 2 * Math.asin(Math.sqrt(dist));

        var radius = 3956;
        // distance between location and uswer
        dist = dist * radius;
        
        // distance should be less than f_dist
        return dist <= props.dist;
    });

    filter_match = filter_match.filter(filter_match=>{
        var year = filter_match.time.slice(0,3);
        var month = filter_match.time.slice(5,6);
        var date = filter_match.time.slice(8,9);
        var hour = filter_match.time.slice(11,12);
        var min = filter_match.time.slice(14,15);
        var sec = filter_match.time.slice(17,19);

        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1)

        var c_date = new Date().getDate(); //To get the Current Date
        var c_month = new Date().getMonth() + 1; //To get the Current Month
        var c_year = new Date().getFullYear(); //To get the Current Year
        var c_hours = new Date().getHours(); //To get the Current Hours
        var c_min = new Date().getMinutes(); //To get the Current Minutes
        var c_sec = new Date().getSeconds(); //To get the Current Seconds

        var options = true;
        if (props.time1 === true) {
            if(date != c_date) {
                options = options && false;
            }
        }

        if (props.time2 === true) {
            if(parseInt(date) != tomorrow.getDate()) {
                options = options && false;
            }
        }

        return options;
    });

    let card = filter_match.map((match) => {
        var year = match.time.slice(0,3);
        var month = match.time.slice(5,6);
        var date = match.time.slice(8,9);
        var hour = match.time.slice(11,12);
        var min = match.time.slice(14,15);
        var sec = match.time.slice(17,19);

        var c_date = new Date().getDate(); //To get the Current Date
        var c_month = new Date().getMonth() + 1; //To get the Current Month
        var c_year = new Date().getFullYear(); //To get the Current Year
        var c_hours = new Date().getHours(); //To get the Current Hours
        var c_min = new Date().getMinutes(); //To get the Current Minutes
        var c_sec = new Date().getSeconds(); //To get the Current Seconds

        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

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

    const handleReset = () => {
        setAnchorEl(null);
        filter_match = props.match;
        setTxt("None");
      };
      
    const handleRecent = () => {
        setAnchorEl(null);
        filter_match.sort(function(a,b){
            return a.time - b.time;
        })
        setTxt("Most Recent");
      };

    const handleSkill = () => {
        setAnchorEl(null);
        filter_match.sort(function(a,b){
            return a.maxSkill - b.maxSkill;
        })
        setTxt("Skill Level");
      };

    const handleDist = () => {
        setAnchorEl(null);
        filter_match.sort(function(a,b){
            return a.locaton - b.location;
        })
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
                            <MenuItem onClick={handleReset}>None</MenuItem>
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