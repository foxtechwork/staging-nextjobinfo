import { useState } from "react";
import { Search, Menu, Bell, ChevronDown, X, Home } from "lucide-react";
import logo from "@/assets/nextjobinfo-logo-dark.webp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import SubscribeDialog from "@/components/SubscribeDialog";

const jobCategories = [
  {
    title: "Government Jobs",
    items: ["Central Government", "State Government", "Public Sector", "Defense"]
  },
  {
    title: "Banking & Finance",
    items: ["SBI", "IBPS", "RBI", "Insurance", "Cooperative Banks"]
  },
  {
    title: "Railways",
    items: ["Railway Recruitment Board", "RRBI", "Railway Police", "Metro Rail"]
  },
  {
    title: "Engineering",
    items: ["Civil Engineering", "Mechanical", "Electrical", "Computer Science"]
  },
  {
    title: "Teaching",
    items: ["School Teacher", "College Professor", "DSSSB", "KVS", "NVS"]
  },
  {
    title: "SSC/UPSC",
    items: ["SSC CGL", "SSC CHSL", "UPSC Civil Services", "SSC MTS"]
  }
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  return (
    <>
      {/* Top Bar - Scrollable on mobile and desktop */}
      <div className="bg-gradient-primary shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between text-primary-foreground text-sm sm:text-base">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1.5 sm:gap-3">
                <span className="text-lg sm:text-2xl">📧</span>
                <span className="font-medium text-xs sm:text-sm md:text-base hidden xs:inline">Get job alerts</span>
                <span className="font-medium text-xs sm:text-sm md:text-base xs:hidden">Alerts</span>
              </div>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => setSubscribeOpen(true)}
                className="bg-white/20 hover:bg-white/30 text-white border-0 font-medium px-3 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm transition-all duration-200 hover:scale-105"
              >
                Subscribe
              </Button>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-3">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
              <span className="font-medium text-xs sm:text-sm hidden sm:inline">Live Updates</span>
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header & Navigation - Fixed on desktop */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo/Brand */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 -ml-2">
              <img 
                src={logo} 
                alt="Next Job Info - Latest Government Job Notifications" 
                className="h-11 sm:h-14 w-auto object-contain"
                width="193"
                height="77"
                loading="eager"
                decoding="async"
                srcSet={`${logo} 1x`}
                sizes="(max-width: 640px) 193px, 193px"
              />
            </Link>

            {/* Desktop Navigation Menu */}
            <div className="hidden md:flex flex-1 justify-center">
              <NavigationMenu>
                <NavigationMenuList className="flex-wrap justify-center gap-1">
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-inter font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {jobCategories.map((category) => (
                <NavigationMenuItem key={category.title}>
                  <NavigationMenuTrigger className="h-10 font-inter">
                    {category.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {category.items.map((item) => (
                        <NavigationMenuLink key={item} asChild>
                          <Link
                            to={item === "State Government" ? "/state-selection" : `/category/${item.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Latest vacancies and notifications
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-10 font-inter">
                  Exam Alerts
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4">
                    <NavigationMenuLink asChild>
                      <Link to="/admit-cards" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                        <div className="text-sm font-medium">Admit Cards</div>
                        <p className="text-sm leading-snug text-muted-foreground">
                          Download latest admit cards
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/results" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                        <div className="text-sm font-medium">Results</div>
                        <p className="text-sm leading-snug text-muted-foreground">
                          Check exam results and cutoffs
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/syllabus" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                        <div className="text-sm font-medium">Syllabus</div>
                        <p className="text-sm leading-snug text-muted-foreground">
                          Exam syllabus and patterns
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/answer-keys" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                        <div className="text-sm font-medium">Answer Keys</div>
                        <p className="text-sm leading-snug text-muted-foreground">
                          Official answer keys
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Mobile Menu Toggle */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden flex-shrink-0">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[320px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start mb-2">
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </Button>
                  </Link>
                  <Accordion type="single" collapsible className="w-full">
                    {jobCategories.map((category, idx) => (
                      <AccordionItem key={category.title} value={`item-${idx}`}>
                        <AccordionTrigger className="text-sm font-medium hover:no-underline">
                          {category.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-1 pl-4">
                            {category.items.map((item) => (
                              <Link
                                key={item}
                                to={item === "State Government" ? "/state-selection" : `/category/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {item}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                    <AccordionItem value="exam-alerts">
                      <AccordionTrigger className="text-sm font-medium hover:no-underline">
                        Exam Alerts
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-1 pl-4">
                          <Link to="/admit-cards" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm text-muted-foreground hover:text-foreground">
                            Admit Cards
                          </Link>
                          <Link to="/results" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm text-muted-foreground hover:text-foreground">
                            Results
                          </Link>
                          <Link to="/syllabus" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm text-muted-foreground hover:text-foreground">
                            Syllabus
                          </Link>
                          <Link to="/answer-keys" onClick={() => setMobileMenuOpen(false)} className="py-2 text-sm text-muted-foreground hover:text-foreground">
                            Answer Keys
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      <SubscribeDialog open={subscribeOpen} onOpenChange={setSubscribeOpen} />
    </>
  );
}