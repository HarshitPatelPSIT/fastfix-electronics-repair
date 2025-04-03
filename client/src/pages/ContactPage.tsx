import { useEffect, useRef } from "react";
import ContactForm from "@/components/contact/ContactForm";
import FAQ from "@/components/contact/FAQ";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet";

const ContactPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This would normally be replaced with a proper Google Maps integration
    // For now, just creating a placeholder
    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <div class="absolute inset-0 p-6 flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1A73E8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-4">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <p class="text-center text-gray-600">Google Maps showing the store location at 123 Repair Street, Tech City, TC 10010</p>
        </div>
      `;
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact & Support - FastFix</title>
        <meta name="description" content="Contact our team for support, get answers to FAQs, and find our location." />
      </Helmet>
      
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Contact & Support</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Contact details, location map, FAQs, and live chat support.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <ContactForm />
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <MapPin className="text-primary" size={16} />
                      </div>
                      <h4 className="font-medium">Our Location</h4>
                    </div>
                    <p className="text-gray-600">123 Repair Street, Tech City, TC 10010</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <Phone className="text-primary" size={16} />
                      </div>
                      <h4 className="font-medium">Phone Number</h4>
                    </div>
                    <p className="text-gray-600">(123) 456-7890</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <Mail className="text-primary" size={16} />
                      </div>
                      <h4 className="font-medium">Email</h4>
                    </div>
                    <p className="text-gray-600">support@fastfix.com</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <Clock className="text-primary" size={16} />
                      </div>
                      <h4 className="font-medium">Business Hours</h4>
                    </div>
                    <p className="text-gray-600">Mon-Sat: 9AM - 7PM</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <FAQ />
              
              <h2 className="text-2xl font-bold mt-8 mb-6">Our Location</h2>
              <div className="h-80 bg-gray-200 rounded-lg overflow-hidden relative" ref={mapRef}></div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Need immediate help?</h2>
              <Card className="bg-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="bg-white p-3 rounded-full mr-4">
                      <MessageSquare className="text-primary text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold">Live Chat Support</h4>
                      <p className="text-gray-600">Our support team is available to help you in real-time</p>
                    </div>
                    <Button className="ml-auto">Start Chat</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
