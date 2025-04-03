import BookingForm from "@/components/booking/BookingForm";
import TrackingSystem from "@/components/booking/TrackingSystem";
import { Helmet } from "react-helmet";

const BookingPage = () => {
  return (
    <>
      <Helmet>
        <title>Book & Track Repairs - FastFix</title>
        <meta name="description" content="Book your electronics repair or track the status of your existing repair." />
      </Helmet>
      
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Book a Repair</h2>
              <BookingForm />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-8">Track Your Repair</h2>
              <TrackingSystem />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingPage;
