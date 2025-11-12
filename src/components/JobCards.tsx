import { Link } from 'react-router-dom';
import { Calendar, Building, GraduationCap, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JobCardsProps {
  jobs: any[];
  formatDate: (date: string, fallback?: string) => string;
  formatQualification: (text: string) => string;
  getDateColor: (date: string) => string;
}

export default function JobCards({ jobs, formatDate, formatQualification, getDateColor }: JobCardsProps) {
  return (
    <div className="divide-y divide-border">
      {jobs.map((job) => (
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
  );
}
