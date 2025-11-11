import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Have a question or need assistance? We're here to help! Reach out to us through any of the following channels.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-muted-foreground mb-2">Send us an email and we'll respond within 24 hours</p>
                    <p className="text-primary">contact@nextjobinfo.com</p>
                    <p className="text-sm text-muted-foreground">support@nextjobinfo.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Call Us</h3>
                    <p className="text-muted-foreground mb-2">Speak directly with our support team</p>
                    <p className="text-primary">+91 9685745860</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri: 9AM-6PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Visit Us</h3>
                    <p className="text-muted-foreground mb-2">Our office location</p>
                    <p className="text-primary">JobAlert Headquarters</p>
                    <p className="text-sm text-muted-foreground">
                      Connaught Place<br />
                      New Delhi - 110001<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-8 rounded-lg border">
              <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-first-name" className="text-sm font-medium mb-2 block">First Name</label>
                    <Input 
                      id="contact-first-name"
                      name="firstName"
                      placeholder="Enter your first name"
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-last-name" className="text-sm font-medium mb-2 block">Last Name</label>
                    <Input 
                      id="contact-last-name"
                      name="lastName"
                      placeholder="Enter your last name"
                      autoComplete="family-name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="contact-email" className="text-sm font-medium mb-2 block">Email Address</label>
                  <Input 
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </div>
                
                <div>
                  <label htmlFor="contact-subject" className="text-sm font-medium mb-2 block">Subject</label>
                  <Input 
                    id="contact-subject"
                    name="subject"
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div>
                  <label htmlFor="contact-message" className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea 
                    id="contact-message"
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button className="w-full" size="lg">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;