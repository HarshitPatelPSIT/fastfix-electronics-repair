import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

export function useActiveSection() {
  const [location] = useLocation();
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Map location to section
    if (location === '/') {
      setActiveSection('home');
    } else {
      const sectionFromPath = location.slice(1);
      setActiveSection(sectionFromPath);
    }
  }, [location]);

  return activeSection;
}
