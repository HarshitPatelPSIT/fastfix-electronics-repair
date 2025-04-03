import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import FAQAccordion from '@/components/ui/faq-accordion';
import { faqs } from '@/data/faqs';

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(5, "Message is too short"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    // This would typically make an API call
    console.log(data);
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  };

  return (
    <div>
      {/* Contact Hero */}
      <section className="bg-white py-12">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">Contact & Support</h1>
            <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
              Have questions or need assistance? Our support team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="bg-neutral-light py-12">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Contact Information */}
            <div className="lg:w-1/2 p-8 bg-primary text-white">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="rounded-full w-10 h-10 bg-white bg-opacity-20 flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Visit Us</p>
                    <p className="text-sm opacity-90">123 Tech Street, Repair City, RC 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="rounded-full w-10 h-10 bg-white bg-opacity-20 flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Business Hours</p>
                    <p className="text-sm opacity-90">Monday-Friday: 9am-6pm</p>
                    <p className="text-sm opacity-90">Saturday: 10am-4pm</p>
                    <p className="text-sm opacity-90">Sunday: Closed</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="rounded-full w-10 h-10 bg-white bg-opacity-20 flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Call Us</p>
                    <p className="text-sm opacity-90">(123) 456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="rounded-full w-10 h-10 bg-white bg-opacity-20 flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Email Us</p>
                    <p className="text-sm opacity-90">support@fastfix.com</p>
                  </div>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="mt-8 h-48 bg-neutral-light rounded-lg relative overflow-hidden">
                {/* Google Maps would be integrated here */}
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-medium">
                  <p className="text-neutral-dark font-medium">Google Maps Integration</p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="rounded-full w-10 h-10 bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-colors">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="rounded-full w-10 h-10 bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-colors">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="rounded-full w-10 h-10 bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-colors">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="rounded-full w-10 h-10 bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-colors">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form & Support */}
            <div className="lg:w-1/2 p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mb-10">
                  <h2 className="text-2xl font-bold text-primary mb-6">Send Us a Message</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Full Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="How can we help you?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={4} 
                            placeholder="Tell us about your issue or question" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="bg-accent hover:bg-orange-700 mt-6"
                  >
                    Send Message
                  </Button>
                </form>
              </Form>
              
              {/* FAQ Section */}
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
                <FAQAccordion faqs={faqs} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
