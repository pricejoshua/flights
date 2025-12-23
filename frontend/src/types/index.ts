// User types
export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
  updatedAt: string;
}

// Flight types
export interface Flight {
  id: string;
  userId: string;
  flightNumber: string;
  airlineId: string;
  airline?: Airline;
  departureAirportId: string;
  departureAirport?: Airport;
  arrivalAirportId: string;
  arrivalAirport?: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: number; // in minutes
  distance?: number; // in miles or km
  seatNumber?: string;
  seatClass: 'economy' | 'premium_economy' | 'business' | 'first';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Airport types
export interface Airport {
  id: string;
  code: string; // IATA code (e.g., 'JFK')
  name: string;
  city: string;
  country: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
}

// Airline types
export interface Airline {
  id: string;
  code: string; // IATA code (e.g., 'AA')
  name: string;
  country?: string;
  logo?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
}

// Form types
export interface FlightFormData {
  flightNumber: string;
  airlineId: string;
  departureAirportId: string;
  arrivalAirportId: string;
  departureTime: string;
  arrivalTime: string;
  seatNumber?: string;
  seatClass: 'economy' | 'premium_economy' | 'business' | 'first';
  notes?: string;
}

// Statistics types
export interface FlightStats {
  totalFlights: number;
  totalDistance: number;
  totalDuration: number;
  totalAirlines: number;
  totalAirports: number;
  totalCountries: number;
  favoriteAirline?: Airline;
  favoriteAirport?: Airport;
  longestFlight?: Flight;
  shortestFlight?: Flight;
}
