import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutUsSection from '../components/AboutUs';
import ServicesSection from '../components/ServicesSection';
import CtaSection from '../components/CTAsection';

const Home = () => {
  return (
    <div>
        <HeroSection/>
        <AboutUsSection/>
        <ServicesSection/>
        <CtaSection/>
    </div>
  );
};

export default Home;
