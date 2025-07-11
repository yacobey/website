import React from 'react';

interface SuspenseFallbackProps {
  height?: string;
  message?: string;
}

export function SuspenseFallback({ 
  height = "200px", 
  message = "Loading..." 
}: SuspenseFallbackProps) {
  return (
    <div 
      className="flex items-center justify-center w-full"
      style={{ minHeight: height }}
    >
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600 text-sm">{message}</p>
      </div>
    </div>
  );
}

export function SkeletonLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );
}

export function BlogSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-6 border rounded-lg">
          <SkeletonLoader className="h-6 w-3/4 mb-2" />
          <SkeletonLoader className="h-4 w-full mb-2" />
          <SkeletonLoader className="h-4 w-2/3" />
          <div className="flex gap-2 mt-4">
            <SkeletonLoader className="h-6 w-16" />
            <SkeletonLoader className="h-6 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="p-6 border rounded-lg">
      <SkeletonLoader className="h-8 w-1/2 mb-4" />
      <SkeletonLoader className="h-4 w-full mb-2" />
      <SkeletonLoader className="h-4 w-3/4 mb-4" />
      <SkeletonLoader className="h-10 w-24" />
    </div>
  );
}