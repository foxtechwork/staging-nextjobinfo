import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FileText } from "lucide-react";

const StudyMaterial = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Study Material - Coming Soon | Next Job Info</title>
        <meta 
          name="description" 
          content="Free study material for government job exams coming soon. Stay tuned for comprehensive study resources for SSC, Banking, Railway, UPSC, and other government job preparations." 
        />
        <meta 
          name="keywords" 
          content="government job study material, SSC study material, banking exam notes, railway exam preparation, UPSC study material, free PDF download" 
        />
        <link rel="canonical" href={`${window.location.origin}/study-material`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/study-material`} />
        <meta property="og:title" content="Study Material - Coming Soon | Next Job Info" />
        <meta property="og:description" content="Free study material for government job exams coming soon. Stay tuned for comprehensive study resources for SSC, Banking, Railway, UPSC, and other government job preparations." />
        <meta property="og:image" content={`${window.location.origin}/share-jobs-with-nextjobinfo.webp`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="NextJobInfo" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${window.location.origin}/study-material`} />
        <meta name="twitter:title" content="Study Material - Coming Soon | Next Job Info" />
        <meta name="twitter:description" content="Free study material for government job exams coming soon. Stay tuned for comprehensive study resources for SSC, Banking, Railway, UPSC, and other government job preparations." />
        <meta name="twitter:image" content={`${window.location.origin}/share-jobs-with-nextjobinfo.webp`} />
      </Helmet>

      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <FileText className="h-24 w-24 text-primary mx-auto mb-4 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Coming Soon!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            We are working hard to bring you the best study materials for government job exams.
          </p>
          <p className="text-base text-muted-foreground">
            Stay tuned for comprehensive study resources including PDF notes, practice papers, current affairs, and exam-specific materials for SSC, Banking, Railway, UPSC, and other government job preparations.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StudyMaterial;
