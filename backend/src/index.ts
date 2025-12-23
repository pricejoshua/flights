import app from './app';
import { config } from './config';
import prisma from './config/database';

const PORT = config.port;

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  
  // Close database connection
  await prisma.$disconnect();
  
  // Close server
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  
  // Close database connection
  await prisma.$disconnect();
  
  // Close server
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
