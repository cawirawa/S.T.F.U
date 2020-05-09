import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "../components/Button";
import Typography from "../components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";
import "./ImageAnimation.css";

const backgroundImage =
  "https://segiphotography.files.wordpress.com/2015/05/2.jpg?w=1254&h=940";

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: theme.palette.secondary.light, // Average color of the background image.
    backgroundPosition: "center",
    backgroundPositionY: "25%",
    opacity: 0.7,
    heigth: 100,
  },
  button: {
    minWidth: 200,
  },
  h1: {
    marginTop: theme.spacing(25),
  },
  h5: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        SPORTS TEAMMATES FOR U
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Sports networking made easy.
      </Typography>
      <Button
        color="primary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href="/signup"
      >
        Register
      </Button>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
