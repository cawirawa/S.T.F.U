import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Container from "@material-ui/core/Container";
import Typography from "../components/Typography";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Link from "@material-ui/core/Link";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: 0,
    display: "flex",
    alignItems: "center",
  },
  cardWrapper: {
    zIndex: 1,
    alignItems: "center",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(8, 3),
    height: 350,
    verticalAlign: "center",
  },
  cardContent: {
    maxWidth: 400,
  },
  button: {
    width: "100%",
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
  },
});

function Newsletter(props) {
  const { classes } = props;

  return (
    <div style={{ alignItems: "center" }}>
      <Container className={classes.root} component="section">
        <Grid container>
          <Grid md={3}></Grid>
          <Grid md={6} className={classes.cardWrapper}>
            <div className={classes.card}>
              <div className={classes.cardContent}>
                <Typography
                  variant="h2"
                  component="h2"
                  gutterBottom
                  style={{ color: "white", paddingTop: 20 }}
                >
                  Interested?
                </Typography>
                <Typography variant="h5" style={{ color: "white" }}>
                  Find out available matches near you.
                </Typography>
                <Link href="/signup">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </Grid>
          <Grid md={3}></Grid>
        </Grid>
      </Container>
    </div>
  );
}

Newsletter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Newsletter);
