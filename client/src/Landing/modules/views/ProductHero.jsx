import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import '../../style.css';
import './ImageAnimation.css';
const backgroundImage =
    'https://images.wallpaperscraft.com/image/snowboarder_snowboard_stunt_158772_3840x2160.jpg';

const styles = (theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '200% 125%',
        animation: `gradientImg 15s ease infinite`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
    },

    button: {
        minWidth: 200,
    },
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(10),
        },
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
            <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
            <Typography color="inherit" align="center" variant="h2" marked="center">
                SPORTS TEAMMATES FOR U
            </Typography>
            <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
                Sports networking made easy.
            </Typography>
            <Button
                color='secondary'
                variant="contained"
                size="large"
                className={classes.button}
                component="a"
                href="/signup"
            >
                Register
            </Button>

            <a href="/signin">Already have an account? Click me to log in</a>
        </ProductHeroLayout>
    );
}

ProductHero.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);