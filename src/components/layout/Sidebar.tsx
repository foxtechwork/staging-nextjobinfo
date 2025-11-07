import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, Clock, Star, MapPin } from "lucide-react";
import { useJobSearch } from "@/hooks/useJobs";

const jobCategories = [
  { title: "Government Jobs", category: "All India Govt Jobs" },
  { title: "Banking Jobs", category: "Bank Jobs" },
  { title: "Railway Jobs", category: "Railway Jobs" },
  { title: "Teaching Jobs", category: "Teaching Jobs" },
  { title: "Engineering Jobs", category: "Engineering Jobs" },
  { title: "Police/Defence Jobs", category: "Police/Defence Jobs" },
];

const states = [
  "All India", "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", 
  "Gujarat", "Rajasthan", "West Bengal", "Uttar Pradesh", "Bihar"
];

export default function Sidebar() {
  // Get recent hot jobs (latest 3 jobs with high post counts)
  const { data: hotJobs = [] } = useJobSearch("", {});
  const recentHotJobs = hotJobs
    .filter(job => job.total_posts && job.total_posts > 100)
    .sort((a, b) => new Date(b.post_date).getTime() - new Date(a.post_date).getTime())
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <aside className="w-full space-y-6">
      {/* Ad Placeholder */}
      <Card className="bg-gradient-card">
        <CardContent className="p-4">
          <div className="text-center">
            <div className="bg-muted rounded-lg p-8 mb-3">
              <p className="text-muted-foreground text-sm">Advertisement</p>
              <p className="text-xs text-muted-foreground mt-1">300x250</p>
            </div>
            <p className="text-xs text-muted-foreground">Google Ads Placement</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Popular Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {jobCategories.map((category) => {
            return (
              <Link key={category.title} to={`/?category=${encodeURIComponent(category.category)}`}>
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors group">
                  <span className="text-sm font-medium group-hover:text-primary">
                    {category.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </CardContent>
      </Card>

      {/* Recent Hot Jobs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-job-featured" />
            Hot Jobs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentHotJobs.length > 0 ? recentHotJobs.map((job, index) => (
            <Link key={index} to={`/job/${job.page_link || job.job_id}`}>
              <div className="border-l-2 border-primary pl-3 space-y-1 hover:bg-accent/50 p-2 rounded-r transition-colors">
                <h4 className="font-medium text-sm line-clamp-2 text-foreground">
                  {job.exam_or_post_name}
                </h4>
                <p className="text-xs text-muted-foreground">{job.recruitment_board}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-job-new font-medium">{job.total_posts}+ Posts</span>
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {job.last_date ? formatDate(job.last_date) : 'Open'}
                  </span>
                </div>
              </div>
            </Link>
          )) : (
            <div className="text-center text-sm text-muted-foreground py-4">
              No hot jobs available
            </div>
          )}
        </CardContent>
      </Card>

      {/* State-wise Jobs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            State-wise Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {states.map((state) => {
              return (
                <Link key={state} to={`/?state=${encodeURIComponent(state)}`}>
                  <Button variant="outline" size="sm" className="w-full text-xs h-8">
                    {state}
                  </Button>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Another Ad Placeholder */}
      <Card className="bg-gradient-card">
        <CardContent className="p-4">
          <div className="text-center">
            <div className="bg-muted rounded-lg p-6 mb-3">
              <p className="text-muted-foreground text-sm">Advertisement</p>
              <p className="text-xs text-muted-foreground mt-1">300x200</p>
            </div>
            <p className="text-xs text-muted-foreground">Sidebar Ad Space</p>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}