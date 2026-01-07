import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuthStore } from '@/store/authStore';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const username = formData.get('username') as string;

    try {
      // TODO: Replace with actual API call
      // For now, we just get the email and username from the form
      // const password = formData.get('password') as string;
      // Simulate registration for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration and login
      login(
        {
          id: '1',
          email,
          username,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        'mock-access-token',
        'mock-refresh-token'
      );
      
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create an account to start logging your flights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                {error}
              </div>
            )}
            
            <Input
              name="username"
              type="text"
              label="Username"
              placeholder="johndoe"
              required
            />
            
            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              required
            />
            
            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              required
            />
            
            <Button type="submit" fullWidth loading={loading}>
              Sign Up
            </Button>
            
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{' '}
              <a
                href="/login"
                className="text-primary hover:underline"
              >
                Login
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
