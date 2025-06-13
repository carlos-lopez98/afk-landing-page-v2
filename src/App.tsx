"use client";


import Hero from "./components/Hero";
import HowWeDifferSection from "./components/HowWeDifferSection";
import Footer from "./components/Footer"



// Main landing page component
const LandingPage = () => {

  return (
    <div className="relative isolate min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-[#F5F3F0]">
      <Hero />
      {/* How We're Different Section */}
      <HowWeDifferSection />
      <Footer />
    </div >
  );
};

export default LandingPage;