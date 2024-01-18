import React from 'react';

import Header from './Header';
import HeroSection from './HeroSection';
import FeaturesSection from './FeatureSection';
import Footer from './Footer';

const TemplateOne = () => {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default TemplateOne;
