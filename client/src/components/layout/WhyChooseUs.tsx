import { Clock, Award, Shield, DollarSign } from 'lucide-react';
import IconContainer from '../ui/icon-container';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const WhyChooseUs = () => {
  const features: Feature[] = [
    {
      icon: <Clock className="text-secondary" />,
      title: 'Rapid Turnaround',
      description: 'Most repairs completed within 24-48 hours, getting your devices back quickly.'
    },
    {
      icon: <Award className="text-secondary" />,
      title: 'Certified Technicians',
      description: 'Our experts are certified and trained to handle all types of electronic repairs.'
    },
    {
      icon: <Shield className="text-secondary" />,
      title: 'Warranty Guaranteed',
      description: 'All repairs come with a 90-day warranty for your peace of mind.'
    },
    {
      icon: <DollarSign className="text-secondary" />,
      title: 'Competitive Pricing',
      description: 'Quality repairs at affordable rates with no hidden charges.'
    }
  ];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center text-neutral-dark mb-8">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start p-4">
              <IconContainer size="sm" variant="secondary" className="mr-4 flex-shrink-0">
                {feature.icon}
              </IconContainer>
              <div>
                <h3 className="font-bold text-neutral-dark mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-dark">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
