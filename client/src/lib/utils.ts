import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

export function getStatusColor(status: string): {bg: string; text: string} {
  switch (status.toLowerCase()) {
    case 'received':
      return { bg: 'bg-blue-100', text: 'text-blue-700' };
    case 'diagnosed':
      return { bg: 'bg-purple-100', text: 'text-purple-700' };
    case 'repairing':
      return { bg: 'bg-yellow-100', text: 'text-yellow-700' };
    case 'ready':
      return { bg: 'bg-green-100', text: 'text-green-700' };
    case 'completed':
      return { bg: 'bg-green-100', text: 'text-green-700' };
    case 'cancelled':
      return { bg: 'bg-red-100', text: 'text-red-700' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-700' };
  }
}

export function generateTrackingId(): string {
  return `FF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
}
