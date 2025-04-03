import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Smartphone, Laptop, Tablet, Watch, Tv, HardDrive, Cpu, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

// Define device types and issues
const deviceTypes = [
  { id: 'smartphone', label: 'Smartphone', icon: Smartphone, basePrice: 50 },
  { id: 'tablet', label: 'Tablet', icon: Tablet, basePrice: 60 },
  { id: 'laptop', label: 'Laptop', icon: Laptop, basePrice: 80 },
  { id: 'smartwatch', label: 'Smartwatch', icon: Watch, basePrice: 40 },
  { id: 'tv', label: 'TV / Monitor', icon: Tv, basePrice: 70 },
  { id: 'desktop', label: 'Desktop PC', icon: HardDrive, basePrice: 75 },
];

const issueTypes = {
  smartphone: [
    { id: 'screen', label: 'Screen Replacement', price: 80 },
    { id: 'battery', label: 'Battery Replacement', price: 40 },
    { id: 'charging', label: 'Charging Port Repair', price: 35 },
    { id: 'water', label: 'Water Damage', price: 70 },
    { id: 'software', label: 'Software Issue', price: 40 },
    { id: 'camera', label: 'Camera Repair', price: 50 },
  ],
  tablet: [
    { id: 'screen', label: 'Screen Replacement', price: 90 },
    { id: 'battery', label: 'Battery Replacement', price: 50 },
    { id: 'charging', label: 'Charging Port Repair', price: 40 },
    { id: 'water', label: 'Water Damage', price: 80 },
    { id: 'software', label: 'Software Issue', price: 45 },
  ],
  laptop: [
    { id: 'screen', label: 'Screen Replacement', price: 150 },
    { id: 'keyboard', label: 'Keyboard Replacement', price: 80 },
    { id: 'battery', label: 'Battery Replacement', price: 90 },
    { id: 'harddrive', label: 'Hard Drive Replacement', price: 100 },
    { id: 'software', label: 'Software Issue', price: 70 },
  ],
  smartwatch: [
    { id: 'screen', label: 'Screen Replacement', price: 70 },
    { id: 'battery', label: 'Battery Replacement', price: 35 },
    { id: 'software', label: 'Software Issue', price: 30 },
    { id: 'band', label: 'Band Replacement', price: 20 },
  ],
  tv: [
    { id: 'screen', label: 'Screen Replacement', price: 200 },
    { id: 'backlight', label: 'Backlight Repair', price: 120 },
    { id: 'board', label: 'Main Board Repair', price: 150 },
    { id: 'speakers', label: 'Speaker Repair', price: 80 },
  ],
  desktop: [
    { id: 'motherboard', label: 'Motherboard Repair', price: 150 },
    { id: 'harddrive', label: 'Hard Drive Replacement', price: 90 },
    { id: 'powersupply', label: 'Power Supply Replacement', price: 70 },
    { id: 'ram', label: 'RAM Upgrade', price: 60 },
    { id: 'gpu', label: 'Graphics Card Repair', price: 100 },
    { id: 'software', label: 'Software Issue', price: 60 },
  ],
};

const additionalOptions = [
  { id: 'express', label: 'Express Service (24h)', price: 30 },
  { id: 'data', label: 'Data Backup & Recovery', price: 25 },
  { id: 'warranty', label: 'Extended Warranty (6 months)', price: 20 },
  { id: 'cleaning', label: 'Deep Cleaning & Sanitization', price: 15 },
];

