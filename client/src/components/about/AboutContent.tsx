import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import TeamMember from "./TeamMember";
import { Skeleton } from "@/components/ui/skeleton";

const AboutContent = () => {
  const { data: teamMembers, isLoading } = useQuery({
    queryKey: ['/api/team'],
  });

  return (
    <>
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h3 className="text-2xl font-bold mb-4">Our Company</h3>
          <p className="text-gray-600 mb-4">
            Founded in 2015, FastFix has grown from a small repair shop to a leading electronics repair service with multiple locations. We're dedicated to providing fast, reliable, and affordable repair solutions for all your electronic devices.
          </p>
          <p className="text-gray-600 mb-6">
            Our mission is to extend the life of your electronics through expert repair services, reducing e-waste and saving you money on replacements.
          </p>
          <div className="flex flex-wrap gap-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">Apple Certified</Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">Samsung Authorized</Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">Microsoft Partner</Badge>
          </div>
        </div>
        <div className="h-96 relative rounded-xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Our repair shop" 
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold mb-8 text-center">Meet Our Team</h3>
      
      {isLoading ? (
        <div className="grid md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-48 w-48 rounded-full mx-auto mb-4" />
              <Skeleton className="h-6 w-32 mx-auto mb-2" />
              <Skeleton className="h-4 w-48 mx-auto" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-4 gap-8">
          {teamMembers && teamMembers.length > 0 ? (
            teamMembers.map((member: any) => (
              <TeamMember
                key={member.id}
                name={member.name}
                position={member.position}
                imageUrl={member.imageUrl}
              />
            ))
          ) : (
            <div className="col-span-4 text-center py-8">
              <p className="text-gray-500">Team member information is currently unavailable.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AboutContent;
