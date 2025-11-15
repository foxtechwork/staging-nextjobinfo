import { Link } from 'react-router-dom';
import { Calendar, Building2, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MiniJobCardProps {
  pageLink: string;
  title: string;
  lastDate: string;
  organization: string;
}

export default function MiniJobCard({ pageLink, title, lastDate, organization }: MiniJobCardProps) {
  return (
    <Card className="h-full border-border/50 hover:border-primary/50 transition-all duration-200 hover:shadow-md">
      <CardContent className="p-3 sm:p-4 space-y-2">
        {/* Job Title */}
        <h3 className="font-semibold text-sm sm:text-base line-clamp-2 text-foreground min-h-[2.5rem] sm:min-h-[3rem]">
          {title}
        </h3>
        
        {/* Organization */}
        <div className="flex items-start gap-1.5 text-xs sm:text-sm text-muted-foreground">
          <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <span className="line-clamp-1">{organization}</span>
        </div>
        
        {/* Last Date */}
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" aria-hidden="true" />
          <time dateTime={lastDate}>{lastDate}</time>
        </div>
        
        {/* View Details Button */}
        <Link to={`/job/${pageLink}`} className="block" aria-label={`View details for ${title}`}>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full h-8 sm:h-9 text-xs sm:text-sm gap-1 hover:bg-primary hover:text-primary-foreground min-h-[44px] sm:min-h-[36px]"
          >
            View Details
            <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
