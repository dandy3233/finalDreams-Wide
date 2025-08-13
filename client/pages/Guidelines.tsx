import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  Shield, 
  Users, 
  MessageCircle, 
  Flag, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Book,
  Globe,
  Award,
  Crown,
  Coffee,
  Star,
  Handshake,
  Eye,
  Lock,
  UserCheck,
  Ban,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Guidelines() {
  const coreValues = [
    {
      icon: Heart,
      title: "Respect & Kindness",
      description: "Treat all community members with dignity and respect, regardless of background, experience, or position."
    },
    {
      icon: Crown,
      title: "Ethiopian Pride",
      description: "Celebrate our Ethiopian heritage while maintaining professionalism and cultural sensitivity."
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Create a safe environment where everyone can pursue opportunities without fear or harassment."
    },
    {
      icon: Handshake,
      title: "Professional Integrity",
      description: "Maintain honesty and transparency in all professional interactions and job-related communications."
    }
  ];

  const allowedBehaviors = [
    "Posting authentic job opportunities with clear requirements",
    "Sharing professional experiences and career advice",
    "Celebrating Ethiopian culture, traditions, and achievements",
    "Networking respectfully with other professionals",
    "Providing constructive feedback and support",
    "Asking genuine questions about career development",
    "Sharing relevant cultural and historical content",
    "Engaging in meaningful professional discussions"
  ];

  const prohibitedBehaviors = [
    "Posting fake job opportunities or scam positions",
    "Harassment, discrimination, or hate speech of any kind",
    "Spam, irrelevant content, or excessive self-promotion",
    "Sharing false or misleading information",
    "Violating others' privacy or sharing personal information without consent",
    "Using inappropriate language or offensive content",
    "Impersonating other users, employers, or organizations",
    "Attempting to circumvent our verification systems"
  ];

  const reportingProcess = [
    {
      step: 1,
      title: "Identify the Issue",
      description: "Recognize content or behavior that violates our community guidelines",
      icon: Eye
    },
    {
      step: 2,
      title: "Use Report Feature",
      description: "Click the report button on the specific content or profile",
      icon: Flag
    },
    {
      step: 3,
      title: "Provide Details",
      description: "Describe the issue clearly and provide relevant context",
      icon: MessageCircle
    },
    {
      step: 4,
      title: "Review Process",
      description: "Our team reviews the report within 24 hours",
      icon: UserCheck
    }
  ];

  const consequences = [
    {
      level: "Warning",
      description: "First-time minor violations receive a warning and guidance",
      icon: AlertTriangle,
      color: "text-yellow-600 bg-yellow-100"
    },
    {
      level: "Content Removal",
      description: "Violating content is removed and user is notified",
      icon: XCircle,
      color: "text-orange-600 bg-orange-100"
    },
    {
      level: "Account Suspension",
      description: "Temporary suspension for repeated or serious violations",
      icon: Lock,
      color: "text-red-600 bg-red-100"
    },
    {
      level: "Permanent Ban",
      description: "Severe violations result in permanent account termination",
      icon: Ban,
      color: "text-gray-600 bg-gray-100"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-semibold">COMMUNITY GUIDELINES</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Building a Respectful Community
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Together, we create a safe, professional, and culturally-rich environment where 
              Ethiopian professionals can thrive and connect with opportunities.
            </p>

            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-8 h-2 bg-ethiopian-green-500 rounded"></div>
              <div className="w-8 h-2 bg-ethiopian-yellow-500 rounded"></div>
              <div className="w-8 h-2 bg-ethiopian-red-500 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Community Values
            </h2>
            <p className="text-lg text-muted-foreground">
              The foundation of respectful interaction on Dreams Wide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-ethiopian-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-ethiopian-green-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Acceptable vs Unacceptable Behavior */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Community Standards
              </h2>
              <p className="text-lg text-muted-foreground">
                Clear guidelines on what's encouraged and what's not allowed
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Encouraged Behaviors */}
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-6 w-6" />
                    Encouraged Behaviors
                  </CardTitle>
                  <CardDescription>
                    Activities that contribute positively to our community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {allowedBehaviors.map((behavior, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{behavior}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Prohibited Behaviors */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    <XCircle className="h-6 w-6" />
                    Prohibited Behaviors
                  </CardTitle>
                  <CardDescription>
                    Activities that violate our community standards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {prohibitedBehaviors.map((behavior, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{behavior}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Reporting Process */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How to Report Violations
            </h2>
            <p className="text-lg text-muted-foreground">
              Help us maintain a safe community by reporting inappropriate behavior
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {reportingProcess.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Anonymous Reporting</h4>
                  <p className="text-blue-700 text-sm">
                    All reports are treated confidentially. You can report violations anonymously, 
                    and we will never share reporter information with the reported user.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Consequences */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Enforcement & Consequences
              </h2>
              <p className="text-lg text-muted-foreground">
                Progressive enforcement approach to maintain community standards
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {consequences.map((consequence, index) => {
                const Icon = consequence.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${consequence.color}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{consequence.level}</h3>
                      <p className="text-muted-foreground text-sm">{consequence.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="mt-8 bg-yellow-50 border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">Appeals Process</h4>
                    <p className="text-yellow-700 text-sm">
                      If you believe an action was taken in error, you can appeal by contacting our support team. 
                      All appeals are reviewed by a different team member than the original decision-maker.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Ethiopian Cultural Sensitivity */}
      <div className="bg-gradient-to-r from-ethiopian-green-500 via-ethiopian-yellow-500 to-ethiopian-red-500 py-16 text-white relative overflow-hidden">
        <div className="absolute top-10 left-10 text-white opacity-10">
          <Coffee className="w-20 h-20" />
        </div>
        <div className="absolute bottom-10 right-10 text-white opacity-10">
          <Crown className="w-24 h-24" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Respecting Ethiopian Heritage
            </h2>
            <p className="text-xl leading-relaxed mb-8 opacity-90">
              Dreams Wide celebrates Ethiopia's diverse cultures, languages, and traditions. 
              We ask all community members to approach cultural discussions with respect, 
              understanding, and genuine appreciation for our nation's rich heritage.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/20 rounded-lg p-6">
                <Coffee className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Cultural Appreciation</h3>
                <p className="opacity-90">Celebrate our traditions respectfully</p>
              </div>
              <div className="bg-white/20 rounded-lg p-6">
                <Globe className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Diverse Perspectives</h3>
                <p className="opacity-90">Welcome all Ethiopian voices</p>
              </div>
              <div className="bg-white/20 rounded-lg p-6">
                <Users className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Unity in Diversity</h3>
                <p className="opacity-90">Stronger together as Ethiopians</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Support */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Questions About Our Guidelines?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our community team is here to help clarify any questions about our guidelines and policies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-ethiopian-green-600 hover:bg-ethiopian-green-700" asChild>
              <Link to="/contact">
                <Mail className="w-4 h-4 mr-2" />
                Contact Support Team
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" asChild>
              <Link to="/help">
                <Book className="w-4 h-4 mr-2" />
                Visit Help Center
              </Link>
            </Button>
          </div>

          <Card className="mt-8 bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Heart className="h-6 w-6 text-green-600" />
                <h4 className="font-semibold text-green-800">Thank You</h4>
              </div>
              <p className="text-green-700 text-sm">
                Thank you for helping us maintain a respectful, professional, and culturally-rich 
                community where Ethiopian professionals can thrive and connect with opportunities.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
