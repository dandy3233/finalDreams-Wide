import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Scale, 
  FileText, 
  Users, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Globe,
  Gavel,
  UserCheck,
  Building,
  Eye,
  Lock,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
  const lastUpdated = "January 15, 2024";
  const effectiveDate = "January 15, 2024";

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: `By accessing or using Dreams Wide's platform, you agree to be bound by these Terms of Service 
      and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited 
      from using or accessing this site. Dreams Wide is a platform designed to connect Ethiopian job seekers 
      with employers while celebrating our rich cultural heritage.`
    },
    {
      id: "services",
      title: "Description of Services",
      icon: Building,
      content: `Dreams Wide provides an online platform that offers:`,
      list: [
        "Job vacancy listings from verified Ethiopian employers",
        "Cultural content showcasing Ethiopian traditions and heritage",
        "Historical information about Ethiopian landmarks and figures", 
        "News and announcements relevant to Ethiopian professionals",
        "User profiles for job seekers and employers",
        "Communication tools to facilitate hiring processes"
      ]
    },
    {
      id: "eligibility",
      title: "User Eligibility",
      icon: UserCheck,
      content: `To use Dreams Wide, you must:`,
      list: [
        "Be at least 18 years of age or have parental consent",
        "Provide accurate and truthful information",
        "Maintain the security and confidentiality of your account",
        "Comply with all applicable Ethiopian and international laws",
        "Have the legal capacity to enter into binding agreements"
      ]
    },
    {
      id: "user-responsibilities", 
      title: "User Responsibilities",
      icon: Users,
      content: `As a user of Dreams Wide, you agree to:`,
      list: [
        "Provide accurate, current, and complete information",
        "Maintain and update your profile information",
        "Use the platform only for lawful purposes",
        "Respect intellectual property rights",
        "Not post false, misleading, or discriminatory content",
        "Not engage in harassment or inappropriate behavior",
        "Not attempt to circumvent security measures",
        "Report any violations or suspicious activity"
      ]
    },
    {
      id: "employer-obligations",
      title: "Employer Obligations", 
      icon: Building,
      content: `Employers using Dreams Wide must:`,
      list: [
        "Post only legitimate job opportunities",
        "Provide accurate job descriptions and requirements",
        "Comply with Ethiopian labor laws and regulations",
        "Not discriminate based on protected characteristics",
        "Honor posted salary ranges and benefits",
        "Respond to qualified candidates in a timely manner",
        "Maintain confidentiality of applicant information"
      ]
    },
    {
      id: "prohibited-conduct",
      title: "Prohibited Conduct",
      icon: AlertTriangle,
      content: `The following activities are strictly prohibited:`,
      list: [
        "Creating fake profiles or misrepresenting identity",
        "Posting fraudulent job listings or scam opportunities",
        "Soliciting personal information for illegal purposes",
        "Distributing spam, malware, or harmful content",
        "Violating copyright, trademark, or other IP rights",
        "Engaging in discriminatory practices",
        "Attempting to hack or compromise platform security",
        "Using automated tools to scrape or harvest data"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 rounded-full px-4 py-2 mb-6">
              <Scale className="w-4 h-4" />
              <span className="text-sm font-semibold">LEGAL TERMS</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Legal terms and conditions governing your use of Dreams Wide
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                Effective: {effectiveDate}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2">
                <Globe className="h-3 w-3" />
                Ethiopian Law Applies
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2">
                <Gavel className="h-3 w-3" />
                Legally Binding
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Welcome to Dreams Wide, Ethiopia's premier platform for job opportunities, cultural content, 
                and historical information. These Terms of Service ("Terms") govern your use of our website, 
                mobile applications, and related services (collectively, the "Platform").
              </p>
              
              <div className="bg-ethiopian-green-50 border border-ethiopian-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-ethiopian-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-ethiopian-green-800 mb-2">
                      Our Mission
                    </h4>
                    <p className="text-sm text-ethiopian-green-700">
                      Dreams Wide is committed to empowering Ethiopian professionals while preserving 
                      and celebrating our rich cultural heritage. We strive to create a safe, 
                      respectful, and productive environment for all users.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card key={section.id} id={section.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Icon className="h-5 w-5 text-purple-500" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{section.content}</p>
                    {section.list && (
                      <ul className="space-y-2">
                        {section.list.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3">
                            <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Intellectual Property */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Intellectual Property Rights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Dreams Wide Content</h4>
                  <p className="text-sm text-muted-foreground">
                    All content, features, and functionality on Dreams Wide, including but not limited to 
                    text, graphics, logos, cultural information, and software, are owned by Dreams Wide 
                    or its licensors and are protected by Ethiopian and international copyright laws.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold mb-2">User-Generated Content</h4>
                  <p className="text-sm text-muted-foreground">
                    By posting content on Dreams Wide, you grant us a non-exclusive, royalty-free license 
                    to use, modify, and distribute your content for platform operations. You retain 
                    ownership of your original content.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy and Data Protection */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Privacy and Data Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Your privacy is important to us. Our collection and use of personal information is 
                governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
              
              <Button asChild variant="outline" className="mb-4">
                <Link to="/privacy">
                  <Shield className="h-4 w-4 mr-2" />
                  View Privacy Policy
                </Link>
              </Button>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800 mb-2">Key Privacy Highlights</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• We collect only necessary information for platform functionality</li>
                  <li>• Your data is stored securely and protected with encryption</li>
                  <li>• We comply with Ethiopian data protection regulations</li>
                  <li>• You can access, modify, or delete your personal data</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-amber-800 mb-2">Important Notice</h5>
                    <p className="text-sm text-amber-700">
                      Dreams Wide provides a platform to connect job seekers and employers. 
                      We do not guarantee job placements or employment outcomes.
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Dreams Wide shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages arising from your use of the platform. Our total liability shall 
                not exceed the amount paid by you, if any, for accessing our services.
              </p>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5" />
                Governing Law and Dispute Resolution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Applicable Law</h4>
                  <p className="text-sm text-muted-foreground">
                    These Terms shall be governed by and construed in accordance with the laws 
                    of the Federal Democratic Republic of Ethiopia.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Dispute Resolution</h4>
                  <p className="text-sm text-muted-foreground">
                    Any disputes arising from these Terms shall be resolved through mediation 
                    or arbitration in Addis Ababa, Ethiopia.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Questions About These Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Legal Department</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>📧 legal@dreamswide.et</p>
                    <p>📞 +251-11-XXX-XXXX</p>
                    <p>📍 Addis Ababa, Ethiopia</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Business Hours</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM EAT</p>
                    <p>Saturday: 9:00 AM - 1:00 PM EAT</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-between">
            <Button asChild variant="outline">
              <Link to="/privacy" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Privacy Policy
              </Link>
            </Button>
            
            <Button asChild variant="outline">
              <Link to="/cookies" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
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
