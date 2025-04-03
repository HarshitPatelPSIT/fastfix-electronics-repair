import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LiveChat from "./components/ui/LiveChat";

import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import BookingPage from "./pages/BookingPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/booking" component={BookingPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
        <LiveChat />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
