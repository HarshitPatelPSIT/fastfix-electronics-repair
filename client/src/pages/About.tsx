import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TeamCard from '@/components/ui/card-team';
import { teamMembers } from '@/data/team';

const About = () => {
  return (
    <div>
      {/* About Hero */}
      <section className="bg-white py-12">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">About Us</h1>
            <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
              FastFix was founded with a simple mission: provide fast, reliable, and affordable repair services for all electronic devices.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-neutral-light py-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center mb-16">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Our Story</h2>
              <p className="text-neutral-dark mb-4">
                Founded in 2015, FastFix started as a small repair shop and has grown into a trusted name in electronics repair. 
                We've served over 50,000 customers and counting!
              </p>
              <p className="text-neutral-dark mb-4">
                Our commitment to quality, transparency, and customer satisfaction sets us apart. Each member of our team is 
                certified and continuously trained on the latest repair techniques and technologies.
              </p>
              <p className="text-neutral-dark">
                We use only high-quality parts and offer warranties on all our repairs, ensuring that your devices stay functional 
                longer after leaving our care.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1581092921461-7d65ae724a89?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="FastFix repair shop interior" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-white py-12">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center text-primary mb-8">Meet Our Expert Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="bg-neutral-light py-12">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-primary mb-4">Our Mission & Values</h2>
            <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
              We're committed to providing exceptional repair services while adhering to our core values.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-primary mb-3">Our Mission</h3>
              <p className="text-neutral-dark mb-4">
                To provide fast, reliable, and affordable repair services that extend the life of electronic devices, 
                reduce electronic waste, and help customers save money while enjoying their technology.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-primary mb-3">Our Values</h3>
              <ul className="list-disc pl-5 text-neutral-dark space-y-2">
                <li><span className="font-medium">Integrity:</span> Honest assessments and transparent pricing</li>
                <li><span className="font-medium">Excellence:</span> Quality repairs using the best parts available</li>
                <li><span className="font-medium">Customer Focus:</span> Going above and beyond to ensure satisfaction</li>
                <li><span className="font-medium">Innovation:</span> Staying current with the latest repair techniques</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/booking">
                <span>Experience Our Service</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
