import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  Eye, 
  Lock, 
  Database, 
  Globe, 
  Mail, 
  Phone, 
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  Users,
  Settings,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  const lastUpdated = "January 15, 2024";

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Database,
      content: [
        {
          subtitle: "Personal Information",
          details: [
            "Name, email address, and phone number when you create an account",
            "Professional information including resume, work experience, and skills",
            "Profile pictures and other uploaded content",
            "Communication preferences and settings"
          ]
        },
        {
          subtitle: "Usage Information",
          details: [
            "Pages visited, time spent on our platform, and click patterns",
            "Job searches, applications, and browsing history",
            "Device information including IP address, browser type, and operating system",
            "Location data (with your permission) for location-based job recommendations"
          ]
        }
      ]
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        {
          subtitle: "Service Provision",
          details: [
            "Matching you with relevant job opportunities in Ethiopia",
            "Providing personalized cultural and historical content",
            "Facilitating communication between job seekers and employers",
            "Improving our platform functionality and user experience"
          ]
        },
        {
          subtitle: "Communication",
          details: [
            "Sending job alerts and platform updates",
            "Notifying you about application status changes",
            "Sharing relevant cultural events and news",
            "Providing customer support and technical assistance"
          ]
        }
      ]
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: Users,
      content: [
        {
          subtitle: "With Employers",
          details: [
            "Your profile information when you apply for jobs",
            "Resume and application materials submitted",
            "Contact information to facilitate hiring process",
            "Professional qualifications and work history"
          ]
        },
        {
          subtitle: "Service Providers",
          details: [
            "Third-party services for email delivery and analytics",
            "Cloud hosting providers for data storage and processing",
            "Payment processors for premium services (if applicable)",
            "Customer support tools and communication platforms"
          ]
        }
      ]
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      content: [
        {
          subtitle: "Security Measures",
          details: [
            "Industry-standard encryption for data transmission and storage",
            "Regular security audits and vulnerability assessments",
            "Access controls and authentication mechanisms",
            "Secure backup and disaster recovery procedures"
          ]
        },
        {
          subtitle: "Data Retention",
          details: [
            "Personal data retained as long as your account is active",
            "Job application data kept for 2 years after application",
            "Analytics data aggregated and anonymized after 1 year",
            "Legal compliance data retained as required by Ethiopian law"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-semibold">PRIVACY & SECURITY</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Your privacy and data security are our top priorities at Dreams Wide
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                Last Updated: {lastUpdated}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2">
                <Globe className="h-3 w-3" />
                Applies to All Users
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3" />
                GDPR Compliant
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Overview */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Dreams Wide ("we," "our," or "us") is committed to protecting your privacy and ensuring 
                the security of your personal information. This Privacy Policy explains how we collect, 
                use, share, and protect your information when you use our platform to find job opportunities, 
                explore Ethiopian culture, and access historical content.
              </p>
              
              <div className="mt-6 p-4 bg-ethiopian-green-50 border border-ethiopian-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-ethiopian-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-ethiopian-green-800 mb-2">
                      Our Commitment to Ethiopian Data Protection
                    </h4>
                    <p className="text-sm text-ethiopian-green-700">
                      We comply with Ethiopian data protection laws and international best practices 
                      to ensure your information is handled with the highest level of care and security.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card key={section.id} id={section.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Icon className="h-6 w-6 text-ethiopian-green-500" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {section.content.map((subsection, subIndex) => (
                        <div key={subIndex}>
                          <h4 className="font-semibold text-lg mb-3 text-foreground">
                            {subsection.subtitle}
                          </h4>
                          <ul className="space-y-2">
                            {subsection.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start gap-3">
                                <CheckCircle className="h-4 w-4 text-ethiopian-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{detail}</span>
                              </li>
                            ))}
                          </ul>
                          {subIndex < section.content.length - 1 && (
                            <Separator className="mt-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Your Rights */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Your Rights and Choices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Data Control Rights</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Access and download your personal data</li>
                    <li>• Correct inaccurate or incomplete information</li>
                    <li>• Delete your account and associated data</li>
                    <li>• Restrict or object to certain data processing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Communication Preferences</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Opt out of marketing communications</li>
                    <li>• Customize job alert frequency</li>
                    <li>• Choose notification methods</li>
                    <li>• Update contact preferences</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Our Privacy Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">For Privacy Questions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-ethiopian-green-500" />
                      <span className="text-sm">privacy@dreamswide.et</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-ethiopian-green-500" />
                      <span className="text-sm">+251-11-XXX-XXXX</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Response Time</h4>
                  <p className="text-sm text-muted-foreground">
                    We aim to respond to all privacy-related inquiries within 30 days. 
                    For urgent matters, please contact us by phone.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Policy Updates */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Policy Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices, 
                technology, legal requirements, or other factors. We will notify you of any material 
                changes by:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>• Posting the updated policy on our website</li>
                <li>• Sending an email notification to registered users</li>
                <li>• Displaying a prominent notice on our platform</li>
                <li>• Requiring acknowledgment for significant changes</li>
              </ul>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Download className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-blue-800 mb-1">Download This Policy</h5>
                    <p className="text-sm text-blue-700 mb-3">
                      Save a copy of our current Privacy Policy for your records.
                    </p>
                    <Button size="sm" variant="outline" className="text-blue-700 border-blue-300 hover:bg-blue-100">
                      <Download className="h-3 w-3 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-between">
            <Button asChild variant="outline">
              <Link to="/terms" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Terms of Service
              </Link>
            </Button>
            
            <Button asChild variant="outline">
              <Link to="/cookies" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Cookie Policy
              </Link>
            </Button>
            
            <Button asChild>
              <Link to="/" className="flex items-center gap-2">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
