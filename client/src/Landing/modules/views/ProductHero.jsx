import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "../components/Button";
import Typography from "../components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";
const backgroundImage =
  "https://www2.pictures.zimbio.com/gi/Tom+Brady+New+England+Patriots+v+New+York+a2Wb2-0y-tKl.jpg";
const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: theme.palette.secondary.light, // Average color of the background image.
    backgroundPosition: "center",
    opacity: 0.4,
  },
  button: {
    minWidth: 200,
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
      <Typography color="inherit" align="center" variant="h1" marked="center">
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
      <Typography variant="body2" color="inherit" className={classes.more}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
