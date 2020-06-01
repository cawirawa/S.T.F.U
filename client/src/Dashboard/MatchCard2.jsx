import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import PlaceIcon from "@material-ui/icons/Place";
import EventIcon from "@material-ui/icons/Event";
import AlarmIcon from "@material-ui/icons/Alarm";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import ShareIcon from "@material-ui/icons/Share";
import sports from "../Constant/Sports";
import ages from "../Constant/Ages";

const useStyles = makeStyles((theme) => ({
    card: {
        display: "flex",
        marginLeft: 450,
        borderRadius: 16,
        width: "60vw",
        marginBottom: 15,
        elevation: 10,
    },
    media: {
        width: "20%",
        backgroundColor: "grey",
        borderRadius: 12,
        boxShadow: "0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9",
    },
    rating: {
        verticalAlign: "text-top",
    },
    content: {
        padding: 2,
        display: "flex",
        flexDirection: "row",
        flexGrow: 10,
    },
    title: {
        fontSize: 17,
        fontWeight: "bold",
        letterSpacing: 2,
        marginBottom: 0,
        display: "inline-block",
    },
    heading: {
        position: "relative",
        fontSize: 14,
        fontWeight: "bold",
        letterSpacing: 2,
        marginBottom: 0,
        marginRight: 10,
        left: 5,
        bottom: 6,
        display: "inline-block",
    },
    body: {
        fontSize: 14,
        color: "grey",
    },
    textFooter: {
        fontSize: 14,
    },
    icon: {
        fontSize: "1.8rem",
        marginRight: 9,
    },
    matchdetail: {
        display: "flex",
        justifyContent: "stretch",
    },
    matchLabel: {
        flex: 2,
    },
    matchContent: {
        flex: 5,
    },
    left: {
        flex: 6,
        flexDirection: "row",
        textAlign: "left",
    },
    right: {
        padding: "2%",
        flex: 2,
        flexDirection: "column",
    },
    outerLeft: {
        display: "flex",
        flex: 9,
        flexDirection: "row",
    },
    outerRight: {
        display: "contents",
        flex: 1,
        flexDirection: "row",
    },
}));

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon />,
        label: "Very Dissatisfied",
    },
    2: {
        icon: <SentimentDissatisfiedIcon />,
        label: "Dissatisfied",
    },
    3: {
        icon: <SentimentSatisfiedIcon />,
        label: "Neutral",
    },
    4: {
        icon: <SentimentSatisfiedAltIcon />,
        label: "Satisfied",
    },
    5: {
        icon: <SentimentVerySatisfiedIcon />,
        label: "Very Satisfied",
    },
};

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

