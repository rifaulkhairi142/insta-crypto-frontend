import React, { useEffect } from "react";
import Header from "../../component/V 2/Header";
import Hero from "../../component/V 2/Hero";
import Features from "../../component/V 2/Features";
import HowItWorks from "../../component/V 2/HowItWork";
import TrustIndicators from "../../component/V 2/ThurstIndicators";
import Footer from "../../component/V 2/Footer";
import CTA from "../../component/V 2/CTA";
import TopUp from "../../component/V 2/TopUp";
import CoinInfo from "../../component/V 2/CoinInfo";
import FAQ from '../../component/V 2/FAQ';

const Home = () => {

  

  
  return (
    <div className="min-h-screen bg-gray-900 relative">
      <Header />
      <Hero />

      <CoinInfo />
      <Features />
      <HowItWorks />
      <FAQ/>
      {/* <TrustIndicators /> */}
      {/* <CTA /> */}

      <Footer />
    </div>
  );
};

export default Home;
