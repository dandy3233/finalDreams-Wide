import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  HelpCircle,
  Search,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Shield,
  BookOpen,
  Users,
  Briefcase,
  Globe,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  ArrowRight,
  Star,
  Heart,
  Zap,
  Coffee,
  Headphones,
  FileText,
  User,
  Settings,
  CreditCard,
  Bug,
  Lightbulb,
  Flag,
  Send
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Help() {
  const helpCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Zap,
      color: "bg-blue-500",
      articles: [
        "How to create your Dreams Wide account",
        "Setting up your professional profile",
        "Understanding our platform features",
        "First steps for job seekers",
        "Employer guide to posting jobs"
      ]
    },
    {
      id: "jobs",
      title: "Jobs & Applications",
      icon: Briefcase,
      color: "bg-green-500",
      articles: [
        "How to search for jobs effectively",
        "Applying to job postings",
        "Managing your applications",
        "Understanding job requirements",
        "Tips for a successful application"
      ]
    },
    {
      id: "profile",
      title: "Profile Management",
      icon: User,
      color: "bg-purple-500",
      articles: [
        "Updating your profile information",
        "Adding work experience and education",
        "Upload and manage documents",
        "Privacy settings and visibility",
        "Verifying your professional credentials"
      ]
    },
    {
      id: "employers",
      title: "For Employers",
      icon: Users,
      color: "bg-orange-500",
      articles: [
        "How to post job vacancies",
        "Managing candidate applications",
        "Premium employer features",
        "Employer verification process",
        "Best practices for job descriptions"
      ]
    },
    {
      id: "account",
      title: "Account & Settings",
      icon: Settings,
      color: "bg-gray-500",
      articles: [
        "Account security and passwords",
        "Email and notification preferences",
        "Deactivating or deleting your account",
        "Two-factor authentication setup",
        "Managing subscription and billing"
      ]
    },
    {
      id: "culture",
      title: "Culture & Community",
      icon: Heart,
      color: "bg-red-500",
      articles: [
        "Exploring Ethiopian culture content",
        "Contributing to cultural discussions",
        "Community guidelines and etiquette",
        "Reporting inappropriate content",
        "Cultural events and celebrations"
      ]
    }
  ];

  const faqs = [
    {
      question: "How do I create an account on Dreams Wide?",
      answer: "Creating an account is simple! Click the 'Sign Up' button in the top right corner, fill in your basic information including your name, email, and password. You'll receive a verification email to activate your account. Once verified, you can complete your profile with your professional information."
    },
    {
      question: "Is Dreams Wide free to use for job seekers?",
      answer: "Yes! Dreams Wide is completely free for job seekers. You can search and apply to jobs, access cultural content, explore historical posts, and use all core platform features at no cost. We believe in supporting Ethiopian professionals in their career journey."
    },
    {
      question: "How do I update my profile information?",
      answer: "Go to your profile page by clicking on your name in the top navigation. Click 'Edit Profile' to update your personal information, work experience, education, skills, and upload documents like your CV or certificates. Remember to save your changes!"
    },
    {
      question: "Can employers contact me directly?",
      answer: "Employers can contact you through our secure messaging system if you've applied to their jobs or if your profile matches their requirements. We never share your personal contact information without your explicit consent. You can adjust your privacy settings in your account preferences."
    },
    {
      question: "How do I report a problem or inappropriate content?",
      answer: "Use the 'Report' button available on job posts, profiles, or content. For technical issues, contact our support team through the form below or email us at support@dreamswide.et. We take all reports seriously and respond within 24 hours."
    },
    {
      question: "What cities and regions does Dreams Wide cover?",
      answer: "Dreams Wide serves all major Ethiopian cities including Addis Ababa, Dire Dawa, Mekelle, Gondar, Awassa, Bahir Dar, Jimma, and Dessie. We're continuously expanding to cover more regions across Ethiopia. Check our Cities page for detailed coverage information."
    },
    {
      question: "How can I verify if a job posting is legitimate?",
      answer: "Look for the 'Verified Employer' badge on job posts. These employers have been verified by our team. Be cautious of jobs asking for upfront payments or personal banking information. Report suspicious postings immediately. Our team reviews all job posts for authenticity."
    },
    {
      question: "Can I access Dreams Wide on my mobile device?",
      answer: "Yes! Dreams Wide is fully responsive and works great on mobile devices. Simply visit our website on your phone or tablet browser. We're also working on dedicated mobile apps for iOS and Android that will be available soon."
    }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@dreamswide.et",
      responseTime: "Response within 24 hours",
      color: "text-blue-500"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Available 9 AM - 6 PM EAT",
      responseTime: "Instant response",
      color: "text-green-500"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with us directly",
      contact: "+251-11-XXX-XXXX",
      responseTime: "Mon-Fri, 9 AM - 5 PM EAT",
      color: "text-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-ethiopian-green-600 to-ethiopian-green-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
              <Headphones className="w-4 h-4" />
              <span className="text-sm font-semibold">24/7 SUPPORT</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              How Can We Help You?
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Find answers to your questions, get support, and make the most of your Dreams Wide experience
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                type="text" 
                placeholder="Search for help articles, FAQs, or guides..." 
                className="pl-12 pr-4 py-4 text-lg bg-white border-0 shadow-lg focus:ring-2 focus:ring-white/30"
              />
              <Button className="absolute right-2 top-2 bg-ethiopian-green-600 hover:bg-ethiopian-green-700">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Quick Actions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Find Jobs</h3>
                <p className="text-gray-600 text-sm">Browse and apply to job opportunities</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <User className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Update Profile</h3>
                <p className="text-gray-600 text-sm">Keep your information current</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <Bug className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Report Issue</h3>
                <p className="text-gray-600 text-sm">Tell us about a problem</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                  <MessageCircle className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Contact Support</h3>
                <p className="text-gray-600 text-sm">Get personalized help</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Browse Help Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="group-hover:text-ethiopian-green-600 transition-colors">
                        {category.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.articles.slice(0, 3).map((article, index) => (
                        <li key={index} className="text-gray-600 text-sm flex items-center gap-2 hover:text-ethiopian-green-600 transition-colors cursor-pointer">
                          <ArrowRight className="w-3 h-3" />
                          {article}
                        </li>
                      ))}
                      <li className="text-ethiopian-green-600 text-sm font-medium flex items-center gap-2 cursor-pointer hover:underline">
                        <span>View all articles</span>
                        <ExternalLink className="w-3 h-3" />
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Our Support Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <Icon className={`w-8 h-8 ${method.color}`} />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                    <p className="text-gray-600 mb-2">{method.description}</p>
                    <p className="font-medium text-ethiopian-green-600 mb-2">{method.contact}</p>
                    <p className="text-sm text-gray-500">{method.responseTime}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Send Us a Message</CardTitle>
              <CardDescription className="text-center">
                Can't find what you're looking for? Send us a message and we'll get back to you soon.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <Input placeholder="Your full name" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="your.email@example.com" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input placeholder="Brief description of your inquiry" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea 
                  placeholder="Please describe your question or issue in detail..."
                  rows={5}
                />
              </div>
              <Button className="w-full bg-ethiopian-green-600 hover:bg-ethiopian-green-700">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Resources */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <Link to="/about" className="flex flex-col items-center gap-2 hover:text-ethiopian-green-600 transition-colors">
              <BookOpen className="w-8 h-8" />
              <span className="font-medium">About Us</span>
            </Link>
            <Link to="/terms" className="flex flex-col items-center gap-2 hover:text-ethiopian-green-600 transition-colors">
              <FileText className="w-8 h-8" />
              <span className="font-medium">Terms of Service</span>
            </Link>
            <Link to="/privacy" className="flex flex-col items-center gap-2 hover:text-ethiopian-green-600 transition-colors">
              <Shield className="w-8 h-8" />
              <span className="font-medium">Privacy Policy</span>
            </Link>
            <Link to="/cities" className="flex flex-col items-center gap-2 hover:text-ethiopian-green-600 transition-colors">
              <Globe className="w-8 h-8" />
              <span className="font-medium">Supported Cities</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
