import { 
  Zap, 
  CheckCircle, 
  Shield, 
  DollarSign 
} from "lucide-react";

interface Reason {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const WhyChooseUs = () => {
  const reasons: Reason[] = [
    {
      icon: <Zap className="text-primary" />,
      title: "Rapid Turnaround",
      description: "Most repairs completed within 24-48 hours, getting your devices back to you quickly."
    },
    {
      icon: <CheckCircle className="text-primary" />,
      title: "Certified Technicians",
      description: "Our expert team is certified in all major brands and devices for quality repairs."
    },
    {
      icon: <Shield className="text-primary" />,
      title: "Warranty Guarantee",
      description: "All our repairs come with a 90-day warranty for your peace of mind."
    },
    {
      icon: <DollarSign className="text-primary" />,
      title: "Competitive Pricing",
      description: "Fair and transparent pricing with no hidden fees or surprises."
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  {reason.icon}
                </div>
                <h3 className="font-semibold text-lg">{reason.title}</h3>
              </div>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
