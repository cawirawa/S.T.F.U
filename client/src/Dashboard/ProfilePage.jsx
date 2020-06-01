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
  Fab,
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
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import "react-google-places-autocomplete/dist/index.min.css";
import MapContainer from "../Components/GMaps";
import { withStyles } from "@material-ui/core/styles";
import firebase from "../base";

const styles = {
  root: {},
  details: {
    display: "flex",
  },
  avatar: {
    marginLeft: "auto",
    flexShrink: 0,
    flexGrow: 0,
    marginBottom: 25,
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
    display: "none",
  },
  mapCont: {
    height: 300,
    width: "99%",
    position: "relative",
    margin: 10,
  },
  gmap: {
    margin: 7,
    width: "100%",
  },
};

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

class ProfilePage extends React.Component {
  state = {
    output: {
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
      skill: [0, 0, 0, 0, 0],
    },

    address: "",
    mainState: 0,
    selectedFile: null,
    currentUser: firebase.auth().currentUser,
    imageUploaded: 0,
    sport: {
      SC: false,
      BK: false,
      BS: false,
      VB: false,
      FB: false,
    },
  };
  mapCallbackLatLng(mapAddress, mapLat, mapLng) {
    this.setState({
      address: mapAddress,
      lat: mapLat,
      lon: mapLng,
    });
  }

  handleSelect(description) {
    geocodeByPlaceId(description.place_id)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        this.setState({
          lat: lat,
          lon: lng,
        });
      });
  }

  componentDidMount() {
    console.log(this.setState.currentUser);
    fetch("http://35.163.180.234/api/profile/get_profile/", {
      method: "GET",
      headers: {
        email: this.state.currentUser.email,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res);
        this.setState({
          output: {
            firstName: res.result.user.first_name,
            email: res.result.user.email,
            username: res.result.user.username,
            phone: res.result.phone,
            age: res.result.age,
            lat: res.result.lat,
            lon: res.result.lon,
            sports: res.result.sports,
            skill:
              res.result.skill.length === 0
                ? [0, 0, 0, 0, 0]
                : res.result.skill,
            lat: res.result.lat,
            bio: res.result.bio,
            selectedFile: res.result.profile_image,
          },
        });
        console.log("state: ", this.state);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  handleSubmit() {
    const requestProfileData = {
      username: this.state.username,
      first_name: this.state.firstName,
      email: this.state.email,
      phone: this.state.phone,
      age: this.state.age,
      lat: this.state.lat,
      lon: this.state.lon,
      sports: this.state.sports,
      bio: this.state.bio,
      profile_image: this.state.profile_image,
      skill: this.state.skill,
    };

    fetch("http://35.163.180.234/api/profile/update_profile/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestProfileData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success: ", data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  handleUploadClick(event) {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({ selectedFile: reader.result });
    }.bind(this);
    console.log(url);

    this.setState({ mainState: "uploaded" });
    this.setState({ imageUploaded: 1 });
    this.setState({ selectedFile: event.target.files[0] });
  }

  validate(values) {
    const errors = required(["firstName", "age"], values);
    return errors;
  }
  handleCheck = (event) => {
    let name = event.target.name;
    let value = event.target.checked;
    this.setState((prev) => {
      prev["sport"][name] = value;
      return prev;
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.root}>
        <CardHeader title="Profile" />
        <Divider />
        <Form
          onSubmit={this.handleSubmit}
          subscription={{ submitting: true }}
          validate={this.validate}
        >
          {({ handleSubmit, submitting }) => (
            <form
              onSubmit={this.handleSubmit}
              className={classes.form}
              noValidate
            >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Fragment>
                      <CardContent>
                        <div className={classes.details}>
                          <div>
                            <Typography gutterBottom variant="h4">
                              {"Hello " + this.state.firstName + " !"}
                            </Typography>
                          </div>
                          <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={this.handleUploadClick}
                          />
                          {this.state.mainState === "initial" ? (
                            <label
                              htmlFor="contained-button-file"
                              className={classes.avatar}
                            >
                              <Fab component="span">
                                <AccountCircleIcon fontSize="large" />
                              </Fab>
                            </label>
                          ) : (
                            <label
                              htmlFor="contained-button-file"
                              className={classes.avatar}
                            >
                              <Fab component="span">
                                <img
                                  width="150%"
                                  height="150%"
                                  src={this.state.selectedFile}
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
                      value={this.state.output.firstName}
                      fullWidth
                      autoFocus
                      autoComplete="cc-name"
                      required
                      label="Full Name"
                      margin="dense"
                      name="firstName"
                      variant="outlined"
                      onChange={(event) => {
                        let value = event.target.value;
                        this.setState((prev) => {
                          return {
                            output: {
                              ...prev.output,
                              firstName: value,
                            },
                          };
                        });
                      }}
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
                      value={this.state.output.username}
                      disabled
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
                      value={this.state.output.email}
                      disabled
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
                      value={this.state.output.phone}
                      onChange={(event) => {
                        let value = event.target.value;
                        this.setState((prev) => {
                          return {
                            output: {
                              ...prev.output,
                              phone: value,
                            },
                          };
                        });
                      }}
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
                      value={this.state.output.age}
                      onChange={(event) => {
                        let value = event.target.value;
                        this.setState((prev) => {
                          return {
                            output: {
                              ...prev.output,
                              age: value,
                            },
                          };
                        });
                      }}
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
                        initialValue={this.state.address}
                        placeholder={this.state.address}
                        onSelect={this.handleSelect}
                      />
                    </div>
                    <div className={classes.mapCont}>
                      <MapContainer
                        center={{ lat: this.state.lat, lng: this.state.lon }}
                        callback={this.mapCallbackLatLng}
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
                                checked={this.state.sport.SC}
                                onChange={this.handleCheck}
                                name="SC"
                              />
                            }
                            label="Soccer"
                          />
                          <Rating
                            name="SC"
                            defaultValue={this.state.output.skill[0]}
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
                                checked={this.state.sport.BK}
                                onChange={this.handleCheck}
                                name="BK"
                              />
                            }
                            label="Basketball"
                          />
                          <Rating
                            name="BK"
                            defaultValue={this.state.output.skill[1]}
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
                                checked={this.state.sport.FB}
                                onChange={this.handleCheck}
                                name="FB"
                              />
                            }
                            label="Football"
                          />
                          <Rating
                            name="FB"
                            defaultValue={this.state.output.skill[3]}
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
                                checked={this.state.sport.VB}
                                onChange={this.handleCheck}
                                name="VB"
                              />
                            }
                            label="Volleyball"
                          />
                          <Rating
                            name="VB"
                            defaultValue={this.state.output.skill[4]}
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
                                checked={this.state.sport.BS}
                                onChange={this.handleCheck}
                                name="BS"
                              />
                            }
                            label="Baseball"
                          />
                          <Rating
                            name="BS"
                            defaultValue={this.state.output.skill[2]}
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
                      value={this.state.output.bio}
                      onChange={(event) => {
                        let value = event.target.value;
                        this.setState((prev) => {
                          return {
                            output: {
                              ...prev.output,
                              bio: value,
                            },
                          };
                        });
                      }}
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
}

export default withStyles(styles)(ProfilePage);
