import { Star, TrendingUp, MapPin, Megaphone, Flame, Users, ChevronRight, Crown, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useJobSearch, useJobsStats } from "@/hooks/useJobs";
import AdSenseAd from "@/components/ads/AdSenseAd";
import { AdWrapper } from "@/components/ads/AdWrapper";
import { ADS_CONFIG } from "@/config/ads";

export default function RightSidebar() {
  const navigate = useNavigate();
  const { data: stats } = useJobsStats();
  
  // Get data for each category
  const { data: bankJobs = [] } = useJobSearch("", { category: "Bank Jobs" });
  const { data: railwayJobs = [] } = useJobSearch("", { category: "Railway Jobs" });
  const { data: teachingJobs = [] } = useJobSearch("", { category: "Teaching Jobs" });
  const { data: policeJobs = [] } = useJobSearch("", { category: "Police/Defence Jobs" });
  const { data: engineeringJobs = [] } = useJobSearch("", { category: "Engineering Jobs" });
  const { data: allJobs = [] } = useJobSearch("", {});

  const popularCategories = [
    { name: "Banking", category: "Bank Jobs", count: bankJobs.length, color: "bg-primary", trend: "+12%" },
    { name: "Railway", category: "Railway Jobs", count: railwayJobs.length, color: "bg-job-new", trend: "+8%" },
    { name: "Teaching", category: "Teaching Jobs", count: teachingJobs.length, color: "bg-warning", trend: "+15%" },
    { name: "Police", category: "Police/Defence Jobs", count: policeJobs.length, color: "bg-destructive", trend: "+5%" },
    { name: "Engineering", category: "Engineering Jobs", count: engineeringJobs.length, color: "bg-success", trend: "+22%" }
  ];

  // Get recent hot jobs (jobs with less than 30 days left)
  const hotJobs = allJobs
    .filter(job => {
      if (!job.last_date) return false;
      const diffDays = Math.ceil((new Date(job.last_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return diffDays > 0 && diffDays <= 30; // Only show jobs with 30 days or less
    })
    .sort(() => Math.random() - 0.5) // Randomize
    .slice(0, 4)
    .map(job => ({
      title: job.exam_or_post_name,
      posts: job.total_posts?.toString() || "0",
      deadline: job.last_date ? formatDateDifference(job.last_date) : "Open",
      urgency: getUrgency(job.last_date),
      recruitment_board: job.recruitment_board,
      icon: getCategoryIcon(job.exam_or_post_name),
      job_id: job.job_id,
      page_link: job.page_link
    }));

  // State-wise jobs from database stats
  const stateWiseJobs = Object.entries(stats?.stateWiseJobs || {})
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 5)
    .map(([state, count], index) => ({
      state,
      count: count.toString(),
      growth: `+${Math.floor(Math.random() * 20 + 5)}%`, // Simulated growth
      rank: index + 1
    }));

  const handleCategoryClick = (category: string) => {
    // Navigate to homepage with category filter
    navigate(`/?category=${encodeURIComponent(category)}`);
  };

  const handleStateClick = (state: string) => {
    // Navigate to state-specific jobs page
    const stateCode = getStateCode(state);
    if (stateCode) {
      navigate(`/state-jobs/${stateCode.toLowerCase()}`);
    }
  };

  function formatDateDifference(dateString: string) {
    const lastDate = new Date(dateString);
    const today = new Date();
    const diffTime = lastDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return "";
    return `${diffDays}D left`;
  }

  function getUrgency(dateString: string) {
    if (!dateString) return "medium";
    const diffDays = Math.ceil((new Date(dateString).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 5) return "high";
    if (diffDays <= 10) return "medium";
    return "low";
  }

  function getCategoryIcon(jobTitle: string) {
    const title = jobTitle.toLowerCase();
    if (title.includes('bank') || title.includes('sbi') || title.includes('ibps')) return "🏦";
    if (title.includes('railway') || title.includes('train') || title.includes('metro')) return "🚂";
    if (title.includes('police') || title.includes('constable') || title.includes('defence')) return "👮‍♂️";
    if (title.includes('teacher') || title.includes('professor') || title.includes('education')) return "👩‍🏫";
    if (title.includes('engineer') || title.includes('technical')) return "⚙️";
    if (title.includes('upsc') || title.includes('ias') || title.includes('ips')) return "🎯";
    return "🏢";
  }

  function getStateCode(stateName: string): string | null {
    const stateCodeMap: Record<string, string> = {
      "Maharashtra": "MH", "Karnataka": "KA", "Tamil Nadu": "TN", "Gujarat": "GJ",
      "Uttar Pradesh": "UP", "West Bengal": "WB", "Rajasthan": "RJ", "Bihar": "BR",
      "Andhra Pradesh": "AP", "Telangana": "TG", "Kerala": "KL", "Odisha": "OR",
      "Haryana": "HR", "Punjab": "PB", "Madhya Pradesh": "MP", "Assam": "AS",
      "Jharkhand": "JH", "Chhattisgarh": "CG", "Himachal Pradesh": "HP",
      "Uttarakhand": "UK", "Goa": "GA", "Delhi": "DL", "All India": null
    };
    return stateCodeMap[stateName] || null;
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "destructive";
      case "medium": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-4">
      {/* Popular Categories */}
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-background to-primary/5">
        <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-primary/5">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-primary/20">
              <Crown className="h-4 w-4 text-primary" />
            </div>
            Popular Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1.5 p-3">
          {popularCategories.map((category, index) => (
            <div 
              key={category.name} 
              onClick={() => handleCategoryClick(category.category)}
              className="flex items-center justify-between p-2 rounded-md hover:bg-muted/30 transition-all duration-300 hover:shadow-sm cursor-pointer group border border-transparent hover:border-primary/20"
            >
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${category.color} group-hover:scale-125 transition-transform`}></div>
                <span className="text-xs font-medium group-hover:text-primary transition-colors">{category.name}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Hot Jobs */}
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-background to-destructive/5">
        <CardHeader className="pb-3 bg-gradient-to-r from-destructive/10 to-destructive/5">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-destructive/20">
              <Flame className="h-4 w-4 text-destructive" />
            </div>
            Hot Jobs
            
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-3">
          {hotJobs.length > 0 ? hotJobs.map((job, index) => (
            <Link key={`${job.job_id}-${index}`} to={`/job/${job.page_link || job.job_id}`}>
              <div className="relative p-3 pb-8 rounded-lg bg-gradient-to-br from-background via-muted/10 to-muted/20 border border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-md cursor-pointer group overflow-hidden">
                <div className="flex items-start gap-2">
                  <div className="text-lg flex-shrink-0">{job.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2 leading-tight mb-1" title={job.title}>
                      {job.title}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Users className="h-3 w-3 flex-shrink-0" />
                      <span className="font-medium">{job.posts.replace(/<br\s*\/?>/gi, ' ')} Posts</span>
                      {index === 0 && <span className="ml-1">🔥</span>}
                    </div>
                    {job.recruitment_board && (
                      <div className="text-xs text-muted-foreground line-clamp-1 mb-1">
                        {job.recruitment_board}
                      </div>
                    )}
                  </div>
                </div>
                {/* Deadline badge at bottom */}
                {job.deadline && (
                  <div className="absolute bottom-2 right-2">
                    <Badge 
                      variant={getUrgencyColor(job.urgency)} 
                      className="text-xs font-bold px-2 py-0.5 shadow-sm"
                    >
                      {job.deadline}
                    </Badge>
                  </div>
                )}
              </div>
            </Link>
          )) : (
            <div className="text-center text-xs text-muted-foreground py-4">
              No hot jobs available
            </div>
          )}
        </CardContent>
      </Card>

      {/* State-wise Jobs */}
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-background to-success/5">
        <CardHeader className="pb-3 bg-gradient-to-r from-success/10 to-success/5">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-success/20">
              <Target className="h-4 w-4 text-success" />
            </div>
            State-wise Jobs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1.5 p-3">
          {stateWiseJobs.length > 0 ? stateWiseJobs.map((state, index) => (
            <div 
              key={state.state} 
              onClick={() => handleStateClick(state.state)}
              className="flex items-center justify-between p-2 rounded-md hover:bg-muted/30 transition-all duration-300 cursor-pointer group border border-transparent hover:border-success/20"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center text-xs font-bold text-success">
                  {state.rank}
                </div>
                <MapPin className="h-2.5 w-2.5 text-muted-foreground" />
                <span className="text-xs font-medium group-hover:text-success transition-colors">{state.state}</span>
              </div>
            </div>
          )) : (
            <div className="text-center text-xs text-muted-foreground py-4">
              No state data available
            </div>
          )}
          <Link to="/state-selection">
            <Button variant="ghost" size="sm" className="w-full mt-2 text-xs hover:bg-success/10 hover:text-success">
              View All States →
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Advertisement */}
      <div className="overflow-hidden">
        <AdWrapper>
          <AdSenseAd
            client={ADS_CONFIG.ADSENSE_CLIENT_ID}
            slot={ADS_CONFIG.AD_SLOTS.RIGHT_SIDEBAR}
            format="auto"
            style={{ display: 'block', minHeight: '250px' }}
            responsive={true}
          />
        </AdWrapper>
      </div>
    </div>
  );
}