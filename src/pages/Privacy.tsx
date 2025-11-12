import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, Eye, Lock, Users } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last updated: January 1, 2024
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-card p-6 rounded-lg border mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Eye className="h-6 w-6 text-primary" />
                Information We Collect
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We collect information you provide directly to us, such as:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Personal information when you create an account (name, email, phone number)</li>
                  <li>Information when you contact us for support</li>
                  <li>Job preferences and search history to improve our recommendations</li>
                  <li>Device information and usage data to enhance our services</li>
                </ul>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Lock className="h-6 w-6 text-primary" />
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and maintain our job alert services</li>
                  <li>Send you relevant job notifications and updates</li>
                  <li>Improve our platform and user experience</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Comply with legal obligations and protect our rights</li>
                </ul>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                Information Sharing
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal requirements</li>
                  <li>To protect our rights and safety</li>
                  <li>With trusted service providers who assist in operating our platform</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3">Data Security</h3>
                <p className="text-muted-foreground text-sm">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3">Your Rights</h3>
                <p className="text-muted-foreground text-sm">
                  You have the right to access, update, or delete your personal information. 
                  You may also opt out of certain communications from us.
                </p>
              </div>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Cookies and Tracking</h3>
              <p className="text-muted-foreground mb-4">
                We use cookies and similar tracking technologies to enhance your browsing experience, 
                analyze site usage, and assist in our marketing efforts.
              </p>
              <p className="text-muted-foreground text-sm">
                You can control cookies through your browser settings. However, disabling cookies 
                may affect the functionality of our website.
              </p>
            </div>

            <div className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p>Email: privacy@nextjobinfo.com</p>
                <p>Phone: +91 9685745860</p>
                <p>Address: New Delhi, India</p>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              This policy may be updated periodically. We will notify you of any significant changes.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;