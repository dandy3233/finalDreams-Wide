import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";
import { 
  Briefcase, 
  Globe, 
  BookOpen, 
  Star, 
  MapPin, 
  Calendar,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Heart,
  Eye,
  Award,
  Building,
  Landmark,
  Coffee,
  Shield,
  Crown,
  Sun,
  Mountain,
  Trees,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const { jobs, content, getPublishedJobs, getPublishedContent } = useData();

  // Get live data for homepage
  const featuredJobs = getPublishedJobs().filter(job => job.featured).slice(0, 3);
  const culturalHighlights = getPublishedContent("Cultural Content").slice(0, 3);
  const latestNews = getPublishedContent("News & Announcements").slice(0, 3);
  const totalJobs = getPublishedJobs().length;
  const totalContent = getPublishedContent().length;

  // Use dynamic cultural content
  const featuredCulture = culturalHighlights.map(item => ({
    id: item.id,
    title: item.title,
    excerpt: item.description || item.content?.substring(0, 100) + "...",
    image: item.image || "/placeholder.svg",
    readTime: "5 min read",
    category: item.category || "Culture"
  }));

  const stats = [
    { label: "Active Job Listings", value: totalJobs.toString(), icon: Briefcase, color: "ethiopian-green" },
    { label: "Cultural Content", value: getPublishedContent("Cultural Content").length.toString(), icon: Globe, color: "ethiopian-yellow" },
    { label: "Historical Posts", value: getPublishedContent("Historical Post").length.toString(), icon: Landmark, color: "ethiopian-red" },
    { label: "News & Updates", value: getPublishedContent("News & Announcements").length.toString(), icon: TrendingUp, color: "blue" }
  ];

  const jobCategories = [
    { name: "NJO Jobs", count: getPublishedJobs().filter(job => job.category === "njo").length, color: "from-ethiopian-green-500 to-ethiopian-green-600", icon: Shield },
    { name: "Banking", count: getPublishedJobs().filter(job => job.category === "banking").length, color: "from-ethiopian-yellow-500 to-ethiopian-yellow-600", icon: Building },
    { name: "Airlines", count: getPublishedJobs().filter(job => job.category === "airlines").length, color: "from-ethiopian-red-500 to-ethiopian-red-600", icon: Globe },
    { name: "Government", count: getPublishedJobs().filter(job => job.category === "government").length, color: "from-ethiopian-green-600 to-green-700", icon: Crown },
    { name: "NGO & International", count: getPublishedJobs().filter(job => job.category === "ngo").length, color: "from-blue-500 to-blue-600", icon: Heart },
    { name: "Education", count: getPublishedJobs().filter(job => job.category === "education").length, color: "from-purple-500 to-purple-600", icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Enhanced with Ethiopian Elements */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-ethiopian-green-50 via-ethiopian-yellow-50 to-ethiopian-red-50">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-32 h-32 bg-ethiopian-green-500 rounded-full blur-3xl"></div>
            <div className="absolute top-40 right-32 w-24 h-24 bg-ethiopian-yellow-500 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-ethiopian-red-500 rounded-full blur-3xl"></div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-ethiopian-green-200 opacity-20">
          <Coffee className="w-16 h-16" />
        </div>
        <div className="absolute top-20 right-20 text-ethiopian-yellow-200 opacity-20">
          <Sun className="w-12 h-12" />
        </div>
        <div className="absolute bottom-20 left-20 text-ethiopian-red-200 opacity-20">
          <Mountain className="w-20 h-20" />
        </div>

        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-ethiopian-green-200 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-ethiopian-green-600" />
              <span className="text-sm font-medium text-ethiopian-green-800">Ethiopia's Premier Platform</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="text-ethiopian-green-600">Jobs</span>
              <span className="text-gray-400 mx-4">•</span>
              <span className="text-ethiopian-yellow-600">Culture</span>
              <span className="text-gray-400 mx-4">•</span>
              <span className="text-ethiopian-red-600">History</span>
            </h1>
            
            {/* Subtitle */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-4">
                Daily Updates from Ethiopia
              </h2>
              <div className="max-w-3xl mx-auto">
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  🇪🇹 Ethiopia's leading hub for verified job opportunities and cultural knowledge. 
                  Connect with trusted employers and celebrate our rich heritage.
                </p>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-gradient-to-r from-ethiopian-green-500 to-ethiopian-green-600 hover:from-ethiopian-green-600 hover:to-ethiopian-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Link to="/jobs" className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Browse Jobs
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="border-2 border-ethiopian-yellow-500 text-ethiopian-yellow-700 hover:bg-ethiopian-yellow-500 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Link to="/culture" className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Explore Culture
                  <Sparkles className="w-4 h-4" />
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="border-2 border-ethiopian-red-500 text-ethiopian-red-700 hover:bg-ethiopian-red-500 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Link to="/history" className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Learn History
                  <Crown className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Verified Employers</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>Secure Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>Trusted Content</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Platform Statistics</h2>
            <p className="text-lg text-gray-600">Live numbers from our growing community</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className={`absolute inset-0 bg-${stat.color}-100 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300`}></div>
                    <div className={`relative p-4 bg-${stat.color}-500 rounded-2xl shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section - Enhanced */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-ethiopian-green-100 text-ethiopian-green-800 rounded-full px-4 py-2 mb-4">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm font-semibold">FEATURED OPPORTUNITIES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Job Opportunities</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Verified positions from trusted Ethiopian employers across various sectors
            </p>
          </div>
          
          <div className="space-y-6 mb-12">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-ethiopian-green-100 rounded-lg">
                          <Briefcase className="w-5 h-5 text-ethiopian-green-600" />
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-ethiopian-green-600 transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-lg text-gray-600 font-medium">{job.company}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{job.postedDays} days ago</span>
                        </div>
                        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                          {job.category}
                        </Badge>
                        {job.verified && (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{job.salary}</div>
                      <div className="text-gray-600 mb-4">{job.type}</div>
                      <Button className="bg-gradient-to-r from-ethiopian-green-500 to-ethiopian-green-600 hover:from-ethiopian-green-600 hover:to-ethiopian-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                        Apply Now
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="border-2 border-gray-300 hover:border-ethiopian-green-500 hover:text-ethiopian-green-600">
              <Link to="/jobs" className="flex items-center gap-2">
                View All {totalJobs} Job Listings
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Job Categories - Enhanced */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-ethiopian-yellow-100 text-ethiopian-yellow-800 rounded-full px-4 py-2 mb-4">
              <Building className="w-4 h-4" />
              <span className="text-sm font-semibold">JOB CATEGORIES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse by Sector</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find opportunities in key Ethiopian industries and sectors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link key={index} to={`/jobs?category=${encodeURIComponent(category.name)}`}>
                  <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg cursor-pointer overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                    <CardContent className="p-8 text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl mb-6 shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-ethiopian-green-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-lg font-medium">{category.count} positions available</p>
                      <div className="mt-4 inline-flex items-center text-ethiopian-green-600 font-medium group-hover:gap-3 transition-all">
                        <span>Browse Jobs</span>
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cultural Content - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-ethiopian-yellow-50 to-ethiopian-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-ethiopian-red-100 text-ethiopian-red-800 rounded-full px-4 py-2 mb-4">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-semibold">CULTURAL HERITAGE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cultural Highlights</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Celebrate Ethiopia's rich heritage, traditions, and vibrant cultural landscape
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCulture.map((article) => (
              <Card key={article.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <Badge className="absolute top-4 left-4 bg-white/90 text-gray-800 shadow-lg">
                    {article.category}
                  </Badge>
                </div>
                
                <CardHeader className="p-6">
                  <CardTitle className="text-xl leading-tight group-hover:text-ethiopian-yellow-600 transition-colors mb-3">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 line-clamp-3 mb-4">
                    {article.excerpt}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>2.1k</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>89</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="px-6 pb-6">
                  <Button asChild variant="outline" className="w-full group-hover:bg-ethiopian-yellow-500 group-hover:text-white group-hover:border-ethiopian-yellow-500 transition-all">
                    <Link to="/culture" className="flex items-center justify-center gap-2">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-ethiopian-yellow-500 to-ethiopian-red-500 hover:from-ethiopian-yellow-600 hover:to-ethiopian-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/culture" className="flex items-center gap-2">
                Explore All Cultural Content
                <Globe className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action - Enhanced */}
      <section className="py-20 bg-gradient-to-r from-ethiopian-green-600 via-ethiopian-yellow-500 to-ethiopian-red-500 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Join Ethiopia's Premier Professional Network
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90">
              Connect with opportunities, celebrate culture, and explore our rich history - all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100 shadow-xl">
                <Link to="/jobs" className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Start Your Career Journey
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 shadow-xl">
                <Link to="/culture" className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Discover Ethiopia
                  <Sparkles className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
