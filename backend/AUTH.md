# Authentication System Documentation

## Overview

This application implements a JWT-based authentication system with the following features:
- User registration with email/password
- Secure password hashing using bcrypt (12 rounds)
- Login with JWT token generation
- Access token refresh mechanism
- Protected routes requiring authentication

## Token Structure

### Access Token
- **Expiration**: 15 minutes
- **Payload**:
  ```json
  {
    "userId": "string",
    "email": "string",
    "iat": number,
    "exp": number
  }
  ```
- **Purpose**: Used for authenticating API requests

### Refresh Token
- **Expiration**: 7 days
- **Payload**:
  ```json
  {
    "userId": "string",
    "iat": number,
    "exp": number
  }
  ```
- **Purpose**: Used to obtain new access tokens without re-authentication

## Authentication Flow

1. **Registration/Login**: Client receives both access and refresh tokens
2. **API Requests**: Client includes access token in Authorization header
3. **Token Expiry**: When access token expires, use refresh token to get new access token
4. **Refresh Expiry**: When refresh token expires, user must login again

## API Endpoints

### POST /api/auth/register

Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (!@#$%^&*()_+-=[]{};":|,.<>/?)

**Success Response (201 Created):**
```json
{
  "user": {
    "id": "clxxxxxxxxxxxxxxx",
    "email": "user@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error Responses:**
- `400`: Validation failed (invalid email format or password requirements not met)
- `409`: User with this email already exists

### POST /api/auth/login

Login with existing credentials.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (200 OK):**
```json
{
  "user": {
    "id": "clxxxxxxxxxxxxxxx",
    "email": "user@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error Responses:**
- `400`: Validation failed
- `401`: Invalid email or password

### POST /api/auth/refresh

Refresh the access token using a refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Success Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error Responses:**
- `400`: Validation failed (refresh token missing)
- `401`: Invalid or expired refresh token

### POST /api/auth/logout

Logout the current user (client-side token deletion).

**Success Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

**Note:** Currently, this is a placeholder endpoint. The client should delete the stored tokens. In the future, this could be enhanced with token blacklisting.

### GET /api/auth/me

Get the current authenticated user's information.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Success Response (200 OK):**
```json
{
  "user": {
    "id": "clxxxxxxxxxxxxxxx",
    "email": "user@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `401`: Access token is required / Invalid or expired access token / User not found

## Using Protected Endpoints

To access protected endpoints (like `/api/auth/me`), include the access token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Example with cURL

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"SecurePass123!"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"SecurePass123!"}'

# Get current user (replace TOKEN with actual token)
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer TOKEN"

# Refresh token (replace REFRESH_TOKEN with actual refresh token)
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"REFRESH_TOKEN"}'
```

### Example with JavaScript (fetch)

```javascript
// Register
const registerResponse = await fetch('http://localhost:3000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'SecurePass123!'
  })
});
const { user, accessToken, refreshToken } = await registerResponse.json();

// Store tokens (localStorage or httpOnly cookies)
localStorage.setItem('accessToken', accessToken);
localStorage.setItem('refreshToken', refreshToken);

// Make authenticated request
const meResponse = await fetch('http://localhost:3000/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  }
});
const currentUser = await meResponse.json();

// Refresh token when access token expires
if (meResponse.status === 401) {
  const refreshResponse = await fetch('http://localhost:3000/api/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      refreshToken: localStorage.getItem('refreshToken')
    })
  });
  const { accessToken: newAccessToken } = await refreshResponse.json();
  localStorage.setItem('accessToken', newAccessToken);
}
```

## Security Considerations

### Password Security
- Passwords are hashed using bcrypt with 12 salt rounds
- Plain text passwords are never stored in the database
- Passwords are never returned in API responses

### Token Security
- JWT secrets are stored in environment variables
- Access tokens have short expiration (15 minutes) to limit exposure
- Refresh tokens have longer expiration (7 days) for better UX
- Tokens are signed and verified with secret keys

### API Security
- Rate limiting: 20 requests per 15 minutes per IP on auth endpoints
- Helmet middleware for security headers
- CORS configuration to control access origins
- Input validation on all endpoints using Zod schemas
- Generic error messages to prevent user enumeration (e.g., "Invalid email or password" instead of "User not found")

### Best Practices
1. **HTTPS in Production**: Always use HTTPS to prevent token interception
2. **Token Storage**: 
   - For web apps, consider httpOnly cookies for refresh tokens (prevents XSS)
   - For SPAs, localStorage is acceptable but vulnerable to XSS
   - Never store tokens in regular cookies without httpOnly flag
3. **Token Refresh**: Implement automatic token refresh before expiration
4. **Logout**: Clear tokens from client storage on logout
5. **Environment Variables**: Never commit `.env` file with real secrets

### Future Enhancements
- Token blacklist for logout (invalidate tokens server-side)
- Refresh token rotation (issue new refresh token on each refresh)
- Email verification for new accounts
- Password reset functionality
- Two-factor authentication (2FA)
- Account lockout after failed login attempts
- Session management (track active sessions)

## Environment Variables

Required environment variables (see `.env.example`):

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000
```

**Important**: Change the JWT secrets in production to long, random strings!

## Testing

### Manual Testing

Use the test utility to create test users:

```bash
# Create a test user
npm run test:auth create test@example.com TestPass123!

# Generate tokens for existing user
npm run test:auth tokens test@example.com

# Delete test user
npm run test:auth delete test@example.com
```

### Testing with Postman/Thunder Client

1. Import the endpoints into your HTTP client
2. Create a user with `/api/auth/register`
3. Copy the `accessToken` from the response
4. Test protected endpoints by adding header: `Authorization: Bearer <token>`
5. Test token refresh with `/api/auth/refresh`

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "message": "Error message here",
    "errors": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

The `errors` array is only present for validation errors (400).

## Health Check

Check if the API is running:

```bash
curl http://localhost:3000/api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```
