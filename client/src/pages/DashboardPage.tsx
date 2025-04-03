import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

const DashboardPage = () => {
  // In a real application, this would check authentication state
  const isLoggedIn = false;

  return (
    <>
      <Helmet>
        <title>User Dashboard - FastFix</title>
        <meta name="description" content="Manage your repair orders, track progress, and update notification preferences." />
      </Helmet>
      
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Manage your repair orders, track progress, and update notification preferences.
            </p>
          </div>
          
          {isLoggedIn ? (
            <div>
              {/* Dashboard content would be implemented here */}
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg text-center max-w-md mx-auto">
              <Lock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Login Required</h3>
              <p className="text-gray-600 mb-4">
                Please log in to access your personal dashboard and repair history.
              </p>
              <div className="flex justify-center gap-4">
                <Button>Log In</Button>
                <Button variant="outline">Register</Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
