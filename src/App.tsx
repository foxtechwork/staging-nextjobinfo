import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary";
import { PerformanceMonitor } from "./components/PerformanceMonitor";
import Index from "./pages/Index";
import JobDetails from "./pages/JobDetails";
import StateSelection from "./pages/StateSelection";
import StateJobs from "./pages/StateJobs";
import CategoryJobs from "./pages/CategoryJobs";
import NotFound from "./pages/NotFound";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import Sitemap from "./pages/Sitemap";
import JobSearchTips from "./pages/JobSearchTips";
import CareerGuidance from "./pages/CareerGuidance";
import ComingSoon from "./pages/ComingSoon";
import InterviewPrep from "./pages/InterviewPrep";
import Resume from "./pages/Resume";
import StudyMaterial from "./pages/StudyMaterial";
import MockTests from "./pages/MockTests";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes (renamed from cacheTime)
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) return false;
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: 'always',
    },
  },
});

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
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
