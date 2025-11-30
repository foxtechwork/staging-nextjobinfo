import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary";
import { PerformanceMonitor } from "./components/PerformanceMonitor";

// Critical pages loaded immediately (not lazy)
import Index from "./pages/Index";
import JobDetails from "./pages/JobDetails";

// Non-critical pages lazy loaded
import { lazy } from 'react';
const StateSelection = lazy(() => import("./pages/StateSelection"));
const StateJobs = lazy(() => import("./pages/StateJobs"));
const CategoryJobs = lazy(() => import("./pages/CategoryJobs"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Support = lazy(() => import("./pages/Support"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const JobSearchTips = lazy(() => import("./pages/JobSearchTips"));
const CareerGuidance = lazy(() => import("./pages/CareerGuidance"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const InterviewPrep = lazy(() => import("./pages/InterviewPrep"));
const Resume = lazy(() => import("./pages/Resume"));
const StudyMaterial = lazy(() => import("./pages/StudyMaterial"));
const MockTests = lazy(() => import("./pages/MockTests"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // SSG data never stales
      gcTime: Infinity, // Keep in cache forever
      retry: (failureCount, error: any) => {
        if (error?.status >= 400 && error?.status < 500) return false;
        return failureCount < 1; // Reduced retries
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      networkMode: 'offlineFirst', // Use cached data first
    },
    mutations: {
      retry: 0,
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="space-y-4 w-full max-w-3xl mx-auto p-8">
      <Skeleton className="h-12 w-3/4 mx-auto" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-64 w-full mt-8" />
    </div>
  </div>
);

const App = () => {
  return (
    <ErrorBoundary>
      <PerformanceMonitor />
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/job/:pageLink" element={<JobDetails />} />
                  <Route path="/state-selection" element={<StateSelection />} />
                  <Route path="/state-jobs/:stateCode" element={<StateJobs />} />
                  <Route path="/category/:category" element={<CategoryJobs />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/disclaimer" element={<Disclaimer />} />
                  <Route path="/sitemap" element={<Sitemap />} />
                  <Route path="/tips" element={<JobSearchTips />} />
                  <Route path="/career" element={<CareerGuidance />} />
                  <Route path="/interview-prep" element={<InterviewPrep />} />
                  <Route path="/resume" element={<Resume />} />
                  <Route path="/study-material" element={<StudyMaterial />} />
                  <Route path="/mock-tests" element={<MockTests />} />
                  <Route path="/admit-cards" element={<ComingSoon />} />
                  <Route path="/results" element={<ComingSoon />} />
                  <Route path="/syllabus" element={<ComingSoon />} />
                  <Route path="/answer-keys" element={<ComingSoon />} />
                  <Route path="/cutoff" element={<ComingSoon />} />
                  <Route path="/merit-list" element={<ComingSoon />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
