import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/ui/card-service';
import { services } from '@/data/services';

const Services = () => {
  return (
    <div>
      {/* Services Hero */}
      <section className="bg-white py-12">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">Our Repair Services</h1>
            <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
              Professional repair services for all your electronic devices with fast turnaround time and quality workmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="bg-neutral-light py-12">
        <div className="container mx-auto">          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
          
          <div className="text-center mt-12 p-8 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-primary mb-4">Need a Custom Repair Solution?</h3>
            <p className="text-neutral-dark mb-6">
              We offer custom repair solutions for unique problems. Contact us to discuss your specific needs.
            </p>
            <Button asChild>
              <Link href="/contact">
                <span>Contact Us</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Guarantees */}
      <section className="bg-white py-12">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-neutral-dark">Our Service Guarantees</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-neutral-medium rounded-lg">
              <h3 className="text-xl font-bold text-primary mb-3">90-Day Warranty</h3>
              <p className="text-neutral-dark">
                All repairs come with a 90-day warranty covering parts and labor for your peace of mind.
              </p>
            </div>
            
            <div className="text-center p-6 border border-neutral-medium rounded-lg">
              <h3 className="text-xl font-bold text-primary mb-3">Price Match Promise</h3>
              <p className="text-neutral-dark">
                Found a better price? We'll match any written quote from a local competitor.
              </p>
            </div>
            
            <div className="text-center p-6 border border-neutral-medium rounded-lg">
              <h3 className="text-xl font-bold text-primary mb-3">Repair Satisfaction</h3>
              <p className="text-neutral-dark">
                If you're not satisfied with our repair, we'll fix it again or refund your money.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="bg-accent hover:bg-orange-700">
              <Link href="/booking">
                <span>Book a Repair Now</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
