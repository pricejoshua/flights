# Flight Logger Backend

Backend API for the Flight Logger application, built with Express.js, TypeScript, and Prisma ORM.

## Features

- ✅ TypeScript for type safety
- ✅ Express.js for REST API
- ✅ Prisma ORM with PostgreSQL
- ✅ Environment variable validation with Zod
- ✅ CORS configuration
- ✅ Error handling middleware
- ✅ Request validation middleware
- ✅ Logging utility
- ✅ Health check endpoint
- ✅ Graceful shutdown handling
- ✅ Database migrations and seeding
- ✅ Type-safe database access

## Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL 14+ database

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file and configure your database:

```bash
cp .env.example .env
```

Edit `.env` and set your configuration:

```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DATABASE_URL="postgresql://username:password@localhost:5432/flightlogger?schema=public"
JWT_SECRET=change-this-to-a-secure-random-string-at-least-32-characters-long
JWT_REFRESH_SECRET=change-this-to-another-secure-random-string-at-least-32-chars
AVIATION_API_KEY=your-api-key-here
```

### 3. Set Up Database

#### Option A: Using Docker (Recommended for Local Development)

```bash
# Start PostgreSQL container
docker run --name flightlogger-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=flightlogger \
  -p 5432:5432 \
  -d postgres:16

# Update your .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/flightlogger?schema=public"
```

#### Option B: Cloud Providers

You can use free tiers from:
- [Neon](https://neon.tech) - Serverless Postgres
- [Supabase](https://supabase.com) - Open source Firebase alternative
- [Railway](https://railway.app) - Infrastructure platform

### 4. Run Database Migrations

```bash
# Generate Prisma Client
npm run db:generate

# Create database tables
npm run db:migrate

# Seed reference data (airports and airlines)
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

The server will start at http://localhost:3000

## Available Scripts

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run type-check` - Type check without building

### Database Scripts
- `npm run db:migrate` - Create and apply new migration
- `npm run db:push` - Push schema changes without creating migration
- `npm run db:seed` - Populate database with reference data
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:generate` - Generate Prisma Client types
- `npm run db:reset` - Reset database (drops all data)

## Database Schema

The application uses the following models:

- **User** - User accounts with authentication
- **Flight** - Flight records with full details
- **Airport** - Reference data for ~50 major airports
- **Airline** - Reference data for ~40 major airlines
- **ApiCache** - Cache for external API responses

See [DATABASE.md](./DATABASE.md) for complete schema documentation.

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma      # Database schema definition
│   └── seed.ts            # Database seed script
├── src/
│   ├── config/
│   │   ├── database.ts    # Prisma Client singleton
│   │   └── env.ts         # Environment validation
│   ├── middleware/
│   │   ├── auth.ts        # Authentication middleware
│   │   ├── errorHandler.ts # Global error handler
│   │   └── validation.ts  # Request validation
│   ├── routes/
│   │   └── index.ts       # Route definitions
│   ├── types/
│   │   └── index.ts       # TypeScript types
│   ├── utils/
│   │   └── logger.ts      # Logging utility
│   ├── app.ts             # Express app setup
│   └── server.ts          # Server entry point
├── .env.example           # Environment variables template
├── package.json           # Dependencies and scripts
├── prisma.config.ts       # Prisma configuration
└── tsconfig.json          # TypeScript configuration
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Authentication (Coming Soon)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token

### Flights (Coming Soon)
- `GET /api/flights` - Get user's flights
- `POST /api/flights` - Create new flight
- `GET /api/flights/:id` - Get flight details
- `PUT /api/flights/:id` - Update flight
- `DELETE /api/flights/:id` - Delete flight

### Airports (Coming Soon)
- `GET /api/airports` - Get airports
- `GET /api/airports/:iataCode` - Get airport details

### Airlines (Coming Soon)
- `GET /api/airlines` - Get airlines
- `GET /api/airlines/:iataCode` - Get airline details

## Development

### TypeScript Compilation

```bash
npm run build
```

### View Database with Prisma Studio

```bash
npm run db:studio
```

Opens at http://localhost:5555

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | `3000` |
| `NODE_ENV` | Environment (development/production) | No | `development` |
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `FRONTEND_URL` | Frontend URL for CORS | No | `http://localhost:5173` |
| `JWT_SECRET` | Secret for access tokens | Yes | - |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens | Yes | - |
| `AVIATION_API_KEY` | External aviation API key | No | - |

## Error Handling

The application uses a centralized error handling middleware that:
- Catches all errors
- Logs error details
- Returns consistent error responses
- Handles validation errors from Zod

## Security

- Environment variables for sensitive data
- JWT for authentication
- CORS configuration
- Input validation with Zod
- SQL injection prevention via Prisma

## Troubleshooting

### Connection Issues

1. Verify DATABASE_URL is correct in `.env`
2. Ensure PostgreSQL is running
3. Check firewall/network settings
4. Verify database exists

### Migration Issues

```bash
# Reset and start fresh
npm run db:reset

# Or manually reset
npx prisma migrate reset --force
npm run db:migrate
npm run db:seed
```

### Port Already in Use

If port 3000 is in use, change it in `.env`:
```env
PORT=3001
```

## Next Steps

After setting up the backend:

1. Implement authentication endpoints
2. Create flight CRUD operations
3. Integrate with flight data APIs
4. Build analytics/statistics features
5. Add rate limiting
6. Add API documentation (Swagger/OpenAPI)

## Resources

- [Express Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Zod Documentation](https://zod.dev/)

## License

ISC
