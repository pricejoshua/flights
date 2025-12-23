import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { config } from '../config';

/**
 * Global error handler middleware
 */
export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Default to 500 internal server error
  let statusCode = 500;
  let message = 'Internal server error';
  let errors = undefined;

  // Handle operational errors
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    
    // Include validation errors if present
    if ('errors' in err && err.errors) {
      errors = err.errors;
    }
  } else {
    // Log unexpected errors
    console.error('Unexpected error:', err);
    
    // In development, include error details
    if (config.nodeEnv === 'development') {
      message = err.message;
    }
  }

  // Send error response
  res.status(statusCode).json({
    error: {
      message,
      ...(errors && { errors }),
      ...(config.nodeEnv === 'development' && { stack: err.stack }),
    },
  });
}

/**
 * 404 Not Found handler
 */
export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    error: {
      message: 'Route not found',
    },
  });
}
