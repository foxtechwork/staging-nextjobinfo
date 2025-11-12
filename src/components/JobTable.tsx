import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface JobTableProps {
  jobs: any[];
  formatDate: (date: string, fallback?: string) => string;
  formatQualification: (text: string) => string;
  getDateColor: (date: string) => string;
}

export default function JobTable({ jobs, formatDate, formatQualification, getDateColor }: JobTableProps) {
  return (
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
        {jobs.map((job) => (
          <TableRow key={job.job_id} className="hover:bg-muted/30 transition-colors">
            <TableCell className="py-4 px-4 w-[40%]">
              <div className="space-y-2">
                <Link to={`/job/${job.page_link || job.job_id}`}>
                  <h3 className="font-semibold text-foreground text-sm leading-tight hover:text-primary transition-colors cursor-pointer break-words">
                    {job.exam_or_post_name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Posted: {formatDate(job.post_date, job.updated_at)}</span>
                </div>
              </div>
            </TableCell>
            <TableCell className="py-4 px-2 text-center w-[12%]">
              <p className="text-xs text-muted-foreground line-clamp-2 break-words">
                {job.recruitment_board || "Not Specified"}
              </p>
            </TableCell>
            <TableCell className="py-4 px-2 text-center w-[12%]">
              <p className="text-xs text-muted-foreground line-clamp-2 break-words">
                {formatQualification(job.qualification || "Not Specified")}
              </p>
            </TableCell>
            <TableCell className="py-4 px-2 text-center w-[12%]">
              <Badge variant="outline" className="text-xs whitespace-nowrap">
                {job.Is_All_India ? "All India" : (job.state || "All India")}
              </Badge>
            </TableCell>
            <TableCell className="py-4 px-2 text-center w-[12%]">
              <div className={`font-semibold text-xs whitespace-nowrap ${getDateColor(job.last_date)}`}>
                {job.last_date ? formatDate(job.last_date) : "Open"}
              </div>
            </TableCell>
            <TableCell className="py-4 px-2 text-center w-[12%]">
              <Link to={`/job/${job.page_link || job.job_id}`}>
                <Button variant="default" size="sm" className="text-xs px-3 py-1 h-8">
                  View Details
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
