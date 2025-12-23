import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Link } from 'react-router-dom';

const FlightList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Flights</h1>
          <p className="text-muted-foreground mt-2">
            View and manage your flight history
          </p>
        </div>
        <Link to="/flights/new">
          <Button>Add Flight</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>No flights yet</CardTitle>
          <CardDescription>
            Start logging your flights to see them here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/flights/new">
            <Button>Add Your First Flight</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlightList;
