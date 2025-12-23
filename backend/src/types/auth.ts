// JWT payload structure
export interface JwtPayload {
  userId: string;
  email?: string;
  iat?: number;
  exp?: number;
}

// User response DTO (without password)
export interface UserResponse {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Login request
export interface LoginRequest {
  email: string;
  password: string;
}

// Login response
export interface LoginResponse {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
}

// Register request
export interface RegisterRequest {
  email: string;
  password: string;
}

// Register response
export interface RegisterResponse {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
}

// Refresh token request
export interface RefreshTokenRequest {
  refreshToken: string;
}

// Refresh token response
export interface RefreshTokenResponse {
  accessToken: string;
}
