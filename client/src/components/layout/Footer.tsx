import { Link } from 'wouter';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-dark text-white py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">FastFix</h3>
            <p className="text-sm text-neutral-medium mb-4">
              Professional electronics repair services with fast turnaround times and quality guarantees.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-neutral-medium hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-neutral-medium hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-neutral-medium hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-neutral-medium hover:text-white transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-neutral-medium hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/services" className="text-neutral-medium hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/about" className="text-neutral-medium hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/booking" className="text-neutral-medium hover:text-white transition-colors">Book a Repair</Link></li>
              <li><Link href="/blog" className="text-neutral-medium hover:text-white transition-colors">Blog & Guides</Link></li>
              <li><Link href="/contact" className="text-neutral-medium hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-neutral-medium hover:text-white transition-colors">Smartphone Repair</Link></li>
              <li><Link href="/services" className="text-neutral-medium hover:text-white transition-colors">Tablet Repair</Link></li>
              <li><Link href="/services" className="text-neutral-medium hover:text-white transition-colors">Computer Repair</Link></li>
              <li><Link href="/services" className="text-neutral-medium hover:text-white transition-colors">Game Console Repair</Link></li>
              <li><Link href="/services" className="text-neutral-medium hover:text-white transition-colors">Data Recovery</Link></li>
              <li><Link href="/services" className="text-neutral-medium hover:text-white transition-colors">Software Troubleshooting</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-neutral-medium">
                <MapPin className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>123 Tech Street, Repair City, RC 12345</span>
              </li>
              <li className="flex items-center text-neutral-medium">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center text-neutral-medium">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>support@fastfix.com</span>
              </li>
              <li className="flex items-center text-neutral-medium">
                <Clock className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>Mon-Fri: 9am-6pm, Sat: 10am-4pm</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-neutral-medium text-center text-sm text-neutral-medium">
          <p>© {new Date().getFullYear()} FastFix Electronics Repair. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
