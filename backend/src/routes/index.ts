import { Router, Request, Response } from 'express';

const router = Router();

/**
 * Health check endpoint
 * GET /health
 */
router.get('/health', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Flight Logger API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

/**
 * API version and info endpoint
 * GET /
 */
router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome to Flight Logger API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
    },
  });
});

export default router;
