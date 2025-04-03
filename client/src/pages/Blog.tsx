import { Link } from 'wouter';
import { buttonVariants } from '@/components/ui/button';
import BlogCard from '@/components/ui/card-blog';
import { blogPosts } from '@/data/blog';

const Blog = () => {
  const allPosts = blogPosts;
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  return (
    <div>
      {/* Blog Hero */}
      <section className="bg-white py-12">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">Blog & Guides</h1>
            <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
              Learn about device care, troubleshooting tips, and the latest in tech repair.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-neutral-light py-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/blog"
              className={buttonVariants({
                variant: "outline",
                className: "text-primary"
              })}
            >
              All Posts
            </Link>
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/blog/category/${category.toLowerCase()}`}
                className={buttonVariants({
                  variant: "outline",
                  className: "text-neutral-dark"
                })}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="bg-neutral-light py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPosts.map((post, index) => (
              <BlogCard key={index} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-white py-12">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto bg-primary bg-opacity-5 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-neutral-dark mb-6">
              Get the latest repair tips, guides, and special offers delivered straight to your inbox.
            </p>
            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 border border-neutral-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
