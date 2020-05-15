import React, { Fragment, useState, useRef, useEffect, useMemo } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Divider, MenuItem, FormLabel, CardContent, Typography } from '@material-ui/core';
// import MatchCard from './MatchCard';
import MatchSearch from './MatchSearch';
import { Form } from "react-final-form";
import Rating from '@material-ui/lab/Rating';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

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
    }
}));

function loadScript(src, position, id) {
    if (!position) {
        return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}

const autocompleteService = { current: null };

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

export default function MatchPage(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        matchName: '',
        sportsType: '',
        skillLevel: '',
        age: '',
        location: '',
        duration: '',
        numOfPlayers: '',
        notes: '',
    });
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const loaded = useRef(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#google-maps')) {
            loadScript(
                'https://maps.googleapis.com/maps/api/js?key=AIzaSyBwRp1e12ec1vOTtGiA4fcCt2sCUS78UYc&libraries=places',
                document.querySelector('head'),
                'google-maps',
            );
        }

        loaded.current = true;
    }

    const fetch = useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions(request, callback);
            }, 200),
        [],
    );

    useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <Fragment>
            <Grid container className={classes.outer}>
                <Grid item xs={5}>
                    <MatchSearch match={props.match} />
                </Grid>
                <Grid item xs={2} className={classes.createMatch}>
                    <Button variant="contained" color="primary" onClick={handleClickOpen} className={classes.button}>
                        Create Match
                    </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
                        <DialogTitle id="form-dialog-title">Create New Match</DialogTitle>
                        <DialogContent>
                            <Form
                                onSubmit={handleChange}
                                subscription={{ submitting: true }}
                            >
                                {({ handleSubmit, submitting }) => (
                                    <form onSubmit={handleChange} className={classes.form} noValidate>
                                        <CardContent spacing={2}>
                                            <TextField
                                                fullWidth
                                                autoFocus
                                                label="Match Name"
                                                margin="dense"
                                                name="matchName"
                                                variant="outlined"
                                            />
                                            <TextField
                                                fullWidth
                                                label="Sports Type"
                                                margin="dense"
                                                name="sportsType"
                                                variant="outlined"
                                                select
                                            >
                                                <MenuItem value="" selected="selected">Select Sports Type</MenuItem>
                                                <MenuItem value="soccer">Soccer</MenuItem>
                                                <MenuItem value="basketball">Basketball</MenuItem>
                                                <MenuItem value="football">Football</MenuItem>
                                                <MenuItem value="volleyball">Volleyball</MenuItem>
                                                <MenuItem value="baseball">Baseball</MenuItem>
                                            </TextField>
                                            <FormLabel component="legend">Skill Level</FormLabel>
                                            <Rating
                                                name="customized-icons"
                                                defaultValue={0}
                                                getLabelText={(value) => customIcons[value].label}
                                                IconContainerComponent={IconContainer}
                                                className={classes.rating}
                                            />
                                            <TextField
                                                fullWidth
                                                label="Age Range"
                                                margin="dense"
                                                name="age"
                                                variant="outlined"
                                                select
                                            >
                                                <MenuItem value="" selected="selected">Select Age Range</MenuItem>
                                                <MenuItem value="1">16-18</MenuItem>
                                                <MenuItem value="2">19-21</MenuItem>
                                                <MenuItem value="3">22-25</MenuItem>
                                                <MenuItem value="4">26-30</MenuItem>
                                                <MenuItem value="5">30+</MenuItem>
                                            </TextField>
                                            <TextField
                                                fullWidth
                                                label="Number of players"
                                                margin="dense"
                                                name="numOfPlayers"
                                                variant="outlined"
                                                select
                                            >
                                                <MenuItem value="" selected="selected">Select a number</MenuItem>
                                                <MenuItem value="1">1</MenuItem>
                                                <MenuItem value="2">2</MenuItem>
                                                <MenuItem value="3">3</MenuItem>
                                                <MenuItem value="4">4</MenuItem>
                                                <MenuItem value="5">5</MenuItem>
                                                <MenuItem value="6">6</MenuItem>
                                                <MenuItem value="7">7</MenuItem>
                                                <MenuItem value="8">8</MenuItem>
                                                <MenuItem value="9">9</MenuItem>
                                                <MenuItem value="10">10</MenuItem>
                                            </TextField>
                                            <Autocomplete
                                                id="google-map-demo"
                                                fullWidth
                                                margin="dense"
                                                getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
                                                filterOptions={(x) => x}
                                                options={options}
                                                autoComplete
                                                includeInputInList
                                                filterSelectedOptions
                                                value={value}
                                                onChange={(event, newValue) => {
                                                    setOptions(newValue ? [newValue, ...options] : options);
                                                    setValue(newValue);
                                                }}
                                                onInputChange={(event, newInputValue) => {
                                                    setInputValue(newInputValue);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Add a location" variant="outlined" fullWidth />
                                                )}
                                                renderOption={(option) => {
                                                    const matches = option.structured_formatting.main_text_matched_substrings;
                                                    const parts = parse(
                                                        option.structured_formatting.main_text,
                                                        matches.map((match) => [match.offset, match.offset + match.length]),
                                                    );

                                                    return (
                                                        <Grid container alignItems="center">
                                                            <Grid item>
                                                                <LocationOnIcon className={classes.icon} />
                                                            </Grid>
                                                            <Grid item xs>
                                                                {parts.map((part, index) => (
                                                                    <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                                                        {part.text}
                                                                    </span>
                                                                ))}

                                                                <Typography variant="body2" color="textSecondary">
                                                                    {option.structured_formatting.secondary_text}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    );
                                                }}
                                            />
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Grid container justify="space-around">
                                                    <KeyboardDatePicker
                                                        margin="normal"
                                                        id="date-picker-dialog"
                                                        label="Date picker dialog"
                                                        format="MM/dd/yyyy"
                                                        value={selectedDate}
                                                        onChange={handleDateChange}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                    <KeyboardTimePicker
                                                        margin="normal"
                                                        id="time-picker"
                                                        label="Time picker"
                                                        value={selectedDate}
                                                        onChange={handleDateChange}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change time',
                                                        }}
                                                    />
                                                </Grid>
                                            </MuiPickersUtilsProvider>
                                            <TextField
                                                multiline
                                                rows={3}
                                                rowsMax={6}
                                                margin="dense"
                                                variant="outlined"
                                                name="notes"
                                                label="Additional Notes"
                                                fullWidth
                                            />
                                        </CardContent>
                                        <Divider />
                                        <DialogActions>
                                            <Button
                                                color="primary"
                                                variant="contained"
                                            >
                                                Create
                                        </Button>
                                            <Button onClick={handleClose} color="primary">
                                                Cancel
                                            </Button>
                                        </DialogActions>
                                    </form>
                                )}
                            </Form>
                        </DialogContent>
                    </Dialog>
                </Grid >
            </Grid >
            
            
        </Fragment >
    );
}