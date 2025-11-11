import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FileText, Download, CheckCircle, Star, User, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Resume = () => {
  const resumeTips = [
    {
      title: "Professional Summary",
      description: "Write a compelling 2-3 line summary highlighting your key qualifications and career objective.",
      icon: <User className="h-6 w-6 text-primary" />
    },
    {
      title: "Work Experience", 
      description: "List your work experience in reverse chronological order with quantifiable achievements.",
      icon: <Briefcase className="h-6 w-6 text-primary" />
    },
    {
      title: "Skills & Certifications",
      description: "Include relevant technical skills, certifications, and government exam qualifications.",
      icon: <Star className="h-6 w-6 text-primary" />
    },
    {
      title: "Education Details",
      description: "Mention your educational qualifications with grades/percentages and relevant coursework.",
      icon: <FileText className="h-6 w-6 text-primary" />
    }
  ];

  const resumeFormats = [
    {
      name: "Government Standard",
      description: "Traditional format preferred for most government positions",
      features: ["Chronological layout", "Detailed work history", "Education emphasis", "Clean formatting"]
    },
    {
      name: "PSU Executive", 
      description: "Professional format for PSU and executive positions",
      features: ["Skills highlight", "Leadership focus", "Project achievements", "Modern design"]
    },
    {
      name: "Banking Sector",
      description: "Specialized format for banking and financial services",
      features: ["Financial expertise", "Compliance knowledge", "Customer service", "Technical skills"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Government Job Resume Builder & Templates | Next Job Info</title>
        <meta 
          name="description" 
          content="Create professional resumes for government jobs with our free resume builder. Download government job resume templates for banking, PSU, railway, and civil services." 
        />
        <meta 
          name="keywords" 
          content="government job resume format, PSU resume template, banking resume format, civil service resume, government job CV format" 
        />
        <link rel="canonical" href={`${window.location.origin}/resume`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Resume Builder for Government Jobs",
            "description": "Create professional resumes for government jobs with templates and expert tips",
            "url": `${window.location.origin}/resume`,
            "provider": {
              "@type": "Organization", 
              "name": "Next Job Info"
            }
          })}
        </script>
      </Helmet>

      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Government Job Resume Builder</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Create professional resumes tailored for government positions. Choose from specialized templates 
              designed for banking, PSU, railway, and civil service applications.
            </p>
            <Badge variant="secondary" className="mt-4">
              <Download className="h-4 w-4 mr-2" />
              Free Templates Available
            </Badge>
          </header>

          {/* Resume Builder Action */}
          <section className="mb-12">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="pt-8 pb-8 text-center">
                <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Build Your Professional Resume</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Use our easy-to-use resume builder to create a professional resume in minutes. 
                  Optimized for government job applications with ATS-friendly formatting.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-primary">
                    <FileText className="h-5 w-5 mr-2" />
                    Start Building Resume
                  </Button>
                  <Button variant="outline" size="lg">
                    <Download className="h-5 w-5 mr-2" />
                    Download Templates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Resume Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-center mb-8">Resume Writing Tips</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {resumeTips.map((tip, index) => (
                <Card key={index} className="hover:shadow-hover transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {tip.icon}
                      <CardTitle className="text-xl">{tip.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Resume Formats */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-center mb-8">Resume Formats by Sector</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {resumeFormats.map((format, index) => (
                <Card key={index} className="hover:shadow-hover transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-center">{format.name}</CardTitle>
                    <p className="text-sm text-muted-foreground text-center">{format.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {format.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-4" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Do's and Don'ts */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-center mb-8">Resume Do's and Don'ts</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-success/30 bg-success/5">
                <CardHeader>
                  <CardTitle className="text-xl text-success flex items-center gap-2">
                    <CheckCircle className="h-6 w-6" />
                    Do's
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Use clear, professional formatting</li>
                    <li>• Include relevant keywords from job posting</li>
                    <li>• Quantify achievements with numbers</li>
                    <li>• Keep it to 1-2 pages maximum</li>
                    <li>• Use professional email address</li>
                    <li>• Proofread for grammar and spelling</li>
                    <li>• Include government exam scores</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-destructive/30 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="text-xl text-destructive flex items-center gap-2">
                    <FileText className="h-6 w-6" />
                    Don'ts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Don't use fancy fonts or colors</li>
                    <li>• Avoid personal photos (unless required)</li>
                    <li>• Don't include irrelevant work experience</li>
                    <li>• Avoid spelling or grammatical errors</li>
                    <li>• Don't lie or exaggerate achievements</li>
                    <li>• Avoid generic objective statements</li>
                    <li>• Don't use unprofessional email addresses</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-muted/30 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Ready to Create Your Resume?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Start building your professional government job resume today with our easy-to-use tools and templates.
            </p>
            <Button size="lg" className="bg-gradient-primary">
              <FileText className="h-5 w-5 mr-2" />
              Get Started Now
            </Button>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resume;