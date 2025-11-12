import { lazy, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const JobTable = lazy(() => import('./JobTable'));
const JobCards = lazy(() => import('./JobCards'));

interface LazyJobListProps {
  jobs: any[];
  formatDate: (date: string, fallback?: string) => string;
  formatQualification: (text: string) => string;
  getDateColor: (date: string) => string;
}

const LoadingSkeleton = () => (
  <div className="p-3 sm:p-4 space-y-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center space-x-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-3 w-[60%]" />
          <Skeleton className="h-3 w-[40%]" />
        </div>
        <Skeleton className="h-6 w-16" />
      </div>
    ))}
  </div>
);

export default function LazyJobList({ jobs, formatDate, formatQualification, getDateColor }: LazyJobListProps) {
  return (
    <>
      {/* Mobile Card View */}
      <div className="md:hidden">
        <Suspense fallback={<LoadingSkeleton />}>
          <JobCards 
            jobs={jobs}
            formatDate={formatDate}
            formatQualification={formatQualification}
            getDateColor={getDateColor}
          />
        </Suspense>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Suspense fallback={<LoadingSkeleton />}>
          <JobTable 
            jobs={jobs}
            formatDate={formatDate}
            formatQualification={formatQualification}
            getDateColor={getDateColor}
          />
        </Suspense>
      </div>
    </>
  );
}
