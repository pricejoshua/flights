import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAuthStore } from '@/store/authStore';
import { Plane, Calendar, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();

  const stats = [
    { name: 'Total Flights', value: '0', icon: Plane, href: '/flights' },
    { name: 'This Year', value: '0', icon: Calendar, href: '/flights' },
    { name: 'Statistics', value: 'View', icon: BarChart3, href: '/stats' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.firstName || user?.username || 'Traveler'}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Track your flights and explore your travel statistics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.name} to={stat.href}>
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.name}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Get Started</CardTitle>
          <CardDescription>
            Start logging your flights to see your travel statistics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            to="/flights/new"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Add Your First Flight
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
