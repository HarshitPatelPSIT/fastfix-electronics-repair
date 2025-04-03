import { Link } from 'wouter';
import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Service } from '@/data/services';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const { title, description, image, duration, price } = service;

  return (
    <Card className="overflow-hidden transition-transform hover:scale-105">
      <div className="w-full h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-neutral-dark mb-4">
          {description}
        </p>
        <div className="flex justify-between items-center text-sm">
          <span className="text-neutral-dark">
            <Clock size={16} className="inline mr-1" /> {duration}
          </span>
          <span className="font-bold text-primary">
            From ${price}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
