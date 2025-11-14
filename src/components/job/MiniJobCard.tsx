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
      <CardContent className="p-3 space-y-2">
        {/* Job Title */}
        <h3 className="font-semibold text-sm line-clamp-2 text-foreground min-h-[2.5rem]">
          {title}
        </h3>
        
        {/* Organization */}
        <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
          <Building2 className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
          <span className="line-clamp-1">{organization}</span>
        </div>
        
        {/* Last Date */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
          <span>{lastDate}</span>
        </div>
        
        {/* View Details Button */}
        <Link to={`/job/${pageLink}`} className="block">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full h-7 text-xs gap-1 hover:bg-primary hover:text-primary-foreground"
          >
            View Details
            <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
