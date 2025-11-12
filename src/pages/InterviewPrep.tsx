import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle, Users, Clock, Star, BookOpen, Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const InterviewPrep = () => {
  const prepTips = [
    {
      title: "Research the Organization",
      description: "Study the department's history, mission, recent initiatives, and organizational structure before your interview.",
      icon: <BookOpen className="h-6 w-6 text-primary" />
    },
    {
      title: "Practice Common Questions",
      description: "Prepare answers for standard government interview questions about your motivation, experience, and future goals.",
      icon: <Users className="h-6 w-6 text-primary" />
    },
    {
      title: "Know Current Affairs",
      description: "Stay updated with current events, government policies, and developments relevant to your field.",
      icon: <Star className="h-6 w-6 text-primary" />
    },
    {
      title: "Dress Professionally",
      description: "Choose formal, conservative attire that reflects professionalism and respect for the interview process.",
      icon: <CheckCircle className="h-6 w-6 text-primary" />
    }
  ];

  const commonQuestions = [
    "Why do you want to work in government service?",
    "How do your skills align with this position?",
    "Describe a challenging situation you faced and how you resolved it.",
    "What are your career goals in the public sector?",
    "How would you handle pressure and deadlines?",
    "What do you know about current government initiatives?",
    "How would you contribute to public service?",
    "Describe your leadership style."
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Government Job Interview Preparation Guide | Next Job Info</title>
        <meta 
          name="description" 
          content="Expert interview preparation tips for government jobs. Learn how to succeed in PSU, banking, railway, and civil service interviews with our comprehensive guide." 
        />
        <meta 
          name="keywords" 
          content="government job interview tips, PSU interview preparation, banking interview guide, railway interview tips, civil service interview" 
        />
        <link rel="canonical" href={`${window.location.origin}/interview-prep`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Government Job Interview Preparation Guide",
            "description": "Expert interview preparation tips for government jobs",
            "author": {
              "@type": "Organization",
              "name": "Next Job Info"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Next Job Info"
            },
            "datePublished": new Date().toISOString(),
            "mainEntityOfPage": `${window.location.origin}/interview-prep`
          })}
        </script>
      </Helmet>

      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Interview Preparation Guide</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Master your government job interview with our comprehensive preparation guide. 
              Build confidence and succeed in PSU, banking, railway, and civil service interviews.
            </p>
            <Badge variant="secondary" className="mt-4">
              <Video className="h-4 w-4 mr-2" />
              Interactive Preparation Tools
            </Badge>
          </header>

          {/* Preparation Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-center mb-8">Essential Preparation Tips</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {prepTips.map((tip, index) => (
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

          {/* Common Questions */}
          <section className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Common Interview Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {commonQuestions.map((question, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                      <Badge variant="outline" className="mt-0.5">{index + 1}</Badge>
                      <p className="text-sm">{question}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Interview Timeline */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-center mb-8">Interview Day Timeline</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <Clock className="h-8 w-8 text-primary mx-auto" />
                  <CardTitle className="text-lg">1 Week Before</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Final preparation, mock interviews, document verification</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <Clock className="h-8 w-8 text-secondary mx-auto" />
                  <CardTitle className="text-lg">Day Before</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Review notes, prepare documents, get adequate rest</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <Clock className="h-8 w-8 text-tertiary mx-auto" />
                  <CardTitle className="text-lg">Interview Day</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Arrive early, stay calm, be confident and professional</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <Clock className="h-8 w-8 text-quaternary mx-auto" />
                  <CardTitle className="text-lg">After Interview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Send thank you note, await results, prepare for next steps</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Success Tips */}
          <section className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Keys to Interview Success</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Star className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Confidence</h3>
                <p className="text-sm text-muted-foreground">Believe in yourself and showcase your abilities with confidence</p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-secondary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Authenticity</h3>
                <p className="text-sm text-muted-foreground">Be genuine and honest in your responses and interactions</p>
              </div>
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-tertiary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Preparation</h3>
                <p className="text-sm text-muted-foreground">Thorough preparation is the foundation of interview success</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InterviewPrep;