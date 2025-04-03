import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, truncateText } from "@/lib/utils";
import { BlogPost } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 relative">
        <img
          src={post.imageUrl || "https://via.placeholder.com/600x300"}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center mb-2 justify-between">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            {post.category}
          </Badge>
          <span className="text-xs text-gray-500">
            {formatDate(post.publishedAt)}
          </span>
        </div>
        <h3 className="font-bold text-lg mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">
          {truncateText(post.excerpt, 120)}
        </p>
        <Link href={`/blog/${post.slug}`}>
          <a className="text-primary hover:underline font-medium">Read More</a>
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
