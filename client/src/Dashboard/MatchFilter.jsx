import React, { Fragment, useState, useRef, useEffect, useMemo } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Divider, MenuItem, FormLabel, CardContent, Typography } from '@material-ui/core';
// import MatchCard from './MatchCard';
import MatchSearch from './MatchSearch';
import { Form } from "react-final-form";
import Rating from '@material-ui/lab/Rating';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';

import Box from '@material-ui/core/Box';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const StyledRating = withStyles({
    iconFilled: {
      color: '#ff6d75',
    },
    iconHover: {
      color: '#ff3d47',
    },
  })(Rating);
  
  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon />,
      label: 'Very Satisfied',
    },
  };
  
  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }
  
  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };

const useStyles = makeStyles((theme) => ({
    details: {
        display: 'flex'
    },
    avatar: {
        marginLeft: 'auto',
        height: 100,
        width: 100,
        flexShrink: 0,
        flexGrow: 0
    },
    divider: {
        marginBottom: 15,
    },
    locationText: {
        marginLeft: 6
    },
    form: {
        marginTop: 6,
    },
    formControl: {
        margin: 3
    },
    rating: {
        verticalAlign: 'text-top',
        top: 7
    },
    root: {
        marginTop: 35,
        margin: '0 auto',
    },
    button: {
        marginTop: 40,
        margin: '0 auto',
    },
    icon: {
        marginRight: 2,
    },
    outer: {
        display: "flex",
        justifyContent: 'space-between',
    },
    createMatch: {
        marginRight: "4%",
    },
    root: {
        width: 250,
    },
    input: {
        width: 42,
    },
    expanded: {
        '&.MuiExpansionPanel-root:before': {
        display: 'none',
        },
        boxShadow: 'none',
        margin: '0 auto',
    },
}));

const MySlider = withStyles({
    root: {
      color: '#3880ff',
      height: 2,
      padding: '15px 0',
    },
    active: {},
    valueLabel: {
      top: -18,
      '& *': {
        background: 'transparent',
        color: '#000',
      },
    },
    track: {
      height: 2,
    },
    rail: {
      height: 2,
      opacity: 0.5,
      backgroundColor: '#bfbfbf',
    }
})(Slider);

const marks = [
    {
      value: 0,
      label: '0 mi',
    },
    {
      value: 50,
      label: '50 mi',
    },
    {
      value: 100,
      label: '100 mi',
    }
  ];

export default function MatchFilter(props) {
    let match = props.match;

    const classes = useStyles();

    var filterStyle = {
        padding: 20
    }

    const handleTypeChange = (event) => {
        setValue(event.target.value);
    };

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const [state, setState] = React.useState({
        time1: false,
        time2: false,
        time3: false,
        time4: false,
        time5: false
      });
          
      const { time1, time2, time3, time4, time5 } = state;
      const error = [time1, time2, time3, time4, time5].filter((v) => v).length !== 2;

      const [value, setValue] = React.useState(30);
    
    return(
        <Fragment>
            <h1> Filter</h1>

            <Box component="fieldset" mb={3} borderColor="grey">

            <ExpansionPanel className={classes.expanded} defaultExpanded='true'>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}> Sports Type</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <FormControl component="fieldset">    
                            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleTypeChange}>
                                <FormControlLabel value="soccer" control={<Radio color="primary" />} label="Soccer" />
                                <FormControlLabel value="basketball" control={<Radio color="primary" />} label="Basketball" />
                                <FormControlLabel value="football" control={<Radio color="primary" />} label="Football" />
                                <FormControlLabel value="volleyball" control={<Radio color="primary" />} label="Volleyball" />
                                <FormControlLabel value="baseball" control={<Radio color="primary" />} label="Baseball" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <div style={filterStyle}>
                <FormLabel component="legend">Skill Level</FormLabel>
                <Rating
                name="customized-icons"
                defaultValue={0}
                getLabelText={(value) => customIcons[value].label}
                IconContainerComponent={IconContainer}
                />
            </div>

            <div>
                <FormLabel component="legend">Distance</FormLabel>
                <div style={filterStyle}>
                <MySlider aria-label="my slider" defaultValue={50} marks={marks} valueLabelDisplay="on" />
                </div>
            </div>

            <ExpansionPanel className={classes.expanded} defaultExpanded='true'>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}> Time</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox checked={time1} onChange={handleChange} name="time1" color="primary" />}
                                    label="Today"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={time2} onChange={handleChange} name="time2" color="primary" />}
                                    label="Tomorrow "
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={time3} onChange={handleChange} name="time3" color="primary" />}
                                    label="In a 3 days"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={time4} onChange={handleChange} name="time4" color="primary" />}
                                    label="In a week"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={time5} onChange={handleChange} name="time5" color="primary" />}
                                    label="In a month"
                                />
                            </FormGroup>
                        </FormControl>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            </Box>
        </Fragment>
    );


}

