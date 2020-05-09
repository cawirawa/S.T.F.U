import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '../components/Button';
import Typography from '../components/Typography'; 
import MatchCard from '../../../Components/MatchCard';
import { GridList } from '@material-ui/core';
const styles = (theme) => ({
  root: {
    display: 'stretch',
    backgroundColor: theme.palette.secondary.light,
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    position: 'relative',
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 55,
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(9),
  },
  text: {
    marginBottom: theme.spacing(5),
  },
  cardContainer: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    height: 250,
  }
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
          Available Matches
        </Typography>
        <GridList className={classes.cardContainer} cols={2} >
          {props.matches.map(match => {
            return (<div key={match.id}><MatchCard match={match} /></div>);
          })}
        </GridList>
      </Container>
    </section>
  );
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHowItWorks);