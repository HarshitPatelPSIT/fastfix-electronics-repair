import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useActiveSection } from '@/hooks/use-active-section';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const activeSection = useActiveSection();

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    if (path === '/' && location === path) return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-primary text-2xl font-bold">FastFix</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className={`${isActive('/') ? 'text-primary' : 'text-neutral-dark'} hover:text-primary font-medium`}>
              Home
            </Link>
            <Link href="/services" className={`${isActive('/services') ? 'text-primary' : 'text-neutral-dark'} hover:text-primary font-medium`}>
              Services
            </Link>
            <Link href="/about" className={`${isActive('/about') ? 'text-primary' : 'text-neutral-dark'} hover:text-primary font-medium`}>
              About Us
            </Link>
            <Link href="/booking" className={`${isActive('/booking') ? 'text-primary' : 'text-neutral-dark'} hover:text-primary font-medium`}>
              Book & Track
            </Link>
            <Link href="/blog" className={`${isActive('/blog') ? 'text-primary' : 'text-neutral-dark'} hover:text-primary font-medium`}>
              Blog
            </Link>
            <Link href="/contact" className={`${isActive('/contact') ? 'text-primary' : 'text-neutral-dark'} hover:text-primary font-medium`}>
              Contact
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-neutral-dark"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
          
          {/* User Account Button */}
          <Link href="/dashboard" className="hidden md:flex items-center text-primary hover:text-secondary">
            <User className="mr-2 h-5 w-5" />
            <span>My Account</span>
          </Link>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <Link href="/" className="block py-2 text-neutral-dark hover:text-primary font-medium">
              Home
            </Link>
            <Link href="/services" className="block py-2 text-neutral-dark hover:text-primary font-medium">
              Services
            </Link>
            <Link href="/about" className="block py-2 text-neutral-dark hover:text-primary font-medium">
              About Us
            </Link>
            <Link href="/booking" className="block py-2 text-neutral-dark hover:text-primary font-medium">
              Book & Track
            </Link>
            <Link href="/blog" className="block py-2 text-neutral-dark hover:text-primary font-medium">
              Blog
            </Link>
            <Link href="/contact" className="block py-2 text-neutral-dark hover:text-primary font-medium">
              Contact
            </Link>
            <Link href="/dashboard" className="block py-2 text-primary hover:text-secondary">
              <User className="inline-block mr-2 h-5 w-5" />
              <span>My Account</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
