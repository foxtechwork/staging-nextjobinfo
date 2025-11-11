import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './src/routes';
import './src/index.css';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./src/components/ErrorBoundary";
import { PerformanceMonitor } from "./src/components/PerformanceMonitor";
import staticRoutes from './static-routes.json';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: (failureCount, error: any) => {
        if (error?.status >= 400 && error?.status < 500) return false;
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: 'always',
    },
  },
});

// Create the SSG root function (vite-react-ssg expects `createRoot`)
const createRoot = ViteReactSSG(
  { routes, basename: import.meta.env.BASE_URL },
  ({ router, routes, isClient, initialState }) => {
    // Create a new helmet context for SSR
    const helmetContext = {};
    
    return (
      <ErrorBoundary>
        <PerformanceMonitor />
        <QueryClientProvider client={queryClient}>
          <HelmetProvider context={helmetContext}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </HelmetProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    );
  },
  {
    // Provide routes to pre-render
    getPreloadLinks: () => staticRoutes,
  }
);

// Export for both CLIs: vite-ssg expects `createApp`, vite-react-ssg docs use `createRoot`
export { createRoot };
export const createApp = createRoot;
export default createApp;
