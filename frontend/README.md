# Flight Logger Frontend

A modern React + TypeScript frontend for the Flight Logger application, built with Vite, Tailwind CSS, and other cutting-edge tools.

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Zustand** - Client state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client
- **date-fns** - Date utilities
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update `.env` with your API URL (default: `http://localhost:3000`)

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

### Type Checking

Run TypeScript type checking:
```bash
npm run type-check
```

### Linting

Run ESLint:
```bash
npm run lint
```

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components (Button, Input, Card)
│   │   ├── layout/         # Layout components (Header, Layout)
│   │   └── common/         # Common components (LoadingSpinner, ErrorBoundary)
│   ├── features/           # Feature-based components
│   │   ├── auth/           # Authentication related
│   │   ├── flights/        # Flight management
│   │   └── stats/          # Statistics
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and configurations
│   │   ├── api.ts         # Axios instance and API client
│   │   ├── utils.ts       # Utility functions
│   │   └── queryClient.ts # React Query configuration
│   ├── routes/             # Route components
│   │   ├── index.tsx      # Router configuration
│   │   ├── ProtectedRoute.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   └── ...
│   ├── store/              # Zustand stores
│   │   └── authStore.ts   # Authentication state
│   ├── types/              # TypeScript types
│   │   └── index.ts       # Type definitions
│   ├── App.tsx            # Root component
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles
├── .env                    # Environment variables (not committed)
├── .env.example           # Environment variables template
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_API_URL=http://localhost:3000
```

## Features

### Authentication
- Login and registration pages
- JWT token management with automatic refresh
- Protected routes that require authentication
- Persistent auth state using Zustand

### Routing
- `/` - Dashboard (protected)
- `/login` - Login page
- `/register` - Registration page
- `/flights` - Flight list (protected)
- `/stats` - Statistics (protected)
- `*` - 404 page

### API Integration
- Axios client with request/response interceptors
- Automatic JWT token attachment
- Token refresh on 401 errors
- Centralized error handling

### State Management
- **Zustand** for auth state (user, tokens)
- **React Query** for server state (flights, stats)
- Persistent storage for auth tokens

### UI Components
- Reusable, typed components with variants
- Accessible design (ARIA labels, keyboard navigation)
- Loading and error states
- Mobile-first responsive design

## Code Style

### TypeScript
- Strict mode enabled
- No `any` types - use proper typing
- Path aliases: `@/` points to `src/`

### Components
- Functional components with hooks
- Props interfaces exported
- React.forwardRef for components that may receive refs

### Styling
- Tailwind CSS utility classes
- Dark mode support (class strategy)
- CSS custom properties for colors
- `cn()` utility for conditional classes

### Imports
Use path aliases for cleaner imports:
```typescript
// Good
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';

// Avoid
import Button from '../../../components/ui/Button';
```

## API Proxy

The Vite dev server is configured to proxy `/api` requests to the backend server (default: `http://localhost:3000`). This avoids CORS issues during development.

## Contributing

1. Follow the existing code style
2. Use TypeScript types everywhere
3. Add proper error handling
4. Test your changes locally
5. Keep components focused and reusable

## License

MIT

