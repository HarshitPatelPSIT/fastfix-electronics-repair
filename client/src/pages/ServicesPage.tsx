import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import ServicesList from "@/components/services/ServicesList";
import { Helmet } from "react-helmet";

const ServicesPage = () => {
  const [location] = useLocation();
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    // Extract category from URL query parameters if it exists
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");
    setCategory(categoryParam);
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Our Services - FastFix Electronics Repair</title>
        <meta name="description" content="Detailed list of our electronics repair services including smartphones, tablets, computers, and game consoles." />
      </Helmet>
      
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Our Services</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Detailed list of repair services with pricing, descriptions, and estimated turnaround time.
              {category && (
                <>
                  {" "}Currently showing <span className="font-medium capitalize">{category}</span> repairs.
                </>
              )}
            </p>
          </div>
          
          <ServicesList />
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
