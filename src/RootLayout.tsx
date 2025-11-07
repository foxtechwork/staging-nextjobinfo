import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary";
import { PerformanceMonitor } from "./components/PerformanceMonitor";
import { HydrateData } from "./ssg/hydrate-data";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Never mark data as stale since we have SSG data
      gcTime: Infinity, // Keep data in cache forever
      retry: (failureCount, error: any) => {
        if (error?.status >= 400 && error?.status < 500) return false;
        return failureCount < 3;
      },
      refetchOnWindowFocus: false, // Don't refetch on window focus
      refetchOnMount: false, // Don't refetch on mount
      refetchOnReconnect: false, // Don't refetch on reconnect
    },
  },
});

interface RootLayoutProps {
  children?: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // Create a context object for SSR Helmet to collect tags
  const helmetContext: Record<string, any> = {};

  return (
    <ErrorBoundary>
      <PerformanceMonitor />
      <QueryClientProvider client={queryClient}>
        <HydrateData>
          <HelmetProvider context={helmetContext}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              {children ?? <Outlet />}
            </TooltipProvider>
          </HelmetProvider>
        </HydrateData>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
