import BlogList from "@/components/blog/BlogList";
import { Helmet } from "react-helmet";

const BlogPage = () => {
  return (
    <>
      <Helmet>
        <title>Blog & Guides - FastFix</title>
        <meta name="description" content="DIY repair tips, industry news, customer success stories, and troubleshooting guides for electronics." />
      </Helmet>
      
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Blog & Guides</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              DIY repair tips, industry news, customer success stories, and troubleshooting guides.
            </p>
          </div>
          
          <BlogList />
        </div>
      </section>
    </>
  );
};

export default BlogPage;
