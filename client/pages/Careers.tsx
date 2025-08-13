import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  Heart,
  Star,
  TrendingUp,
  Coffee,
  Globe,
  Award,
  CheckCircle,
  ArrowRight,
  Code,
  Palette,
  Headphones,
  BarChart3,
  Shield,
  Megaphone,
  Building,
  Target,
  Crown,
  Mountain,
  Mail,
  MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Careers() {
  const openPositions = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Addis Ababa, Ethiopia",
      type: "Full-time",
      experience: "3-5 years",
      icon: Code,
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
      description: "Build and maintain our platform that connects Ethiopian professionals with opportunities."
    },
    {
      title: "UI/UX Designer",
      department: "Design",
      location: "Addis Ababa, Ethiopia",
      type: "Full-time",
      experience: "2-4 years",
      icon: Palette,
      skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
      description: "Design beautiful, culturally-aware interfaces that celebrate Ethiopian heritage."
    },
    {
      title: "Customer Success Manager",
      department: "Support",
      location: "Addis Ababa, Ethiopia",
      type: "Full-time",
      experience: "2-3 years",
      icon: Headphones,
      skills: ["Communication", "Customer Service", "Problem Solving", "Empathy"],
      description: "Help Ethiopian professionals succeed on our platform and resolve their queries."
    },
    {
      title: "Business Development Lead",
      department: "Business",
      location: "Addis Ababa, Ethiopia",
      type: "Full-time",
      experience: "3-5 years",
      icon: TrendingUp,
      skills: ["Sales", "Partnership Development", "Market Analysis", "Negotiation"],
      description: "Build partnerships with Ethiopian employers and expand our reach across the country."
    },
    {
      title: "Content Marketing Specialist",
      department: "Marketing",
      location: "Remote/Addis Ababa",
      type: "Full-time",
      experience: "1-3 years",
      icon: Megaphone,
      skills: ["Content Creation", "Social Media", "SEO", "Analytics"],
      description: "Create engaging content that showcases Ethiopian culture and professional opportunities."
    },
    {
      title: "Data Analyst",
      department: "Analytics",
      location: "Addis Ababa, Ethiopia",
      type: "Full-time",
      experience: "2-4 years",
      icon: BarChart3,
      skills: ["Python", "SQL", "Tableau", "Statistics", "Machine Learning"],
      description: "Analyze platform data to help improve user experience and business outcomes."
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance for you and your family"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Clear career progression paths and learning opportunities"
    },
    {
      icon: Coffee,
      title: "Ethiopian Culture",
      description: "Coffee breaks, cultural celebrations, and Ethiopian heritage appreciation"
    },
    {
      icon: Globe,
      title: "Remote Flexibility",
      description: "Hybrid work options and flexible scheduling"
    },
    {
      icon: Award,
      title: "Competitive Salary",
      description: "Market-leading compensation packages in Ethiopian context"
    },
    {
      icon: Users,
      title: "Amazing Team",
      description: "Work with passionate Ethiopians building the future"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Cultural Pride",
      description: "Celebrating Ethiopian heritage in everything we do"
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Transparent, honest, and trustworthy in all interactions"
    },
    {
      icon: Users,
      title: "Community",
      description: "Supporting each other and our broader Ethiopian community"
    },
    {
      icon: Star,
      title: "Excellence",
      description: "Striving for the highest quality in our work and platform"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-ethiopian-green-600 to-ethiopian-green-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm font-semibold">JOIN OUR TEAM</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Build Ethiopia's Future with Us
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join a passionate team of Ethiopians creating opportunities and preserving our cultural heritage through technology
            </p>
            
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-8 h-2 bg-ethiopian-green-300 rounded"></div>
              <div className="w-8 h-2 bg-ethiopian-yellow-400 rounded"></div>
              <div className="w-8 h-2 bg-ethiopian-red-400 rounded"></div>
            </div>
            
            <Button size="lg" className="bg-white text-ethiopian-green-700 hover:bg-gray-100">
              <ArrowRight className="w-4 h-4 mr-2" />
              View Open Positions
            </Button>
          </div>
        </div>
      </div>

      {/* Why Join Us */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Work at Dreams Wide?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're more than a company – we're a mission-driven team building Ethiopia's digital future
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-ethiopian-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-ethiopian-green-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Company Stats */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-ethiopian-green-600 mb-2">10,000+</div>
                <div className="text-sm text-muted-foreground">Users Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-ethiopian-yellow-600 mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Partner Employers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-ethiopian-red-600 mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Cities Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Open Positions
              </h2>
              <p className="text-lg text-muted-foreground">
                Find your perfect role and help us build something amazing for Ethiopia
              </p>
            </div>

            <div className="grid gap-6">
              {openPositions.map((position, index) => {
                const Icon = position.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-ethiopian-green-100 rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-ethiopian-green-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
                            <p className="text-muted-foreground mb-3">{position.description}</p>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <Building className="w-4 h-4" />
                                {position.department}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {position.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {position.type}
                              </div>
                              <div className="flex items-center gap-1">
                                <Award className="w-4 h-4" />
                                {position.experience}
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              {position.skills.map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="lg:ml-4">
                          <Button className="bg-ethiopian-green-600 hover:bg-ethiopian-green-700 w-full lg:w-auto">
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide how we work and build together
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
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

      {/* Ethiopian Heritage */}
      <div className="bg-gradient-to-r from-ethiopian-green-500 via-ethiopian-yellow-500 to-ethiopian-red-500 py-16 text-white relative overflow-hidden">
        <div className="absolute top-10 left-10 text-white opacity-10">
          <Coffee className="w-20 h-20" />
        </div>
        <div className="absolute bottom-10 right-10 text-white opacity-10">
          <Mountain className="w-24 h-24" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Proudly Ethiopian
            </h2>
            <p className="text-xl leading-relaxed mb-8 opacity-90">
              Work for a company that celebrates Ethiopian culture, values our traditions, 
              and is committed to building a brighter future for our beautiful country.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-6 py-3">
                <Coffee className="h-5 w-5" />
                <span>Coffee Culture</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-6 py-3">
                <Crown className="h-5 w-5" />
                <span>Royal Heritage</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-6 py-3">
                <Mountain className="h-5 w-5" />
                <span>Natural Beauty</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-full px-6 py-3">
                <Globe className="h-5 w-5" />
                <span>Cultural Diversity</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Process */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Application Process
            </h2>
            <p className="text-lg text-muted-foreground">
              Simple steps to join the Dreams Wide team
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Apply Online</h3>
                <p className="text-sm text-muted-foreground">Submit your application through our careers page</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Initial Review</h3>
                <p className="text-sm text-muted-foreground">Our team reviews your application and qualifications</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-yellow-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Interview</h3>
                <p className="text-sm text-muted-foreground">Virtual or in-person interview with the team</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Welcome!</h3>
                <p className="text-sm text-muted-foreground">Join our mission to empower Ethiopian professionals</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Join Our Mission?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Don't see a position that fits? We're always looking for talented Ethiopians to join our team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-ethiopian-green-600 hover:bg-ethiopian-green-700">
                <Mail className="w-4 h-4 mr-2" />
                Send General Application
              </Button>
              
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact HR Team
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
