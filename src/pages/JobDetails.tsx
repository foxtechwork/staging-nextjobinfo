import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, MapPin, Building, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useJobByPageLink, type Job, combineJobHtml } from '@/hooks/useJobs';
import { useRelatedJobs } from '@/hooks/useRelatedJobs';
import { Skeleton } from '@/components/ui/skeleton';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LeftSidebar from '@/components/layout/LeftSidebar';
import RightSidebar from '@/components/layout/RightSidebar';
import { Suspense, memo, useEffect } from 'react';
import AdSenseAd from '@/components/ads/AdSenseAd';
import { AdWrapper } from '@/components/ads/AdWrapper';
import { ADS_CONFIG } from '@/config/ads';
import MiniJobCard from '@/components/job/MiniJobCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

// Memoized components for performance
const LoadingSkeleton = memo(() => (
  <div className="space-y-4">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <Skeleton className="h-4 w-4/6" />
  </div>
));

const JobDetailsContent = memo(({ htmlContent }: { htmlContent: string }) => (
  <div 
    className="job-details-raw-content"
    dangerouslySetInnerHTML={{ __html: htmlContent }}
  />
));

export default function JobDetails() {
  const { pageLink } = useParams<{ pageLink: string }>();
  const location = useLocation();
  const { data: currentJob, isLoading: jobLoading, error: jobError } = useJobByPageLink(pageLink!) as { data: Job | undefined; isLoading: boolean; error: any };
  const { data: relatedJobs, isLoading: relatedLoading } = useRelatedJobs(currentJob, 3);

  // Scroll to top instantly when navigating to this page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  if (jobLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-background py-8">
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
                <Skeleton className="h-10 w-32 mb-6" />
                <Card>
                  <CardHeader>
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-6 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-4 w-4/6" />
                    </div>
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
    );
  }

  if (jobError || !currentJob) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-background py-8">
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
                <Link to="/">
                  <Button variant="outline" className="mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Jobs
                  </Button>
                </Link>
                <Card>
                  <CardContent className="p-8 text-center">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Job Not Found</h2>
                    <p className="text-muted-foreground">The job you're looking for doesn't exist or has been removed.</p>
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
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Generate dynamic meta tags for SEO with comprehensive keyword strategy
  const generateMetaTags = () => {
    if (!currentJob) return null;

    const currentYear = new Date().getFullYear();
    const recruitmentBoard = currentJob.recruitment_board || 'Government';
    const state = currentJob.state || 'All India';
    const totalVacancies = currentJob.total_posts || 'Multiple';
    const qualification = currentJob.qualification || 'Various';
    const jobCategory = (Array.isArray(currentJob.job_area_tags) && currentJob.job_area_tags.length > 0) 
      ? currentJob.job_area_tags[0] 
      : 'Government';
    const lastDate = currentJob.last_date ? formatDate(currentJob.last_date) : 'Check Official Notice';

    // Comprehensive SEO Keywords following the specified format
    const comprehensiveKeywords = [
      // Primary recruitment keywords
      `${recruitmentBoard} recruitment ${currentYear}`,
      `${recruitmentBoard} notification ${currentYear}`,
      `${recruitmentBoard} vacancy ${currentYear}`,
      `apply online ${recruitmentBoard}`,
      `${recruitmentBoard} jobs in ${state}`,
      `${recruitmentBoard} official notification`,
      
      // State-specific keywords
      `government jobs in ${state}`,
      `${state} vacancy update ${currentYear}`,
      `${qualification} govt jobs in ${state}`,
      `${jobCategory} recruitment ${currentYear}`,
      `latest govt jobs ${state}`,
      `sarkari job ${state} ${currentYear}`,
      `new recruitment in ${state}`,
      `apply online ${state} jobs`,
      `upcoming government jobs ${state}`,
      
      // Application and deadline keywords
      `${recruitmentBoard} last date to apply`,
      `online form ${recruitmentBoard}`,
      `${state} government job vacancy`,
      
      // Qualification-based keywords
      `freshers jobs ${state}`,
      `diploma govt jobs ${state}`,
      `12th pass jobs ${state} govt`,
      `degree govt jobs in ${state}`,
      `jobs for graduates ${state}`,
      `jobs for 10+2 pass ${state}`,
      
      // Category-specific keywords
      `railway jobs ${state} ${currentYear}`,
      `latest notification ${recruitmentBoard}`,
      `${state} govt notification`,
      `central govt jobs ${state}`,
      `RRB jobs ${state} ${currentYear}`,
      `IT jobs ${state} govt`,
      `technical jobs ${state}`,
      `non-technical jobs ${state}`,
      
      // General and popular search terms
      `sarkari naukri in ${state}`,
      `govt recruitment board ${currentYear}`,
      `job openings in ${state}`,
      `${currentJob.exam_or_post_name?.toLowerCase()}`,
      'government jobs',
      'sarkari naukri',
      'job vacancy',
      'recruitment',
      'apply online',
      
      // Education and job type tags
      ...(Array.isArray(currentJob.education_tags) ? currentJob.education_tags : []),
      ...(Array.isArray(currentJob.job_type_tags) ? currentJob.job_type_tags : []),
    ].filter(Boolean).join(', ');

    // Meta Title following exact format
    const title = `${recruitmentBoard} Recruitment ${currentYear} | ${state} Govt Jobs | ${totalVacancies} Posts – Apply Before ${lastDate} | nextjobinfo.com`;

    // Meta Description following exact narrative format
    const description = `Looking for the latest ${recruitmentBoard} Recruitment ${currentYear}? Explore complete details for ${state} candidates including total vacancies (${totalVacancies}), required qualifications (${qualification}), job category (${jobCategory}), selection process, and step-by-step application guide. Don't miss the last date to apply: ${lastDate}. Stay updated with verified, real-time government job notifications and apply online now with nextjobinfo.com`;

    const canonicalUrl = `https://nextjobinfo.com/job/${pageLink}`;
    const imageUrl = 'https://nextjobinfo.com/share-jobs-with-nextjobinfo.png';

    return (
      <Helmet>
        {/* Primary meta tags - will override index.html defaults */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={comprehensiveKeywords} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Next Job Info" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        
        {/* Additional SEO */}
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": currentJob.exam_or_post_name,
            "description": description,
            "hiringOrganization": {
              "@type": "Organization",
              "name": currentJob.recruitment_board
            },
            "jobLocation": {
              "@type": "Place",
              "addressLocality": currentJob.state || "India"
            },
            "datePosted": currentJob.post_date,
            "validThrough": currentJob.last_date,
            "employmentType": "FULL_TIME",
            "url": canonicalUrl,
            "publisher": {
              "@type": "Organization",
              "name": "Next Job Info",
              "url": "https://nextjobinfo.com"
            }
          })}
        </script>
        {/* Inject SSG data for client hydration without DB calls */}
        <script
          // We intentionally write to window here so HydrateData can read it on the client
          dangerouslySetInnerHTML={{
            __html: `window.__SSG_DATA__ = Object.assign({}, window.__SSG_DATA__ || {}, { currentJob: ${JSON.stringify(
              currentJob
            )} });`,
          }}
        />
      </Helmet>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {generateMetaTags()}
      <Header />
      <main className="flex-1 bg-background py-4 md:py-8">
        <div className="w-full">
          <div className="flex">
            {/* Left Margin - 2% */}
            <div className="hidden xl:block w-[2%] flex-shrink-0"></div>
            
            {/* Left Sidebar - 17% */}
            <div className="hidden lg:block w-[17%] flex-shrink-0 px-2">
              <LeftSidebar />
            </div>

            {/* Middle Content - 62% */}
            <div className="w-full lg:w-[62%] flex-shrink-0 px-2 sm:px-3">
              {/* Back Button */}
              <Link to="/">
                <Button variant="outline" className="mb-4 md:mb-6 animate-fade-in mobile-padding">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Jobs
                </Button>
              </Link>

              {/* Ad Placeholder - Top */}
              <div className="mb-4 md:mb-6 animate-fade-in">
                <AdWrapper>
                  <AdSenseAd
                    client={ADS_CONFIG.ADSENSE_CLIENT_ID}
                    slot={ADS_CONFIG.AD_SLOTS.JOB_HEADER}
                    format="auto"
                    style={{ display: 'block', minHeight: '90px' }}
                    responsive={true}
                  />
                </AdWrapper>
              </div>

              {/* Job Title Section - Clean Simple Design */}
              <div className="mb-6 animate-fade-in">
                <div className="text-center py-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-inter font-bold text-foreground leading-tight">
                    {currentJob.exam_or_post_name}
                  </h1>
                </div>
              </div>

              {/* Job Info Cards Grid - 3 cards per row, 2 rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 animate-fade-in max-w-[1200px] mx-auto">
                {/* First Row */}
                {currentJob.recruitment_board && (
                  <Card className="border-l-4 border-l-purple-600 hover:-translate-y-2 transition-all duration-200 shadow-md hover:shadow-xl bg-[#f8f9fa]">
                    <CardContent className="p-4 md:p-6 text-center">
                      <div className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Recruitment Board
                      </div>
                      <div className="text-lg md:text-xl font-bold text-foreground break-words">
                        {currentJob.recruitment_board}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {currentJob.state && (
                  <Card className="border-l-4 border-l-purple-600 hover:-translate-y-2 transition-all duration-200 shadow-md hover:shadow-xl bg-[#f8f9fa]">
                    <CardContent className="p-4 md:p-6 text-center">
                      <div className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        State
                      </div>
                      <div className="text-lg md:text-xl font-bold text-foreground">
                        {currentJob.state}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <Card className="border-l-4 border-l-purple-600 hover:-translate-y-2 transition-all duration-200 shadow-md hover:shadow-xl bg-[#f8f9fa]">
                  <CardContent className="p-4 md:p-6 text-center">
                    <div className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Total Vacancies
                    </div>
                    <div className="text-lg md:text-xl font-bold text-foreground">
                      {currentJob.total_posts || "Refer Official Notification"}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Second Row */}
                {currentJob.qualification && (
                  <Card className="border-l-4 border-l-purple-600 hover:-translate-y-2 transition-all duration-200 shadow-md hover:shadow-xl bg-[#f8f9fa]">
                    <CardContent className="p-4 md:p-6 text-center">
                      <div className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Qualification Required
                      </div>
                      {/* Mobile: Full text */}
                      <div className="text-lg md:text-xl font-bold text-foreground break-words md:hidden">
                        {currentJob.qualification}
                      </div>
                      {/* Desktop: Truncated to 100 chars if needed */}
                      <div className="hidden md:block text-lg md:text-xl font-bold text-foreground break-words">
                        {currentJob.qualification.length > 100 
                          ? `${currentJob.qualification.substring(0, 100)} and more...`
                          : currentJob.qualification
                        }
                      </div>
                    </CardContent>
                  </Card>
                )}

                {(Array.isArray(currentJob.job_area_tags) && currentJob.job_area_tags.length > 0) && (
                  <Card className="border-l-4 border-l-purple-600 hover:-translate-y-2 transition-all duration-200 shadow-md hover:shadow-xl bg-[#f8f9fa]">
                    <CardContent className="p-4 md:p-6 text-center">
                      <div className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Job Category
                      </div>
                      <div className="text-lg md:text-xl font-bold text-foreground break-words">
                        {String(currentJob.job_area_tags[0])}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {currentJob.last_date && (
                  <Card className="border-l-4 border-l-purple-600 hover:-translate-y-2 transition-all duration-200 shadow-md hover:shadow-xl bg-[#f8f9fa]">
                    <CardContent className="p-4 md:p-6 text-center">
                      <div className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Last Date to Apply
                      </div>
                      <div className="text-lg md:text-xl font-bold text-foreground">
                        {formatDate(currentJob.last_date)}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Job Details Content - Raw HTML Display */}
              {(currentJob.raw_html_1 || currentJob.raw_html_2 || currentJob.raw_html_3) && (
                <div className="mb-6 animate-fade-in job-details-raw-wrapper">
                  <Card className="md:shadow-card overflow-hidden border-0 md:border shadow-none">
                    <CardContent className="p-0">
                      <Suspense fallback={<LoadingSkeleton />}>
                        <JobDetailsContent htmlContent={combineJobHtml(currentJob)} />
                      </Suspense>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Job Tags Section */}
              {(currentJob.education_tags || currentJob.job_type_tags || currentJob.experience_level_tags || currentJob.post_position_tags || currentJob.job_posting_deadline_tags) && (
                <div className="mb-6 animate-fade-in">
                  <Card className="border-l-4 border-l-primary shadow-sm">
                    <CardContent className="p-4 md:p-6">
                      <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Job Categories & Tags
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {[
                          ...(Array.isArray(currentJob.education_tags) ? currentJob.education_tags : []),
                          ...(Array.isArray(currentJob.job_type_tags) ? currentJob.job_type_tags : []),
                          ...(Array.isArray(currentJob.experience_level_tags) ? currentJob.experience_level_tags : []),
                          ...(Array.isArray(currentJob.post_position_tags) ? currentJob.post_position_tags : []),
                          ...(Array.isArray(currentJob.job_posting_deadline_tags) ? currentJob.job_posting_deadline_tags : [])
                        ].map((tag: any, index: number) => (
                          <Badge 
                            key={index} 
                            variant="secondary"
                            className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors px-3 py-1.5 text-sm break-all whitespace-normal max-w-full"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Related Jobs Section - Compact Carousel */}
              {relatedJobs && relatedJobs.length > 0 && (
                <div className="mb-6 animate-fade-in">
                  <h2 className="text-lg md:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Building className="h-5 w-5 text-accent" />
                    Related Jobs {currentJob.Is_All_India ? '(All India)' : currentJob.state ? `(${currentJob.state})` : ''}
                  </h2>
                  
                  <Carousel
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    plugins={
                      typeof window !== 'undefined' && window.innerWidth < 768
                        ? [
                            Autoplay({
                              delay: 3000,
                              stopOnInteraction: true,
                              stopOnMouseEnter: true,
                            }),
                          ]
                        : []
                    }
                    className="w-full"
                  >
                    <CarouselContent className="-ml-2 md:-ml-3">
                      {relatedJobs.map((job) => (
                        <CarouselItem key={job.job_id} className="pl-2 md:pl-3 basis-full sm:basis-1/2 lg:basis-1/3">
                          <MiniJobCard
                            pageLink={job.page_link || ''}
                            title={job.exam_or_post_name}
                            organization={job.recruitment_board}
                            lastDate={job.last_date ? formatDate(job.last_date) : 'Check Notification'}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center animate-fade-in mb-4 md:mb-6">
                <Button variant="outline" className="hover-scale px-8" asChild>
                  <Link to="/">
                    View More Jobs
                  </Link>
                </Button>
              </div>

              {/* Bottom Ad Placeholder */}
              <div className="animate-fade-in">
                <AdWrapper>
                  <AdSenseAd
                    client={ADS_CONFIG.ADSENSE_CLIENT_ID}
                    slot={ADS_CONFIG.AD_SLOTS.JOB_FOOTER}
                    format="auto"
                    style={{ display: 'block', minHeight: '90px' }}
                    responsive={true}
                  />
                </AdWrapper>
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
  );
}