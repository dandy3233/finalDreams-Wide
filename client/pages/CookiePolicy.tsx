import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Cookie, 
  Settings, 
  Shield, 
  BarChart3, 
  Target, 
  CheckCircle,
  Clock,
  Globe,
  AlertTriangle,
  Info,
  Trash2,
  Download,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookiePolicy() {
  const lastUpdated = "January 15, 2024";
  
  // Cookie preferences state
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always required
    functional: true,
    analytics: false,
    marketing: false,
    advertising: false
  });

  const cookieTypes = [
    {
      id: 'essential',
      name: 'Essential Cookies',
      icon: Shield,
      description: 'Required for basic platform functionality and security',
      required: true,
      examples: [
        'Authentication and login sessions',
        'Security and fraud prevention',
        'Basic platform functionality',
        'Language and accessibility preferences'
      ],
      duration: 'Session or up to 1 year',
      thirdParty: false
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      icon: Settings,
      description: 'Enhance user experience and remember your preferences',
      required: false,
      examples: [
        'User interface preferences',
        'Job search filters and criteria',
        'Notification settings',
        'Content personalization'
      ],
      duration: 'Up to 2 years',
      thirdParty: false
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      icon: BarChart3,
      description: 'Help us understand how users interact with our platform',
      required: false,
      examples: [
        'Page views and user behavior',
        'Feature usage statistics',
        'Performance monitoring',
        'Error tracking and debugging'
      ],
      duration: 'Up to 2 years',
      thirdParty: true,
      partners: ['Google Analytics', 'Ethiopian Analytics Services']
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      icon: Target,
      description: 'Provide relevant job recommendations and content',
      required: false,
      examples: [
        'Personalized job recommendations',
        'Relevant cultural content suggestions',
        'Email campaign optimization',
        'User engagement tracking'
      ],
      duration: 'Up to 1 year',
      thirdParty: true,
      partners: ['Internal Systems', 'Email Service Providers']
    },
    {
      id: 'advertising',
      name: 'Advertising Cookies',
      icon: Eye,
      description: 'Show relevant ads and measure advertising effectiveness',
      required: false,
      examples: [
        'Targeted job advertisements',
        'Social media integration',
        'Third-party ad networks',
        'Conversion tracking'
      ],
      duration: 'Up to 1 year',
      thirdParty: true,
      partners: ['Google Ads', 'Facebook Pixel', 'LinkedIn Ads']
    }
  ];

  const handlePreferenceChange = (cookieType: string, enabled: boolean) => {
    setCookiePreferences(prev => ({
      ...prev,
      [cookieType]: enabled
    }));
  };

  const savePreferences = () => {
    // In a real implementation, this would save to localStorage and update the actual cookie settings
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    alert('Cookie preferences saved successfully!');
  };

  const acceptAll = () => {
    const allEnabled = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
      advertising: true
    };
    setCookiePreferences(allEnabled);
    localStorage.setItem('cookiePreferences', JSON.stringify(allEnabled));
    alert('All cookies accepted!');
  };

  const rejectOptional = () => {
    const essentialOnly = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
      advertising: false
    };
    setCookiePreferences(essentialOnly);
    localStorage.setItem('cookiePreferences', JSON.stringify(essentialOnly));
    alert('Optional cookies rejected. Only essential cookies will be used.');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 rounded-full px-4 py-2 mb-6">
              <Cookie className="w-4 h-4" />
              <span className="text-sm font-semibold">COOKIE MANAGEMENT</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Cookie Policy
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Understand and control how we use cookies on Dreams Wide
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                Last Updated: {lastUpdated}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2">
                <Globe className="h-3 w-3" />
                GDPR Compliant
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2">
                <Settings className="h-3 w-3" />
                Customizable
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
                <Info className="h-5 w-5" />
                What Are Cookies?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Cookies are small text files that are placed on your device when you visit our website. 
                They help us provide you with a better browsing experience, analyze how our platform 
                is used, and deliver personalized content and job recommendations.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">First-Party Cookies</h4>
                  <p className="text-sm text-blue-700">
                    Set directly by Dreams Wide to enhance your experience and provide 
                    essential platform functionality.
                  </p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Third-Party Cookies</h4>
                  <p className="text-sm text-purple-700">
                    Set by external services we use for analytics, advertising, and 
                    social media integration.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Types and Controls */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Cookie Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Control which types of cookies you allow. Essential cookies are required for 
                the platform to function and cannot be disabled.
              </p>
              
              <div className="space-y-6">
                {cookieTypes.map((type) => {
                  const Icon = type.icon;
                  const enabled = cookiePreferences[type.id as keyof typeof cookiePreferences];
                  
                  return (
                    <Card key={type.id} className="border-2">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-orange-500" />
                            <div>
                              <CardTitle className="text-lg">{type.name}</CardTitle>
                              <p className="text-sm text-muted-foreground">{type.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {type.required ? (
                              <Badge variant="secondary">Required</Badge>
                            ) : (
                              <Switch
                                checked={enabled}
                                onCheckedChange={(checked) => handlePreferenceChange(type.id, checked)}
                              />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-semibold mb-2">Examples</h5>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {type.examples.map((example, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                  {example}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <h5 className="font-semibold text-sm">Duration</h5>
                              <p className="text-sm text-muted-foreground">{type.duration}</p>
                            </div>
                            
                            <div>
                              <h5 className="font-semibold text-sm">Third-Party</h5>
                              <p className="text-sm text-muted-foreground">
                                {type.thirdParty ? 'Yes' : 'No'}
                              </p>
                            </div>
                            
                            {type.partners && (
                              <div>
                                <h5 className="font-semibold text-sm">Partners</h5>
                                <p className="text-sm text-muted-foreground">
                                  {type.partners.join(', ')}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              {/* Preference Actions */}
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Button onClick={acceptAll} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Accept All Cookies
                </Button>
                
                <Button onClick={rejectOptional} variant="outline">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Reject Optional
                </Button>
                
                <Button onClick={savePreferences} variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Managing Cookies */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Managing Cookies in Your Browser
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                You can also control cookies directly through your browser settings. 
                Here's how to manage cookies in popular browsers:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Desktop Browsers</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Chrome:</strong> Settings → Privacy & Security → Cookies</li>
                    <li>• <strong>Firefox:</strong> Preferences → Privacy & Security</li>
                    <li>• <strong>Safari:</strong> Preferences → Privacy</li>
                    <li>• <strong>Edge:</strong> Settings → Cookies and site permissions</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Mobile Browsers</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Chrome Mobile:</strong> Menu → Settings → Site settings</li>
                    <li>• <strong>Safari iOS:</strong> Settings → Safari → Privacy</li>
                    <li>• <strong>Firefox Mobile:</strong> Menu → Settings → Privacy</li>
                    <li>• <strong>Edge Mobile:</strong> Menu → Settings → Site permissions</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-amber-800 mb-1">Important Note</h5>
                    <p className="text-sm text-amber-700">
                      Disabling cookies may affect your experience on Dreams Wide. 
                      Some features may not work properly without essential cookies.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Your Data Protection Rights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Under Ethiopian data protection laws and international regulations, you have several rights 
                regarding your personal data and cookies:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Your Rights</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                      Right to withdraw consent at any time
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                      Right to access your cookie data
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                      Right to request data deletion
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                      Right to data portability
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Contact for Data Requests</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>📧 privacy@dreamswide.et</p>
                    <p>📞 +251-11-XXX-XXXX</p>
                    <p>📅 Response within 30 days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Updates and Changes */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Policy Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices, 
                technology, or legal requirements. We will notify you of any significant changes through:
              </p>
              
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                  Email notifications to registered users
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                  Prominent notices on our website
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                  Updated consent requests when necessary
                </li>
              </ul>
              
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Cookie Policy PDF
              </Button>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Button asChild variant="outline">
              <Link to="/privacy" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Privacy Policy
              </Link>
            </Button>
            
            <Button asChild variant="outline">
              <Link to="/terms" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Terms of Service
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
