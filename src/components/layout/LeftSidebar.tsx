import { Megaphone, Bell, Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { useNews } from "@/hooks/useNews";
import { ExternalLink } from "lucide-react";
import AdSenseAd from "@/components/ads/AdSenseAd";
import { AdWrapper } from "@/components/ads/AdWrapper";
import { ADS_CONFIG } from "@/config/ads";

export default function LeftSidebar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { data: news, isLoading } = useNews();

  // Set date on client side to avoid SSG static date issue
  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  const getUpdateStyle = (type: string) => {
    switch (type) {
      case "urgent": return "border-l-4 border-destructive bg-destructive/5";
      case "new": return "border-l-4 border-primary bg-primary/5";
      case "warning": return "border-l-4 border-warning bg-warning/5";
      case "success": return "border-l-4 border-success bg-success/5";
      default: return "border-l-4 border-muted";
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "urgent": return "destructive";
      case "new": return "default";
      case "warning": return "secondary";
      case "success": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-4">
      {/* Latest Updates */}
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-background to-muted/30">
        <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-primary/5">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-primary/20">
              <Bell className="h-4 w-4 text-primary" />
            </div>
            Latest Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-3">
          {news && news.length > 0 ? (
            news.map((item) => (
              <div
                key={item.id}
                className={`p-2 rounded-md transition-all duration-300 hover:shadow-sm hover:scale-[1.01] cursor-pointer group ${getUpdateStyle(item.type)}`}
                onClick={() => item.source_link && window.open(item.source_link, '_blank')}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-xs text-foreground group-hover:text-primary transition-colors truncate flex items-center gap-1">
                      {item.title}
                      {item.source_link && (
                        <ExternalLink className="h-3 w-3 opacity-50" />
                      )}
                    </h4>
                    <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{item.time_updated}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {item.short_description}
                  </p>
                </div>
              </div>
            ))
          ) : !isLoading ? (
            <p className="text-xs text-muted-foreground text-center py-4">No updates available</p>
          ) : null}
          <Button variant="ghost" size="sm" className="w-full mt-2 text-xs hover:bg-primary/10">
            View All Updates
          </Button>
        </CardContent>
      </Card>

      {/* Calendar Section */}
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-background to-muted/30">
        <CardHeader className="pb-3 bg-gradient-to-r from-secondary/10 to-secondary/5">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-secondary/20">
              <CalendarIcon className="h-4 w-4 text-secondary-foreground" />
            </div>
            Calendar
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="w-full [&>*]:w-full [&_.rdp-table]:w-full [&_.rdp-month]:w-full"
            classNames={{
              months: "flex w-full",
              month: "w-full",
              table: "w-full border-collapse",
              head_row: "flex w-full",
              head_cell: "text-muted-foreground rounded-md flex-1 font-normal text-[0.7rem] text-center",
              row: "flex w-full mt-1",
              cell: "flex-1 text-center text-xs p-0 relative focus-within:relative focus-within:z-20",
              day: "h-7 w-full p-0 font-normal aria-selected:opacity-100 text-xs",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
            }}
          />
        </CardContent>
      </Card>

      {/* Advertisement */}
      <div className="overflow-hidden">
        <AdWrapper>
          <AdSenseAd
            client={ADS_CONFIG.ADSENSE_CLIENT_ID}
            slot={ADS_CONFIG.AD_SLOTS.LEFT_SIDEBAR}
            format="auto"
            style={{ display: 'block', minHeight: '250px' }}
            responsive={true}
          />
        </AdWrapper>
      </div>
    </div>
  );
}