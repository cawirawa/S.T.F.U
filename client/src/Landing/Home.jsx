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

function Home() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      {/* <AvailableMatches /> */}
      <MatchCategories />
      <ProductHowItWorks />
      <Newsletter />
      <QuestionsHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Home);
