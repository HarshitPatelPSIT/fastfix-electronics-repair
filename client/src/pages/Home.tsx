import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DeviceCategories from '@/components/layout/DeviceCategories';
import WhyChooseUs from '@/components/layout/WhyChooseUs';
import ServiceCard from '@/components/ui/card-service';
import BlogCard from '@/components/ui/card-blog';
import { services } from '@/data/services';
import { blogPosts } from '@/data/blog';

const Home = () => {
  const featuredServices = services.slice(0, 4);
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-dark mb-4">
                Fast & Reliable 
                <span className="text-primary block"> Electronics Repair</span>
              </h1>
              <p className="text-lg text-neutral-dark mb-8">
                Professional repair services for smartphones, tablets, computers, and game consoles. 
                Expert technicians, quick turnaround, guaranteed satisfaction.
              </p>
              <Button 
                asChild
                size="lg" 
                className="bg-accent hover:bg-orange-700 shadow-md"
              >
                <Link href="/booking">
                  <span>Book Now</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1588702547919-26089e690ecc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Electronics repair technician" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Device Categories */}
      <DeviceCategories />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Services Section */}
      <section className="bg-neutral-light py-12">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-dark mb-4">Our Services</h2>
            <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
              We offer comprehensive repair services for all your electronic devices with transparent pricing and quick turnaround times.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/services">
                <span>View All Services</span>
                <Wrench className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-dark mb-4">Blog & Guides</h2>
            <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
              Learn about device care, troubleshooting tips, and the latest in tech repair.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <BlogCard key={index} post={post} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/blog">
                <span>View All Posts</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