export default function MatchCard2(props) {
    const classes = useStyles();
    const match = props.match;
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    var date =
        /-\d\d-\d\d/.exec(match.time)[0] + "/" + /\d\d\d\d/.exec(match.time)[0];
    date = date.replace("-", "");
    date = date.replace("-", "/");

    var time = /T\d\d:\d\d/.exec(match.time)[0];
    time = time.replace("T", "");

    return (
        <Card className={classes.card} elevation={0}>
            <Container className={classes.outerLeft}>
                <CardContent className={classes.content}>
                    <Grid container className={classes.left}>
                        <Grid item xs={9}>
                            <h3 className={classes.title}>{match.name}</h3>
                        </Grid>
                        <Grid item xs={9}>
                            <Rating
                                name="customized-icons"
                                defaultValue={2}
                                getLabelText={(value) => customIcons[value].label}
                                IconContainerComponent={IconContainer}
                                className={classes.rating}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <p className={classes.body}>
                                {match.description === ""
                                    ? "Hey y'all should join our match!! It's beginner-friendly."
                                    : match.description}
                            </p>
                        </Grid>
                        <Grid item xs={2}>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="form-dialog-title"
                                fullWidth
                            >
                                <DialogTitle id="form-dialog-title">Match Details</DialogTitle>
                                <DialogContent dividers>
                                    <Typography gutterBottom display="flex">
                                        <div className={classes.matchdetail}>
                                            <div className={classes.matchLabel}>
                                                <label>
                                                    <b>Name: </b>
                                                </label>
                                            </div>{" "}
                                            <div className={classes.matchContent}>{match.name}</div>
                                        </div>
                                    </Typography>
                                    <Typography gutterBottom display="flex">
                                        <div className={classes.matchdetail}>
                                            <div className={classes.matchLabel}>
                                                <label>
                                                    <b>ID: </b>
                                                </label>
                                            </div>{" "}
                                            <div className={classes.matchContent}>{match.id}</div>
                                        </div>
                                    </Typography>
                                    <Typography gutterBottom display="flex">
                                        <div className={classes.matchdetail}>
                                            <div className={classes.matchLabel}>
                                                <label>
                                                    <b>Type: </b>
                                                </label>
                                            </div>{" "}
                                            <div className={classes.matchContent}>
                                                {sports[match.type]}
                                            </div>
                                        </div>
                                    </Typography>
                                    <Typography gutterBottom display="flex">
                                        <div className={classes.matchdetail}>
                                            <div className={classes.matchLabel}>
                                                <label>
                                                    <b>Age: </b>
                                                </label>
                                            </div>{" "}
                                            <div className={classes.matchContent}>
                                                {ages[match.age]}
                                            </div>
                                        </div>
                                    </Typography>
                                    <Typography gutterBottom display="flex">
                                        <div className={classes.matchdetail}>
                                            <div className={classes.matchLabel}>
                                                <label>
                                                    <b>Location: </b>
                                                </label>
                                            </div>{" "}
                                            <div className={classes.matchContent}>{match.city}</div>
                                        </div>
                                    </Typography>
                                    <Typography gutterBottom display="flex">
                                        <div className={classes.matchdetail}>
                                            <div className={classes.matchLabel}>
                                                <label>
                                                    <b>Date: </b>
                                                </label>
                                            </div>{" "}
                                            <div className={classes.matchContent}>{date}</div>
                                        </div>
                                    </Typography>
                                    <Typography gutterBottom display="flex">
                                        <div className={classes.matchdetail}>
                                            <div className={classes.matchLabel}>
                                                <label>
                                                    <b>Time: </b>
                                                </label>
                                            </div>{" "}
                                            <div className={classes.matchContent}>{time}</div>
                                        </div>
                                    </Typography>
                                    <Typography gutterBottom display="flex">
                                        <div className={classes.matchdetail}>
                                            <div className={classes.matchLabel}>
                                                <label>
                                                    <b>Players: </b>
                                                </label>
                                            </div>{" "}
                                            <div className={classes.matchContent}>
                                                {match.roster.length}/{match.maxPlayers}
                                            </div>
                                        </div>
                                    </Typography>
                                    <Typography gutterBottom display="flex">
                                        <div className={classes.matchdetail}>
                                            <div className={classes.matchLabel}>
                                                <label>
                                                    <b>Roster: </b>
                                                </label>
                                            </div>{" "}
                                            <div className={classes.matchContent}>
                                                <ol>
                                                    {match.roster.map((user) => {
                                                        return (
                                                            <li>
                                                                {user.first_name + " (" + user.username + ")"}
                                                            </li>
                                                        );
                                                    })}
                                                </ol>
                                            </div>
                                        </div>
                                    </Typography>
                                    <Typography gutterBottom display="flex">
                                        <div className={classes.matchdetail}>
                                            <div className={classes.matchLabel}>
                                                <label>
                                                    <b>Description: </b>
                                                </label>
                                            </div>
                                            <div className={classes.matchContent}>
                                                {match.description === ""
                                                    ? "Hey y'all should join our match!! It's beginner-friendly."
                                                    : match.description}
                                            </div>
                                        </div>
                                    </Typography>
                                </DialogContent>
                            </Dialog>
                        </Grid>
                        <Grid item xs={4}>
                            <ShareIcon color="secondary" className={classes.icon} />
                            <FavoriteIcon color="secondary" className={classes.icon} />
                        </Grid>
                    </Grid>

                    <Grid container className={classes.right}>
                        <div>
                            <PlaceIcon />
                            <h2 className={classes.heading}>{match.city}</h2>
                        </div>
                        <div>
                            <EventIcon />
                            <h2 className={classes.heading}>{date}</h2>
                        </div>
                        <div>
                            <AlarmIcon />
                            <h2 className={classes.heading}>{time}</h2>
                        </div>
                        <div>
                            <PeopleAltIcon />
                            <h2 className={classes.heading}>
                                {match.roster.length}/{match.maxPlayers}
                            </h2>
                        </div>
                        <div>
                            <ContactSupportIcon />
                            <h2
                                className={classes.heading}
                                style={{ textTransform: "capitalize" }}
                            >
                                {/*match.roster[0].first_name*/}
                            </h2>
                        </div>
                    </Grid>
                </CardContent>
            </Container>
            <Container className={classes.outerRight}>
                <CardMedia
                    className={classes.media}
                    image={require("../Assets/soccer.jpg")}
                />
            </Container>
        </Card>
    );
}
