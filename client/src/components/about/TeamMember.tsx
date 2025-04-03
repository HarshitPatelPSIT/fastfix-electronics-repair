interface TeamMemberProps {
  name: string;
  position: string;
  imageUrl: string;
}

const TeamMember = ({ name, position, imageUrl }: TeamMemberProps) => {
  return (
    <div className="text-center">
      <div className="h-48 w-48 mx-auto relative rounded-full overflow-hidden mb-4">
        <img 
          src={imageUrl} 
          alt={`${name} - ${position}`} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <h4 className="font-bold text-lg">{name}</h4>
      <p className="text-primary">{position}</p>
    </div>
  );
};

export default TeamMember;
