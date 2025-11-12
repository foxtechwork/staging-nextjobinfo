import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Users, Target, Award, Heart } from "lucide-react";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About NextJobInfo - Leading Govt Jobs Portal 2025</title>
        <meta 
          name="description" 
          content="NextJobInfo is India's trusted govt job portal since 2020. Get free sarkari naukri alerts, bank jobs, SSC, UPSC, railway notifications. 2M+ active users." 
        />
        <meta 
          name="keywords" 
          content="about nextjobinfo, govt job portal India, sarkari naukri website, job alert service, government jobs platform" 
        />
        <link rel="canonical" href={`${window.location.origin}/about`} />
        
        {/* Organization Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "NextJobInfo",
            "alternateName": "Next Job Info",
            "url": window.location.origin,
            "logo": `${window.location.origin}/apple-touch-icon.png`,
            "description": "India's leading government job portal providing latest sarkari naukri alerts, bank jobs, railway jobs, SSC, UPSC notifications and free job alerts.",
            "foundingDate": "2020",
            "founders": [
              {
                "@type": "Person",
                "name": "NextJobInfo Team"
              }
            ],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Service",
              "availableLanguage": ["English", "Hindi"]
            },
            "sameAs": [
              "https://www.facebook.com/nextjobinfo",
              "https://twitter.com/nextjobinfo",
              "https://www.instagram.com/nextjobinfo"
            ]
          })}
        </script>
        
        {/* AboutPage Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About NextJobInfo",
            "description": "Learn about NextJobInfo's mission to democratize access to government job opportunities in India",
            "url": `${window.location.origin}/about`,
            "mainEntity": {
              "@type": "Organization",
              "name": "NextJobInfo"
            }
          })}
        </script>
        
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
                "name": "About Us",
                "item": `${window.location.origin}/about`
              }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">About NextJobInfo</h1>
          <h2 className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-base sm:text-lg">
            India's Most Trusted Government Job Portal Since 2020
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-base sm:text-lg">
            Connecting talented individuals with meaningful sarkari naukri opportunities across India. 
            Join 2M+ users who trust us for daily job alerts.
          </p>
          
          {/* Mission Section */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg">
              <div className="text-center">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  To democratize access to government job opportunities by providing timely, accurate, 
                  and comprehensive information to job seekers across India. We believe every qualified 
                  candidate deserves equal access to public sector career opportunities.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Integrity</h3>
                <p className="text-muted-foreground">
                  We provide accurate, verified information and maintain transparency in all our communications.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for excellence in our platform, ensuring the best user experience for job seekers.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community</h3>
                <p className="text-muted-foreground">
                  We're committed to building a supportive community that helps everyone succeed in their career goals.
                </p>
              </div>
            </div>
          </div>

          {/* Story Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2020, Next Job Info was born out of a simple observation: finding reliable 
                  information about government job opportunities was unnecessarily difficult and time-consuming.
                </p>
                <p>
                  Our founders, having experienced the challenges of navigating the complex landscape 
                  of government recruitment firsthand, decided to create a centralized platform that 
                  would make this process simpler and more accessible.
                </p>
                <p>
                  Today, we serve millions of job seekers across India, providing them with timely 
                  updates, comprehensive job listings, and valuable career guidance. Our platform 
                  has become a trusted resource for anyone looking to build a career in the public sector.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6 text-center">By the Numbers</h3>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">2M+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                  <div className="text-sm text-muted-foreground">Job Listings</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Organizations</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Whether you're a job seeker looking for your next opportunity or an organization 
              wanting to connect with talented candidates, we're here to help you succeed.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
    </>
  );
};

export default About;