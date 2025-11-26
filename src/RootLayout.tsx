import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider, hydrate } from "@tanstack/react-query";

import ErrorBoundary from "./components/ErrorBoundary";
import { PerformanceMonitor } from "./components/PerformanceMonitor";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SSGDebugPanel } from "@/components/SSGDebugPanel";

// Hydrate QueryClient IMMEDIATELY from SSG state (before any components mount)
let isHydrated = false;
function getHydratedQueryClient() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        gcTime: Infinity,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        networkMode: 'offlineFirst',
      },
      mutations: {
        retry: 0,
      },
    },
  });

  // Hydrate synchronously on first call
  if (typeof window !== 'undefined' && !isHydrated) {
    const dehydratedState = (window as any).__REACT_QUERY_STATE__;
    if (dehydratedState) {
      try {
        hydrate(client, dehydratedState);
        console.log('✅ React Query hydrated from SSG with', Object.keys(dehydratedState.queries || {}).length, 'queries');
        isHydrated = true;
      } catch (error) {
        console.error('❌ Failed to hydrate React Query:', error);
      }
    } else {
      console.warn('⚠️ No dehydrated state found - running in dev mode');
      isHydrated = true;
    }
  }

  return client;
}

// Create hydrated client immediately
export const rootQueryClient = getHydratedQueryClient();

interface RootLayoutProps {
  children?: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <ErrorBoundary>
      <PerformanceMonitor />
      <QueryClientProvider client={rootQueryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children ?? <Outlet />}
          {/* SSG Debug Panel (Ctrl+Shift+D to toggle) */}
          <SSGDebugPanel />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
