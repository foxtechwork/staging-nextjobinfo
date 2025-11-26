import { Calendar, MapPin, Users, ExternalLink, Clock, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface JobCardProps {
  id: string;
  pageLink?: string;
  title: string;
  organization: string;
  location: string;
  totalPosts: number;
  lastDate: string;
  postedDate: string;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isUrgent?: boolean;
  salary?: string;
}

export default function JobCard({
  id,
  pageLink,
  title,
  organization,
  location,
  totalPosts,
  lastDate,
  postedDate,
  category,
  isNew = false,
  isFeatured = false,
  isUrgent = false,
  salary
}: JobCardProps) {
  const jobUrl = pageLink ? `/job/${pageLink}` : `/job/${id}`;
  return (
    <Card className={`group transition-all duration-300 hover:shadow-hover ${isFeatured ? 'shadow-featured border-primary/20' : 'shadow-card'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {isNew && (
                <Badge className="bg-job-new text-success-foreground" aria-label="New job posting">
                  NEW
                </Badge>
              )}
              {isFeatured && (
                <Badge className="bg-job-featured text-warning-foreground" aria-label="Featured job">
                  <Star className="h-3 w-3 mr-1" aria-hidden="true" />
                  FEATURED
                </Badge>
              )}
              {isUrgent && (
                <Badge variant="destructive" className="bg-job-urgent" aria-label="Urgent hiring">
                  URGENT
                </Badge>
              )}
              <Badge variant="outline" className="text-xs" aria-label={`Category: ${category}`}>
                {category}
              </Badge>
            </div>
            <Link to={jobUrl} aria-label={`View details for ${title} at ${organization}`}>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                {title}
              </h3>
            </Link>
            <p className="text-muted-foreground font-medium mt-1">
              {organization}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" aria-hidden="true" />
            <span>{totalPosts} Posts</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <span>Last Date: {lastDate}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" aria-hidden="true" />
            <span>Posted: {postedDate}</span>
          </div>
        </div>

        {salary && (
          <div className="mb-4">
            <div className="text-sm font-medium text-foreground" aria-label={`Salary: ${salary}`}>
              💰 Salary: {salary}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Link to={jobUrl} className="flex-1">
            <Button className="w-full" size="sm" aria-label={`View details for ${title}`}>
              View Details
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="shrink-0" aria-label="Apply externally">
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Apply</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}