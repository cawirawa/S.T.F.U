import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import PlaceIcon from '@material-ui/icons/Place';
import EventIcon from '@material-ui/icons/Event';
import AlarmIcon from '@material-ui/icons/Alarm';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import sports from "../Constant/Sports";
import ages from "../Constant/Ages";

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        padding: 10,
        borderRadius: 16,
        width: '70vw',
        marginBottom: 15
    },
    media: {
        width: '20%',
        backgroundColor: 'grey',
        borderRadius: 12,
        boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
    },
    rating: {
        verticalAlign: 'text-top',
    },
    content: {
        padding: 2,
        display: 'flex',
        flex: '1 0 auto'
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginBottom: 0,
        display: 'inline-block',
    },
    heading: {
        position: 'relative',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginBottom: 0,
        marginRight: 10,
        left: 5,
        bottom: 6,
        display: 'inline-block',
    },
    body: {
        fontSize: 14,
        color: 'grey',
    },
    textFooter: {
        fontSize: 14,
    },
    icon: {
        fontSize: '1.8rem',
        marginRight: 9,
    },
}));

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon />,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <SentimentDissatisfiedIcon />,
        label: 'Dissatisfied',
    },
    3: {
        icon: <SentimentSatisfiedIcon />,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon />,
        label: 'Satisfied',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon />,
        label: 'Very Satisfied',
    },
};

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

export default function (props) {
    const classes = useStyles();
    const match = props.match;
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    var date = /-\d\d-\d\d/.exec(match.time)[0] + "/" + /\d\d\d\d/.exec(match.time)[0];
    date = date.replace("-", "");
    date = date.replace("-", "/");

    var time = /T\d\d:\d\d/.exec(match.time)[0]
    time = time.replace("T", "")
    
    


    return (
        <Card className={classes.card} elevation={0}>
            <CardContent className={classes.content}>
                <Grid container>
                    <Grid item xs={9}>
                        <h3 className={classes.title}>{match.name}</h3>
                    </Grid>
                    <Grid item xs={3}>
                        <PlaceIcon />
                        <h2 className={classes.heading}>{match.city}</h2>
                    </Grid>
                    <Grid item item xs={9}>
                        <Rating
                            name="customized-icons"
                            defaultValue={2}
                            getLabelText={(value) => customIcons[value].label}
                            IconContainerComponent={IconContainer}
                            className={classes.rating}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <EventIcon />
                        <h2 className={classes.heading}>{"04/15/20"}</h2>
                        <AlarmIcon />
                        <h2 className={classes.heading}>{"6 PM"}</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <p className={classes.body}>
                            {match.description === "" ? "Hey y'all should join our match!! It's beginner-friendly." : match.description}
                        </p>
                    </Grid>
                    <Grid item xs={1}>
                        <Button variant="contained" color="primary" onClick={handleClickOpen}>Join</Button>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
                            <DialogTitle id="form-dialog-title">Match Details</DialogTitle>
                            <DialogContent dividers>
                                <Typography gutterBottom display='block'>
                                    Name: {match.name}
                                </Typography>
                                <Typography gutterBottom display='block'>
                                    ID: {match.id}
                                </Typography>
                                <Typography gutterBottom display='block'>
                                    Type: {sports[match.type]}
                                </Typography>
                                <Typography gutterBottom display='block'>
                                    Age: {ages[match.age]}
                                </Typography>
                                <Typography gutterBottom display='block'>
                                    Location: {match.city}
                                </Typography>
                                <Typography gutterBottom display='block'>
                                    Date: {date}
                                </Typography>
                                <Typography gutterBottom display='block'>
                                    Time: {time}
                                </Typography>
                                <Typography gutterBottom display='block'>
                                    Player: {match.roster.length}/{match.maxPlayers}
                                </Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                        </Button>
                                <Button onClick={handleClose} color="primary">
                                    Confirm
                        </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                    <Grid item>
                        <ShareIcon color="secondary" className={classes.icon} />
                        <FavoriteIcon color="secondary" className={classes.icon} />
                    </Grid>
                </Grid>
            </CardContent>
            <CardMedia
                className={classes.media}
                image={require('../Assets/soccer.jpg')}
            />
        </Card >
    );
}