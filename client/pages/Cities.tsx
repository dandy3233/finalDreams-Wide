import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MapPin, 
  Users, 
  Mountain, 
  Briefcase, 
  Building, 
  Globe, 
  Search,
  ArrowLeft,
  Star,
  Eye,
  Heart,
  Calendar,
  TrendingUp,
  Award,
  Camera,
  Navigation
} from 'lucide-react';
import { useCities } from '@/contexts/CitiesContext';

export default function Cities() {
  const { cityName } = useParams();
  const { cities, getCityByName } = useCities();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // If a specific city is requested
  if (cityName) {
    const city = getCityByName(cityName);
    
    if (!city) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">City Not Found</h1>
            <p className="text-muted-foreground mb-4">
              We don't have information about "{cityName}" yet.
            </p>
            <Button asChild>
              <Link to="/cities">Browse All Cities</Link>
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-ethiopian-green-50 via-ethiopian-yellow-50 to-ethiopian-red-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <Button variant="outline" asChild className="mb-4">
                <Link to="/cities" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Cities
                </Link>
              </Button>
            </div>
            
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                {city.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {city.region} • {city.description}
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="outline" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {city.population}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-2">
                  <Mountain className="h-4 w-4" />
                  {city.elevation}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  {city.jobsAvailable} Jobs
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* City Details */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Key Industries */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Key Industries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {city.keyIndustries.map((industry) => (
                      <Badge key={industry} variant="secondary" className="bg-ethiopian-green-100 text-ethiopian-green-800">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Attractions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Major Attractions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {city.attractions.map((attraction) => (
                      <div key={attraction} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Star className="h-4 w-4 text-ethiopian-yellow-500" />
                        <span>{attraction}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Map Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Navigation className="h-5 w-5" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <MapPin className="h-12 w-12 text-ethiopian-green-500 mx-auto mb-4" />
                    <p className="text-lg font-semibold mb-2">
                      {city.coordinates.lat}°N, {city.coordinates.lng}°E
                    </p>
                    <p className="text-muted-foreground">
                      Interactive map integration would be implemented here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-ethiopian-green-500" />
                      <span className="text-sm">Available Jobs</span>
                    </span>
                    <span className="font-semibold">{city.jobsAvailable}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-ethiopian-yellow-500" />
                      <span className="text-sm">Cultural Sites</span>
                    </span>
                    <span className="font-semibold">{city.culturalSites}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-ethiopian-red-500" />
                      <span className="text-sm">Historical Sites</span>
                    </span>
                    <span className="font-semibold">{city.historicalSites}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Explore {city.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full bg-ethiopian-green-500 hover:bg-ethiopian-green-600">
                    <Link to={`/jobs?city=${city.name}`}>
                      <Briefcase className="h-4 w-4 mr-2" />
                      View Jobs in {city.name}
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/culture?city=${city.name}`}>
                      <Globe className="h-4 w-4 mr-2" />
                      Cultural Content
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/history?city=${city.name}`}>
                      <Award className="h-4 w-4 mr-2" />
                      Historical Sites
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Cities listing page
  const filteredCities = cities.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         city.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || city.region.toLowerCase().includes(selectedRegion.toLowerCase());
    return matchesSearch && matchesRegion;
  });

  const regions = [...new Set(cities.map(city => city.region))];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-ethiopian-green-50 via-ethiopian-yellow-50 to-ethiopian-red-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Cities Across Ethiopia
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover opportunities and culture in Ethiopia's vibrant cities
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cities or regions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region.toLowerCase()}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCities.map((city) => (
            <Card key={city.id} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <CardTitle className="text-xl group-hover:text-ethiopian-green-600 transition-colors">
                      {city.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{city.region}</p>
                  </div>
                  <Badge variant="outline" className="text-ethiopian-green-600 border-ethiopian-green-200">
                    {city.jobsAvailable} Jobs
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    <span>Population: {city.population}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mountain className="h-3 w-3" />
                    <span>Elevation: {city.elevation}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {city.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {city.keyIndustries.slice(0, 3).map((industry) => (
                    <Badge key={industry} variant="secondary" className="text-xs">
                      {industry}
                    </Badge>
                  ))}
                  {city.keyIndustries.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{city.keyIndustries.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {city.culturalSites}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      {city.historicalSites}
                    </span>
                  </div>
                  
                  <Button asChild size="sm" variant="outline" className="group-hover:bg-ethiopian-green-500 group-hover:text-white transition-colors">
                    <Link to={`/cities/${city.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      Explore
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredCities.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Cities Found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
