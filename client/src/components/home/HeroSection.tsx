import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Fast & Reliable Electronics Repair
          </h1>
          <p className="text-lg mb-8 text-gray-600">
            Professional repair services for your smartphones, tablets, computers, and gaming consoles with fast turnaround times.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/booking">
              <Button size="lg">Book Now</Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline">Our Services</Button>
            </Link>
          </div>
        </div>
        <div className="relative h-96 rounded-xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1588702547919-26089e690ecc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Electronics repair technician" 
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