const brands = {
  smartphone: ['Apple', 'Samsung', 'Google', 'Xiaomi', 'OnePlus', 'Other'],
  tablet: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Amazon', 'Other'],
  laptop: ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'Microsoft', 'Other'],
  smartwatch: ['Apple', 'Samsung', 'Fitbit', 'Garmin', 'Other'],
  tv: ['Samsung', 'LG', 'Sony', 'TCL', 'Hisense', 'Other'],
  desktop: ['Dell', 'HP', 'Lenovo', 'Asus', 'Acer', 'Custom Build', 'Other'],
};

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const RepairCalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedDevice && selectedIssue) {
      calculateEstimate();
    }
  }, [selectedDevice, selectedIssue, selectedAddons]);

  const handleDeviceSelect = (deviceId: string) => {
    setSelectedDevice(deviceId);
    setSelectedIssue(null);
    setSelectedBrand(null);
    setCurrentStep(2);
  };

  const handleIssueSelect = (issueId: string) => {
    setSelectedIssue(issueId);
    setCurrentStep(3);
  };

  const handleBrandSelect = (brandName: string) => {
    setSelectedBrand(brandName);
    setCurrentStep(4);
  };

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId) 
        : [...prev, addonId]
    );
  };

  const calculateEstimate = () => {
    if (!selectedDevice || !selectedIssue) return;

    const deviceInfo = deviceTypes.find(d => d.id === selectedDevice);
    if (!deviceInfo) return;

    const issueInfo = issueTypes[selectedDevice as keyof typeof issueTypes].find(i => i.id === selectedIssue);
    if (!issueInfo) return;

    // Base calculation
    let total = deviceInfo.basePrice + issueInfo.price;

    // Add premium for premium brands
    if (selectedBrand === 'Apple') {
      total += 20; // Premium for Apple devices
    }

    // Add selected add-ons
    selectedAddons.forEach(addonId => {
      const addon = additionalOptions.find(a => a.id === addonId);
      if (addon) {
        total += addon.price;
      }
    });

    setEstimatedPrice(total);

    // Estimate repair time
    let days = 3; // Default repair time
    
    if (selectedAddons.includes('express')) {
      days = 1;
    } else if (issueInfo.id === 'water' || issueInfo.id === 'motherboard') {
      days = 5; // Complex repairs take longer
    }

    setEstimatedTime(`${days} day${days > 1 ? 's' : ''}`);
  };

  const resetCalculator = () => {
    setCurrentStep(1);
    setSelectedDevice(null);
    setSelectedIssue(null);
    setSelectedBrand(null);
    setSelectedAddons([]);
    setEstimatedPrice(null);
    setEstimatedTime(null);
  };

  const handleBookNow = () => {
    if (!selectedDevice || !selectedIssue || !selectedBrand || estimatedPrice === null) {
      toast({
        title: "Incomplete information",
        description: "Please complete all steps to get an accurate estimate.",
        variant: "destructive"
      });
      return;
    }
    
    // Get device and issue info
    const deviceInfo = deviceTypes.find(d => d.id === selectedDevice);
    const issueInfo = issueTypes[selectedDevice as keyof typeof issueTypes].find(i => i.id === selectedIssue);
    
    if (!deviceInfo || !issueInfo) return;
    
    // Create a booking object to pass to the booking page
    const bookingInfo = {
      deviceType: deviceInfo.label,
      deviceBrand: selectedBrand,
      issueType: issueInfo.label,
      estimatedPrice: estimatedPrice,
      estimatedTime: estimatedTime,
      addons: selectedAddons.map(id => {
        const addon = additionalOptions.find(a => a.id === id);
        return addon ? addon.label : '';
      }).filter(Boolean)
    };
    
    // Save to localStorage for the booking page to use
    localStorage.setItem('repairEstimate', JSON.stringify(bookingInfo));
    
    toast({
      title: "Estimate saved!",
      description: "Your repair estimate has been saved. Redirecting to booking...",
    });
    
    // Redirect to booking page after a short delay
    setTimeout(() => {
      window.location.href = '/booking';
    }, 1500);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Repair Cost Calculator</CardTitle>
        <CardDescription>
          Get an instant estimate for your device repair
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {/* Progress indicator */}
        <div className="flex mb-6 w-full">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex-1 flex flex-col items-center">
              <div 
                className={`w-8 h-8 flex items-center justify-center rounded-full mb-1 
                  ${currentStep >= step 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'}`}
              >
                {currentStep > step ? <Check size={16} /> : step}
              </div>
              <div className={`text-xs ${currentStep >= step ? 'text-primary' : 'text-muted-foreground'}`}>
                {step === 1 ? 'Device' : step === 2 ? 'Issue' : step === 3 ? 'Brand' : 'Add-ons'}
              </div>
              {step < 4 && (
                <div className={`h-[2px] w-full mt-4 ${currentStep > step ? 'bg-primary' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Select Device */}
        {currentStep === 1 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h3 className="text-lg font-medium mb-4">What type of device needs repair?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {deviceTypes.map((device) => {
                const Icon = device.icon;
                return (
                  <button
                    key={device.id}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all
                      ${selectedDevice === device.id 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50 hover:bg-accent'}`}
                    onClick={() => handleDeviceSelect(device.id)}
                  >
                    <Icon className={`w-10 h-10 mb-2 ${selectedDevice === device.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="text-sm font-medium">{device.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 2: Select Issue */}
        {currentStep === 2 && selectedDevice && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h3 className="text-lg font-medium mb-4">What's the issue with your device?</h3>
            <RadioGroup
              value={selectedIssue || ""}
              onValueChange={handleIssueSelect}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            >
              {issueTypes[selectedDevice as keyof typeof issueTypes].map((issue) => (
                <div key={issue.id} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent">
                  <RadioGroupItem value={issue.id} id={issue.id} />
                  <Label htmlFor={issue.id} className="flex flex-1 justify-between cursor-pointer">
                    <span>{issue.label}</span>
                    <span className="font-medium">${issue.price}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={() => setCurrentStep(1)}
            >
              Back
            </Button>
          </motion.div>
        )}

        {/* Step 3: Select Brand */}
        {currentStep === 3 && selectedDevice && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h3 className="text-lg font-medium mb-4">Select your device brand</h3>
            <Select onValueChange={handleBrandSelect} value={selectedBrand || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                {brands[selectedDevice as keyof typeof brands].map((brand) => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-between mt-4">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(2)}
              >
                Back
              </Button>
              <Button 
                disabled={!selectedBrand}
                onClick={() => setCurrentStep(4)}
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Additional Options */}
        {currentStep === 4 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="space-y-4"
          >
            <h3 className="text-lg font-medium mb-4">Additional Services (Optional)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {additionalOptions.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-start space-x-3 rounded-md border p-3 hover:bg-accent ${
                    selectedAddons.includes(option.id) ? 'border-primary bg-primary/10' : ''
                  }`}
                >
                  <Checkbox
                    id={option.id}
                    checked={selectedAddons.includes(option.id)}
                    onCheckedChange={() => handleAddonToggle(option.id)}
                  />
                  <div className="flex-1 flex justify-between">
                    <Label htmlFor={option.id} className="cursor-pointer">
                      {option.label}
                    </Label>
                    <span className="font-medium">${option.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(3)}
              className="mt-4"
            >
              Back
            </Button>
          </motion.div>
        )}

        {/* Results */}
        {estimatedPrice !== null && currentStep === 4 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mt-8 p-4 bg-muted rounded-lg"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Estimated Cost</h3>
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="flex items-center text-xl font-bold text-primary"
              >
                <DollarSign className="w-5 h-5 mr-1" />
                {estimatedPrice}
              </motion.div>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Estimated Time</h3>
              <span>{estimatedTime}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              This is an estimate only. Final price may vary based on diagnostic results.
            </p>
          </motion.div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" onClick={resetCalculator}>
          Reset
        </Button>
        {estimatedPrice !== null && (
          <Button onClick={handleBookNow}>
            Book Repair Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RepairCalculator;