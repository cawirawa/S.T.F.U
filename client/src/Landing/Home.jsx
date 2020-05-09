import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import MatchCategories from "./modules/views/MatchCategories";
import QuestionsHero from "./modules/views/QuestionsHero";
import AppFooter from "./modules/views/AppFooter";
import ProductHero from "./modules/views/ProductHero";
import ProductHowItWorks from "./modules/views/ProductHowItWorks";
import Newsletter from "./modules/views/Newsletter";
import AppAppBar from "./modules/views/AppAppBar";
import AvailableMatches from "./modules/views/AvailableMatches";

class Home extends React.Component {
  state = {
    matches: [],
    currentLocation: {
      lat: "",
      lon: "",
    },
  };

  componentDidMount() {
    fetch(
      "http://api.ipstack.com/check?access_key=8f0af5c4d95ea86b0ae3944323331ad0",
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res);
        this.setState({
          currentLocation: {
            lat: res.latitude,
            lon: res.longitude,
          },
        });
        // fetch.log("http://api.ipstack.com/check?access_key=8f0af5c4d95ea86b0ae3944323331ad0")
      })
      .catch((err) => console.error("Problem fetching my IP", err))
      .then((res) => {
        fetch("http://52.25.207.161/api/match/match_cards/", {
          method: "GET",
          headers: {
            lat: this.state.currentLocation.lat,
            lon: this.state.currentLocation.lon,
            dist: "150",
          },
        })
          .then((resp) => resp.json())
          .then((res) => {
            this.setState({ matches: res.result });
            console.log(res);
          })
          .catch((error) => console.log(error));
      });
  }

  render() {
    return (
      <React.Fragment>
        <AppAppBar />
        <ProductHero />
        <div id="section1">
          <AvailableMatches matches={this.state.matches} />
        </div>
        <MatchCategories />
        <ProductHowItWorks />
        <Newsletter />
        <QuestionsHero />
        <AppFooter />
      </React.Fragment>
    );
  }
}

export default withRoot(Home);
