// SSG-specific routes - NO lazy loading to prevent suspension during SSR
// These are direct imports for static site generation
import Index from "../pages/Index";
import JobDetails from "../pages/JobDetails";
import StateSelection from "../pages/StateSelection";
import StateJobs from "../pages/StateJobs";
import CategoryJobs from "../pages/CategoryJobs";
import NotFound from "../pages/NotFound";
import Support from "../pages/Support";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import Disclaimer from "../pages/Disclaimer";
import Sitemap from "../pages/Sitemap";
import JobSearchTips from "../pages/JobSearchTips";
import CareerGuidance from "../pages/CareerGuidance";
import ComingSoon from "../pages/ComingSoon";
import InterviewPrep from "../pages/InterviewPrep";
import Resume from "../pages/Resume";
import StudyMaterial from "../pages/StudyMaterial";
import MockTests from "../pages/MockTests";

export const ssgRoutes = [
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
