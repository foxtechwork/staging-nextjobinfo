// Critical page loaded immediately
import Index from "./pages/Index";

// Non-critical pages lazy loaded for better performance
import { lazy } from 'react';

const JobDetails = lazy(() => import("./pages/JobDetails"));
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

export const routes = [
  { path: '/', Component: Index },
  { path: '/job/:pageLink', Component: JobDetails },
  { path: '/state-selection', Component: StateSelection },
  { path: '/state-jobs/:stateCode', Component: StateJobs },
  { path: '/category/:category', Component: CategoryJobs },
  { path: '/support', Component: Support },
  { path: '/contact', Component: Contact },
  { path: '/about', Component: About },
  { path: '/privacy', Component: Privacy },
  { path: '/terms', Component: Terms },
  { path: '/disclaimer', Component: Disclaimer },
  { path: '/sitemap', Component: Sitemap },
  { path: '/tips', Component: JobSearchTips },
  { path: '/career', Component: CareerGuidance },
  { path: '/interview-prep', Component: InterviewPrep },
  { path: '/resume', Component: Resume },
  { path: '/study-material', Component: StudyMaterial },
  { path: '/mock-tests', Component: MockTests },
  { path: '/admit-cards', Component: ComingSoon },
  { path: '/results', Component: ComingSoon },
  { path: '/syllabus', Component: ComingSoon },
  { path: '/answer-keys', Component: ComingSoon },
  { path: '/cutoff', Component: ComingSoon },
  { path: '/merit-list', Component: ComingSoon },
  { path: '*', Component: NotFound },
];
