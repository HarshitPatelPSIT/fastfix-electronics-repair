import { cn } from '@/lib/utils';

interface IconContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  className?: string;
}

const IconContainer = ({
  children,
  size = 'md',
  variant = 'primary',
  className
}: IconContainerProps) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const variantClasses = {
    primary: 'bg-primary bg-opacity-10',
    secondary: 'bg-secondary bg-opacity-10'
  };

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
};

export default IconContainer;
