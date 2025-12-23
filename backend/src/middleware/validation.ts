import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../utils/errors';

export type ValidationTarget = 'body' | 'query' | 'params';

/**
 * Generic validation middleware that accepts a Zod schema
 */
export function validate(schema: ZodSchema, target: ValidationTarget = 'body') {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Select the target data to validate
      const dataToValidate = req[target];
      
      // Validate the data
      schema.parse(dataToValidate);
      
      // If validation passes, continue
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format Zod errors
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        
        next(new ValidationError('Validation failed', formattedErrors));
      } else {
        next(error);
      }
    }
  };
}
