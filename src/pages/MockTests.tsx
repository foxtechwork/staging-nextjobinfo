import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Target } from "lucide-react";

const MockTests = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Mock Tests - Coming Soon | Next Job Info</title>
        <meta 
          name="description" 
          content="Free mock tests for government job exams coming soon. Practice with comprehensive mock tests for SSC, Banking, Railway, UPSC exams with real-time analysis." 
        />
        <meta 
          name="keywords" 
          content="government job mock test, SSC mock test, banking mock test, railway mock test, UPSC mock test, online practice test" 
        />
        <link rel="canonical" href={`${window.location.origin}/mock-tests`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/mock-tests`} />
        <meta property="og:title" content="Mock Tests - Coming Soon | Next Job Info" />
        <meta property="og:description" content="Free mock tests for government job exams coming soon. Practice with comprehensive mock tests for SSC, Banking, Railway, UPSC exams with real-time analysis." />
        <meta property="og:image" content={`${window.location.origin}/share-jobs-with-nextjobinfo.webp`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="NextJobInfo" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${window.location.origin}/mock-tests`} />
        <meta name="twitter:title" content="Mock Tests - Coming Soon | Next Job Info" />
        <meta name="twitter:description" content="Free mock tests for government job exams coming soon. Practice with comprehensive mock tests for SSC, Banking, Railway, UPSC exams with real-time analysis." />
        <meta name="twitter:image" content={`${window.location.origin}/share-jobs-with-nextjobinfo.webp`} />
      </Helmet>

      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <Target className="h-24 w-24 text-primary mx-auto mb-4 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Coming Soon!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            We are preparing comprehensive mock tests to help you excel in your government job exams.
          </p>
          <p className="text-base text-muted-foreground">
            Get ready for free mock tests with real-time performance analysis, all India ranking, detailed performance reports for SSC, Banking, Railway, UPSC, and other government job examinations.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MockTests;
