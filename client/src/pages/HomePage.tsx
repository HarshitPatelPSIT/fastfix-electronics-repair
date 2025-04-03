import HeroSection from "@/components/home/HeroSection";
import ServiceCategories from "@/components/home/ServiceCategories";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>FastFix - Fast & Reliable Electronics Repair</title>
        <meta name="description" content="Professional electronics repair service for smartphones, tablets, computers, and game consoles with fast turnaround times." />
      </Helmet>
      
      <HeroSection />
      <ServiceCategories />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
};

export default HomePage;
