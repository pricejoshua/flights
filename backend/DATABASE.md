# Database Documentation

## Overview

The Flight Logger application uses PostgreSQL as its database with Prisma ORM for type-safe database access. The database schema is designed to track user flights, airport and airline reference data, and cache API responses.

## Entity Relationship Diagram

```
┌─────────────┐
│    User     │
│─────────────│
│ id          │◄──┐
│ email       │   │
│ passwordHash│   │
│ createdAt   │   │
│ updatedAt   │   │
└─────────────┘   │
                  │
                  │ 1:N
                  │
┌─────────────────┼─────────────────┐
│    Flight       │                 │
│─────────────────│                 │
│ id              │                 │
│ userId          ├─────────────────┘
│ flightNumber    │
│ flightDate      │
│ departureAirport├───┐
│ arrivalAirport  ├───┼─┐
│ airlineCode     ├─┐ │ │
│ aircraftType    │ │ │ │
│ tailNumber      │ │ │ │
│ scheduled*      │ │ │ │
│ actual*         │ │ │ │
│ seatNumber      │ │ │ │
│ flightClass     │ │ │ │
│ notes           │ │ │ │
│ createdAt       │ │ │ │
│ updatedAt       │ │ │ │
└─────────────────┘ │ │ │
                    │ │ │
        ┌───────────┘ │ │
        │             │ │
        │ N:1         │ │
        │             │ │
    ┌───▼──────┐      │ │
    │ Airline  │      │ │
    │──────────│      │ │
    │ iataCode │      │ │
    │ icaoCode │      │ │
    │ name     │      │ │
    │ country  │      │ │
    └──────────┘      │ │
                      │ │
              ┌───────┘ │
              │         │
              │ N:1     │ N:1
              │         │
          ┌───▼─────┐   │
          │ Airport │◄──┘
          │─────────│
          │ iataCode│
          │ icaoCode│
          │ name    │
          │ city    │
          │ country │
          │ timezone│
          │ lat/lng │
          └─────────┘

┌──────────────┐
│  ApiCache    │  (Independent)
│──────────────│
│ id           │
│ cacheKey     │
│ cacheData    │
│ expiresAt    │
│ createdAt    │
└──────────────┘
```

## Models

### User
Stores user authentication and profile information.

**Fields:**
- `id` (UUID): Primary key
- `email` (String): Unique email address
- `passwordHash` (String): Hashed password
- `createdAt` (DateTime): Account creation timestamp
- `updatedAt` (DateTime): Last update timestamp

**Relations:**
- One-to-many with `Flight`

### Flight
Central model storing all flight information for users.

**Fields:**
- `id` (UUID): Primary key
- `userId` (UUID): Foreign key to User
- `flightNumber` (String): Flight number (e.g., "UA123")
- `flightDate` (DateTime): Date of the flight
- `departureAirport` (String): IATA code (3 chars)
- `arrivalAirport` (String): IATA code (3 chars)
- `airlineCode` (String): IATA code (2 chars)
- `aircraftType` (String, optional): Aircraft model (e.g., "Boeing 737")
- `tailNumber` (String, optional): Aircraft registration number
- `scheduledDeparture` (DateTime, optional): Scheduled departure time
- `actualDeparture` (DateTime, optional): Actual departure time
- `scheduledArrival` (DateTime, optional): Scheduled arrival time
- `actualArrival` (DateTime, optional): Actual arrival time
- `seatNumber` (String, optional): Seat assignment (e.g., "12A")
- `flightClass` (String, optional): Class of service (economy/business/first)
- `notes` (String, optional): User notes about the flight
- `createdAt` (DateTime): Record creation timestamp
- `updatedAt` (DateTime): Last update timestamp

**Relations:**
- Many-to-one with `User`
- Many-to-one with `Airport` (departure)
- Many-to-one with `Airport` (arrival)
- Many-to-one with `Airline`

**Indexes:**
- `userId`: For efficient user flight queries
- `flightDate`: For date-based filtering
- `departureAirport`: For departure airport queries
- `arrivalAirport`: For arrival airport queries

### Airport
Reference data for airports worldwide.

**Fields:**
- `iataCode` (String, 3 chars): Primary key, IATA code (e.g., "LAX")
- `icaoCode` (String, 4 chars, optional): ICAO code (e.g., "KLAX")
- `name` (String): Full airport name
- `city` (String): City name
- `country` (String): Country name
- `timezone` (String, optional): IANA timezone (e.g., "America/Los_Angeles")
- `latitude` (Float, optional): Geographic coordinate
- `longitude` (Float, optional): Geographic coordinate

**Relations:**
- One-to-many with `Flight` (as departure airport)
- One-to-many with `Flight` (as arrival airport)

