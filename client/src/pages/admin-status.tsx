import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Activity, Clock, Database, MemoryStick, RefreshCw } from "lucide-react";

interface HealthData {
  status: "healthy" | "degraded" | "unhealthy" | "error";
  dbLatency: number;
  uptime: number;
  memory: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external: number;
  };
  timestamp: string;
  message?: string;
}

function statusBadge(status: HealthData["status"]) {
  const variants: Record<string, { label: string; className: string }> = {
    healthy: { label: "Healthy", className: "bg-green-100 text-green-800 border-green-200" },
    degraded: { label: "Degraded", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    unhealthy: { label: "Unhealthy", className: "bg-red-100 text-red-800 border-red-200" },
    error: { label: "Error", className: "bg-red-100 text-red-800 border-red-200" },
  };
  const v = variants[status] ?? variants.error;
  return (
    <Badge className={`text-sm px-3 py-1 border ${v.className}`}>{v.label}</Badge>
  );
}

function latencyBadge(ms: number) {
  if (ms < 100) {
    return <Badge className="bg-green-100 text-green-800 border border-green-200">{ms} ms</Badge>;
  } else if (ms < 500) {
    return <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200">{ms} ms</Badge>;
  }
  return <Badge className="bg-red-100 text-red-800 border border-red-200">{ms} ms</Badge>;
}

function formatUptime(seconds: number) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const parts: string[] = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(" ");
}

function formatBytes(bytes: number) {
  const mb = bytes / 1024 / 1024;
  return `${mb.toFixed(1)} MB`;
}

export default function AdminStatusPage() {
  const { data, isLoading, isError, dataUpdatedAt, refetch, isFetching } = useQuery<HealthData>({
    queryKey: ["/api/health"],
    refetchInterval: 30000,
    queryFn: async () => {
      const res = await fetch("/api/health");
      const json = await res.json();
      return json as HealthData;
    },
  });

  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString()
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">App Health Status</h1>
            <p className="text-gray-500 mt-1">
              Live monitoring — refreshes every 30 seconds
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
            Refresh Now
          </Button>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-gray-200 rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {isError && !isLoading && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6 text-red-700">
              Unable to reach the health endpoint. The server may be unavailable.
            </CardContent>
          </Card>
        )}

        {data && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2 flex flex-row items-center gap-2">
                  <Activity className="h-5 w-5 text-gray-500" />
                  <CardTitle className="text-base font-medium text-gray-700">
                    Overall Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    {statusBadge(data.status)}
                    {data.message && (
                      <span className="text-sm text-gray-500">{data.message}</span>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 flex flex-row items-center gap-2">
                  <Database className="h-5 w-5 text-gray-500" />
                  <CardTitle className="text-base font-medium text-gray-700">
                    DB Latency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {latencyBadge(data.dbLatency)}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 flex flex-row items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <CardTitle className="text-base font-medium text-gray-700">
                    Uptime
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatUptime(data.uptime)}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 flex flex-row items-center gap-2">
                  <MemoryStick className="h-5 w-5 text-gray-500" />
                  <CardTitle className="text-base font-medium text-gray-700">
                    Memory
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Heap Used</span>
                    <span className="font-medium">{formatBytes(data.memory.heapUsed)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Heap Total</span>
                    <span className="font-medium">{formatBytes(data.memory.heapTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">RSS</span>
                    <span className="font-medium">{formatBytes(data.memory.rss)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {lastUpdated && (
              <p className="text-xs text-gray-400 mt-4 text-right">
                Last updated: {lastUpdated}
              </p>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
