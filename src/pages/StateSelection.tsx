import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { useEffect } from "react";
import { useJobStats, getStateVacancies } from "@/hooks/useJobStats";
import { Skeleton } from "@/components/ui/skeleton";

const indianStates = [
  { name: "Andhra Pradesh", code: "AP", jobCount: 245, emoji: "🌾" },
  { name: "Arunachal Pradesh", code: "AR", jobCount: 28, emoji: "🏔️" },
  { name: "Assam", code: "AS", jobCount: 156, emoji: "🌿" },
  { name: "Bihar", code: "BR", jobCount: 342, emoji: "🏛️" },
  { name: "Chhattisgarh", code: "CG", jobCount: 89, emoji: "🌳" },
  { name: "Goa", code: "GA", jobCount: 23, emoji: "🏖️" },
  { name: "Gujarat", code: "GJ", jobCount: 287, emoji: "🏭" },
  { name: "Haryana", code: "HR", jobCount: 198, emoji: "🌾" },
  { name: "Himachal Pradesh", code: "HP", jobCount: 76, emoji: "⛰️" },
  { name: "Jharkhand", code: "JH", jobCount: 123, emoji: "⛏️" },
  { name: "Karnataka", code: "KA", jobCount: 356, emoji: "💻" },
  { name: "Kerala", code: "KL", jobCount: 189, emoji: "🥥" },
  { name: "Madhya Pradesh", code: "MP", jobCount: 234, emoji: "🦎" },
  { name: "Maharashtra", code: "MH", jobCount: 456, emoji: "🏙️" },
  { name: "Manipur", code: "MN", jobCount: 34, emoji: "🏞️" },
  { name: "Meghalaya", code: "ML", jobCount: 27, emoji: "☁️" },
  { name: "Mizoram", code: "MZ", jobCount: 19, emoji: "🏔️" },
  { name: "Nagaland", code: "NL", jobCount: 22, emoji: "🏔️" },
  { name: "Odisha", code: "OR", jobCount: 167, emoji: "🏛️" },
  { name: "Punjab", code: "PB", jobCount: 143, emoji: "🌾" },
  { name: "Rajasthan", code: "RJ", jobCount: 298, emoji: "🏰" },
  { name: "Sikkim", code: "SK", jobCount: 15, emoji: "🏔️" },
  { name: "Tamil Nadu", code: "TN", jobCount: 389, emoji: "🏭" },
  { name: "Telangana", code: "TG", jobCount: 201, emoji: "💻" },
  { name: "Tripura", code: "TR", jobCount: 31, emoji: "🌿" },
  { name: "Uttar Pradesh", code: "UP", jobCount: 567, emoji: "🏛️" },
  { name: "Uttarakhand", code: "UK", jobCount: 87, emoji: "⛰️" },
  { name: "West Bengal", code: "WB", jobCount: 278, emoji: "🎨" },
  // Union Territories
  { name: "Delhi", code: "DL", jobCount: 234, emoji: "🏛️" },
  { name: "Chandigarh", code: "CH", jobCount: 45, emoji: "🌿" },
  { name: "Puducherry", code: "PY", jobCount: 28, emoji: "🏖️" },
  { name: "Jammu & Kashmir", code: "JK", jobCount: 89, emoji: "🏔️" },
  { name: "Ladakh", code: "LA", jobCount: 12, emoji: "🏔️" },
  { name: "Andaman & Nicobar", code: "AN", jobCount: 8, emoji: "🏝️" },
  { name: "Dadra & Nagar Haveli", code: "DN", jobCount: 6, emoji: "🌳" },
  { name: "Daman & Diu", code: "DD", jobCount: 4, emoji: "🏖️" },
  { name: "Lakshadweep", code: "LD", jobCount: 2, emoji: "🏝️" }
];

