import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Globe, ArrowRight, Folder, FileText } from "lucide-react";

const Sitemap = () => {
  const siteStructure = {
    "Main Pages": [
      { name: "Home", href: "/", description: "Latest government jobs and notifications" },
      { name: "State Selection", href: "/state-selection", description: "Choose your state for localized jobs" }
    ],
    "Job Categories": [
      { name: "Government Jobs", href: "/category/government", description: "Central and state government positions" },
      { name: "Banking Jobs", href: "/category/banking", description: "SBI, IBPS, RBI and other banking jobs" },
      { name: "Railway Jobs", href: "/category/railway", description: "Indian Railways recruitment" },
      { name: "Teaching Jobs", href: "/category/teaching", description: "School and college teaching positions" },
      { name: "Defense Jobs", href: "/category/defense", description: "Army, Navy, Air Force recruitment" },
      { name: "SSC Jobs", href: "/category/ssc", description: "Staff Selection Commission jobs" },
      { name: "Engineering Jobs", href: "/category/engineering", description: "Technical government positions" },
      { name: "Police Jobs", href: "/category/police", description: "State and central police recruitment" }
    ],
    "Resources": [
      { name: "Job Search Tips", href: "/tips", description: "Expert advice for job hunting" },
      { name: "Career Guidance", href: "/career", description: "Career planning and development" },
      { name: "Interview Preparation", href: "/interview-prep", description: "Interview tips and practice" },
      { name: "Resume Builder", href: "/resume", description: "Create professional resumes" }
    ],
    "Support & Information": [
      { name: "About Us", href: "/about", description: "Learn about JobAlert" },
      { name: "Contact Us", href: "/contact", description: "Get in touch with our team" },
      { name: "Support", href: "/support", description: "Help center and FAQ" },
      { name: "Privacy Policy", href: "/privacy", description: "How we protect your privacy" },
      { name: "Terms of Service", href: "/terms", description: "Terms and conditions" },
      { name: "Disclaimer", href: "/disclaimer", description: "Important legal information" }
    ],
    "Exam Resources": [
      { name: "Admit Cards", href: "/admit-cards", description: "Download hall tickets" },
      { name: "Results", href: "/results", description: "Check exam results" },
      { name: "Syllabus", href: "/syllabus", description: "Exam syllabus and patterns" },
      { name: "Answer Keys", href: "/answer-keys", description: "Official answer keys" },
      { name: "Cut Off Marks", href: "/cutoff", description: "Previous year cut-offs" },
      { name: "Merit List", href: "/merit-list", description: "Selected candidates list" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Sitemap - All Pages | NextJobInfo Government Jobs Portal</title>
        <meta 
          name="description" 
          content="Complete sitemap of NextJobInfo - Browse all government job pages, exam resources, career guidance, state-wise jobs, and categories. Find sarkari naukri opportunities easily." 
        />
        <meta 
          name="keywords" 
          content="sitemap, all pages, government jobs list, sarkari naukri pages, job categories, state jobs, exam resources" 
        />
        <link rel="canonical" href={`${window.location.origin}/sitemap`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/sitemap`} />
        <meta property="og:title" content="Sitemap - All Pages | NextJobInfo Government Jobs Portal" />
        <meta property="og:description" content="Complete sitemap of NextJobInfo - Browse all government job pages, exam resources, career guidance, state-wise jobs, and categories. Find sarkari naukri opportunities easily." />
        <meta property="og:image" content={`${window.location.origin}/share-jobs-with-nextjobinfo.webp`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="NextJobInfo" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${window.location.origin}/sitemap`} />
        <meta name="twitter:title" content="Sitemap - All Pages | NextJobInfo Government Jobs Portal" />
        <meta name="twitter:description" content="Complete sitemap of NextJobInfo - Browse all government job pages, exam resources, career guidance, state-wise jobs, and categories. Find sarkari naukri opportunities easily." />
        <meta name="twitter:image" content={`${window.location.origin}/share-jobs-with-nextjobinfo.webp`} />
        
        {/* BreadcrumbList */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": window.location.origin
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Sitemap",
                "item": `${window.location.origin}/sitemap`
              }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <Globe className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Sitemap</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore all the pages and resources available on JobAlert. Find government jobs, 
              career guidance, and exam information organized by category.
            </p>
          </div>
          
          <div className="space-y-12">
            {Object.entries(siteStructure).map(([category, links]) => (
              <div key={category} className="bg-card p-8 rounded-lg border">
                <div className="flex items-center gap-3 mb-6">
                  <Folder className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">{category}</h2>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {links.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="group bg-muted/50 hover:bg-muted p-4 rounded-lg transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <h3 className="font-medium group-hover:text-primary transition-colors">
                              {link.name}
                            </h3>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {link.description}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">Need Help Finding Something?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help you navigate our platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                to="/support" 
                className="inline-flex items-center gap-2 bg-card text-card-foreground px-6 py-3 rounded-lg border hover:bg-muted transition-colors"
              >
                Support Center
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>This sitemap is updated regularly. Last updated: January 2025</p>
          </div>
        </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Sitemap;