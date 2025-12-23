import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { AuthenticationError } from '../utils/errors';
import prisma from '../config/database';

/**
 * POST /api/auth/register
 * Register a new user
 */
export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    // Create user
    const user = await authService.createUser(email, password);

    // Generate tokens
    const accessToken = authService.generateAccessToken(user.id, user.email);
    const refreshToken = authService.generateRefreshToken(user.id);

    // Return user and tokens
    res.status(201).json({
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/auth/login
 * Login user
 */
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    // Login user and generate tokens
    const result = await authService.loginUser(email, password);

    // Return user and tokens
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/auth/refresh
 * Refresh access token using refresh token
 */
export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body;

    // Verify refresh token
    const payload = authService.verifyRefreshToken(refreshToken);

    if (!payload || !payload.userId) {
      throw new AuthenticationError('Invalid or expired refresh token');
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      throw new AuthenticationError('User not found');
    }

    // Generate new access token
    const accessToken = authService.generateAccessToken(user.id, user.email);

    // Return new access token
    res.status(200).json({
      accessToken,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/auth/logout
 * Logout user (client-side token deletion)
 */
export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    // Currently just a placeholder
    // In the future, could implement token blacklist here
    res.status(200).json({
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/auth/me
 * Get current user info
 */
export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    // User is attached by requireAuth middleware
    if (!req.user) {
      throw new AuthenticationError('User not authenticated');
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new AuthenticationError('User not found');
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
}
