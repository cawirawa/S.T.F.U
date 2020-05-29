import React, { useState, Fragment } from "react";
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

const useStyles = makeStyles((theme) => ({
  root: {},
  details: {
    display: "flex",
  },
  avatar: {
    marginLeft: "auto",
    height: 100,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
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
  const [setSent] = React.useState(false);
  const classes = useStyles();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    age: "",
    bio: "",
    avatar: require("../Assets/shirley.jpg"),
  });
  const [sport, setSport] = useState({
    soccer: false,
    basketball: false,
    football: false,
    volleyball: false,
    baseball: false,
  });

  const validate = (state) => {
    const errors = required(
      [
        "firstName",
        "lastName",
        "email",
        "password",
        "phone",
        "address1",
        "city",
        "state",
        "zip",
        "country",
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
    setSent(true);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Profile" />
      <Divider />
      <Form
        onSubmit={handleChange}
        subscription={{ submitting: true }}
        validate={validate}
      >
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleChange} className={classes.form} noValidate>
            <CardContent>
              {state.firstName && state.lastName && (
                <Fragment>
                  <CardContent>
                    <div className={classes.details}>
                      <div>
                        <Typography gutterBottom variant="h2">
                          {state.firstName + " " + state.lastName}
                        </Typography>
                      </div>
                      <Avatar className={classes.avatar} src={state.avatar} />
                    </div>
                  </CardContent>
                  <Divider className={classes.divider} />
                </Fragment>
              )}
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    autoFocus
                    autoComplete="given-name"
                    required
                    label="First name"
                    margin="dense"
                    name="firstName"
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    autoComplete="family-name"
                    required
                    label="Last name"
                    margin="dense"
                    name="lastName"
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
                    label="Username"
                    margin="dense"
                    name="username"
                    required
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
                  <TextField
                    required
                    margin="dense"
                    variant="outlined"
                    name="address1"
                    label="Address line 1"
                    fullWidth
                    autoComplete="address-line1"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    name="address2"
                    label="Address line 2"
                    fullWidth
                    autoComplete="address-line2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    margin="dense"
                    variant="outlined"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="billing address-level2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Select State"
                    margin="dense"
                    name="state"
                    required
                    variant="outlined"
                    select
                  >
                    <MenuItem value="" selected="selected">
                      Select a State
                    </MenuItem>
                    <MenuItem value="AL">Alabama</MenuItem>
                    <MenuItem value="AK">Alaska</MenuItem>
                    <MenuItem value="AZ">Arizona</MenuItem>
                    <MenuItem value="AR">Arkansas</MenuItem>
                    <MenuItem value="CA">California</MenuItem>
                    <MenuItem value="CO">Colorado</MenuItem>
                    <MenuItem value="CT">Connecticut</MenuItem>
                    <MenuItem value="DE">Delaware</MenuItem>
                    <MenuItem value="DC">District Of Columbia</MenuItem>
                    <MenuItem value="FL">Florida</MenuItem>
                    <MenuItem value="GA">Georgia</MenuItem>
                    <MenuItem value="HI">Hawaii</MenuItem>
                    <MenuItem value="ID">Idaho</MenuItem>
                    <MenuItem value="IL">Illinois</MenuItem>
                    <MenuItem value="IN">Indiana</MenuItem>
                    <MenuItem value="IA">Iowa</MenuItem>
                    <MenuItem value="KS">Kansas</MenuItem>
                    <MenuItem value="KY">Kentucky</MenuItem>
                    <MenuItem value="LA">Louisiana</MenuItem>
                    <MenuItem value="ME">Maine</MenuItem>
                    <MenuItem value="MD">Maryland</MenuItem>
                    <MenuItem value="MA">Massachusetts</MenuItem>
                    <MenuItem value="MI">Michigan</MenuItem>
                    <MenuItem value="MN">Minnesota</MenuItem>
                    <MenuItem value="MS">Mississippi</MenuItem>
                    <MenuItem value="MO">Missouri</MenuItem>
                    <MenuItem value="MT">Montana</MenuItem>
                    <MenuItem value="NE">Nebraska</MenuItem>
                    <MenuItem value="NV">Nevada</MenuItem>
                    <MenuItem value="NH">New Hampshire</MenuItem>
                    <MenuItem value="NJ">New Jersey</MenuItem>
                    <MenuItem value="NM">New Mexico</MenuItem>
                    <MenuItem value="NY">New York</MenuItem>
                    <MenuItem value="NC">North Carolina</MenuItem>
                    <MenuItem value="ND">North Dakota</MenuItem>
                    <MenuItem value="OH">Ohio</MenuItem>
                    <MenuItem value="OK">Oklahoma</MenuItem>
                    <MenuItem value="OR">Oregon</MenuItem>
                    <MenuItem value="PA">Pennsylvania</MenuItem>
                    <MenuItem value="RI">Rhode Island</MenuItem>
                    <MenuItem value="SC">South Carolina</MenuItem>
                    <MenuItem value="SD">South Dakota</MenuItem>
                    <MenuItem value="TN">Tennessee</MenuItem>
                    <MenuItem value="TX">Texas</MenuItem>
                    <MenuItem value="UT">Utah</MenuItem>
                    <MenuItem value="VT">Vermont</MenuItem>
                    <MenuItem value="VA">Virginia</MenuItem>
                    <MenuItem value="WA">Washington</MenuItem>
                    <MenuItem value="WV">West Virginia</MenuItem>
                    <MenuItem value="WI">Wisconsin</MenuItem>
                    <MenuItem value="WY">Wyoming</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    margin="dense"
                    variant="outlined"
                    name="zip"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    margin="dense"
                    variant="outlined"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="country"
                  />
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
                              checked={sport.soccer}
                              onChange={handleChange}
                              name="soccer"
                            />
                          }
                          label="Soccer"
                        />
                        <Rating
                          name="customized-icons"
                          defaultValue={0}
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
                              checked={sport.basketball}
                              onChange={handleChange}
                              name="basketball"
                            />
                          }
                          label="Basketball"
                        />
                        <Rating
                          name="customized-icons"
                          defaultValue={0}
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
                              checked={sport.football}
                              onChange={handleChange}
                              name="football"
                            />
                          }
                          label="Football"
                        />
                        <Rating
                          name="customized-icons"
                          defaultValue={0}
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
                              checked={sport.volleyball}
                              onChange={handleChange}
                              name="basketball"
                            />
                          }
                          label="Volleyball"
                        />
                        <Rating
                          name="customized-icons"
                          defaultValue={0}
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
                              name="football"
                            />
                          }
                          label="Baseball"
                        />
                        <Rating
                          name="customized-icons"
                          defaultValue={0}
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
