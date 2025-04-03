import { useQuery } from "@tanstack/react-query";
import ServiceCard from "./ServiceCard";
import { Skeleton } from "@/components/ui/skeleton";

interface ServiceCategory {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  relatedServices: {
    name: string;
    price: string;
  }[];
  turnaround: string;
}

const ServicesList = () => {
  const { data: services, isLoading } = useQuery({
    queryKey: ['/api/services'],
  });

  const serviceCategories: ServiceCategory[] = [
    {
      id: "smartphone",
      title: "Smartphone Repair",
      imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Professional repair services for all major brands including Apple, Samsung, Google, and more.",
      relatedServices: [
        { name: "Screen Replacement", price: "From $79" },
        { name: "Battery Replacement", price: "From $49" },
        { name: "Water Damage Repair", price: "From $99" }
      ],
      turnaround: "24-48 hour turnaround"
    },
    {
      id: "tablet",
      title: "Tablet Repair",
      imageUrl: "https://images.unsplash.com/photo-1544499692-75aa3f16e614?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Expert tablet repair for iPad, Samsung Galaxy Tab, Microsoft Surface, and other major brands.",
      relatedServices: [
        { name: "Screen Replacement", price: "From $99" },
        { name: "Battery Replacement", price: "From $69" },
        { name: "Charging Port Repair", price: "From $59" }
      ],
      turnaround: "24-72 hour turnaround"
    },
    {
      id: "computer",
      title: "Computer Repair",
      imageUrl: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Comprehensive repair services for desktops, laptops, and Macs with fast turnaround times.",
      relatedServices: [
        { name: "Hardware Upgrade", price: "From $89" },
        { name: "Virus Removal", price: "From $69" },
        { name: "Data Recovery", price: "From $129" }
      ],
      turnaround: "1-3 day turnaround"
    },
    {
      id: "console",
      title: "Game Console Repair",
      imageUrl: "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Expert repair for PlayStation, Xbox, Nintendo Switch, and other gaming consoles.",
      relatedServices: [
        { name: "HDMI Port Repair", price: "From $89" },
        { name: "Disc Drive Repair", price: "From $79" },
        { name: "Overheating Fix", price: "From $69" }
      ],
      turnaround: "2-4 day turnaround"
    }
  ];

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-6">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <div className="space-y-2 mb-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {services && services.length > 0 ? (
        serviceCategories.map((category) => {
          const categoryServices = services.filter(
            (svc: any) => svc.category === category.id
          );
          
          if (categoryServices.length > 0) {
            return (
              <ServiceCard
                key={category.id}
                service={{
                  id: 0, // placeholder
                  category: category.id,
                  name: category.title,
                  description: category.description,
                  price: "",
                  estimatedTime: category.turnaround
                }}
                imageUrl={category.imageUrl}
                relatedServices={category.relatedServices}
                turnaround={category.turnaround}
              />
            );
          }
          return null;
        })
      ) : (
        <div className="col-span-3 text-center py-12">
          <p className="text-gray-500">No services available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default ServicesList;