export default function StateSelection() {
  const location = useLocation();
  const { data: jobStats, isLoading } = useJobStats();
  
  // Scroll to top instantly when navigating to this page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Enrich states with real data from database
  const enrichedStates = indianStates.map(state => {
    const vacancies = jobStats ? getStateVacancies(jobStats.stateWiseData, state.name) : state.jobCount;
    return {
      ...state,
      jobCount: vacancies,
    };
  });

  // Sort states by job count in descending order
  const sortedStates = enrichedStates.sort((a, b) => b.jobCount - a.jobCount);
  
  // Calculate total vacancies
  const totalVacancies = jobStats?.totalVacancies || 0;

  return (
    <>
      <Helmet>
        <title>State Govt Jobs 2025 - Select Your State | NextJobInfo</title>
        <meta 
          name="description" 
          content="Find state government jobs across all Indian states & UTs. Latest sarkari naukri vacancies for UP, Bihar, Maharashtra, Delhi, Karnataka & more. Updated daily." 
        />
        <meta 
          name="keywords" 
          content="state government jobs 2025, state wise sarkari naukri, UP govt jobs, Bihar govt jobs, Maharashtra govt jobs, Delhi govt jobs, state bharti 2025" 
        />
        <link rel="canonical" href={`${window.location.origin}/state-selection`} />
        
        {/* CollectionPage Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "State Government Jobs 2025",
            "description": "Comprehensive list of government job opportunities by Indian states and union territories",
            "url": `${window.location.origin}/state-selection`,
            "inLanguage": "en-IN",
            "isPartOf": {
              "@type": "WebSite",
              "name": "NextJobInfo",
              "url": window.location.origin
            },
            "breadcrumb": {
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
                  "name": "State Govt Jobs",
                  "item": `${window.location.origin}/state-selection`
                }
              ]
            },
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": sortedStates.length,
              "itemListElement": sortedStates.slice(0, 15).map((state, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": `${state.name} Government Jobs`,
                "url": `${window.location.origin}/state-jobs/${state.code.toLowerCase()}`,
                "description": `${state.jobCount.toLocaleString('en-IN')} government job vacancies in ${state.name}`
              }))
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="py-6">
        <div className="w-full">
          <div className="flex">
            {/* Left Margin - 2% */}
            <div className="hidden xl:block w-[2%] flex-shrink-0"></div>
            
            {/* Left Sidebar - 17% */}
            <div className="hidden lg:block w-[17%] flex-shrink-0 px-2">
              <LeftSidebar />
            </div>

            {/* Middle Content - 62% */}
            <div className="w-full lg:w-[62%] flex-shrink-0 px-3">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            State Government Jobs 2025
          </h1>
          <h2 className="text-base sm:text-lg text-muted-foreground mb-6">
            Select your state to view latest sarkari naukri opportunities - {totalVacancies.toLocaleString('en-IN')}+ active vacancies
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoading ? (
            Array.from({ length: 12 }).map((_, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-4 w-20" />
                </CardContent>
              </Card>
            ))
          ) : (
            sortedStates.map((state, index) => (
            <Link key={state.code} to={`/state-jobs/${state.code.toLowerCase()}`}>
              <Card className={`
                transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer
                ${index < 4 ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20' : ''}
                ${index >= 4 && index < 8 ? 'bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20' : ''}
                ${index >= 8 ? 'hover:bg-muted/50' : ''}
              `}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{state.emoji}</span>
                    <Badge 
                      variant={index < 4 ? "default" : index < 8 ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {state.jobCount.toLocaleString('en-IN')} Jobs
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardTitle className="text-lg font-semibold mb-2 line-clamp-2">
                    {state.name}
                  </CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{state.jobCount.toLocaleString('en-IN')} Vacancies</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Updated Today</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
            ))
          )}
        </div>

        {/* Info Section */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-3">Why Choose State Government Jobs?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <Badge variant="outline">🛡️</Badge>
                  <span>Job Security</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Badge variant="outline">💰</Badge>
                  <span>Good Salary</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Badge variant="outline">🎯</Badge>
                  <span>Career Growth</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
            </div>

            {/* Right Sidebar - 17% */}
            <div className="hidden lg:block w-[17%] flex-shrink-0 px-2">
              <RightSidebar />
            </div>
            
            {/* Right Margin - 2% */}
            <div className="hidden xl:block w-[2%] flex-shrink-0"></div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
    </>
  );
}