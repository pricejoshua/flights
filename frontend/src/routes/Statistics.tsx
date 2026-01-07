import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

const Statistics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
        <p className="text-muted-foreground mt-2">
          View your flight statistics and travel insights
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Flights</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Distance</CardDescription>
            <CardTitle className="text-3xl">0 mi</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Duration</CardDescription>
            <CardTitle className="text-3xl">0h</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Countries Visited</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>No data yet</CardTitle>
          <CardDescription>
            Add flights to see your statistics
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Statistics;
