import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Search, Calendar, MapPin, Building, ArrowLeft, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { useJobSearch } from "@/hooks/useJobs";

const stateNames: Record<string, string> = {
  ap: "Andhra Pradesh", ar: "Arunachal Pradesh", as: "Assam", br: "Bihar",
  cg: "Chhattisgarh", ga: "Goa", gj: "Gujarat", hr: "Haryana",
  hp: "Himachal Pradesh", jh: "Jharkhand", ka: "Karnataka", kl: "Kerala",
  mp: "Madhya Pradesh", mh: "Maharashtra", mn: "Manipur", ml: "Meghalaya",
  mz: "Mizoram", nl: "Nagaland", or: "Odisha", pb: "Punjab",
  rj: "Rajasthan", sk: "Sikkim", tn: "Tamil Nadu", tg: "Telangana",
  tr: "Tripura", up: "Uttar Pradesh", uk: "Uttarakhand", wb: "West Bengal",
  dl: "Delhi", ch: "Chandigarh", py: "Puducherry", jk: "Jammu & Kashmir",
  la: "Ladakh", an: "Andaman & Nicobar", dn: "Dadra & Nagar Haveli",
  dd: "Daman & Diu", ld: "Lakshadweep"
};

export default function StateJobs() {
  const { stateCode } = useParams<{ stateCode: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const [showStateOnly, setShowStateOnly] = useState(false);
  const location = useLocation();
  
  const stateName = (stateCode && stateNames[stateCode]) ? stateNames[stateCode] : "Unknown State";
  
  // Scroll to top instantly when navigating to this page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);
  
  // Use job search hook with state filter - use activeSearchQuery instead of searchQuery
  const { data: allFilteredJobs = [], isLoading: jobsLoading } = useJobSearch(activeSearchQuery, {
    state: stateName,
    isStateSpecific: true
  });

  // Filter jobs based on toggle state
  const filteredJobs = showStateOnly 
    ? allFilteredJobs.filter(job => job.state === stateName && !job.Is_All_India)
    : allFilteredJobs;

  // Separate state-specific and All India jobs for display with separator
  const stateSpecificJobs = filteredJobs.filter(job => job.state === stateName && !job.Is_All_India);
  const allIndiaJobs = filteredJobs.filter(job => job.Is_All_India);

  const formatDate = (dateString: string, fallbackDate?: string) => {
    // Use post_date if available, otherwise use updated_at
    const dateToUse = dateString || fallbackDate;
    
    if (!dateToUse) return "Open";
    
    const date = new Date(dateToUse);
    
    // Check if date is valid and not the epoch date (1970)
    if (isNaN(date.getTime()) || date.getFullYear() < 2000) {
      return "Open";
    }
    
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDateColor = (dateString: string) => {
    if (!dateString) return "text-muted-foreground";
    
    const lastDate = new Date(dateString);
    const today = new Date();
    const diffTime = lastDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 5) return "text-destructive"; // Red
    if (diffDays <= 10) return "text-warning"; // Orange  
    return "text-success"; // Green
  };

  const formatQualification = (text: string): string => {
    if (!text || text === "Not Specified") return text;
    
    const maxLength = 100;
    
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + " and more...";
    }
    
    return text;
  };

  return (
    <>
      <Helmet>
        <title>{stateName} Government Jobs - Latest Notifications | Next Job Info</title>
        <meta 
          name="description" 
          content={`Find latest government job opportunities in ${stateName}. Apply for state government positions, exam notifications, and career opportunities in ${stateName}.`}
        />
        <meta 
          name="keywords" 
          content={`${stateName} government jobs, ${stateName} job notifications, ${stateName} recruitment, ${stateName} exam alerts`}
        />
        <link rel="canonical" href={`${window.location.origin}/state-jobs/${stateCode}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage", 
            "name": `${stateName} Government Jobs`,
            "description": `Government job opportunities in ${stateName}`,
            "url": `${window.location.origin}/state-jobs/${stateCode}`,
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
                  "name": "State Selection",
                  "item": `${window.location.origin}/state-selection`
                },
                {
                  "@type": "ListItem",
                  "position": 3, 
                  "name": `${stateName} Jobs`
                }
              ]
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
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/state-selection">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to States
              </Button>
            </Link>
            <Badge variant="secondary">
              <MapPin className="h-4 w-4 mr-2" />
              {stateName}
            </Badge>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {stateName} Government Jobs
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Latest government job opportunities in {stateName}
          </p>
          
          {/* Search Bar and Filter Toggle */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="w-full sm:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs in this state..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setActiveSearchQuery(e.target.value);
                  }}
                  className="pl-10"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setActiveSearchQuery(searchQuery);
                      const resultsSection = document.querySelector('.jobs-results-section');
                      if (resultsSection) {
                        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        setSearchQuery('');
                      }
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-lg border border-border/50">
              <Label htmlFor="state-filter" className="text-sm font-medium whitespace-nowrap cursor-pointer">
                {showStateOnly ? `${stateName} Jobs` : 'All Jobs'}
              </Label>
              <Switch
                id="state-filter"
                checked={showStateOnly}
                onCheckedChange={setShowStateOnly}
              />
            </div>
          </div>
        </div>


        {/* Jobs Table/Cards */}
        <Card className="jobs-results-section">
          <CardContent className="p-0">
            {jobsLoading ? (
              <div className="p-3 sm:p-4 space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-3 w-[60%]" />
                      <Skeleton className="h-3 w-[40%]" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="p-6 text-center">
                <div className="flex flex-col items-center gap-3">
                  <Building className="h-12 w-12 text-muted-foreground" />
                  <p className="text-lg font-medium text-muted-foreground">
                    No jobs found in {stateName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or check back later for new opportunities
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="md:hidden">
                  <div className="divide-y divide-border">
                    {/* State-specific jobs */}
                    {stateSpecificJobs.map((job) => (
                      <div key={job.job_id} className="p-4 hover:bg-muted/50 transition-all duration-200">
                        <Link to={`/job/${job.page_link || job.job_id}`}>
                          <h3 className="font-bold text-foreground text-base leading-tight hover:text-primary transition-colors mb-3">
                            {job.exam_or_post_name}
                          </h3>
                        </Link>
                        
                        <div className="space-y-2.5 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4 flex-shrink-0" />
                            <span className="font-medium">Posted: {formatDate(job.post_date, job.updated_at)}</span>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <Building className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                            <div>
                              <div className="text-xs text-muted-foreground/80 mb-0.5">Recruitment Board</div>
                              <span className="text-foreground font-medium">
                                {job.recruitment_board || "Not Specified"}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <GraduationCap className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                            <div>
                              <div className="text-xs text-muted-foreground/80 mb-0.5">Qualification</div>
                              <span className="text-foreground font-medium">
                                {formatQualification(job.qualification || "Not Specified")}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                            <div>
                              <div className="text-xs text-muted-foreground/80 mb-0.5">Location</div>
                              <span className="text-foreground font-medium">
                                {job.Is_All_India ? "All India" : (job.state || "All India")}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-3 mt-3 border-t border-border/50">
                            <div>
                              <div className="text-xs text-muted-foreground/80 mb-1">Last Date</div>
                              <div className={`font-bold text-sm ${getDateColor(job.last_date)}`}>
                                {job.last_date ? formatDate(job.last_date) : "Open"}
                              </div>
                            </div>
                            
                            <Link to={`/job/${job.page_link || job.job_id}`}>
                              <Button variant="default" size="sm" className="shadow-sm">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    
                    {/* All India jobs */}
                    {!showStateOnly && allIndiaJobs.map((job) => (
                      <div key={job.job_id} className="p-4 hover:bg-muted/50 transition-all duration-200">
                        <Link to={`/job/${job.page_link || job.job_id}`}>
                          <h3 className="font-bold text-foreground text-base leading-tight hover:text-primary transition-colors mb-3">
                            {job.exam_or_post_name}
                          </h3>
                        </Link>
                        
                        <div className="space-y-2.5 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4 flex-shrink-0" />
                            <span className="font-medium">Posted: {formatDate(job.post_date, job.updated_at)}</span>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <Building className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                            <div>
                              <div className="text-xs text-muted-foreground/80 mb-0.5">Recruitment Board</div>
                              <span className="text-foreground font-medium">
                                {job.recruitment_board || "Not Specified"}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <GraduationCap className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                            <div>
                              <div className="text-xs text-muted-foreground/80 mb-0.5">Qualification</div>
                              <span className="text-foreground font-medium">
                                {formatQualification(job.qualification || "Not Specified")}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                            <div>
                              <div className="text-xs text-muted-foreground/80 mb-0.5">Location</div>
                              <span className="text-foreground font-medium">
                                {job.Is_All_India ? "All India" : (job.state || "All India")}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-3 mt-3 border-t border-border/50">
                            <div>
                              <div className="text-xs text-muted-foreground/80 mb-1">Last Date</div>
                              <div className={`font-bold text-sm ${getDateColor(job.last_date)}`}>
                                {job.last_date ? formatDate(job.last_date) : "Open"}
                              </div>
                            </div>
                            
                            <Link to={`/job/${job.page_link || job.job_id}`}>
                              <Button variant="default" size="sm" className="shadow-sm">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <Table className="table-fixed w-full">
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="text-left px-4 py-4 text-sm font-semibold w-[40%]">Job Title & Organization</TableHead>
                        <TableHead className="text-center px-2 py-4 text-sm font-semibold w-[12%]">Recruitment Board</TableHead>
                        <TableHead className="text-center px-2 py-4 text-sm font-semibold w-[12%]">Qualification</TableHead>
                        <TableHead className="text-center px-2 py-4 text-sm font-semibold w-[12%]">Location</TableHead>
                        <TableHead className="text-center px-2 py-4 text-sm font-semibold w-[12%]">Last Date</TableHead>
                        <TableHead className="text-center px-2 py-4 text-sm font-semibold w-[12%]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* State-specific jobs */}
                      {stateSpecificJobs.map((job) => (
                        <TableRow key={job.job_id} className="hover:bg-muted/30 transition-colors">
                          <TableCell className="py-4 px-4 w-[40%]">
                            <div className="space-y-2">
                              <Link to={`/job/${job.page_link || job.job_id}`}>
                                <h3 className="font-semibold text-foreground text-sm leading-tight hover:text-primary transition-colors cursor-pointer break-words">
                                  {job.exam_or_post_name}
                                </h3>
                              </Link>
                              <div className="flex items-center text-xs text-muted-foreground flex-wrap">
                                <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                                <span className="break-words">Posted: {formatDate(job.post_date, job.updated_at)}</span>
                                {job.advt_no && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <span className="break-words">Advt No.{job.advt_no}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-4 px-2 text-center align-middle w-[12%]">
                            <span className="text-sm text-foreground font-medium break-words line-clamp-2">
                              {job.recruitment_board || "Not Specified"}
                            </span>
                          </TableCell>
                          <TableCell className="py-4 px-2 text-center align-middle w-[12%]">
                            <span className="text-sm text-foreground font-medium whitespace-pre-line break-words line-clamp-3">
                              {formatQualification(job.qualification || "Not Specified")}
                            </span>
                          </TableCell>
                          <TableCell className="py-4 px-2 text-center align-middle w-[12%]">
                            <div className="flex items-center justify-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              <span className="text-sm text-foreground font-medium break-words">
                                {job.Is_All_India ? "All India" : (job.state || "All India")}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="py-4 px-2 text-center align-middle w-[12%]">
                            <div className={`font-bold text-sm ${getDateColor(job.last_date)} break-words`}>
                              {job.last_date ? formatDate(job.last_date) : "Open"}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Apply Before
                            </div>
                          </TableCell>
                          <TableCell className="py-4 px-2 text-center align-middle w-[12%]">
                            <Link to={`/job/${job.page_link || job.job_id}`}>
                              <Button variant="default" size="sm" className="shadow-sm whitespace-nowrap">
                                Details
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                      
                      
                      {/* All India jobs */}
                      {!showStateOnly && allIndiaJobs.map((job) => (
                        <TableRow key={job.job_id} className="hover:bg-muted/30 transition-colors">
                          <TableCell className="py-4 px-4 w-[40%]">
                            <div className="space-y-2">
                              <Link to={`/job/${job.page_link || job.job_id}`}>
                                <h3 className="font-semibold text-foreground text-sm leading-tight hover:text-primary transition-colors cursor-pointer break-words">
                                  {job.exam_or_post_name}
                                </h3>
                              </Link>
                              <div className="flex items-center text-xs text-muted-foreground flex-wrap">
                                <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                                <span className="break-words">Posted: {formatDate(job.post_date, job.updated_at)}</span>
                                {job.advt_no && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <span className="break-words">Advt No.{job.advt_no}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-4 px-2 text-center align-middle w-[12%]">
                            <span className="text-sm text-foreground font-medium break-words line-clamp-2">
                              {job.recruitment_board || "Not Specified"}
                            </span>
                          </TableCell>
                          <TableCell className="py-4 px-2 text-center align-middle w-[12%]">
                            <span className="text-sm text-foreground font-medium whitespace-pre-line break-words line-clamp-3">
                              {formatQualification(job.qualification || "Not Specified")}
                            </span>
                          </TableCell>
                          <TableCell className="py-4 px-2 text-center align-middle w-[12%]">
                            <div className="flex items-center justify-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              <span className="text-sm text-foreground font-medium break-words">
                                {job.Is_All_India ? "All India" : (job.state || "All India")}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="py-4 px-2 text-center align-middle w-[12%]">
                            <div className={`font-bold text-sm ${getDateColor(job.last_date)} break-words`}>
                              {job.last_date ? formatDate(job.last_date) : "Open"}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Apply Before
                            </div>
                          </TableCell>
                          <TableCell className="py-4 px-2 text-center align-middle w-[12%]">
                            <Link to={`/job/${job.page_link || job.job_id}`}>
                              <Button variant="default" size="sm" className="shadow-sm whitespace-nowrap">
                                Details
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
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