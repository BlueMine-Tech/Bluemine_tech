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
    import { Helmet } from 'react-helmet-async'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home | My Brand</title>
        <meta name="description" content="We are the Best Performance Marketing Agency In India helping Businesses to grow 3X to 4X with proven Performance Marketing Strategies. Book An Appointment. .">
        <link rel="canonical" href="https://blueminetech.com/" />
      </Helmet>

      <h1>Welcome Home</h1>
    </>
  )
}

  );
};

export default Home;
