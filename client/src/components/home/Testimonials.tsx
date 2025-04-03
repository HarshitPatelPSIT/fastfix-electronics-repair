import { Star } from "lucide-react";

interface Testimonial {
  rating: number;
  text: string;
  author: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      rating: 5,
      text: "\"My iPhone screen was completely shattered, but FastFix had it looking brand new in just a few hours. Great service and reasonable prices!\"",
      author: "Sarah M."
    },
    {
      rating: 5,
      text: "\"The tracking system kept me updated throughout the whole repair process. My laptop works better than ever now. Highly recommended!\"",
      author: "James L."
    },
    {
      rating: 4.5,
      text: "\"I thought my gaming console was toast after a power surge, but the team at FastFix diagnosed and fixed it quickly. Great technical expertise!\"",
      author: "Michael R."
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-primary text-primary" />);
    }
    
    // Half star if needed
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="text-primary" />
          <Star className="absolute inset-0 fill-primary text-primary overflow-hidden w-[50%]" />
        </div>
      );
    }
    
    // Empty stars to complete 5
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-primary" />);
    }
    
    return stars;
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex mb-2">
                {renderStars(testimonial.rating)}
              </div>
              <p className="italic mb-4 text-gray-600">{testimonial.text}</p>
              <div className="flex items-center">
                <span className="font-medium text-secondary">{testimonial.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
