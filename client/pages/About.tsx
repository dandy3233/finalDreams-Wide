import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calendar, 
  Globe, 
  Award,
  CheckCircle,
  Heart,
  Star,
  TrendingUp,
  Shield,
  Building,
  Target,
  Coffee,
  Crown,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const timeline = [
    {
      year: "2023",
      title: "Dreams Wide Founded",
      description: "Launched in Addis Ababa with a vision to transform Ethiopia's job market and preserve our cultural heritage."
    },
    {
      year: "2024",
      title: "Nationwide Expansion",
      description: "Extended our reach to all major Ethiopian cities, connecting thousands of job seekers with employers."
    },
    {
      year: "2024",
      title: "Cultural Platform Launch",
      description: "Introduced comprehensive cultural and historical content to celebrate Ethiopian heritage."
    },
    {
      year: "2024",
      title: "10,000+ Users",
      description: "Reached a milestone of over 10,000 active users across Ethiopia's professional landscape."
    }
  ];

  const team = [
    {
      name: "Ethiopian Innovation Team",
      role: "Platform Development",
      description: "Dedicated Ethiopian developers and designers building the future of work in Ethiopia."
    },
    {
      name: "Cultural Heritage Team",
      role: "Content Curation", 
      description: "Historians and cultural experts preserving and sharing Ethiopian traditions and history."
    },
    {
      name: "Employer Relations Team",
      role: "Business Development",
      description: "Connecting with Ethiopian employers to ensure quality job opportunities for our users."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Users", icon: Users },
    { number: "500+", label: "Partner Employers", icon: Building },
    { number: "50+", label: "Cities Served", icon: Globe },
    { number: "95%", label: "Success Rate", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 mb-6">
              <Users className="w-4 h-4" />
              <span className="text-sm font-semibold">ABOUT DREAMS WIDE</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Ethiopia's Premier Professional Platform
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              We're not just a job board – we're a community dedicated to empowering Ethiopian professionals 
              while celebrating our rich cultural heritage and historical legacy.
            </p>

            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-8 h-2 bg-ethiopian-green-500 rounded"></div>
              <div className="w-8 h-2 bg-ethiopian-yellow-500 rounded"></div>
              <div className="w-8 h-2 bg-ethiopian-red-500 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-12">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
                <Heart className="h-8 w-8 text-red-500" />
                Our Story
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Dreams Wide was born from a simple yet powerful vision: to create a platform where 
                  Ethiopian talent could flourish while honoring our cultural roots. Founded in the 
                  heart of Addis Ababa, we recognized the need for a trustworthy, culturally-aware 
                  platform that serves both job seekers and employers.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  What sets us apart is our deep commitment to Ethiopian culture and heritage. 
                  While connecting professionals with opportunities, we also serve as a digital 
                  repository of our nation's rich history, traditions, and cultural practices.
                </p>

                <div className="bg-ethiopian-green-50 border border-ethiopian-green-200 rounded-lg p-6">
                  <h4 className="font-semibold text-ethiopian-green-800 mb-3 flex items-center gap-2">
                    <Coffee className="h-5 w-5" />
                    Ethiopian Values at Our Core
                  </h4>
                  <p className="text-ethiopian-green-700">
                    Every feature we build, every partnership we form, and every interaction on our 
                    platform reflects Ethiopian values of community, respect, and collective progress. 
                    We believe that preserving our heritage while embracing innovation is key to 
                    Ethiopia's bright future.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Impact in Numbers
              </h2>
              <p className="text-lg text-muted-foreground">
                Growing stronger every day, together with the Ethiopian community
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <Icon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                      <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                      <div className="text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-muted-foreground">
              Key milestones in Dreams Wide's growth and impact
            </p>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-ethiopian-green-500 via-ethiopian-yellow-500 to-ethiopian-red-500"></div>
                <CardContent className="p-6 pl-8">
                  <div className="flex items-start gap-4">
                    <Badge variant="outline" className="text-blue-600 border-blue-200 font-semibold">
                      {item.year}
                    </Badge>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Team
              </h2>
              <p className="text-lg text-muted-foreground">
                Passionate Ethiopians building the future of work and culture
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-20 h-20 bg-gradient-to-br from-ethiopian-green-500 to-ethiopian-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <Badge variant="outline">{member.role}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ethiopian Heritage */}
      <div className="bg-gradient-to-r from-ethiopian-green-500 via-ethiopian-yellow-500 to-ethiopian-red-500 py-16 text-white relative overflow-hidden">
        <div className="absolute top-10 right-10 text-white opacity-10">
          <Crown className="w-24 h-24" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Proudly Ethiopian
            </h2>
            <p className="text-xl leading-relaxed mb-8 opacity-90">
              From the birthplace of coffee to the land of ancient kingdoms, Ethiopia's heritage 
              runs through everything we do. Dreams Wide is our contribution to our beloved nation's 
              continued prosperity and cultural preservation.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/20 rounded-lg p-6">
                <Coffee className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Birthplace of Coffee</h3>
                <p className="opacity-90">Honoring our agricultural heritage</p>
              </div>
              <div className="bg-white/20 rounded-lg p-6">
                <Crown className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ancient Kingdoms</h3>
                <p className="opacity-90">Preserving our royal history</p>
              </div>
              <div className="bg-white/20 rounded-lg p-6">
                <Globe className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Cultural Diversity</h3>
                <p className="opacity-90">Celebrating all Ethiopian cultures</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <MapPin className="h-6 w-6" />
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground mb-6">
                Have questions about Dreams Wide? Want to partner with us? We'd love to hear from you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-ethiopian-green-500 hover:bg-ethiopian-green-600">
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
                
                <Button asChild size="lg" variant="outline">
                  <Link to="/mission">
                    Our Mission
                  </Link>
                </Button>
                
                <Button asChild size="lg" variant="outline">
                  <Link to="/careers">
                    Join Our Team
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
