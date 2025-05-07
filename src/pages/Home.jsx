import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import AboutUsSection from '../components/Home/AboutUs';
import ServicesSection from '../components/Home/ServicesSection';
import CtaSection from '../components/Home/CTAsection';

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
