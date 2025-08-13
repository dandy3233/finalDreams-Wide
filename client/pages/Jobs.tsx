import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  MapPin, 
  Clock, 
  Briefcase, 
  CheckCircle,
  Filter,
  Star,
  Users,
  Calendar,
  ExternalLink,
  Globe,
  Heart,
  Share2
} from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { useToast } from "@/hooks/use-toast";

export default function Jobs() {
  const { jobs, getPublishedJobs } = useData();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [salaryRange, setSalaryRange] = useState<string>("all");
  const [showOnlyVerified, setShowOnlyVerified] = useState(false);
  const [showOnlyRemote, setShowOnlyRemote] = useState(false);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set());

  // Get published jobs from centralized data
  const publishedJobs = getPublishedJobs();

  const categories = [
    { value: "all", label: "All Categories", count: publishedJobs.length },
    { value: "njo", label: "NJO Jobs", count: publishedJobs.filter(job => job.category === "njo").length },
    { value: "banking", label: "Banking & Finance", count: publishedJobs.filter(job => job.category === "banking").length },
    { value: "airlines", label: "Ethiopian Airlines", count: publishedJobs.filter(job => job.category === "airlines").length },
    { value: "airports", label: "Airports Enterprise", count: publishedJobs.filter(job => job.category === "airports").length },
    { value: "government", label: "Government", count: publishedJobs.filter(job => job.category === "government").length },
    { value: "city-admin", label: "City Administration", count: publishedJobs.filter(job => job.category === "city-admin").length },
    { value: "ngo", label: "NGO & International", count: publishedJobs.filter(job => job.category === "ngo").length },
    { value: "education", label: "Education", count: publishedJobs.filter(job => job.category === "education").length },
    { value: "healthcare", label: "Healthcare", count: publishedJobs.filter(job => job.category === "healthcare").length },
    { value: "technology", label: "Technology", count: publishedJobs.filter(job => job.category === "technology").length },
    { value: "engineering", label: "Engineering", count: publishedJobs.filter(job => job.category === "engineering").length }
  ];

  const locations = [
    { value: "all", label: "All Locations" },
    { value: "addis-ababa", label: "Addis Ababa" },
    { value: "dire-dawa", label: "Dire Dawa" },
    { value: "mekelle", label: "Mekelle" },
    { value: "bahir-dar", label: "Bahir Dar" },
    { value: "hawassa", label: "Hawassa" },
    { value: "adama", label: "Adama" },
    { value: "jimma", label: "Jimma" },
    { value: "gondar", label: "Gondar" },
    { value: "multiple", label: "Multiple Locations" },
    { value: "remote", label: "Remote" }
  ];

  const jobTypes = [
    { value: "all", label: "All Types" },
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Contract", label: "Contract" },
    { value: "Internship", label: "Internship" }
  ];

  const salaryRanges = [
    { value: "all", label: "All Salaries" },
    { value: "0-10000", label: "ETB 0 - 10,000" },
    { value: "10000-20000", label: "ETB 10,000 - 20,000" },
    { value: "20000-30000", label: "ETB 20,000 - 30,000" },
    { value: "30000-50000", label: "ETB 30,000 - 50,000" },
    { value: "50000+", label: "ETB 50,000+" }
  ];

  const filteredJobs = useMemo(() => {
    let filtered = publishedJobs.filter(job => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!job.title.toLowerCase().includes(query) && 
            !job.company.toLowerCase().includes(query) &&
            !(job.description || '').toLowerCase().includes(query)) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "all" && job.category !== selectedCategory) {
        return false;
      }

      // Location filter
      if (selectedLocation !== "all") {
        const jobLocation = job.location.toLowerCase().replace(/\s+/g, "-");
        if (selectedLocation === "remote" && job.type !== "Remote") return false;
        if (selectedLocation !== "remote" && selectedLocation !== jobLocation && job.location !== "Multiple Locations") {
          return false;
        }
      }

      // Type filter
      if (selectedType !== "all" && job.type !== selectedType) {
        return false;
      }

      // Salary filter
      if (salaryRange !== "all") {
        const salaryMatch = job.salary.match(/ETB\s+([\d,]+)/);
        if (salaryMatch) {
          const salaryNum = parseInt(salaryMatch[1].replace(",", ""));
          const [min, max] = salaryRange.split("-").map(s => parseInt(s));
          if (salaryRange === "50000+" && salaryNum < 50000) return false;
          if (salaryRange !== "50000+" && (salaryNum < min || salaryNum > max)) return false;
        }
      }

      // Verified filter
      if (showOnlyVerified && !job.verified) {
        return false;
      }

      // Remote filter
      if (showOnlyRemote && job.type !== "Remote") {
        return false;
      }

      return true;
    });

    // Sort jobs
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => a.postedDays - b.postedDays);
        break;
      case "oldest":
        filtered.sort((a, b) => b.postedDays - a.postedDays);
        break;
      case "salary-high":
        filtered.sort((a, b) => {
          const getSalaryMax = (salary: string) => {
            const match = salary.match(/ETB\s+[\d,]+\s*-\s*([\d,]+)/);
            return match ? parseInt(match[1].replace(",", "")) : 0;
          };
          return getSalaryMax(b.salary) - getSalaryMax(a.salary);
        });
        break;
      case "salary-low":
        filtered.sort((a, b) => {
          const getSalaryMin = (salary: string) => {
            const match = salary.match(/ETB\s+([\d,]+)/);
            return match ? parseInt(match[1].replace(",", "")) : 0;
          };
          return getSalaryMin(a.salary) - getSalaryMin(b.salary);
        });
        break;
      case "applicants":
        filtered.sort((a, b) => a.applications - b.applications);
        break;
    }

    return filtered;
  }, [publishedJobs, searchQuery, selectedCategory, selectedLocation, selectedType, salaryRange, showOnlyVerified, showOnlyRemote, sortBy]);

  const toggleSaveJob = (jobId: number) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
      toast({
        title: "Job Removed",
        description: "Job removed from saved list",
      });
    } else {
      newSavedJobs.add(jobId);
      toast({
        title: "Job Saved",
        description: "Job added to your saved list",
      });
    }
    setSavedJobs(newSavedJobs);
  };

  const handleJobApplication = (jobTitle: string) => {
    toast({
      title: "Application Submitted",
      description: `Your application for "${jobTitle}" has been submitted successfully!`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-ethiopian-green-50 to-ethiopian-yellow-50 py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Job Vacancies</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your gateway to Ethiopia's best employment opportunities
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for jobs, companies, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg bg-background border-2"
              />
            </div>

            <div className="text-sm text-muted-foreground">
              Showing {filteredJobs.length} of {publishedJobs.length} jobs
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label} ({category.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location.value} value={location.value}>
                          {location.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Job Type Filter */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">Job Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Salary Range Filter */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">Salary Range</label>
                  <Select value={salaryRange} onValueChange={setSalaryRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {salaryRanges.map(range => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Additional Filters */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="verified"
                      checked={showOnlyVerified}
                      onCheckedChange={(checked) => setShowOnlyVerified(!!checked)}
                    />
                    <label htmlFor="verified" className="text-sm font-medium">
                      Verified employers only
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remote"
                      checked={showOnlyRemote}
                      onCheckedChange={(checked) => setShowOnlyRemote(!!checked)}
                    />
                    <label htmlFor="remote" className="text-sm font-medium">
                      Remote work available
                    </label>
                  </div>
                </div>

                {/* Clear Filters */}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedLocation("all");
                    setSelectedType("all");
                    setSalaryRange("all");
                    setShowOnlyVerified(false);
                    setShowOnlyRemote(false);
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Available Positions</h2>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                  <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                  <SelectItem value="applicants">Fewest Applicants</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Job Cards */}
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className={`hover:shadow-lg transition-shadow ${job.featured ? 'border-ethiopian-yellow-300 bg-ethiopian-yellow-50/30' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                          {job.featured && (
                            <Badge className="bg-ethiopian-yellow-500 text-white">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          {job.verified && (
                            <Badge variant="secondary" className="bg-ethiopian-green-100 text-ethiopian-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          {job.type === "Remote" && (
                            <Badge variant="outline">
                              <Globe className="w-3 h-3 mr-1" />
                              Remote
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3 mb-2">
                          {job.logo && (
                            <Avatar className="h-10 w-10 border-2 border-ethiopian-green-200">
                              <AvatarImage src={job.logo} alt={`${job.company} logo`} />
                              <AvatarFallback className="bg-ethiopian-green-100 text-ethiopian-green-700 font-semibold">
                                {job.logoFallback || job.company.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <span className="text-lg font-medium text-foreground">{job.company}</span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.postedDays} days ago
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {job.applications} applicants
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Deadline: {job.deadline}
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4">{job.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline">{job.type}</Badge>
                          <Badge variant="outline">{categories.find(c => c.value === job.category)?.label}</Badge>
                        </div>
                      </div>

                      <div className="ml-6 text-right">
                        <p className="text-xl font-semibold text-foreground mb-1">{job.salary}</p>
                        <p className="text-sm text-muted-foreground mb-4">per month</p>
                        
                        <div className="flex flex-col gap-2">
                          <Button 
                            className="bg-ethiopian-green-500 hover:bg-ethiopian-green-600"
                            onClick={() => handleJobApplication(job.title)}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Apply Now
                          </Button>
                          
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => toggleSaveJob(job.id)}
                              className={savedJobs.has(job.id) ? "bg-red-50 border-red-200" : ""}
                            >
                              <Heart className={`w-4 h-4 ${savedJobs.has(job.id) ? "fill-red-500 text-red-500" : ""}`} />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Requirements */}
                    {job.requirements && job.requirements.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Key Requirements:</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          {job.requirements.slice(0, 3).map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                          {job.requirements.length > 3 && (
                            <li className="text-primary">+ {job.requirements.length - 3} more requirements</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredJobs.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms to find more opportunities.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setSelectedLocation("all");
                      setSelectedType("all");
                      setSalaryRange("all");
                      setShowOnlyVerified(false);
                      setShowOnlyRemote(false);
                    }}
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Load More */}
            {filteredJobs.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Jobs
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
