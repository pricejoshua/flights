import dotenv from 'dotenv';
import type { StringValue } from 'ms';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  jwt: {
    secret: string;
    refreshSecret: string;
    accessExpiration: StringValue | number;
    refreshExpiration: StringValue | number;
  };
  cors: {
    origin: string;
  };
}

export const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key-change-this-in-production',
    accessExpiration: (process.env.JWT_ACCESS_EXPIRATION || '15m') as StringValue,
    refreshExpiration: (process.env.JWT_REFRESH_EXPIRATION || '7d') as StringValue,
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
};
