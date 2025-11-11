import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { Search, Briefcase, Users, Clock, TrendingUp, Calendar, MapPin, Building, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { useJobs, useJobsStats, useJobSearch } from "@/hooks/useJobs";
import { usePagination } from "@/hooks/usePagination";
import { PaginationControls } from "@/components/ui/pagination-controls";

const jobCategories = [
  "All India Govt Jobs",
  "State Govt Jobs", 
  "Bank Jobs",
  "Teaching Jobs",
  "Engineering Jobs",
  "Railway Jobs",
  "Police/Defence Jobs"
];

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All India Govt Jobs");
  const [selectedState, setSelectedState] = useState<string | undefined>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { data: stats, isLoading: statsLoading } = useJobsStats();
  
  // Scroll to top instantly when navigating to home page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);
  
  // Initialize from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const stateParam = searchParams.get('state');
    
    if (categoryParam && jobCategories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
    if (stateParam) {
      setSelectedState(stateParam);
    }
  }, [searchParams]);
  
  // Handle State Govt Jobs category differently - use activeSearchQuery instead of searchQuery
  const { data: filteredJobs = [], isLoading: jobsLoading, error: jobsError } = useJobSearch(
    activeSearchQuery, 
    selectedCategory === "State Govt Jobs" ? {} : {
      category: selectedCategory,
      state: selectedState
    }
  );

  // Implement pagination - Show only 50 jobs per page (reduces DOM from 34,293 to ~2,000 elements!)
  const pagination = usePagination(filteredJobs, 50);

  // Reset pagination when filters change
  useEffect(() => {
    pagination.resetPage();
  }, [selectedCategory, activeSearchQuery]);

  const handleCategoryChange = (category: string) => {
    if (category === "State Govt Jobs") {
      navigate("/state-selection");
      return;
    }
    setSelectedCategory(category);
    // Reset search when changing categories
    setSearchQuery("");
    setActiveSearchQuery("");
    // Update URL params to reflect selected category
    setSearchParams({ category: category });
  };

  const statsData = [
    { icon: Briefcase, label: "Active Jobs", value: stats?.totalJobs?.toString() || "0", color: "text-primary" },
    { icon: Users, label: "Total Applications", value: stats?.totalApplications ? `${Math.floor(stats.totalApplications / 1000)}K+` : "0", color: "text-job-new" },
    { icon: Clock, label: "This Week", value: stats?.thisWeekJobs?.toString() || "0", color: "text-job-featured" },
    { icon: TrendingUp, label: "Success Rate", value: `${stats?.successRate || 0}%`, color: "text-job-urgent" }
  ];

  const formatDate = (dateString: string, fallbackDate?: string) => {
    // Use post_date if available, otherwise use updated_at
    const dateToUse = dateString || fallbackDate;
    
    if (!dateToUse) return "N/A";
    
    const date = new Date(dateToUse);
    
    // Check if date is valid and not the epoch date (1970)
    if (isNaN(date.getTime()) || date.getFullYear() < 2000) {
      return "N/A";
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-8 sm:py-12" role="banner">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 sm:mb-4 px-2">
            Find Your Dream Government Job
            </h1>
            <h2 className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90 px-2 font-heading font-medium">
              India's Leading Job Portal - Find Sarkari Naukri, Bank, Railway, SSC & UPSC Jobs
            </h2>
            
            {/* Enhanced Search */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6 max-w-3xl mx-auto">
              <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <div className="sm:col-span-2">
                  <Input
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setActiveSearchQuery(e.target.value);
                    }}
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
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 h-10 sm:h-11"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white h-10 sm:h-11">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobCategories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  className="bg-white text-primary hover:bg-white/90 h-10 sm:h-11"
                  type="button"
                  onClick={() => {
                    setActiveSearchQuery(searchQuery);
                    const resultsSection = document.querySelector('.jobs-results-section');
                    if (resultsSection) {
                      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setSearchQuery('');
                    }
                  }}
                >
                  <Search className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Main Content - Custom Layout with Specific Proportions */}
      <section className="py-3 sm:py-4 md:py-6" role="main" aria-label="Job listings">
        <h2 className="sr-only">All India Government Jobs</h2>
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
              {/* Job Category Selector */}
              <Card className="mb-3 sm:mb-4">
                <CardHeader className="pb-2 sm:pb-3 px-1 sm:px-2">
                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    <div className="text-center">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground">
                        Browse Jobs by Category
                      </h3>
                      <CardTitle className="sr-only">
                        {selectedCategory}
                      </CardTitle>
                    </div>
                    
                    {/* Category Layout */}
                    <div className="flex flex-col items-center gap-1.5">
                      {/* Main categories - Optimized grid for better width usage */}
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2 w-full">
                        {["All India Govt Jobs", "Police/Defence Jobs", "Bank Jobs", "Teaching Jobs", "Engineering Jobs", "Railway Jobs"].map((category) => (
                          <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleCategoryChange(category)}
                            className="text-xs sm:text-sm px-1.5 sm:px-2 md:px-3 py-2 font-medium transition-all duration-200 hover:scale-105 w-full whitespace-nowrap"
                          >
                            {category.replace(" Jobs", "").trim()}
                          </Button>
                        ))}
                      </div>
                      
                      {/* State Govt Jobs - Full width on mobile */}
                      <div className="flex justify-center pt-0.5 sm:pt-1 w-full">
                        <Button
                          variant={selectedCategory === "State Govt Jobs" ? "default" : "secondary"}
                          size="sm"
                          onClick={() => handleCategoryChange("State Govt Jobs")}
                          className="text-xs sm:text-sm px-4 sm:px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-700 hover:to-emerald-600 border-2 border-emerald-400/30 shadow-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-xl w-full sm:w-auto"
                        >
                          State Govt Jobs
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

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
                      <p className="text-muted-foreground">No jobs found matching your criteria.</p>
                    </div>
                  ) : (
              <>
                {/* Mobile Card View */}
                <div className="md:hidden">
                  <div className="divide-y divide-border">
                    {pagination.items.map((job) => (
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
                <div className="hidden md:block">
                  <Table className="table-fixed w-full">
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="text-left px-4 py-4 text-sm font-semibold">Job Title & Organization</TableHead>
                        <TableHead className="text-center px-2 py-4 text-sm font-semibold w-[12%]">Recruitment Board</TableHead>
                        <TableHead className="text-center px-2 py-4 text-sm font-semibold w-[12%]">Qualification</TableHead>
                        <TableHead className="text-center px-2 py-4 text-sm font-semibold w-[12%]">Location</TableHead>
                        <TableHead className="text-center px-2 py-4 text-sm font-semibold w-[12%]">Last Date</TableHead>
                        <TableHead className="text-center px-2 py-4 text-sm font-semibold w-[12%]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pagination.items.map((job) => (
                        <TableRow key={job.job_id} className="hover:bg-muted/30 transition-colors">
                          <TableCell className="py-4 px-4 w-[40%]">
                            <div className="space-y-2">
                              <Link to={`/job/${job.page_link || job.job_id}`}>
                                <h3 className="font-semibold text-foreground text-sm leading-tight hover:text-primary transition-colors cursor-pointer break-words">
                                  {job.exam_or_post_name}
                                </h3>
                              </Link>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                                <Calendar className="h-4 w-4 flex-shrink-0" />
                                <span className="font-medium">Posted: {formatDate(job.post_date, job.updated_at)}</span>
                                {job.advt_no && (
                                  <span className="font-semibold text-primary ml-2 truncate">
                                    {job.advt_no}
                                  </span>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center py-4 px-2">
                            <span className="text-sm break-words">
                              {job.recruitment_board || "Not Specified"}
                            </span>
                          </TableCell>
                          <TableCell className="text-center py-4 px-2">
                            <span className="text-sm whitespace-pre-line break-words">
                              {formatQualification(job.qualification || "Not Specified")}
                            </span>
                          </TableCell>
                          <TableCell className="text-center py-4 px-2">
                            <div className="flex items-center justify-center gap-1">
                              <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              <span className="text-sm break-words">
                                {job.Is_All_India ? "All India" : (job.state || "All India")}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center py-4 px-2">
                            <div>
                              <div className={`font-bold text-sm ${getDateColor(job.last_date)}`}>
                                {job.last_date ? formatDate(job.last_date) : "Open"}
                              </div>
                              <div className="text-xs text-muted-foreground">Apply Before</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center py-4 px-2">
                            <Link to={`/job/${job.page_link || job.job_id}`}>
                              <Button variant="outline" size="sm">
                                Details
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination Controls */}
                <div className="px-4 pb-4">
                  <PaginationControls
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={pagination.goToPage}
                    totalItems={pagination.totalItems}
                    startIndex={pagination.startIndex}
                    endIndex={pagination.endIndex}
                  />
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
      </section>
    </div>
  );
}