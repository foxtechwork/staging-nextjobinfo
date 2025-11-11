import { Link } from "react-router-dom";
import { Facebook, Twitter, Youtube, Instagram, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/nextjobinfo-logo.webp";

const footerLinks = {
  "Quick Links": [
    { name: "Latest Jobs", href: "/" },
    { name: "Government Jobs", href: "/" },
    { name: "Banking Jobs", href: "/?category=Bank Jobs" },
    { name: "Railway Jobs", href: "/?category=Railway Jobs" },
    { name: "Teaching Jobs", href: "/?category=Teaching Jobs" },
    { name: "SSC Jobs", href: "/category/ssc" }
  ],
  "Exam Alerts": [
    { name: "Admit Cards", href: "/admit-cards" },
    { name: "Results", href: "/results" },
    { name: "Syllabus", href: "/syllabus" },
    { name: "Answer Keys", href: "/answer-keys" },
    { name: "Cut Off Marks", href: "/cutoff" },
    { name: "Merit List", href: "/merit-list" }
  ],
  "Resources": [
    { name: "Job Search Tips", href: "/tips" },
    { name: "Interview Preparation", href: "/interview-prep" },
    { name: "Resume Builder", href: "/resume" },
    { name: "Career Guidance", href: "/career" },
    { name: "Study Material", href: "/study-material" },
    { name: "Mock Tests", href: "/mock-tests" }
  ],
  "Support": [
    { name: "Contact Us", href: "/contact" },
    { name: "About Us", href: "/about" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Disclaimer", href: "/disclaimer" },
    { name: "Sitemap", href: "/sitemap" }
  ]
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 text-center sm:text-left">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-center sm:justify-start mb-4">
              <img 
                src={logo} 
                alt="Next Job Info - Latest Government Job Notifications" 
                className="h-14 w-auto object-contain"
                width="193"
                height="77"
                loading="lazy"
              />
            </div>
            <p className="text-background/80 text-sm mb-4">
              Your trusted source for government job notifications, exam alerts, and career opportunities across India.
            </p>
            <div className="flex justify-center sm:justify-start space-x-3">
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col items-center sm:items-start">
              <h4 className="font-semibold text-background mb-4">{category}</h4>
              <ul className="space-y-2 flex flex-col items-center sm:items-start">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href}
                      className="text-background/70 hover:text-background transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-background/20 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 text-sm text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-background/70">
              <Mail className="h-4 w-4 flex-shrink-0" />
              <span className="break-all">contact@nextjobinfo.com</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-background/70">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <span>+91 9685745860</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-background/70">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>New Delhi, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-background/20">
        <div className="container mx-auto px-3 sm:px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-background/70 gap-3 sm:gap-0">
            <p className="text-center md:text-left">© 2025 Next Job Info. All rights reserved.</p>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
              <Link to="/privacy" className="hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-background transition-colors">
                Terms of Service
              </Link>
              <Link to="/disclaimer" className="hover:text-background transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}