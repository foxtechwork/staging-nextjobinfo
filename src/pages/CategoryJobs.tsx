import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Search, MapPin, Calendar, Building2, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { useJobSearch } from "@/hooks/useJobs";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import AdSenseAd from "@/components/ads/AdSenseAd";
import { AdWrapper } from "@/components/ads/AdWrapper";
import { ADS_CONFIG } from "@/config/ads";

const categoryMapping: { [key: string]: string } = {
  "central-government": "Central Government",
  "state-government": "State Government",
  "public-sector": "Public Sector",
  "defense": "Defense",
  "sbi": "SBI",
  "ibps": "IBPS",
  "rbi": "RBI",
  "insurance": "Insurance",
  "cooperative-banks": "Cooperative Banks",
  "railway-recruitment-board": "Railway Recruitment Board",
  "rrbi": "RRBI",
  "railway-police": "Railway Police",
  "metro-rail": "Metro Rail",
  "civil-engineering": "Civil Engineering",
  "mechanical": "Mechanical",
  "electrical": "Electrical",
  "computer-science": "Computer Science",
  "school-teacher": "School Teacher",
  "college-professor": "College Professor",
  "dsssb": "DSSSB",
  "kvs": "KVS",
  "nvs": "NVS",
  "ssc-cgl": "SSC CGL",
  "ssc-chsl": "SSC CHSL",
  "upsc-civil-services": "UPSC Civil Services",
  "ssc-mts": "SSC MTS",
};

