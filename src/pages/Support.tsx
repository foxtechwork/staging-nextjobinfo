import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

const Support = () => {
  return (
    <>
      <Helmet>
        <title>Support Center - Get Help | Next Job Info</title>
        <meta 
          name="description" 
          content="Get support for government job applications, exam alerts, and career guidance. Contact Next Job Info support team via email, phone, or live chat." 
        />
        <meta 
          name="keywords" 
          content="job support, government job help, exam support, career guidance support, contact support" 
        />
        <link rel="canonical" href={`${window.location.origin}/support`} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-8">Support Center</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Support Channels */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Get Help</h2>
              
              <div className="bg-card p-6 rounded-lg border">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-medium">Email Support</h3>
                </div>
                <p className="text-muted-foreground mb-2">Get detailed help via email</p>
                <p className="text-sm">support@nextjobinfo.com</p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-medium">Phone Support</h3>
                </div>
                <p className="text-muted-foreground mb-2">Speak directly with our team</p>
                <p className="text-sm">+91 9685745860</p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-medium">Live Chat</h3>
                </div>
                <p className="text-muted-foreground mb-2">Instant help via live chat</p>
                <p className="text-sm">Available 9 AM - 6 PM IST</p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">How do I apply for jobs?</h4>
                  <p className="text-sm text-muted-foreground">Click on any job listing to view details and find the application link.</p>
                </div>

                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">How often are jobs updated?</h4>
                  <p className="text-sm text-muted-foreground">We update job listings daily to ensure you get the latest opportunities.</p>
                </div>

                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Can I get job alerts?</h4>
                  <p className="text-sm text-muted-foreground">Yes! Subscribe to our newsletter to receive regular job alerts in your inbox.</p>
                </div>

                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Is the service free?</h4>
                  <p className="text-sm text-muted-foreground">Yes, all job listings and alerts are completely free for job seekers.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Hours */}
          <div className="mt-12 bg-muted/50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">Support Hours</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Monday - Friday</p>
                <p className="text-muted-foreground">9:00 AM - 6:00 PM IST</p>
              </div>
              <div>
                <p className="font-medium">Saturday - Sunday</p>
                <p className="text-muted-foreground">10:00 AM - 4:00 PM IST</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
    </>
  );
};

export default Support;