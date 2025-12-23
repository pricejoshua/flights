import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import prisma from '../config/database';
import { config } from '../config';
import { JwtPayload, UserResponse } from '../types/auth';
import { AuthenticationError, ConflictError, ValidationError } from '../utils/errors';

const SALT_ROUNDS = 12;

// Helper function to exclude password from user object
function excludePassword(user: User): UserResponse {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Hash a password using bcrypt with 12 rounds
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare a password with a hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate an access token (15 minutes expiration)
 */
export function generateAccessToken(userId: string, email: string): string {
  const payload: JwtPayload = {
    userId,
    email,
  };
  
  const options: jwt.SignOptions = {
    expiresIn: config.jwt.accessExpiration,
  };
  
  return jwt.sign(payload, config.jwt.secret, options);
}

/**
 * Generate a refresh token (7 days expiration)
 */
export function generateRefreshToken(userId: string): string {
  const payload: JwtPayload = {
    userId,
  };
  
  const options: jwt.SignOptions = {
    expiresIn: config.jwt.refreshExpiration,
  };
  
  return jwt.sign(payload, config.jwt.refreshSecret, options);
}

/**
 * Verify and decode an access token
 */
export function verifyAccessToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Verify and decode a refresh token
 */
export function verifyRefreshToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, config.jwt.refreshSecret) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Create a new user
 */
export async function createUser(email: string, password: string): Promise<UserResponse> {
  // Validate email format
  if (!isValidEmail(email)) {
    throw new ValidationError('Invalid email format');
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ConflictError('User with this email already exists');
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // Return user without password
  return excludePassword(user);
}

/**
 * Login user and generate tokens
 */
export async function loginUser(
  email: string,
  password: string
): Promise<{ user: UserResponse; accessToken: string; refreshToken: string }> {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // User not found or password mismatch - use generic message for security
  if (!user) {
    throw new AuthenticationError('Invalid email or password');
  }

  // Verify password
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new AuthenticationError('Invalid email or password');
  }

  // Generate tokens
  const accessToken = generateAccessToken(user.id, user.email);
  const refreshToken = generateRefreshToken(user.id);

  return {
    user: excludePassword(user),
    accessToken,
    refreshToken,
  };
}
