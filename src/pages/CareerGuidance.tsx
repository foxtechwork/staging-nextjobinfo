import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Compass, GraduationCap, Briefcase, TrendingUp, Users, BookOpen } from "lucide-react";

const CareerGuidance = () => {
  const careerPaths = [
    {
      title: "Administrative Services",
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      description: "Civil services including IAS, IPS, IFS and state administrative services",
      requirements: "Graduate degree, age 21-32, comprehensive exam preparation",
      prospects: "High job security, prestigious positions, policy-making roles"
    },
    {
      title: "Banking & Finance",
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      description: "Opportunities in public sector banks, RBI, and financial institutions",
      requirements: "Graduate degree, preferably in commerce/economics, age 20-30",
      prospects: "Stable career growth, competitive salary, multiple promotion levels"
    },
    {
      title: "Education Sector",
      icon: <GraduationCap className="h-8 w-8 text-primary" />,
      description: "Teaching positions in schools, colleges, and universities",
      requirements: "Relevant degree/diploma in education, subject expertise",
      prospects: "Social impact, job security, regular holidays, pension benefits"
    },
    {
      title: "Technical Services",
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      description: "Engineering roles in railways, defense, PSUs, and technical departments",
      requirements: "Engineering degree, technical skills, age 18-35",
      prospects: "Innovation opportunities, good salary, career advancement"
    }
  ];

  const guidanceSteps = [
    {
      step: "1",
      title: "Self Assessment",
      content: "Evaluate your interests, skills, and career goals to identify suitable government sectors"
    },
    {
      step: "2", 
      title: "Research Options",
      content: "Explore different government departments, job roles, and career progression paths"
    },
    {
      step: "3",
      title: "Skill Building",
      content: "Develop required technical and soft skills through courses and practical experience"
    },
    {
      step: "4",
      title: "Exam Preparation",
      content: "Create a study plan and prepare systematically for competitive examinations"
    },
    {
      step: "5",
      title: "Application Strategy",
      content: "Apply strategically to multiple positions while meeting all eligibility criteria"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Career Guidance for Government Jobs 2025 | NextJobInfo</title>
        <meta 
          name="description" 
          content="Expert career guidance for government jobs. Get advice on civil services, banking, railways, teaching, and PSU careers. Plan your sarkari naukri path with NextJobInfo." 
        />
        <meta 
          name="keywords" 
          content="career guidance, government job advice, civil service career, banking career, PSU career planning, sarkari naukri guidance" 
        />
        <link rel="canonical" href={`${window.location.origin}/career`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/career`} />
        <meta property="og:title" content="Career Guidance for Government Jobs 2025 | NextJobInfo" />
        <meta property="og:description" content="Expert career guidance for government jobs. Get advice on civil services, banking, railways, teaching, and PSU careers. Plan your sarkari naukri path with NextJobInfo." />
        <meta property="og:image" content={`${window.location.origin}/share-jobs-with-nextjobinfo.webp`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="NextJobInfo" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${window.location.origin}/career`} />
        <meta name="twitter:title" content="Career Guidance for Government Jobs 2025 | NextJobInfo" />
        <meta name="twitter:description" content="Expert career guidance for government jobs. Get advice on civil services, banking, railways, teaching, and PSU careers. Plan your sarkari naukri path with NextJobInfo." />
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
                "name": "Career Guidance",
                "item": `${window.location.origin}/career`
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
            <Compass className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Career Guidance</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Navigate your government career journey with expert guidance. Discover opportunities, 
              understand requirements, and plan your path to success in the public sector.
            </p>
          </div>

          {/* Career Assessment */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg mb-16">
            <div className="text-center mb-8">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Find Your Perfect Government Career</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Government careers offer stability, growth, and the opportunity to serve the nation. 
                Explore different sectors to find the best fit for your skills and aspirations.
              </p>
            </div>
          </div>

          {/* Career Paths */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Popular Career Paths</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {careerPaths.map((path, index) => (
                <div key={index} className="bg-card p-6 rounded-lg border hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                      {path.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3">{path.title}</h3>
                      <p className="text-muted-foreground mb-4">{path.description}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm mb-1">Requirements:</h4>
                          <p className="text-sm text-muted-foreground">{path.requirements}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">Career Prospects:</h4>
                          <p className="text-sm text-muted-foreground">{path.prospects}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guidance Steps */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Your Career Journey</h2>
            <div className="grid md:grid-cols-5 gap-6">
              {guidanceSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-card p-8 rounded-lg border">
              <h3 className="text-2xl font-semibold mb-6">Why Choose Government Jobs?</h3>
              <ul className="space-y-3">
                {[
                  "Job security and stability",
                  "Regular salary increments",
                  "Comprehensive benefits package",
                  "Work-life balance",
                  "Pension and retirement benefits",
                  "Opportunity to serve the nation",
                  "Respect and social status"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card p-8 rounded-lg border">
              <h3 className="text-2xl font-semibold mb-6">Success Tips</h3>
              <ul className="space-y-3">
                {[
                  "Start preparation early and be consistent",
                  "Stay updated with current affairs",
                  "Develop strong communication skills",
                  "Practice time management",
                  "Take mock tests regularly",
                  "Learn from successful candidates",
                  "Stay motivated and persistent"
                ].map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Age and Eligibility Guide */}
          <div className="bg-muted/50 p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-semibold text-center mb-8">Age & Eligibility Guidelines</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="font-semibold mb-2">18-25 Years</h4>
                <p className="text-sm text-muted-foreground">
                  Entry-level positions, clerical jobs, police constable, railway jobs
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2">21-32 Years</h4>
                <p className="text-sm text-muted-foreground">
                  Civil services, banking, administrative positions, teaching jobs
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2">25-35 Years</h4>
                <p className="text-sm text-muted-foreground">
                  Senior positions, specialized roles, technical expert positions
                </p>
              </div>
            </div>
          </div>

          {/* Action Call */}
          <div className="text-center bg-card p-8 rounded-lg border">
            <h2 className="text-2xl font-semibold mb-4">Ready to Start Your Government Career?</h2>
            <p className="text-muted-foreground mb-6">
              Browse through thousands of current job openings and find the perfect opportunity for your skills and interests.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Browse Jobs
              </a>
              <a 
                href="/tips"
                className="inline-flex items-center gap-2 bg-card text-card-foreground px-6 py-3 rounded-lg border hover:bg-muted transition-colors"
              >
                Job Search Tips
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
    </>
  );
};

export default CareerGuidance;