import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middleware/validation';
import { requireAuth } from '../middleware/auth';
import { registerSchema, loginSchema, refreshSchema } from '../validators/auth.validator';

const router = Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', validate(registerSchema), authController.register);

/**
 * POST /api/auth/login
 * Login user
 */
router.post('/login', validate(loginSchema), authController.login);

/**
 * POST /api/auth/refresh
 * Refresh access token
 */
router.post('/refresh', validate(refreshSchema), authController.refresh);

/**
 * POST /api/auth/logout
 * Logout user
 */
router.post('/logout', authController.logout);

/**
 * GET /api/auth/me
 * Get current user (protected route)
 */
router.get('/me', requireAuth, authController.me);

export default router;