export default function CategoryJobs() {
  const { category } = useParams<{ category: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const categoryName = categoryMapping[category || ""] || category?.replace(/-/g, " ") || "";
  
  // Scroll to top instantly when navigating to this page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);
  
  const { data: jobs, isLoading, error } = useJobSearch("", {});
  
  // Filter jobs based on the category tag
  const filteredJobs = jobs?.filter(job => {
    const searchMatch = searchQuery === "" || 
      job.exam_or_post_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.recruitment_board?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.qualification?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Enhanced filtering using job_area_tags and EmployerSectorTag with improved matching
    const safeArray = (val: any) => Array.isArray(val) ? val : [];
    
    // Normalize category name for matching (handle both spaces and underscores)
    const normalizedCategory = categoryName.toLowerCase().replace(/\s+/g, '_');
    const categoryWords = categoryName.toLowerCase().split(/[\s_]+/);
    
    // Helper function for flexible tag matching
    const matchesTag = (tag: any): boolean => {
      if (!tag) return false;
      const tagStr = tag.toString().toLowerCase();
      const normalizedTag = tagStr.replace(/\s+/g, '_');
      
      // Exact match (with normalization)
      if (normalizedTag === normalizedCategory) return true;
      
      // Check if all category words are in the tag
      if (categoryWords.every(word => tagStr.includes(word))) return true;
      
      // Check if tag is in category (for broader matches)
      if (normalizedCategory.includes(normalizedTag)) return true;
      
      return false;
    };
    
    // Priority 1: Check job_area_tags (highest priority for sub-menu matching)
    const jobAreaMatch = safeArray(job.job_area_tags).some(matchesTag);
    
    // Priority 2: Check EmployerSectorTag (for Government Jobs categories)
    const employerSectorMatch = safeArray(job.EmployerSectorTag).some(matchesTag);
    
    // Priority 3: Check post_position_tags (for job role specific categories)
    const postPositionMatch = safeArray(job.post_position_tags).some(matchesTag);
    
    // Priority 4: Check other relevant tags
    const otherTagsMatch = [
      ...safeArray(job.education_tags),
      ...safeArray(job.job_type_tags),
      ...safeArray(job.experience_level_tags),
      ...safeArray(job.job_posting_deadline_tags)
    ].some(matchesTag);
    
    // Priority 5: Check text fields (lowest priority to avoid false matches)
    const textMatch = job.exam_or_post_name?.toLowerCase().includes(categoryName.toLowerCase()) ||
                      job.recruitment_board?.toLowerCase().includes(categoryName.toLowerCase());
    
    // Match if found in any of the tag arrays or text fields
    const tagMatch = jobAreaMatch || employerSectorMatch || postPositionMatch || otherTagsMatch || textMatch;
    
    return searchMatch && tagMatch;
  }) || [];

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
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDateColor = (dateString: string) => {
    if (!dateString) return "text-success";
    const today = new Date();
    const lastDate = new Date(dateString);
    const daysDiff = Math.ceil((lastDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (daysDiff < 0) return "text-destructive";
    if (daysDiff <= 7) return "text-warning";
    if (daysDiff <= 30) return "text-orange-600";
    return "text-success";
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
        <title>{categoryName} Jobs 2025 - Latest Sarkari Naukri | NextJobInfo</title>
        <meta 
          name="description" 
          content={`Find latest ${categoryName} jobs 2025. Apply for ${categoryName.toLowerCase()} government vacancies, sarkari naukri notifications. ${filteredJobs.length}+ active jobs updated daily.`}
        />
        <meta 
          name="keywords" 
          content={`${categoryName.toLowerCase()} jobs 2025, ${categoryName.toLowerCase()} government jobs, ${categoryName.toLowerCase()} sarkari naukri, ${categoryName.toLowerCase()} vacancy, ${categoryName.toLowerCase()} recruitment 2025`}
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content="NextJobInfo" />
        <link rel="canonical" href={`${window.location.origin}/category/${category}`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/category/${category}`} />
        <meta property="og:title" content={`${categoryName} Jobs 2025 - Latest Sarkari Naukri`} />
        <meta property="og:description" content={`${filteredJobs.length}+ latest ${categoryName} government jobs`} />
        <meta property="og:image" content="https://nextjobinfo.com/share-jobs-with-nextjobinfo.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${categoryName} Jobs 2025`} />
        <meta name="twitter:image" content="https://nextjobinfo.com/share-jobs-with-nextjobinfo.webp" />
        
        {/* CollectionPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `${categoryName} Jobs 2025`,
            "description": `Latest ${categoryName} government job opportunities and recruitment notifications`,
            "url": `${window.location.origin}/category/${category}`,
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
                  "name": categoryName,
                  "item": `${window.location.origin}/category/${category}`
                }
              ]
            },
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": filteredJobs.length,
              "itemListElement": filteredJobs.slice(0, 10).map((job, index) => ({
                "@type": "JobPosting",
                "position": index + 1,
                "title": job.exam_or_post_name,
                "hiringOrganization": {
                  "@type": "Organization",
                  "name": job.recruitment_board
                },
                "jobLocation": {
                  "@type": "Place",
                  "address": {
                    "@type": "PostalAddress",
                    "addressRegion": job.state || "India",
                    "addressCountry": "IN"
                  }
                },
                "datePosted": job.post_date,
                "validThrough": job.last_date,
                "employmentType": "FULL_TIME"
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
              <div className="space-y-6">
              {/* Header Section */}
              <header className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 rounded-lg border">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-8 w-8 text-primary" aria-hidden="true" />
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground capitalize">
                    {categoryName} Jobs 2025
                  </h1>
                </div>
                <h2 className="text-base sm:text-lg text-muted-foreground mb-4">
                  Find {filteredJobs.length}+ latest {categoryName.toLowerCase()} government job opportunities | Updated Daily
                </h2>
                
                {/* Search and Stats */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="relative flex-1 max-w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none" aria-hidden="true" />
                    <Input
                      placeholder="Search jobs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const resultsSection = document.querySelector('.jobs-results-section');
                          if (resultsSection) {
                            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            setSearchQuery('');
                          }
                        }
                      }}
                      className="pl-10 w-full"
                      aria-label={`Search ${categoryName} jobs`}
                    />
                  </div>
                </div>
              </header>

              {/* Advertisement Space */}
              <div className="my-6">
                <AdWrapper>
                  <AdSenseAd
                    client={ADS_CONFIG.ADSENSE_CLIENT_ID}
                    slot={ADS_CONFIG.AD_SLOTS.CATEGORY_PAGE}
                    format="auto"
                    style={{ display: 'block', minHeight: '90px' }}
                    responsive={true}
                  />
                </AdWrapper>
              </div>

              {/* Jobs Table/Cards */}
              <section className="bg-card rounded-lg border shadow-sm jobs-results-section" aria-label={`${categoryName} job listings`}>
                <div className="p-3 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 text-foreground">
                    {categoryName} Job Listings
                  </h3>
                  
                  {isLoading ? (
                    <div className="space-y-3">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="flex items-center space-x-3">
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
                    <div className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <Building2 className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
                        <div>
                          <p className="text-lg font-medium text-muted-foreground">
                            No {categoryName} jobs found
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Try searching with different keywords or check back later for new opportunities.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Mobile Card View */}
                      <div className="md:hidden divide-y">
                        {filteredJobs.map((job) => (
                          <article key={job.job_id} className="py-3 hover:bg-muted/30 transition-colors">
                            <Link to={`/job/${job.page_link || job.job_id}`}>
                              <h4 className="font-semibold text-base text-foreground hover:text-primary transition-colors line-clamp-2 mb-2">
                                {job.exam_or_post_name}
                              </h4>
                            </Link>
                            
                            <div className="space-y-2 text-xs">
                              <div className="flex items-center gap-2 text-muted-foreground flex-wrap">
                                <Calendar className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                                <span className="font-medium">Posted: {formatDate(job.post_date, job.updated_at)}</span>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <span className="text-muted-foreground">Board:</span>
                                  <p className="font-medium line-clamp-1">{job.recruitment_board || "Not Specified"}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Qualification:</span>
                                  <p className="font-medium">{formatQualification(job.qualification || "Not Specified")}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                                  <span className="text-muted-foreground">{job.state === "All India" ? "All India" : job.state || "All India"}</span>
                                </div>
                                <div className={`font-bold ${getDateColor(job.last_date)}`}>
                                  {job.last_date ? formatDate(job.last_date) : "Open"}
                                </div>
                              </div>
                            </div>
                            
                            <Link to={`/job/${job.page_link || job.job_id}`}>
                              <Button variant="outline" size="sm" className="w-full mt-3 h-9">
                                View Details
                              </Button>
                            </Link>
                          </article>
                        ))}
                      </div>

                      {/* Desktop Table View */}
                      <div className="hidden md:block">
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
                            {filteredJobs.map((job) => (
                              <TableRow key={job.job_id} className="hover:bg-muted/30 transition-colors">
                                <TableCell className="py-4 px-4 w-[40%]">
                                  <div className="space-y-2">
                                    <Link to={`/job/${job.page_link || job.job_id}`}>
                                      <h4 className="font-semibold text-foreground text-sm leading-tight hover:text-primary transition-colors cursor-pointer break-words">
                                        {job.exam_or_post_name}
                                      </h4>
                                    </Link>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                                      <Calendar className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
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
                                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                                    <span className="text-sm break-words">
                                      {job.state === "All India" ? "All India" : job.state || "All India"}
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
                </div>
              </section>
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