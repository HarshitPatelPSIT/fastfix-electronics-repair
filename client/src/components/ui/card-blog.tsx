import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { BlogPost } from '@/data/blog';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const { title, excerpt, image, category, date, slug } = post;

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
        <div className="flex items-center mb-3">
          <Badge variant="outline" className="bg-primary bg-opacity-10 text-primary">
            {category}
          </Badge>
          <span className="text-neutral-dark text-xs ml-3">{formatDate(date)}</span>
        </div>
        <h3 className="text-xl font-bold text-neutral-dark mb-2">{title}</h3>
        <p className="text-neutral-dark text-sm mb-4">
          {excerpt}
        </p>
        <Link href={`/blog/${slug}`} className="text-primary hover:text-secondary font-medium inline-flex items-center">
          <span>Read Article</span>
          <ArrowRight size={16} className="ml-2" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
