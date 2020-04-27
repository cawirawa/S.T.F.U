import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  images: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    cursor: 'default',
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

function MatchCategories(props) {
  const { classes } = props;

  const images = [
    {
      url:
        'https://www.sportspsychologybasketball.com/wp-content/uploads/2011/02/duke_600x300.jpg',
      title: 'Basketball',
      width: '40%',
    },
    {
      url:
        'https://www.teachpe.com/wp-content/uploads/2019/09/badminton620.jpg',
      title: 'Badminton',
      width: '20%',
    },
    {
      url:
        'https://www.bergheimat.com/tl_files/bilder/Sommerfotos%202013/Content/berg-wandern-sport.jpg',
      title: 'Hiking',
      width: '40%',
    },
    {
      url:
        'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iDt6V.rPqgC0/v1/1000x-1.jpg',
      title: 'Soccer',
      width: '38%',
    },
    {
      url:
        'https://lh3.googleusercontent.com/proxy/4V2-62WQO18xUMJKbWqliQEbkcpR5hfuvs-gNLRg2guLIlf7JPE8FCHhad-y4spoF5AApjanVrSYJmznZLiS2UWEYAWcS7kRUT627FoyfREXpXM',
      title: 'Football',
      width: '38%',
    },
    {
      url:
        'https://upload.wikimedia.org/wikipedia/commons/1/1d/Marcus_Thames_Tigers_2007.jpg',
      title: 'Baseball',
      width: '24%',
    },
    {
      url:
        'https://www.economist.com/sites/default/files/20170715_BLP517.jpg',
      title: 'Rugby',
      width: '40%',
    },
    {
      url:
        'https://i2.wp.com/www.healthfitnessrevolution.com/wp-content/uploads/2015/04/volleyball-90896_1920-2.jpg?fit=1920%2C1280&ssl=1',
      title: 'Volleyball',
      width: '20%',
    },
    {
      url:
        'https://s3951.pcdn.co/wp-content/uploads/2015/09/Brendan-Gallagher-Canadiens-Feb-2018-975x480.jpg',
      title: 'Hockey',
      width: '40%',
    },
  ];

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        For any kinds of group sports you want
      </Typography>
      <div className={classes.images}>
        {images.map((image) => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </Container>
  );
}

MatchCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MatchCategories);