### Airline
Reference data for airlines worldwide.

**Fields:**
- `iataCode` (String, 2 chars): Primary key, IATA code (e.g., "UA")
- `icaoCode` (String, 3 chars, optional): ICAO code (e.g., "UAL")
- `name` (String): Full airline name
- `country` (String): Country of registration

**Relations:**
- One-to-many with `Flight`

### ApiCache
Caches external API responses to reduce API calls and improve performance.

**Fields:**
- `id` (UUID): Primary key
- `cacheKey` (String): Unique cache key (e.g., "flight:UA123:2024-01-15")
- `cacheData` (JSON): Cached response data
- `expiresAt` (DateTime): Cache expiration timestamp
- `createdAt` (DateTime): Cache creation timestamp

**Indexes:**
- `cacheKey`: For fast cache lookups
- `expiresAt`: For efficient cache cleanup

## Common Queries

### Get User's Flights
```typescript
const flights = await prisma.flight.findMany({
  where: { userId: 'user-uuid' },
  include: {
    departureAirportData: true,
    arrivalAirportData: true,
    airline: true,
  },
  orderBy: { flightDate: 'desc' },
});
```

### Get Flights by Date Range
```typescript
const flights = await prisma.flight.findMany({
  where: {
    userId: 'user-uuid',
    flightDate: {
      gte: new Date('2024-01-01'),
      lte: new Date('2024-12-31'),
    },
  },
});
```

### Get Flights by Airport
```typescript
const flights = await prisma.flight.findMany({
  where: {
    OR: [
      { departureAirport: 'LAX' },
      { arrivalAirport: 'LAX' },
    ],
  },
});
```

### Get User Statistics
```typescript
const stats = await prisma.flight.groupBy({
  by: ['userId'],
  where: { userId: 'user-uuid' },
  _count: {
    id: true,
  },
});

const uniqueAirports = await prisma.flight.findMany({
  where: { userId: 'user-uuid' },
  select: {
    departureAirport: true,
    arrivalAirport: true,
  },
  distinct: ['departureAirport', 'arrivalAirport'],
});
```

### Check Cache
```typescript
const cached = await prisma.apiCache.findUnique({
  where: { cacheKey: 'flight:UA123:2024-01-15' },
});

if (cached && cached.expiresAt > new Date()) {
  // Use cached data
  return cached.cacheData;
}
```

### Clean Expired Cache
```typescript
await prisma.apiCache.deleteMany({
  where: {
    expiresAt: {
      lt: new Date(),
    },
  },
});
```

## Indexing Strategy

### Primary Indexes
All models use primary key indexes:
- `User.id`
- `Flight.id`
- `Airport.iataCode`
- `Airline.iataCode`
- `ApiCache.id`

### Secondary Indexes
Indexes on frequently queried fields:

1. **Flight Model:**
   - `userId`: Essential for user-specific queries
   - `flightDate`: For date-based filtering and sorting
   - `departureAirport`: For route queries
   - `arrivalAirport`: For route queries

2. **ApiCache Model:**
   - `cacheKey`: Unique index for fast lookups
   - `expiresAt`: For efficient cache cleanup operations

### Unique Constraints
- `User.email`: Ensures unique user accounts
- `ApiCache.cacheKey`: Prevents duplicate cache entries

## Database Migrations

### Initial Setup
```bash
# Generate Prisma Client
npm run db:generate

# Create and apply migration
npm run db:migrate

# Seed reference data
npm run db:seed
```

### Development Workflow
```bash
# Push schema changes without migration
npm run db:push

# Create a new migration
npm run db:migrate

# Reset database (drops all data)
npm run db:reset

# Open Prisma Studio (GUI)
npm run db:studio
```

## Performance Considerations

1. **Indexes**: All frequently queried fields are indexed
2. **Relations**: Use `include` or `select` to fetch related data efficiently
3. **Caching**: ApiCache table reduces external API calls
4. **Timestamps**: All models use UTC timestamps
5. **Connection Pooling**: Prisma handles connection pooling automatically

## Data Integrity

1. **Foreign Keys**: All relations use foreign key constraints
2. **Required Fields**: Essential fields are marked as non-nullable
3. **Unique Constraints**: Email and cache keys are unique
4. **Cascading**: Consider adding cascade rules for deletions if needed

## Timezone Handling

All timestamps are stored in UTC. The `timezone` field in the `Airport` model helps with displaying local times to users.

## Future Enhancements

Potential improvements:
1. Soft deletes for User and Flight models
2. Flight status tracking (scheduled, delayed, cancelled)
3. User preferences and settings
4. Flight sharing/social features
5. Flight analytics and statistics tables
6. Airport and airline updates/versioning
