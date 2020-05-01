import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import MatchCategories from './modules/views/MatchCategories';
import QuestionsHero from './modules/views/QuestionsHero';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import Newsletter from './modules/views/Newsletter';
import AppAppBar from './modules/views/AppAppBar';
import AvailableMatches from './modules/views/AvailableMatches';

class Home extends React.Component {
  
  state = {
    matches: [],
  };
  
  componentDidMount() {
    // Fetch all matches
    fetch('http://52.25.207.161:8000/api/match/', {
      method: 'GET',
    }).then(resp => resp.json())
    .then(res => {
      this.setState({matches: res});
      console.log(res);
    }).catch(error => console.log(error));
  };

  render(){
    return (
      <React.Fragment>
        <AppAppBar />
        <ProductHero />
        <AvailableMatches matches={this.state.matches} />
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