import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MatchCard from './MatchCard';

const useStyles = makeStyles(theme => ({
    h2: {
        fontFamily: 'Open Sans',
        color: 'gray',
        lineHeight: 1.5,
        fontWeight: 400,
        letterSpacing: '3px',
        margin: '50px'
    },
}));

export default function MatchHistoryPage() {
    const classes = useStyles();
    return (
        <div>
            <h2 className={classes.h2}>Active Matches</h2>
            <MatchCard />
            <h2 className={classes.h2}>Past Matches</h2>
            <MatchCard />
            <MatchCard />
        </div>
    );
}