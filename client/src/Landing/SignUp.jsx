import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "./modules/components/Typography";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import AppForm from "./modules/views/AppForm";
import { email, required } from "./modules/form/validation";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import FormFeedback from "./modules/form/FormFeedback";
import { AuthContext } from "../auth/Auth";
import firebase from "../base";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

function SignUp({ history }) {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);
  const [token, setToken] = React.useState("");

  const { currentUser } = useContext(AuthContext);

  const createUser = (userName, fullName, Email) => {
    const data = {
      username: userName,
      name: fullName,
      email: Email,
    };
    fetch("http://52.25.207.161/api/profile/create_user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((res) => {
        setToken(res.token);
        console.log(res);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getToken = () => {
    fetch("http://52.25.207.161/api/profile/log_in/", {
      method: "GET",
      headers: {
        email: currentUser.email,
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        setToken(res.token);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  if (currentUser) {
    getToken();
    return <Redirect to="/dashboard" token={token} />;
  }

  const validate = (values) => {
    const errors = required(
      ["firstName", "lastName", "email", "password"],
      values
    );

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  const handleSubmit = (event) => {
    setSent(true);
  };

  const handleSignup = (event) => {
    event.preventDefault();
    const { Email, Password, FullName, Username } = event.target.elements;
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(Email.value, Password.value)
        .catch((error) => {
          console.log(error);
        });
      createUser(Username.value, FullName.value, Email.value);
      return <Redirect to="/dashboard" token={token} />;
    } catch (error) {
      alert(error);
    }
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/signin/" underline="always">
              Already have an account?
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSignup}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSignup} className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    autoComplete="off"
                    fullWidth
                    label="Username"
                    name="Username"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    autoComplete="name"
                    fullWidth
                    label="Full name"
                    name="FullName"
                    required
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="Email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="Password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback className={classes.feedback} error>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                className={classes.button}
                disabled={submitting || sent}
                color="primary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Sign Up"}
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignUp);
