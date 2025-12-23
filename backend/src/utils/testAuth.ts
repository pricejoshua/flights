import * as authService from '../services/auth.service';
import prisma from '../config/database';

/**
 * Create a test user for manual testing
 */
export async function createTestUser(email: string, password: string) {
  try {
    const user = await authService.createUser(email, password);
    const accessToken = authService.generateAccessToken(user.id, user.email);
    const refreshToken = authService.generateRefreshToken(user.id);

    console.log('Test user created successfully:');
    console.log('Email:', email);
    console.log('User ID:', user.id);
    console.log('\nAccess Token:');
    console.log(accessToken);
    console.log('\nRefresh Token:');
    console.log(refreshToken);

    return { user, accessToken, refreshToken };
  } catch (error) {
    console.error('Error creating test user:', error);
    throw error;
  }
}

/**
 * Generate test tokens for an existing user
 */
export async function generateTestTokens(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const accessToken = authService.generateAccessToken(user.id, user.email);
    const refreshToken = authService.generateRefreshToken(user.id);

    console.log('Tokens generated for user:', email);
    console.log('\nAccess Token:');
    console.log(accessToken);
    console.log('\nRefresh Token:');
    console.log(refreshToken);

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Error generating tokens:', error);
    throw error;
  }
}

/**
 * Delete a test user
 */
export async function deleteTestUser(email: string) {
  try {
    await prisma.user.delete({
      where: { email },
    });
    console.log('Test user deleted:', email);
  } catch (error) {
    console.error('Error deleting test user:', error);
    throw error;
  }
}

// If running this file directly
if (require.main === module) {
  const action = process.argv[2];
  const email = process.argv[3] || 'test@example.com';
  const password = process.argv[4] || 'Test1234!';

  switch (action) {
    case 'create':
      createTestUser(email, password)
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
      break;
    case 'tokens':
      generateTestTokens(email)
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
      break;
    case 'delete':
      deleteTestUser(email)
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
      break;
    default:
      console.log('Usage:');
      console.log('  npm run test:auth create [email] [password]');
      console.log('  npm run test:auth tokens [email]');
      console.log('  npm run test:auth delete [email]');
      process.exit(1);
  }
}
