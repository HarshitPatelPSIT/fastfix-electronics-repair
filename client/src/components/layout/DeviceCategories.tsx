import { Smartphone, Tablet, Laptop, Gamepad } from 'lucide-react';
import IconContainer from '../ui/icon-container';

interface DeviceCategory {
  icon: React.ReactNode;
  name: string;
}

const DeviceCategories = () => {
  const deviceCategories: DeviceCategory[] = [
    {
      icon: <Smartphone className="text-primary text-2xl" />,
      name: 'Smartphones'
    },
    {
      icon: <Tablet className="text-primary text-2xl" />,
      name: 'Tablets'
    },
    {
      icon: <Laptop className="text-primary text-2xl" />,
      name: 'Computers'
    },
    {
      icon: <Gamepad className="text-primary text-2xl" />,
      name: 'Game Consoles'
    }
  ];

  return (
    <section className="bg-neutral-light py-10">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center text-neutral-dark mb-8">
          We Fix All Your Devices
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {deviceCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center transition-transform hover:scale-105"
            >
              <IconContainer size="lg" className="mx-auto mb-4">
                {category.icon}
              </IconContainer>
              <h3 className="font-medium text-neutral-dark">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeviceCategories;
