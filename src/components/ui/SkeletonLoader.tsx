import { cn } from '@/lib/cn';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-neutral-200',
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-48 w-full rounded-2xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SkeletonLoader() {
  return (
    <div className="py-24 container mx-auto px-6">
      <div className="space-y-8">
        <div className="space-y-3 max-w-2xl mx-auto text-center">
          <Skeleton className="h-6 w-32 mx-auto rounded-full" />
          <Skeleton className="h-10 w-3/4 mx-auto rounded-lg" />
          <Skeleton className="h-5 w-1/2 mx-auto rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl hidden lg:block" />
        </div>
      </div>
    </div>
  );
}
