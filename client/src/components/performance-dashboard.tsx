import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock, Database, Globe } from 'lucide-react';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

interface ServerHealth {
  status: string;
  dbLatency: number;
  uptime: number;
  timestamp: string;
}

interface ServerMetrics {
  memory: { used: number; total: number; heapUsed: number; external: number };
  uptime: number;
  timestamp: string;
}

export function PerformanceDashboard() {
  const clientMetrics = usePerformanceMonitor();
  
  const { data: serverHealth } = useQuery<ServerHealth>({
    queryKey: ['/api/health'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: serverMetrics } = useQuery<ServerMetrics>({
    queryKey: ['/api/performance'],
    refetchInterval: 60000, // Refresh every minute
  });

  const getStatusColor = (value: number, thresholds: { good: number; needs_improvement: number }) => {
    if (value <= thresholds.good) return 'default';
    if (value <= thresholds.needs_improvement) return 'secondary';
    return 'destructive';
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Client-side Performance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">First Contentful Paint</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clientMetrics.fcp ? `${Math.round(clientMetrics.fcp)}ms` : '-'}
            </div>
            <Badge 
              variant={clientMetrics.fcp ? getStatusColor(clientMetrics.fcp, { good: 1800, needs_improvement: 3000 }) : 'outline'}
              className="text-xs"
            >
              {clientMetrics.fcp && clientMetrics.fcp <= 1800 ? 'Good' : 
               clientMetrics.fcp && clientMetrics.fcp <= 3000 ? 'Needs Improvement' : 
               clientMetrics.fcp ? 'Poor' : 'Loading...'}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Largest Contentful Paint</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clientMetrics.lcp ? `${Math.round(clientMetrics.lcp)}ms` : '-'}
            </div>
            <Badge 
              variant={clientMetrics.lcp ? getStatusColor(clientMetrics.lcp, { good: 2500, needs_improvement: 4000 }) : 'outline'}
              className="text-xs"
            >
              {clientMetrics.lcp && clientMetrics.lcp <= 2500 ? 'Good' : 
               clientMetrics.lcp && clientMetrics.lcp <= 4000 ? 'Needs Improvement' : 
               clientMetrics.lcp ? 'Poor' : 'Loading...'}
            </Badge>
          </CardContent>
        </Card>

        {/* Server Performance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database Health</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {serverHealth?.status || 'Unknown'}
            </div>
            <Badge 
              variant={
                serverHealth?.status === 'healthy' ? 'default' :
                serverHealth?.status === 'degraded' ? 'secondary' : 'destructive'
              }
              className="text-xs"
            >
              {serverHealth?.dbLatency ? `${serverHealth.dbLatency}ms` : 'Checking...'}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Server Memory</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {serverMetrics?.memory ? formatBytes(serverMetrics.memory.used) : '-'}
            </div>
            <p className="text-xs text-muted-foreground">
              {serverMetrics?.memory ? `${formatBytes(serverMetrics.memory.total)} total` : 'Loading...'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Client Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">First Input Delay:</span>
                <span className="ml-2">{clientMetrics.fid ? `${clientMetrics.fid.toFixed(1)}ms` : '-'}</span>
              </div>
              <div>
                <span className="font-medium">Cumulative Layout Shift:</span>
                <span className="ml-2">{clientMetrics.cls ? clientMetrics.cls.toFixed(3) : '-'}</span>
              </div>
              <div>
                <span className="font-medium">Time to First Byte:</span>
                <span className="ml-2">{clientMetrics.ttfb ? `${Math.round(clientMetrics.ttfb)}ms` : '-'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Server Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Uptime:</span>
                <span className="ml-2">
                  {serverHealth?.uptime ? `${Math.round(serverHealth.uptime / 3600)}h` : '-'}
                </span>
              </div>
              <div>
                <span className="font-medium">Heap Used:</span>
                <span className="ml-2">
                  {serverMetrics?.memory ? formatBytes(serverMetrics.memory.heapUsed) : '-'}
                </span>
              </div>
              <div>
                <span className="font-medium">External Memory:</span>
                <span className="ml-2">
                  {serverMetrics?.memory ? formatBytes(serverMetrics.memory.external) : '-'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}