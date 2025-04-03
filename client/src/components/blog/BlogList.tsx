import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ['/api/blog'],
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-6">
              <div className="flex items-center mb-2 justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-6 w-4/5 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-3 gap-8">
        {blogPosts && blogPosts.length > 0 ? (
          blogPosts.map((post: any) => <BlogCard key={post.id} post={post} />)
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className="text-gray-500">No blog posts available at the moment.</p>
          </div>
        )}
      </div>
      
      {blogPosts && blogPosts.length > 0 && (
        <div className="text-center mt-8">
          <Button variant="outline">View All Blog Posts</Button>
        </div>
      )}
    </>
  );
};

export default BlogList;
