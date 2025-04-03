import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import RepairTracking from '@/components/ui/repair-tracking';
import { insertRepairSchema } from '@shared/schema';

// Extend the schema with validation rules
const bookingFormSchema = insertRepairSchema.extend({
  deviceType: z.string().min(1, "Device type is required"),
  deviceModel: z.string().min(1, "Device model is required"),
  issueDescription: z.string().min(5, "Please describe the issue"),
  customerName: z.string().min(1, "Your name is required"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const Booking = () => {
  const [trackingId, setTrackingId] = useState('');
  const { toast } = useToast();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      deviceType: '',
      deviceModel: '',
      issueDescription: '',
      customerName: '',
      customerEmail: '',
      customerPhone: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: BookingFormValues) => {
      const response = await apiRequest('POST', '/api/repairs', data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Repair request submitted!",
        description: `Your tracking code is: ${data.trackingCode}`,
      });
      setTrackingId(data.trackingCode);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error submitting repair request",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: BookingFormValues) {
    mutate(data);
  }

  return (
    <div>
      {/* Booking & Tracking Hero */}
      <section className="bg-white py-12">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">Book & Track Your Repair</h1>
            <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
              Schedule a repair service and track its progress through our easy-to-use system.
            </p>
          </div>
        </div>
      </section>

      {/* Booking & Tracking Form */}
      <section className="bg-neutral-light py-12">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Booking Form */}
            <div className="lg:w-1/2 p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Book a Repair</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="deviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Device Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your device type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="smartphone">Smartphone</SelectItem>
                            <SelectItem value="tablet">Tablet</SelectItem>
                            <SelectItem value="computer">Computer/Laptop</SelectItem>
                            <SelectItem value="game_console">Game Console</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="deviceModel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Device Model</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. iPhone 13, Samsung S21" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="issueDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Issue Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please describe the problem with your device" 
                            rows={3} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="customerName"
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
                      name="customerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="customerEmail"
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
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-orange-700 mt-6"
                    disabled={isPending}
                  >
                    {isPending ? "Submitting..." : "Submit Repair Request"}
                  </Button>
                </form>
              </Form>
            </div>
            
            {/* Tracking System */}
            <div className="lg:w-1/2 p-8 bg-neutral-light">
              <h2 className="text-2xl font-bold text-primary mb-6">Track Your Repair</h2>
              
              <RepairTracking initialTrackingId={trackingId} />
              
              <div className="bg-secondary bg-opacity-10 rounded-lg p-4 mt-6">
                <h4 className="font-medium text-primary mb-2">Have questions about your repair?</h4>
                <p className="text-sm text-neutral-dark mb-3">
                  Contact our support team for immediate assistance with your repair status.
                </p>
                <Button variant="link" className="text-primary hover:text-secondary p-0" asChild>
                  <a href="/contact">
                    Contact Support <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
