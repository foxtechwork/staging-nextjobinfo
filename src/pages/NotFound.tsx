import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Home, Search, Briefcase, FileText } from "lucide-react";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Next Job Info</title>
        <meta name="description" content="The page you are looking for could not be found. Return to Next Job Info homepage to find latest government job opportunities." />
        <meta name="robots" content="noindex, nofollow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="404 - Page Not Found | Next Job Info" />
        <meta property="og:description" content="The page you are looking for could not be found. Return to Next Job Info homepage to find latest government job opportunities." />
        <meta property="og:image" content={`${window.location.origin}//share-jobs-with-nextjobinfo.webp`} />
        <meta property="og:site_name" content="NextJobInfo" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="404 - Page Not Found | Next Job Info" />
        <meta name="twitter:description" content="The page you are looking for could not be found. Return to Next Job Info homepage to find latest government job opportunities." />
        <meta name="twitter:image" content={`${window.location.origin}//share-jobs-with-nextjobinfo.webp`} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-2xl w-full text-center">
            <div className="mb-8">
              <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
              <h2 className="text-3xl font-semibold text-foreground mb-4">
                Page Not Found
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Sorry, the page you're looking for doesn't exist or has been moved.
                Don't worry, you can find your way back to explore the latest government job opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Link to="/">
                <Button className="w-full" size="lg">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Button>
              </Link>
              
              <Link to="/state-selection">
                <Button variant="outline" className="w-full" size="lg">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Jobs by State
                </Button>
              </Link>
              
              <Link to="/tips">
                <Button variant="outline" className="w-full" size="lg">
                  <FileText className="mr-2 h-5 w-5" />
                  Job Search Tips
                </Button>
              </Link>
              
              <Link to="/career">
                <Button variant="outline" className="w-full" size="lg">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Career Guidance
                </Button>
              </Link>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>Need help? <Link to="/contact" className="text-primary hover:underline">Contact us</Link></p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default NotFound;
