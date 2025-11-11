import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">
              Last updated: January 1, 2024
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                Acceptance of Terms
              </h2>
              <p className="text-muted-foreground">
                By accessing and using JobAlert's services, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-primary" />
                Use License
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Permission is granted to temporarily use JobAlert's services for personal, non-commercial transitory viewing only. This includes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Browsing job listings and information</li>
                  <li>Receiving job alerts and notifications</li>
                  <li>Using our search and filter features</li>
                  <li>Accessing career guidance resources</li>
                </ul>
                <p className="font-medium">This license shall automatically terminate if you violate any of these restrictions.</p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <XCircle className="h-6 w-6 text-red-600" />
                Prohibited Uses
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You may not use our service:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3">User Accounts</h3>
                <p className="text-muted-foreground text-sm">
                  You are responsible for safeguarding your account information and for all activities 
                  that occur under your account. You must immediately notify us of any unauthorized use of your account.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3">Intellectual Property</h3>
                <p className="text-muted-foreground text-sm">
                  All content, trademarks, and data on this website are the property of JobAlert and are 
                  protected by copyright and intellectual property laws.
                </p>
              </div>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Disclaimer</h3>
              <p className="text-muted-foreground mb-4">
                The information on this website is provided on an "as is" basis. To the fullest extent 
                permitted by law, this company:
              </p>
              <ul className="text-muted-foreground text-sm list-disc list-inside space-y-1 ml-4">
                <li>Excludes all representations and warranties relating to this website and its contents</li>
                <li>Excludes all liability for damages arising out of or in connection with your use of this website</li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-3">Limitation of Liability</h3>
              <p className="text-muted-foreground">
                In no event shall JobAlert or its suppliers be liable for any damages (including, without limitation, 
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
                to use the materials on JobAlert's website, even if JobAlert or an authorized representative has been 
                notified orally or in writing of the possibility of such damage.
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Modifications</h3>
              <p className="text-muted-foreground mb-4">
                JobAlert may revise these terms of service at any time without notice. By using this website, 
                you are agreeing to be bound by the current version of these terms of service.
              </p>
              <p className="text-sm text-muted-foreground">
                For questions about these Terms of Service, contact us at legal@nextjobinfo.com
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;