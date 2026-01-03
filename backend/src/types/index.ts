/**
 * Shared TypeScript types and interfaces
 */

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// User-related types (placeholder for future implementation)
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Flight-related types (placeholder for future implementation)
export interface Flight {
  id: string;
  userId: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  departureTime: Date;
  arrivalTime: Date;
  airline: string;
  aircraft: string;
  createdAt: Date;
  updatedAt: Date;
}
