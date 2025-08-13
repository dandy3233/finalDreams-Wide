import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  Users,
  Building,
  Heart,
  CheckCircle,
  Globe,
  Shield,
  Briefcase,
  Award
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message Sent Successfully!",
      description: "Thank you for contacting Dreams Wide. We'll respond within 24 hours.",
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      category: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      primary: "+251-11-XXX-XXXX",
      secondary: "Monday - Friday: 9:00 AM - 6:00 PM EAT",
      color: "text-green-600"
    },
    {
      icon: Mail,
      title: "Email Support",
      primary: "hello@dreamswide.et",
      secondary: "Response within 24 hours",
      color: "text-blue-600"
    },
    {
      icon: MapPin,
      title: "Office Location",
      primary: "Addis Ababa, Ethiopia",
      secondary: "Visit by appointment only",
      color: "text-purple-600"
    },
    {
      icon: Clock,
      title: "Business Hours",
      primary: "Monday - Friday",
      secondary: "9:00 AM - 6:00 PM EAT",
      color: "text-orange-600"
    }
  ];

  const departments = [
    {
      icon: Users,
      title: "General Support",
      email: "support@dreamswide.et",
      description: "General questions and platform assistance"
    },
    {
      icon: Briefcase,
      title: "Employer Services",
      email: "employers@dreamswide.et", 
      description: "Job posting and recruitment support"
    },
    {
      icon: Building,
      title: "Business Partnerships",
      email: "partnerships@dreamswide.et",
      description: "Partnership opportunities and collaborations"
    },
    {
      icon: Shield,
      title: "Technical Support",
      email: "technical@dreamswide.et",
      description: "Technical issues and bug reports"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 rounded-full px-4 py-2 mb-6">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-semibold">CONTACT US</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Get in Touch
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Have questions about Dreams Wide? Need support? Want to partner with us? 
              We're here to help and would love to hear from you.
            </p>

            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-8 h-2 bg-ethiopian-green-500 rounded"></div>
              <div className="w-8 h-2 bg-ethiopian-yellow-500 rounded"></div>
              <div className="w-8 h-2 bg-ethiopian-red-500 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Icon className={`h-12 w-12 mx-auto mb-4 ${info.color}`} />
                    <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                    <p className="font-medium text-foreground mb-1">{info.primary}</p>
                    <p className="text-sm text-muted-foreground">{info.secondary}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Send className="h-6 w-6" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+251-XXX-XXX-XXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Support</SelectItem>
                          <SelectItem value="technical">Technical Issue</SelectItem>
                          <SelectItem value="employer">Employer Services</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-ethiopian-green-500 hover:bg-ethiopian-green-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Department Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Building className="h-6 w-6" />
                    Department Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    For faster service, contact the relevant department directly:
                  </p>
                  
                  <div className="space-y-4">
                    {departments.map((dept, index) => {
                      const Icon = dept.icon;
                      return (
                        <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                          <Icon className="h-6 w-6 text-ethiopian-green-500 mt-0.5" />
                          <div>
                            <h4 className="font-semibold mb-1">{dept.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{dept.description}</p>
                            <a 
                              href={`mailto:${dept.email}`}
                              className="text-sm text-ethiopian-green-600 hover:underline"
                            >
                              {dept.email}
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Response Times
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">General Inquiries</span>
                      <Badge variant="outline">24 hours</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Technical Support</span>
                      <Badge variant="outline">12 hours</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Urgent Issues</span>
                      <Badge variant="outline">4 hours</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Partnership Inquiries</span>
                      <Badge variant="outline">48 hours</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ethiopian Support */}
              <Card className="bg-gradient-to-r from-ethiopian-green-50 to-ethiopian-yellow-50 border-ethiopian-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Heart className="h-6 w-6 text-ethiopian-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-ethiopian-green-800 mb-2">
                        Supporting Ethiopian Professionals
                      </h4>
                      <p className="text-sm text-ethiopian-green-700">
                        We're proud to be an Ethiopian company serving Ethiopian talent. 
                        All our support is provided by fellow Ethiopians who understand 
                        our culture and professional landscape.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Quick answers to common questions about Dreams Wide
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">How do I post a job?</h4>
                  <p className="text-sm text-muted-foreground">
                    Contact our Employer Services team at employers@dreamswide.et to get started 
                    with posting verified job opportunities.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Is Dreams Wide free to use?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes! Job seekers can browse opportunities and access cultural content completely free. 
                    Employers pay only for premium job posting features.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">How do you verify employers?</h4>
                  <p className="text-sm text-muted-foreground">
                    We have a thorough verification process including business registration checks 
                    and direct communication with Ethiopian companies.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Can I contribute cultural content?</h4>
                  <p className="text-sm text-muted-foreground">
                    Absolutely! We welcome submissions from cultural experts and historians. 
                    Contact us to learn about our content contribution process.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
