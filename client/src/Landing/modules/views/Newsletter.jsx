import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import Button from '../components/Button';
import Link from '@material-ui/core/Link';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: 0,
    display: 'flex',
  },
  cardWrapper: {
    zIndex: 1,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.warning.main,
    padding: theme.spacing(8, 3),
  },
  cardContent: {
    maxWidth: 400,
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  button: {
    width: '100%',
  },
  imagesWrapper: {
    position: 'relative',
  },
  imageDots: {
    position: 'absolute',
    top: -67,
    left: -67,
    right: 0,
    bottom: 0,
    width: '100%',
  },
  image: {
    position: 'absolute',
    top: -28,
    left: -28,
    right: 0,
    bottom: 0,
    width: '100%',
    maxWidth: 600,
  },
});

function Newsletter(props) {
  const { classes } = props;

  return (
    <Container className={classes.root} component="section">
      <Grid container>
        <Grid item xs={12} md={6} className={classes.cardWrapper}>
          <div className={classes.card}>
            <div className={classes.cardContent}>
              <Typography variant="h2" component="h2" gutterBottom>
                Interested?
              </Typography>
              <Typography variant="h5">
                Find out available matches near you.
              </Typography>
              <TextField noBorder className={classes.textField} placeholder="Your email" />
              <Button type="submit" variant="contained" color='secondary' className={classes.button}>
                <Link href="/signup" style={{ color: 'white' }}>
                  Sign me up
                </Link>
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} className={classes.imagesWrapper}>
          <Hidden smDown>
            <div className={classes.imageDots} />
            <img
              src={require("../../../Assets/illustration.jpg")}
              alt="call to action"
              className={classes.image}
            />
          </Hidden>
        </Grid>
      </Grid>
    </Container>
  );
}

Newsletter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Newsletter);