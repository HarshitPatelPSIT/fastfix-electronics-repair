import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date);
  return `${formatDate(d)} - ${formatTime(d)}`;
}

export function generateTrackingSteps(status: string) {
  const allSteps = [
    { key: 'received', label: 'Device Received', icon: 'check' },
    { key: 'diagnosed', label: 'Diagnosis Complete', icon: 'check-circle' },
    { key: 'in_progress', label: 'Repair In Progress', icon: 'tools' },
    { key: 'testing', label: 'Quality Testing', icon: 'flask' },
    { key: 'completed', label: 'Ready for Pickup/Delivery', icon: 'check-double' },
  ];

  let activeFound = false;
  
  return allSteps.map(step => {
    if (activeFound) {
      return { ...step, status: 'upcoming' };
    }
    
    if (step.key === status) {
      activeFound = true;
      return { ...step, status: 'current' };
    }
    
    return { ...step, status: 'completed' };
  });
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'received':
      return 'bg-blue-500';
    case 'diagnosed':
      return 'bg-purple-500';
    case 'in_progress':
      return 'bg-yellow-500';
    case 'testing':
      return 'bg-orange-500';
    case 'completed':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'received':
      return 'Received';
    case 'diagnosed':
      return 'Diagnosed';
    case 'in_progress':
      return 'In Progress';
    case 'testing':
      return 'Testing';
    case 'completed':
      return 'Completed';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');
  }
}
