# Flight Logger Backend

A secure Express.js backend with JWT-based authentication for the flight logger application.

## Features

- 🔐 JWT-based authentication (access + refresh tokens)
- 🔒 Secure password hashing with bcrypt (12 rounds)
- ✅ Input validation with Zod
- 🛡️ Security headers with Helmet
- 🚦 Rate limiting on auth endpoints
- 📝 Comprehensive error handling
- 🗃️ SQLite database with Prisma ORM
- 📖 TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Generate Prisma client and run migrations
npm run prisma:migrate

# Start development server
npm run dev
```

The server will start on http://localhost:3000

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

⚠️ **Important**: Change the JWT secrets to long, random strings in production!

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)
- `npm run test:auth` - Authentication testing utilities

## API Documentation

See [AUTH.md](./AUTH.md) for complete API documentation, including:
- Authentication flow
- All endpoints with request/response examples
- Security considerations
- Usage examples with cURL and JavaScript

## Quick API Overview

### Public Endpoints

- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login and get tokens
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout (client-side)

### Protected Endpoints

- `GET /api/auth/me` - Get current user info

### Health Check

- `GET /api/health` - Server health status

## Testing

### Create a Test User

```bash
npm run test:auth create test@example.com TestPass123!
```

### Generate Tokens for Existing User

```bash
npm run test:auth tokens test@example.com
```

### Test with cURL

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"SecurePass123!"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"SecurePass123!"}'

# Get current user (replace TOKEN with your access token)
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

## Project Structure

```
backend/
├── prisma/
│   ├── migrations/        # Database migrations
│   └── schema.prisma      # Database schema
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Express middleware
│   ├── routes/          # Route definitions
│   ├── services/        # Business logic
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   ├── validators/      # Zod validation schemas
│   ├── app.ts          # Express app setup
│   └── index.ts        # Server entry point
├── .env                 # Environment variables (gitignored)
├── .env.example        # Environment template
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
└── AUTH.md            # Authentication docs
```

## Security

- ✅ Passwords hashed with bcrypt (12 salt rounds)
- ✅ JWT tokens with secure secrets
- ✅ Rate limiting (20 req/15min on auth endpoints)
- ✅ Input validation on all endpoints
- ✅ Security headers via Helmet
- ✅ CORS protection
- ✅ No sensitive data in responses
- ✅ Generic error messages (no user enumeration)

### Production Checklist

Before deploying to production:

1. Change JWT secrets to long, random strings
2. Use HTTPS only
3. Set `NODE_ENV=production`
4. Use a production database (PostgreSQL, MySQL, etc.)
5. Configure proper CORS origins
6. Review rate limiting settings
7. Set up monitoring and logging
8. Use environment-specific configurations

## Database

This project uses Prisma ORM with SQLite (for development).

### Migrations

```bash
# Create a new migration
npm run prisma:migrate

# View database in Prisma Studio
npm run prisma:studio
```

### Changing Database

To use PostgreSQL/MySQL instead of SQLite:

1. Update `DATABASE_URL` in `.env`
2. Change provider in `prisma/schema.prisma`
3. Run migrations: `npm run prisma:migrate`

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, change the `PORT` in `.env`:

```env
PORT=3001
```

### Database Locked Error

If you get a database locked error:
- Close any open connections to the database
- Close Prisma Studio if running
- Restart the server

### TypeScript Errors

```bash
# Regenerate Prisma client
npm run prisma:generate

# Rebuild
npm run build
```

## Contributing

1. Follow existing code style
2. Add tests for new features
3. Update documentation
4. Run build before committing

## License

ISC
