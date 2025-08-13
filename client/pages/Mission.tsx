import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Star,
  Heart,
  Users,
  Globe,
  Target,
  Award,
  CheckCircle,
  Briefcase,
  BookOpen,
  Mountain,
  Coffee,
  Crown,
  Shield,
  Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Mission() {
  const coreValues = [
    {
      icon: Heart,
      title: "Cultural Preservation",
      description: "Celebrating and preserving Ethiopia's rich cultural heritage while embracing modern progress."
    },
    {
      icon: Users,
      title: "Community Empowerment",
      description: "Connecting Ethiopian professionals with opportunities that transform lives and communities."
    },
    {
      icon: Shield,
      title: "Trust & Integrity",
      description: "Building a secure, transparent platform where all users can trust the authenticity of opportunities."
    },
    {
      icon: Globe,
      title: "Innovation",
      description: "Leveraging technology to bridge traditional Ethiopian values with modern career aspirations."
    }
  ];

  const impact = [
    { number: "10,000+", label: "Lives Transformed", icon: Heart },
    { number: "500+", label: "Employers Trust Us", icon: Building2 },
    { number: "50+", label: "Cities Served", icon: Globe },
    { number: "95%", label: "User Satisfaction", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-ethiopian-green-50 via-ethiopian-yellow-50 to-ethiopian-red-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-ethiopian-green-100 text-ethiopian-green-800 rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4" />
              <span className="text-sm font-semibold">OUR MISSION</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Empowering Ethiopia's Future
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Dreams Wide exists to bridge the gap between Ethiopian talent and opportunity, 
              while preserving our cultural heritage for future generations.
            </p>

            {/* Ethiopian Flag Elements */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-8 h-2 bg-ethiopian-green-500 rounded"></div>
              <div className="w-8 h-2 bg-ethiopian-yellow-500 rounded"></div>
              <div className="w-8 h-2 bg-ethiopian-red-500 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="border-ethiopian-green-200 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
                <Target className="h-8 w-8 text-ethiopian-green-500" />
                Our Mission Statement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-ethiopian-green-50 to-ethiopian-yellow-50 rounded-lg p-8">
                <blockquote className="text-xl md:text-2xl font-medium text-center leading-relaxed text-foreground">
                  "To create Ethiopia's most trusted platform for professional growth and cultural exchange, 
                  where every Ethiopian can find meaningful opportunities while celebrating our shared heritage 
                  and contributing to our nation's prosperity."
                </blockquote>
                <div className="text-center mt-6">
                  <Badge variant="outline" className="text-ethiopian-green-700 border-ethiopian-green-300">
                    🇪🇹 Made with Love in Ethiopia
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Vision & Impact */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Vision for Ethiopia
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Building a future where Ethiopian talent thrives globally while staying rooted in our cultural values
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Vision */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Crown className="h-6 w-6 text-ethiopian-yellow-500" />
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    To be the cornerstone of Ethiopia's digital transformation in employment and cultural preservation, 
                    creating a bridge between our glorious past and our promising future.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Ethiopia's #1 professional platform by 2030</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Connecting 1 million Ethiopians to opportunities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Preserving our culture for future generations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Impact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Award className="h-6 w-6 text-ethiopian-red-500" />
                    Our Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Every day, Dreams Wide creates positive change in Ethiopian lives, connecting talent with opportunity 
                    and preserving our heritage for tomorrow.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {impact.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className="text-center p-4 bg-ethiopian-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-ethiopian-green-600 mb-1">
                            {item.number}
                          </div>
                          <div className="text-sm text-muted-foreground">{item.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Dreams Wide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-3 bg-ethiopian-green-100 rounded-full w-fit">
                      <Icon className="h-8 w-8 text-ethiopian-green-600" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ethiopian Heritage Section */}
      <div className="bg-gradient-to-r from-ethiopian-green-500 via-ethiopian-yellow-500 to-ethiopian-red-500 py-16 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-10 left-10 text-white opacity-10">
          <Coffee className="w-20 h-20" />
        </div>
        <div className="absolute bottom-10 right-10 text-white opacity-10">
          <Mountain className="w-24 h-24" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Rooted in Ethiopian Heritage
            </h2>
            <p className="text-xl leading-relaxed mb-8 opacity-90">
              Dreams Wide is more than a platform – we are custodians of Ethiopian culture, 
              history, and tradition. Every feature we build honors our past while embracing 
              innovation for our future.
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
                <BookOpen className="h-5 w-5" />
                <span>Ancient Wisdom</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Be part of Ethiopia's transformation. Whether you're seeking opportunities or offering them, 
            together we can build a brighter future for our nation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-ethiopian-green-500 hover:bg-ethiopian-green-600">
              <Link to="/jobs" className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Find Opportunities
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="border-ethiopian-yellow-500 text-ethiopian-yellow-700 hover:bg-ethiopian-yellow-50">
              <Link to="/culture" className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Explore Culture
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="border-ethiopian-red-500 text-ethiopian-red-700 hover:bg-ethiopian-red-50">
              <Link to="/contact" className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
