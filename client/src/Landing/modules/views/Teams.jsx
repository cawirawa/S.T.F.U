import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Typography, Avatar, Card, CardContent } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.primary.light,
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
  title: {
    marginBottom: theme.spacing(10),
  },
  card: {
    borderRadius: '20%',
    textAlign: 'center',
    margin: 15,
    minWidth: 200,
    minHeight: 200,
    width: 250,
    height: 220,
    alignContent: 'center'
  },
  avatar: {
    width: 120,
    height: 120,
    margin: 'auto',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: 14,
    color: theme.palette.grey[600],
    marginBottom: '0.875em',
  },
  gridItem: {
    display: "flex",
    alignItem: "center",
    justifyContent: "center"
  }
}));

const members = [
  {
    pic:
      "https://www.usab.com/~/media/8d807d542ebf4339b2024c78b255bdeb.ashx?h=600&la=en&w=800",
    name: "Carlos Wirawan",
    title: "Project Manager",
  },
  {
    pic:
    require("../../../Assets/shirley.jpg"),
    name: "Gabriela Shirley",
    title: "User Interface Specialist",
  },
  {
    pic:
    require("../../../Assets/billy.jpg"),
    name: "Billy Halim",
    title: "Software Development Lead",
  },
  {
    pic:
    require("../../../Assets/bruce.jpg"),
    name: "Shih Gau Peng",
    title: "Algorithm Specialist",
  },
  {
    pic:
      "https://ca-times.brightspotcdn.com/dims4/default/48f4494/2147483647/strip/true/crop/1852x1244+1616+664/resize/840x564!/quality/90/?pic=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F82%2F07%2F7e75546740e4add4c67443bea721%2Fhttps-delivery.gettyimages.com%2Fdownloads%2F1186219343.jpg",
    name: "Albert Estevan",
    title: "Business Analyst",
  },
  {
    pic:
      require("../../../Assets/tian.jpg"),
    name: "Tiancheng Fu",
    title: "Senior System Analyst",
  },
  {
    pic: "https://www.economist.com/sites/default/files/20170715_BLP517.jpg",
    name: "Woosung Kim",
    title: "Database Specialist",
  },
  {
    pic:
    require("../../../Assets/wong.jpg"),
    name: "Jason Wong",
    title: "Quality Assurance Lead",
  },
  {
    pic:
      "https://s3951.pcdn.co/wp-content/uploads/2015/09/Brendan-Gallagher-Canadiens-Feb-2018-975x480.jpg",
    name: "Nikolas Jody",
    title: "Software Architect",
  },
  {
    pic:
    require("../../../Assets/jason.jpg"),
    name: "Jason Kaharudin",
    title: "Software Architect",
  },
];

export default function Teams() {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Typography variant="h4" marked="center" gutterBottom className={classes.title} component="h2">
          Teams
        </Typography>
        <div>
          <Grid container spacing={5} className={classes.gridItem}>
            {members.map((member) => (
              <Grid item xs={12} sm={6} md={3}>
                <Card className={classes.card}>
                  <CardContent>
                    <Avatar className={classes.avatar} src={member.pic} />
                    <h3 className={classes.heading}>{member.name}</h3>
                    <span className={classes.subheader}>{member.title}</span>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </section>
  );
}