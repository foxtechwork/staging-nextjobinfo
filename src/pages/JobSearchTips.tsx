import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Search, Target, Clock, CheckCircle, Users, Trophy } from "lucide-react";

const JobSearchTips = () => {
  const tips = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Define Your Goals",
      description: "Be clear about the type of job, department, and location you prefer",
      points: [
        "Research different government sectors and their roles",
        "Understand salary structures and benefits",
        "Consider long-term career progression opportunities",
        "Align your skills with job requirements"
      ]
    },
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: "Stay Updated",
      description: "Regular monitoring of job notifications is crucial for success",
      points: [
        "Subscribe to job alert notifications",
        "Follow official government websites",
        "Check multiple reliable sources daily",
        "Set up email alerts for specific categories"
      ]
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Time Management",
      description: "Proper planning and timely applications increase your chances",
      points: [
        "Note application deadlines and set reminders",
        "Prepare documents in advance",
        "Apply early to avoid last-minute rush",
        "Keep track of multiple applications"
      ]
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Documentation",
      description: "Having proper documents ready speeds up the application process",
      points: [
        "Keep digital copies of all certificates",
        "Maintain updated resume in multiple formats",
        "Have passport-size photographs ready",
        "Ensure all documents are properly attested"
      ]
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Networking",
      description: "Building connections can provide valuable insights and opportunities",
      points: [
        "Join relevant professional groups and forums",
        "Connect with current government employees",
        "Participate in career guidance sessions",
        "Seek mentorship from experienced professionals"
      ]
    },
    {
      icon: <Trophy className="h-8 w-8 text-primary" />,
      title: "Skill Development",
      description: "Continuous learning enhances your competitiveness",
      points: [
        "Develop both technical and soft skills",
        "Learn relevant computer applications",
        "Improve language proficiency",
        "Stay updated with current affairs"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Government Job Search Tips 2025 - Expert Advice | NextJobInfo</title>
        <meta 
          name="description" 
          content="Expert job search tips for government positions. Learn strategies to find sarkari naukri, apply online, prepare for exams, and succeed in government job applications." 
        />
        <meta 
          name="keywords" 
          content="job search tips, government job tips, sarkari naukri tips, job application advice, exam preparation tips, job hunting strategies" 
        />
        <link rel="canonical" href={`${window.location.origin}/tips`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${window.location.origin}/tips`} />
        <meta property="og:title" content="Government Job Search Tips 2025 - Expert Advice | NextJobInfo" />
        <meta property="og:description" content="Expert job search tips for government positions. Learn strategies to find sarkari naukri, apply online, prepare for exams, and succeed in government job applications." />
        <meta property="og:image" content={`${window.location.origin}/share-jobs-with-nextjobinfo.webp`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="NextJobInfo" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${window.location.origin}/tips`} />
        <meta name="twitter:title" content="Government Job Search Tips 2025 - Expert Advice | NextJobInfo" />
        <meta name="twitter:description" content="Expert job search tips for government positions. Learn strategies to find sarkari naukri, apply online, prepare for exams, and succeed in government job applications." />
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
                "name": "Job Search Tips",
                "item": `${window.location.origin}/tips`
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
            <Search className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Job Search Tips</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Expert strategies and proven methods to help you navigate the government job market successfully. 
              Follow these tips to maximize your chances of landing your dream job.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {tips.map((tip, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    {tip.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                    <p className="text-muted-foreground mb-4">{tip.description}</p>
                    <ul className="space-y-2">
                      {tip.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action Guide */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-semibold text-center mb-8">Quick Action Guide</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Research & Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Identify suitable positions and understand requirements
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Prepare & Apply</h3>
                <p className="text-sm text-muted-foreground">
                  Get documents ready and submit applications on time
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Follow Up</h3>
                <p className="text-sm text-muted-foreground">
                  Track applications and prepare for next steps
                </p>
              </div>
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-semibold text-center mb-6 text-red-800 dark:text-red-200">
              Common Mistakes to Avoid
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-3 text-red-700 dark:text-red-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">×</span>
                  <span className="text-sm">Applying without reading eligibility criteria</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">×</span>
                  <span className="text-sm">Missing application deadlines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">×</span>
                  <span className="text-sm">Submitting incomplete applications</span>
                </li>
              </ul>
              <ul className="space-y-3 text-red-700 dark:text-red-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">×</span>
                  <span className="text-sm">Not keeping backup copies of documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">×</span>
                  <span className="text-sm">Ignoring official notification updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">×</span>
                  <span className="text-sm">Falling for fraudulent job postings</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Success Checklist */}
          <div className="bg-card p-8 rounded-lg border">
            <h2 className="text-2xl font-semibold text-center mb-6">Success Checklist</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Before Applying</h3>
                <ul className="space-y-2">
                  {[
                    "Verify eligibility criteria",
                    "Gather all required documents",
                    "Check application fee details",
                    "Note important dates"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">After Applying</h3>
                <ul className="space-y-2">
                  {[
                    "Save application confirmation",
                    "Track application status",
                    "Prepare for exams/interviews",
                    "Stay updated on results"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
    </>
  );
};

export default JobSearchTips;