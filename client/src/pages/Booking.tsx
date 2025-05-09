import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator } from 'lucide-react';
import { Link } from 'wouter';
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

// Interface for the repair estimate data from calculator
interface RepairEstimate {
  deviceType: string;
  deviceBrand: string;
  issueType: string;
  estimatedPrice: number;
  estimatedTime: string;
  addons: string[];
}

const Booking = () => {
  const [trackingId, setTrackingId] = useState('');
  const [hasEstimate, setHasEstimate] = useState(false);
  const [estimateData, setEstimateData] = useState<RepairEstimate | null>(null);
  const { toast } = useToast();

  // Load estimate data from localStorage, if it exists
  useEffect(() => {
    const savedEstimate = localStorage.getItem('repairEstimate');
    if (savedEstimate) {
      try {
        const parsedEstimate = JSON.parse(savedEstimate) as RepairEstimate;
        setEstimateData(parsedEstimate);
        setHasEstimate(true);
        
        // Pre-fill the form with data from estimate
        form.setValue('deviceType', convertDeviceType(parsedEstimate.deviceType));
        form.setValue('deviceModel', parsedEstimate.deviceBrand);
        form.setValue('issueDescription', 
          `${parsedEstimate.issueType}${parsedEstimate.addons.length > 0 ? 
            `. Additional services: ${parsedEstimate.addons.join(', ')}` : 
            ''}`
        );
        
        // Show toast notification
        toast({
          title: "Estimate loaded",
          description: `Your repair estimate has been loaded. Estimated cost: $${parsedEstimate.estimatedPrice}`,
        });
      } catch (e) {
        console.error('Error parsing saved estimate:', e);
      }
    }
  }, []);
  
  // Helper function to convert device type labels to form values
  const convertDeviceType = (deviceLabel: string): string => {
    const map: {[key: string]: string} = {
      'Smartphone': 'smartphone',
      'Tablet': 'tablet',
      'Laptop': 'computer',
      'Desktop PC': 'computer',
      'Smartwatch': 'other',
      'TV / Monitor': 'other'
    };
    return map[deviceLabel] || 'other';
  };

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
    // Clear the estimate after submission
    if (hasEstimate) {
      localStorage.removeItem('repairEstimate');
      setHasEstimate(false);
      setEstimateData(null);
    }
  }
  
  // Function to clear the estimate and reset the form
  const clearEstimate = () => {
    localStorage.removeItem('repairEstimate');
    setHasEstimate(false);
    setEstimateData(null);
    form.reset({
      deviceType: '',
      deviceModel: '',
      issueDescription: '',
      customerName: form.getValues('customerName'),
      customerEmail: form.getValues('customerEmail'),
      customerPhone: form.getValues('customerPhone'),
    });
    toast({
      title: "Estimate cleared",
      description: "The saved estimate has been cleared from your form."
    });
  };

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
              
              {/* Show estimate if available */}
              {hasEstimate && estimateData ? (
                <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-primary flex items-center">
                      <Calculator className="inline-block mr-2 h-4 w-4" />
                      Estimate from Calculator
                    </h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearEstimate}
                      className="h-7 text-xs text-muted-foreground"
                    >
                      Clear
                    </Button>
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Device:</span>
                      <span className="font-medium">{estimateData.deviceType} ({estimateData.deviceBrand})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Issue:</span>
                      <span className="font-medium">{estimateData.issueType}</span>
                    </div>
                    {estimateData.addons.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Add-ons:</span>
                        <span className="font-medium">{estimateData.addons.join(', ')}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-1 border-t mt-2">
                      <span className="font-semibold">Estimated Price:</span>
                      <span className="font-bold text-primary">${estimateData.estimatedPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Estimated Time:</span>
                      <span className="font-medium">{estimateData.estimatedTime}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Not sure about repair costs? Get an instant estimate first.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/calculator">
                      <Calculator className="mr-2 h-4 w-4" />
                      Use Repair Calculator
                    </Link>
                  </Button>
                </div>
              )}
              
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
