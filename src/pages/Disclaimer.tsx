import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AlertTriangle, Info, ExternalLink, Clock } from "lucide-react";

const Disclaimer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <AlertTriangle className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Disclaimer</h1>
            <p className="text-muted-foreground">
              Important information regarding the use of JobAlert services
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-6 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-yellow-800 dark:text-yellow-200">General Information</h2>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    JobAlert is an information aggregation platform that collects and displays job-related information 
                    from various sources. We strive to provide accurate and up-to-date information, but we cannot 
                    guarantee the completeness or accuracy of all content.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <ExternalLink className="h-6 w-6 text-primary" />
                Third-Party Content
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  JobAlert aggregates information from various government websites, recruitment boards, and other official sources. 
                  We are not responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Changes made by original sources after information is published on our platform</li>
                  <li>Errors in the original source material</li>
                  <li>Technical issues or downtime of external websites</li>
                  <li>Any discrepancies between our platform and official sources</li>
                </ul>
                <p className="font-medium text-yellow-600">
                  Always verify information with official sources before making important decisions.
                </p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Clock className="h-6 w-6 text-primary" />
                Information Accuracy
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>While we make every effort to ensure accuracy, please note:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Job information may change without notice</li>
                  <li>Application deadlines may be extended or modified by recruiting organizations</li>
                  <li>Eligibility criteria may be updated after publication</li>
                  <li>Exam dates and patterns may be subject to change</li>
                </ul>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    <strong>Recommendation:</strong> Always check the official website of the recruiting organization 
                    for the most current and authoritative information.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3">No Employment Guarantee</h3>
                <p className="text-muted-foreground text-sm">
                  JobAlert does not guarantee employment or selection in any position. We are an information 
                  service only and do not participate in the recruitment process.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3">No Application Processing</h3>
                <p className="text-muted-foreground text-sm">
                  We do not process job applications or accept application fees. All applications must be 
                  submitted directly to the recruiting organizations through their official channels.
                </p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>JobAlert shall not be held liable for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Any loss or damage arising from the use of information on our platform</li>
                  <li>Missed opportunities due to outdated or incorrect information</li>
                  <li>Technical issues that may prevent access to our services</li>
                  <li>Actions taken by third-party organizations or websites</li>
                  <li>Any financial losses or career implications</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-red-800 dark:text-red-200">Fraud Warning</h3>
              <div className="text-red-700 dark:text-red-300 space-y-2">
                <p>Be aware of fraudulent activities:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                  <li>Never pay money for job applications through unofficial channels</li>
                  <li>Verify all communications claiming to be from recruiting organizations</li>
                  <li>Report suspicious activities to the relevant authorities</li>
                  <li>JobAlert will never ask for personal financial information</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Updates to Disclaimer</h3>
              <p className="text-muted-foreground mb-4">
                This disclaimer may be updated periodically to reflect changes in our services or legal requirements. 
                Please review this page regularly.
              </p>
              <p className="text-sm text-muted-foreground">
                For questions about this disclaimer, contact us at legal@nextjobinfo.com
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Disclaimer;