import React, { Fragment, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Divider, MenuItem, FormLabel, CardContent, Container } from '@material-ui/core';
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
import GooglePlacesAutocomplete, { geocodeByPlaceId, geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';
import MapContainer from '../Components/GMaps';
import useForceUpdate from 'use-force-update';


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
  mapCont: {
    height: "300px",
    width: "518px",
    position: "relative"
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
    Lat: 32.8801,
    Lng: -117.2340,
    address:'',
    // venueName '',
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const forceUpdate = useForceUpdate();
  const mapCallbackLatLng = ( mapAddress, mapLat, mapLng ) => {
    setState ({
      ...state,
      address: mapAddress,
      Lat: mapLat,
      Lng: mapLng
    })
    //
    // forceUpdate();
  }


  //autocomp
  const handleSelect = (description) => {
    geocodeByPlaceId(description.place_id)
        .then(results => getLatLng(results[0]))
        .then(({lat, lng}) => {
              console.log('Successfully got latitude and longitude', {lat, lng});
              setState({
                ...state,
                Lat: lat,
                Lng: lng
              });

              forceUpdate();
            }
        )
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // console.log('usePosvalue', latitude);

  console.log('statevalue', state);


  console.log('date value', selectedDate );

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
      // [event.target.name]: event.target.value
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Fragment>
        <Grid container className={classes.outer}>
          <Grid item xs={5}>
            <MatchSearch match={props.match}/>
          </Grid>
          <Grid item xs={2} className={classes.createMatch}>
            <Button variant="contained" color="primary" onClick={handleClickOpen}
                    className={classes.button}>
              Create Match
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
              <DialogTitle id="form-dialog-title">Create New Match</DialogTitle>
              <DialogContent>
                <Form
                    onSubmit={handleChange}
                    subscription={{submitting: true}}
                >
                  {({handleSubmit, submitting}) => (
                      <form  className={classes.form} noValidate>
                        <CardContent spacing={2}>
                          <TextField
                              fullWidth
                              autoFocus
                              onChange={handleChange}
                              label="Match Name"
                              margin="dense"
                              name="matchName"
                              variant="outlined"
                          />
                          <TextField
                              fullWidth
                              onChange={handleChange}
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
                              name="skillLevel"
                              onChange={(event, newValue) => {
                                setState({
                                  ...state,
                                  skillLevel: newValue,
                                });
                              }}
                              defaultValue={0}
                              getLabelText={(value) => customIcons[value].label}
                              IconContainerComponent={IconContainer}
                              className={classes.rating}
                          />
                          <TextField
                              onChange={handleChange}
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
                              onChange={handleChange}
                              fullWidth
                              id="outlined-number"
                              label="Number of players"
                              type="number"
                              margin="dense"
                              name="numOfPlayers"
                              variant="outlined"
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
                          <div>
                            <GooglePlacesAutocomplete
                                initialValue={state.address}
                                placeholder={state.address}
                                onSelect={handleSelect}
                            />
                          </div>
                          <div className={classes.mapCont}>
                            <MapContainer
                                center={{lat: state.Lat, lng: state.Lng}}
                                callback={mapCallbackLatLng}
                            />
                          </div>
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
                              onChange={handleChange}
                              multiline
                              rows={3}
                              rowsMax={6}
                              margin="dense"
                              variant="outlined"
                              name="notes"
                              label="Match Description"
                              fullWidth
                          />
                        </CardContent>
                        <Divider/>
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
          </Grid>
        </Grid>
      </Fragment>
  );

}