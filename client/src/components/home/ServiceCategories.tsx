import { Link } from "wouter";
import { 
  Smartphone, 
  Tablet, 
  Laptop, 
  Gamepad2 
} from "lucide-react";

interface ServiceCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const ServiceCategories = () => {
  const categories: ServiceCategory[] = [
    {
      id: "smartphone",
      name: "Smartphones",
      icon: <Smartphone className="text-primary text-2xl" />
    },
    {
      id: "tablet",
      name: "Tablets",
      icon: <Tablet className="text-primary text-2xl" />
    },
    {
      id: "computer",
      name: "Computers",
      icon: <Laptop className="text-primary text-2xl" />
    },
    {
      id: "console",
      name: "Game Consoles",
      icon: <Gamepad2 className="text-primary text-2xl" />
    }
  ];

  return (
    <div className="container mx-auto px-4 mt-16">
      <h2 className="text-2xl font-bold text-center mb-8">Our Repair Services</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center">
        {categories.map((category) => (
          <Link key={category.id} href={`/services?category=${category.id}`}>
            <a className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="bg-primary/10 p-4 rounded-full mb-4 flex items-center justify-center">
                {category.icon}
              </div>
              <span className="text-center font-medium">{category.name}</span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServiceCategories;
