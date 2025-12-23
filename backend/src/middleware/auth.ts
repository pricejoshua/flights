import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../services/auth.service';
import { AuthenticationError } from '../utils/errors';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}

/**
 * Extract token from Authorization header
 */
function extractToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return null;
  }
  
  // Check if it's a Bearer token
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }
  
  return parts[1];
}

/**
 * Middleware that requires authentication
 * Returns 401 if token is missing or invalid
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    // Extract token from header
    const token = extractToken(req);
    
    if (!token) {
      throw new AuthenticationError('Access token is required');
    }
    
    // Verify token
    const payload = verifyAccessToken(token);
    
    if (!payload || !payload.userId || !payload.email) {
      throw new AuthenticationError('Invalid or expired access token');
    }
    
    // Attach user info to request
    req.user = {
      userId: payload.userId,
      email: payload.email,
    };
    
    next();
  } catch (error) {
    next(error);
  }
}

/**
 * Optional authentication middleware
 * Attaches user info if token is valid, but doesn't fail if missing
 */
export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  try {
    // Extract token from header
    const token = extractToken(req);
    
    if (!token) {
      // No token provided, continue without user
      return next();
    }
    
    // Verify token
    const payload = verifyAccessToken(token);
    
    if (payload && payload.userId && payload.email) {
      // Attach user info to request
      req.user = {
        userId: payload.userId,
        email: payload.email,
      };
    }
    
    // Continue regardless of token validity
    next();
  } catch (error) {
    // Swallow errors and continue without user
    next();
  }
}
