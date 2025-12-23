# Flight Logger Backend

Backend service for the Flight Logger application built with Node.js, TypeScript, and Prisma ORM.

## Prerequisites

- Node.js 18+ 
- PostgreSQL 14+ database

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file and configure your database:

```bash
cp .env.example .env
```

Edit `.env` and set your `DATABASE_URL`:

```
DATABASE_URL="postgresql://username:password@localhost:5432/flightlogger?schema=public"
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

## Database Scripts

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
│   └── config/
│       └── database.ts    # Prisma Client singleton
├── package.json           # Dependencies and scripts
├── prisma.config.ts       # Prisma configuration
└── tsconfig.json          # TypeScript configuration
```

## Development

### TypeScript Compilation

```bash
npx tsc
```

### View Database with Prisma Studio

```bash
npm run db:studio
```

Opens at http://localhost:5555

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

## Next Steps

After setting up the database:

1. Implement authentication endpoints
2. Create flight CRUD operations
3. Integrate with flight data APIs
4. Build analytics/statistics features

## Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
