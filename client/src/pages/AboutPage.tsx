import AboutContent from "@/components/about/AboutContent";
import { Helmet } from "react-helmet";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us - FastFix Electronics Repair</title>
        <meta name="description" content="Learn about our company history, team members, mission, and certifications." />
      </Helmet>
      
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">About Us</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Learn about our company history, team members, mission, and certifications.
            </p>
          </div>
          
          <AboutContent />
        </div>
      </section>
    </>
  );
};

export default AboutPage;
