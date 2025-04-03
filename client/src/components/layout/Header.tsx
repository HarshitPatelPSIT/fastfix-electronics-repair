import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path ? "text-primary" : "text-secondary hover:text-primary";
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <a className="text-primary font-bold text-2xl">FastFix</a>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/">
            <a className={`${isActive("/")} font-medium`}>Home</a>
          </Link>
          <Link href="/services">
            <a className={`${isActive("/services")} font-medium`}>Services</a>
          </Link>
          <Link href="/about">
            <a className={`${isActive("/about")} font-medium`}>About Us</a>
          </Link>
          <Link href="/booking">
            <a className={`${isActive("/booking")} font-medium`}>Booking</a>
          </Link>
          <Link href="/blog">
            <a className={`${isActive("/blog")} font-medium`}>Blog & Guides</a>
          </Link>
          <Link href="/contact">
            <a className={`${isActive("/contact")} font-medium`}>Contact</a>
          </Link>
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          className="md:hidden text-secondary" 
          onClick={toggleMobileMenu}
          size="icon"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2 shadow-md">
          <div className="flex flex-col space-y-3 pb-3">
            <Link href="/">
              <a 
                className={`${isActive("/")} font-medium py-2`}
                onClick={closeMobileMenu}
              >
                Home
              </a>
            </Link>
            <Link href="/services">
              <a 
                className={`${isActive("/services")} font-medium py-2`}
                onClick={closeMobileMenu}
              >
                Services
              </a>
            </Link>
            <Link href="/about">
              <a 
                className={`${isActive("/about")} font-medium py-2`}
                onClick={closeMobileMenu}
              >
                About Us
              </a>
            </Link>
            <Link href="/booking">
              <a 
                className={`${isActive("/booking")} font-medium py-2`}
                onClick={closeMobileMenu}
              >
                Booking
              </a>
            </Link>
            <Link href="/blog">
              <a 
                className={`${isActive("/blog")} font-medium py-2`}
                onClick={closeMobileMenu}
              >
                Blog & Guides
              </a>
            </Link>
            <Link href="/contact">
              <a 
                className={`${isActive("/contact")} font-medium py-2`}
                onClick={closeMobileMenu}
              >
                Contact
              </a>
            </Link>
            <Link href="/dashboard">
              <Button className="w-full" onClick={closeMobileMenu}>
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
