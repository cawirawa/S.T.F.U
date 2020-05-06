import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';
import './ImageAnimation.css';

const styles = (theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(8),
  },
  text: {
    marginBottom: theme.spacing(5),
  },
});

function ProductHowItWorks(props) {
  const { classes } = props;

  return (
      <section className={classes.root}>
        <Container className={classes.container}>
          <img
              src="https://material-ui.com/static/themes/onepirate/productCurvyLines.png"
              className={classes.curvyLines}
              alt="curvy lines"
          />
          <Typography variant="h4" marked="center" className={classes.title} component="h2">
            How it works
          </Typography>
          <div>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <div className={classes.item}>
                  <div className={classes.number}>1.</div>
                  <img
                      style={{
                        animation: 'rotation 5s infinite linear',
                      }}
                      className={classes.image}
                      src="https://material-ui.com/static/themes/onepirate/productValues2.svg"
                      alt="match"
                  />
                  <Typography variant="h6" className={classes.text}>
                    Create or Join Match
                  </Typography>
                  <Typography variant="h5">
                    {'From the latest trendy matches to the just-for-fun games'}
                    {', go for a sport and meet up with friends just a short distance from your home.'}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className={classes.item}>
                  <div className={classes.number}>2.</div>
                  <img
                      style={{
                        animation: 'move 7s',
                        animationIterationCount: 'infinite',
                      }}
                      className={classes.image}
                      src="https://material-ui.com/static/themes/onepirate/productValues1.svg"
                      alt="venue"
                  />
                  <Typography variant="h6" className={classes.text}>
                    Pick Venue
                  </Typography>
                  <Typography variant="h5">
                    {'Privatize a venue, book it for your own match '}
                    {'your games will not be alike.'}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className={classes.item}>
                  <div className={classes.number}>3.</div>
                  <img
                      style={{
                        animation: 'shake 0.82s',
                        animationIterationCount: 'infinite',
                      }}
                      className={classes.image}
                      src="https://material-ui.com/static/themes/onepirate/productValues3.svg"
                      alt="referee"
                  />
                  <Typography variant="h6" className={classes.text}>
                    Find Referee
                  </Typography>
                  <Typography variant="h5">
                    {'By registering, you will access specially negotiated referees whoever you want '}
                    {'that you usually find it hard.'}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </div>
          <Button
              color="secondary"
              size="large"
              variant="contained"
              className={classes.button}
              component="a"
              href="/signup"
          >
            Get started
          </Button>
        </Container>
      </section>
  );
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHowItWorks);