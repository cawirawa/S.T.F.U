import React, { useState, Fragment, useContext, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  Typography,
  Avatar,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Fab
} from "@material-ui/core";
import { TextField } from "mui-rff";
import { Form } from "react-final-form";
import { email, required } from "../Landing/modules/form/validation";
import Rating from "@material-ui/lab/Rating";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import SaveIcon from "@material-ui/icons/Save";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GooglePlacesAutocomplete, { geocodeByPlaceId, geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';
import MapContainer from '../Components/GMaps';
import useForceUpdate from 'use-force-update';
import { AuthContext } from "../auth/Auth";

const useStyles = makeStyles((theme) => ({
  root: {},
  details: {
    display: "flex",
  },
  avatar: {
    marginLeft: "auto",
    flexShrink: 0,
    flexGrow: 0,
    marginBottom: 25
  },
  divider: {
    marginBottom: 15,
  },
  locationText: {
    marginLeft: 6,
  },
  form: {
    marginTop: 6,
  },
  formControl: {
    margin: 3,
  },
  rating: {
    verticalAlign: "text-top",
    top: 7,
  },
  input: {
    display: "none"
  },
  mapCont: {
    height: 300,
    width: "99%",
    position: 'relative',
    margin: 10,
  },
  gmap: {
    margin: 7,
    width: "100%"
  }
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}


export default function ProfilePage(props) {
  const { className, ...rest } = props;
  const [sent, setSent] = useState(false);
  const classes = useStyles();
  const [skill, setSkill] = useState({
    SC: 0,
    BK: 0,
    BS: 0,
    FB: 0,
    VB: 0
  });
  const [state, setState] = useState({
    firstName: "",
    username: "",
    email: "",
    phone: "",
    lat: "",
    lon: "",
    age: "",
    bio: "",
    profile_image: null,
    sports: [],
    skill: [skill.SC, skill.BK, skill.BS, skill.FB, skill.VB],
    address: '',
  });
  const [sport, setSport] = useState({
    SC: false,
    BK: false,
    BS: false,
    FB: false,
    VB: false
  });
  const [mainState, setMainState] = useState("initial");
  const [imageUploaded, setImageUploaded] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const { currentUser } = useContext(AuthContext);

  const forceUpdate = useForceUpdate();
  const mapCallbackLatLng = (mapAddress, mapLat, mapLng) => {
    setState({
      ...state,
      address: mapAddress,
      lat: mapLat,
      lon: mapLng
    })
  }

  const handleSelect = (description) => {
    geocodeByPlaceId(description.place_id)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setState({
          ...state,
          lat: lat,
          lon: lng
        });
        forceUpdate();
      })
  }

  useEffect(() => {
    fetch("http://35.163.180.234/api/profile/get_profile/",
      {
        method: "GET",
        headers: {
          email: currentUser.email,
        },
      }
    )
      .then(response => {
        return response.json();
      })
      .then((res) => {
        setState({
          ...state,
          [state.username]: res.result.user.username,
          [state.firstName]: res.result.user.first_name,
          [state.email]: res.result.user.email,
          [state.phone]: res.result.phone,
          [state.age]: res.result.age,
          [state.lat]: res.result.lat,
          [state.lon]: res.result.lon,
          [state.sports]: res.result.sports,
          [state.skill]: res.result.skill,
          [state.lat]: res.result.lat,
          [state.bio]: res.result.bio,
          [selectedFile]: res.result.profile_image,
        });
      })
      .catch((error) => {
        console.error('Error: ', error)
      })
  });

  async function handleSubmit() {
    const updateProfileData = {
      username: state.username,
      first_name: state.firstName,
      email: state.email,
      phone: state.phone,
      age: state.age,
      lat: state.lat,
      lon: state.lon,
      sports: state.sports,
      bio: state.bio,
      profile_image: state.profile_image,
      skill: state.skill,
    }
    fetch("http://35.163.180.234/api/profile/update_profile/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProfileData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success: ', data)
      })
      .catch((error) => {
        console.error('Error: ', error)
      })
  }

  const handleUploadClick = event => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setSelectedFile([reader.result])
    }.bind(this);
    console.log(url);

    setMainState("uploaded");
    setImageUploaded(1);
    setSelectedFile(event.target.files[0]);
  };

  const validate = (state) => {
    const errors = required(
      [
        "firstName",
        "username",
        "email",
        "phone",
        "age",
      ],
      state
    );

    if (!errors.email) {
      const emailError = email(state.email, state);
      if (emailError) {
        errors.email = email(state.email, state);
      }
    }

    return errors;
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    setSport({
      ...sport,
      [event.target.name]: event.target.checked,
    });
    setSkill({
      ...skill,
      [event.target.name]: event.target.value,
    });
    setSent(true);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Profile" />
      <Divider />
      <Form
        onSubmit={handleSubmit}
        subscription={{ submitting: true }}
        validate={validate}
      >
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Fragment>
                    <CardContent>
                      <div className={classes.details}>
                        <div>
                          <Typography gutterBottom variant="h4">
                            {"Hello " + state.firstName + " !"}
                          </Typography>
                        </div>
                        <input
                          accept="image/*"
                          className={classes.input}
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={handleUploadClick}
                        />
                        {mainState === "initial" ?
                          (
                            <label htmlFor="contained-button-file" className={classes.avatar}>
                              <Fab component="span">
                                <AccountCircleIcon fontSize="large" />
                              </Fab>
                            </label>
                          ) :
                          (
                            <label htmlFor="contained-button-file" className={classes.avatar}>
                              <Fab component="span" >
                                <img
                                  width="150%"
                                  height="150%"
                                  src={selectedFile}
                                />
                              </Fab>
                            </label>
                          )}
                      </div>
                    </CardContent>
                    <Divider className={classes.divider} />
                  </Fragment>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    autoFocus
                    autoComplete="cc-name"
                    required
                    label="Full Name"
                    margin="dense"
                    name="firstName"
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    autoComplete="username"
                    required
                    label="Username"
                    margin="dense"
                    name="username"
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    autoComplete="email"
                    required
                    label="Email"
                    margin="dense"
                    name="email"
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    autoComplete="tel"
                    required
                    label="Phone Number"
                    margin="dense"
                    name="phone"
                    type="number"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Age"
                    margin="dense"
                    name="age"
                    required
                    variant="outlined"
                    select
                  >
                    <MenuItem value="" selected="selected">
                      Select Age Range
                    </MenuItem>
                    <MenuItem value="1">16-18</MenuItem>
                    <MenuItem value="2">19-21</MenuItem>
                    <MenuItem value="3">22-25</MenuItem>
                    <MenuItem value="4">26-30</MenuItem>
                    <MenuItem value="5">30+</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <div className={classes.gmap}>
                    <GooglePlacesAutocomplete
                      initialValue={state.address}
                      placeholder={state.address}
                      onSelect={handleSelect}
                    />
                  </div>
                  <div className={classes.mapCont}>
                    <MapContainer
                      center={{ lat: state.lat, lng: state.lon }}
                      callback={mapCallbackLatLng}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">
                        Sports Type - Skill Level
                      </FormLabel>
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={sport.SC}
                              onChange={handleChange}
                              name="SC"
                            />
                          }
                          label="Soccer"
                        />
                        <Rating
                          name="SC"
                          defaultValue={skill.SC}
                          getLabelText={(value) => customIcons[value].label}
                          IconContainerComponent={IconContainer}
                          className={classes.rating}
                        />
                      </FormGroup>
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={sport.BK}
                              onChange={handleChange}
                              name="BK"
                            />
                          }
                          label="Basketball"
                        />
                        <Rating
                          name="BK"
                          defaultValue={skill.BK}
                          getLabelText={(value) => customIcons[value].label}
                          IconContainerComponent={IconContainer}
                          className={classes.rating}
                        />
                      </FormGroup>
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={sport.FB}
                              onChange={handleChange}
                              name="FB"
                            />
                          }
                          label="Football"
                        />
                        <Rating
                          name="FB"
                          defaultValue={skill.FB}
                          getLabelText={(value) => customIcons[value].label}
                          IconContainerComponent={IconContainer}
                          className={classes.rating}
                        />
                      </FormGroup>
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={sport.VB}
                              onChange={handleChange}
                              name="VB"
                            />
                          }
                          label="Volleyball"
                        />
                        <Rating
                          name="VB"
                          defaultValue={skill.VB}
                          getLabelText={(value) => customIcons[value].label}
                          IconContainerComponent={IconContainer}
                          className={classes.rating}
                        />
                      </FormGroup>
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={sport.baseball}
                              onChange={handleChange}
                              name="BS"
                            />
                          }
                          label="Baseball"
                        />
                        <Rating
                          name="BS"
                          defaultValue={skill.BS}
                          getLabelText={(value) => customIcons[value].label}
                          IconContainerComponent={IconContainer}
                          className={classes.rating}
                        />
                      </FormGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    rows={3}
                    rowsMax={6}
                    margin="dense"
                    variant="outlined"
                    name="bio"
                    label="About Me"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                color="primary"
                variant="contained"
                startIcon={<SaveIcon />}
                type="submit"
              >
                Save
              </Button>
            </CardActions>
          </form>
        )}
      </Form>
    </Card>
  );
}
