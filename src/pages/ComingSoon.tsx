import { Helmet } from "react-helmet-async";
import { Clock, Bell, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ComingSoon() {
  return (
    <>
      <Helmet>
        <title>Coming Soon - Exam Alerts | NextJobInfo Government Jobs</title>
        <meta 
          name="description" 
          content="New features coming soon on NextJobInfo - Exam alerts, admit cards, results, answer keys, and real-time notifications. Stay tuned for comprehensive exam updates." 
        />
        <meta 
          name="keywords" 
          content="coming soon, exam alerts, admit cards, results, answer keys, exam notifications, NextJobInfo updates" 
        />
        <link rel="canonical" href={`${window.location.origin}/admit-cards`} />
        <meta name="robots" content="noindex, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/admit-cards`} />
        <meta property="og:title" content="Coming Soon - Exam Alerts | NextJobInfo Government Jobs" />
        <meta property="og:description" content="New features coming soon on NextJobInfo - Exam alerts, admit cards, results, answer keys, and real-time notifications. Stay tuned for comprehensive exam updates." />
        <meta property="og:image" content={`${window.location.origin}//share-jobs-with-nextjobinfo.webp`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="NextJobInfo" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`${window.location.origin}/admit-cards`} />
        <meta name="twitter:title" content="Coming Soon - Exam Alerts | NextJobInfo Government Jobs" />
        <meta name="twitter:description" content="New features coming soon on NextJobInfo - Exam alerts, admit cards, results, answer keys, and real-time notifications. Stay tuned for comprehensive exam updates." />
        <meta name="twitter:image" content={`${window.location.origin}//share-jobs-with-nextjobinfo.webp`} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-background to-muted">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* Icon */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-primary mb-6">
                <Clock className="h-12 w-12 text-white" />
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Exam Alerts
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-6">
              Coming Soon!
            </h2>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We're working hard to bring you the most comprehensive exam alerts, notifications, 
              and updates. Get ready for admit cards, results, answer keys, and much more!
            </p>

            {/* Features Preview */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="bg-card p-6 rounded-lg border">
                <Bell className="h-8 w-8 text-primary mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Instant Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Get real-time alerts for exam dates, admit cards, and results
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <Mail className="h-8 w-8 text-primary mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Email Alerts</h3>
                <p className="text-sm text-muted-foreground">
                  Never miss important exam updates with our email notification system
                </p>
              </div>
            </div>

            {/* Email Subscription */}
            <div className="bg-card p-8 rounded-xl border mb-8">
              <h3 className="text-xl font-semibold mb-4">Be the First to Know!</h3>
              <p className="text-muted-foreground mb-6">
                Subscribe to get notified when Exam Alerts goes live
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input 
                  id="coming-soon-email"
                  name="notifyEmail"
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1"
                  autoComplete="email"
                />
                <Button className="bg-gradient-primary hover:opacity-90 px-6">
                  Notify Me
                </Button>
              </div>
            </div>

            {/* Back Button */}
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.history.back()}
              className="px-8"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
    </>
  );
}