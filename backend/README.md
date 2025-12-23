# Flight Logger Backend

Backend API for the Flight Logger application, built with Express.js and TypeScript.

## Features

- ✅ TypeScript for type safety
- ✅ Express.js for REST API
- ✅ Environment variable validation with Zod
- ✅ CORS configuration
- ✅ Error handling middleware
- ✅ Request validation middleware
- ✅ Logging utility
- ✅ Health check endpoint
- ✅ Graceful shutdown handling

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- PostgreSQL database

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend directory by copying the example:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DATABASE_URL=postgresql://user:password@localhost:5432/flightlogger
JWT_SECRET=your-secret-key-change-this
JWT_REFRESH_SECRET=your-refresh-secret-change-this
AVIATION_API_KEY=your-api-key-here
```

**Important:** Make sure to change the JWT secrets and database credentials!

### 3. Development

Start the development server with hot reload:

```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the PORT you specified in .env).

### 4. Production Build

Build the TypeScript code:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### 5. Type Checking

Check TypeScript types without building:

```bash
npm run type-check
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── env.ts              # Environment variable validation
│   ├── middleware/
│   │   ├── auth.ts             # Authentication middleware (placeholder)
│   │   ├── errorHandler.ts    # Error handling middleware
│   │   └── validation.ts       # Request validation middleware
│   ├── routes/
│   │   └── index.ts            # Main router with health check
│   ├── types/
│   │   └── index.ts            # Shared TypeScript types
│   ├── utils/
│   │   └── logger.ts           # Logging utility
│   ├── app.ts                  # Express app configuration
│   └── server.ts               # Server entry point
├── .env.example                # Example environment variables
├── .gitignore                  # Git ignore rules
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## API Endpoints

### Health Check

**GET** `/health`

Returns the health status of the API.

**Response:**
```json
{
  "success": true,
  "message": "Flight Logger API is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

### API Info

**GET** `/`

Returns API information and available endpoints.

**Response:**
```json
{
  "success": true,
  "message": "Welcome to Flight Logger API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health"
  }
}
```

## Development Guidelines

### Code Style

- Use TypeScript strict mode
- Follow functional programming principles where possible
- Avoid using `any` types
- Use proper error handling
- Write descriptive variable and function names

### Adding New Routes

1. Create route handlers in `src/routes/`
2. Import and mount them in `src/routes/index.ts`
3. Add validation schemas if needed
4. Update this README with new endpoints

### Adding Middleware

1. Create middleware in `src/middleware/`
2. Export the middleware function
3. Apply it in `src/app.ts` or specific routes

### Environment Variables

All environment variables are validated using Zod schemas in `src/config/env.ts`. To add new variables:

1. Add the variable to `.env.example`
2. Update the schema in `src/config/env.ts`
3. Document it in this README

## Error Handling

The application uses a centralized error handling approach:

- `AppError` class for operational errors
- Global error handler middleware
- Development vs. production error responses
- Automatic logging of all errors

Example usage:

```typescript
import { AppError } from './middleware/errorHandler';

throw new AppError(400, 'Invalid input');
```

## Logging

The logger utility provides structured logging:

```typescript
import { logger } from './utils/logger';

logger.info('Information message');
logger.warn('Warning message');
logger.error('Error message', error);
logger.debug('Debug message'); // Only in development
```

## Security Notes

- Never commit `.env` files
- Use strong JWT secrets in production
- Keep dependencies updated
- Follow OWASP security guidelines
- Implement rate limiting for production

## Next Steps

- [ ] Implement database connection and models
- [ ] Add authentication with JWT
- [ ] Create flight CRUD endpoints
- [ ] Add user management
- [ ] Implement aviation API integration
- [ ] Add rate limiting
- [ ] Add request validation for all endpoints
- [ ] Set up testing (Jest/Supertest)
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Set up CI/CD pipeline

## Troubleshooting

### Port Already in Use

If you get an error that the port is already in use, either:
- Stop the process using that port
- Change the PORT in your `.env` file

### Module Not Found

Make sure you've installed dependencies:
```bash
npm install
```

### TypeScript Errors

Run type checking to see all errors:
```bash
npm run type-check
```

## License

ISC
