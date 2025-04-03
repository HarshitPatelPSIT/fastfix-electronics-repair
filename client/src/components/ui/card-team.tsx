import { Card, CardContent } from '@/components/ui/card';
import { TeamMember } from '@/data/team';

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard = ({ member }: TeamCardProps) => {
  const { name, role, bio, image } = member;

  return (
    <Card className="overflow-hidden text-center">
      <div className="w-full h-64 overflow-hidden">
        <img 
          src={image} 
          alt={`Team member - ${name}`} 
          className="w-full h-full object-cover object-center"
        />
      </div>
      <CardContent className="p-6">
        <h4 className="text-xl font-bold text-neutral-dark mb-1">{name}</h4>
        <p className="text-primary font-medium mb-3">{role}</p>
        <p className="text-neutral-dark text-sm">
          {bio}
        </p>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
