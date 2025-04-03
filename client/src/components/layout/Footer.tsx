import { Link } from "wouter";
import { 
  FacebookIcon, 
  TwitterIcon, 
  InstagramIcon, 
  LinkedinIcon,
  MapPin,
  Phone,
  Mail,
  Clock
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/">
              <a className="text-white font-bold text-2xl mb-4 block">FastFix</a>
            </Link>
            <p className="text-gray-300 mb-4">
              Fast and reliable electronics repair service with expert technicians and quality parts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary transition duration-300">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary transition duration-300">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary transition duration-300">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary transition duration-300">
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-300 hover:text-white transition duration-300">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-300 hover:text-white transition duration-300">Services</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-white transition duration-300">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/booking">
                  <a className="text-gray-300 hover:text-white transition duration-300">Book a Repair</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-gray-300 hover:text-white transition duration-300">Blog & Guides</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-white transition duration-300">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services?category=smartphone">
                  <a className="text-gray-300 hover:text-white transition duration-300">Smartphone Repair</a>
                </Link>
              </li>
              <li>
                <Link href="/services?category=tablet">
                  <a className="text-gray-300 hover:text-white transition duration-300">Tablet Repair</a>
                </Link>
              </li>
              <li>
                <Link href="/services?category=computer">
                  <a className="text-gray-300 hover:text-white transition duration-300">Computer Repair</a>
                </Link>
              </li>
              <li>
                <Link href="/services?category=console">
                  <a className="text-gray-300 hover:text-white transition duration-300">Game Console Repair</a>
                </Link>
              </li>
              <li>
                <Link href="/services?category=computer">
                  <a className="text-gray-300 hover:text-white transition duration-300">Data Recovery</a>
                </Link>
              </li>
              <li>
                <Link href="/services?category=smartphone">
                  <a className="text-gray-300 hover:text-white transition duration-300">Liquid Damage Repair</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mt-1 mr-3 text-primary" size={16} />
                <span className="text-gray-300">123 Repair Street, Tech City, TC 10010</span>
              </li>
              <li className="flex items-start">
                <Phone className="mt-1 mr-3 text-primary" size={16} />
                <span className="text-gray-300">(123) 456-7890</span>
              </li>
              <li className="flex items-start">
                <Mail className="mt-1 mr-3 text-primary" size={16} />
                <span className="text-gray-300">support@fastfix.com</span>
              </li>
              <li className="flex items-start">
                <Clock className="mt-1 mr-3 text-primary" size={16} />
                <span className="text-gray-300">Monday-Saturday: 9AM - 7PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© {new Date().getFullYear()} FastFix. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
