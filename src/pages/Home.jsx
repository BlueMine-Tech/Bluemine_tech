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
        <meta name="description" content="Welcome to my home page, we do web design, marketing and more.">
        <link rel="canonical" href="https://yourdomain.com/" />
      </Helmet>

      <h1>Welcome Home</h1>
    </>
  )
}

  );
};

export default Home;
