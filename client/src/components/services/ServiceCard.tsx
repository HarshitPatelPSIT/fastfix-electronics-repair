import { Link } from "wouter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Service } from "@shared/schema";

interface ServiceCardProps {
  service: Service;
  imageUrl: string;
  relatedServices: {
    name: string;
    price: string;
  }[];
  turnaround: string;
}

const ServiceCard = ({ service, imageUrl, relatedServices, turnaround }: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 relative">
        <img 
          src={imageUrl} 
          alt={service.name} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold">{service.name}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <div className="mb-4">
          {relatedServices.map((relatedService, index) => (
            <div key={index} className="flex justify-between mb-1">
              <span className="font-medium">{relatedService.name}</span>
              <span className="text-primary font-medium">{relatedService.price}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{turnaround}</span>
          <Link href="/booking">
            <a className="text-primary hover:underline font-medium">Book Now</a>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
