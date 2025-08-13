import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Calendar,
  Clock,
  Users,
  Heart,
  Share2,
  MessageCircle,
  BookOpen,
  Star,
  AlertTriangle,
  Bell,
  Phone,
  Mail,
  ExternalLink,
  TrendingUp,
  Flag,
  Search,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function News() {
  const { content, getContentByType, likeContent, incrementViews, addComment } = useData();
  const { toast } = useToast();
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<number>>(new Set());
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  // Get news content from centralized data
  const newsContent = getContentByType("News & Announcements");
  
  // Filter content by category
  const filteredContent = newsContent.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.content || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get categories from actual data
  const categories = [
    { value: "all", label: "All Categories", count: newsContent.length },
    { value: "Government Update", label: "Government Updates", count: newsContent.filter(item => item.category === "Government Update").length },
    { value: "Scholarship", label: "Scholarships", count: newsContent.filter(item => item.category === "Scholarship").length },
    { value: "Training Program", label: "Training Programs", count: newsContent.filter(item => item.category === "Training Program").length },
  ];

  const handleLike = (id: number) => {
    if (!likedItems.has(id)) {
      likeContent(id);
      setLikedItems(new Set([...likedItems, id]));
      toast({
        title: "Liked!",
        description: "You liked this announcement",
      });
    }
  };

  const handleBookmark = (id: number, title: string) => {
    const newBookmarks = new Set(bookmarkedItems);
    if (newBookmarks.has(id)) {
      newBookmarks.delete(id);
      toast({
        title: "Bookmark Removed",
        description: `"${title}" removed from bookmarks`,
      });
    } else {
      newBookmarks.add(id);
      toast({
        title: "Bookmarked",
        description: `"${title}" added to bookmarks`,
      });
    }
    setBookmarkedItems(newBookmarks);
  };

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this announcement: ${title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Link copied to clipboard",
      });
    }
  };

  const handleReadMore = (id: number, title: string) => {
    incrementViews(id);
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleComment = (id: number) => {
    addComment(id);
    toast({
      title: "Comment Added",
      description: "Your comment has been added",
    });
  };

  const getUrgencyColor = (urgent?: boolean) => {
    return urgent ? "bg-red-100 text-red-800 border-red-200" : "bg-blue-100 text-blue-800 border-blue-200";
  };

  const getUrgencyIcon = (urgent?: boolean) => {
    return urgent ? <AlertTriangle className="h-4 w-4" /> : <Bell className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-ethiopian-red-50 to-ethiopian-yellow-50 py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">News & Announcements</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Stay updated with the latest government announcements, scholarships, and opportunities
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search news and announcements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
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

            <div className="text-sm text-muted-foreground mt-4">
              Showing {filteredContent.length} of {newsContent.length} announcements
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Featured/Urgent Announcements */}
        {filteredContent.filter(item => item.urgent || item.featured).length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Flag className="w-6 h-6 mr-2 text-ethiopian-red-500" />
              Breaking News & Featured Announcements
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {filteredContent.filter(item => item.urgent || item.featured).map((item) => (
                <Alert key={item.id} className={item.urgent ? "border-red-200 bg-red-50" : "border-yellow-200 bg-yellow-50"}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold">{item.title}</h3>
                        <Badge className={getUrgencyColor(item.urgent)}>
                          {getUrgencyIcon(item.urgent)}
                          <span className="ml-1">{item.urgent ? "Urgent" : "Featured"}</span>
                        </Badge>
                      </div>
                      <p className="text-sm">{item.description || item.content?.substring(0, 150) + "..."}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{item.createdAt}</span>
                        <Button 
                          size="sm" 
                          onClick={() => handleReadMore(item.id, item.title)}
                          className="bg-ethiopian-red-500 hover:bg-ethiopian-red-600"
                        >
                          Read More
                        </Button>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {/* All Announcements */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-ethiopian-green-500" />
            All Announcements ({filteredContent.length})
          </h2>

          {filteredContent.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      {item.featured && (
                        <Badge className="bg-ethiopian-yellow-500 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      {item.urgent && (
                        <Badge className="bg-red-500 text-white">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Urgent
                        </Badge>
                      )}
                      {item.category && (
                        <Badge variant="outline">{item.category}</Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {item.createdAt}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {item.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {item.likes} likes
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {item.comments} comments
                      </span>
                      <span>By {item.author}</span>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {expandedItems.has(item.id) 
                        ? item.content 
                        : (item.description || item.content?.substring(0, 200) + "...")
                      }
                    </p>

                    {/* Contact Information */}
                    {item.contactInfo && (
                      <div className="bg-muted p-4 rounded-lg mb-4">
                        <h4 className="font-semibold mb-2">Contact Information</h4>
                        <div className="space-y-2 text-sm">
                          {item.contactInfo.email && (
                            <div className="flex items-center space-x-2">
                              <Mail className="w-3 h-3" />
                              <span>{item.contactInfo.email}</span>
                            </div>
                          )}
                          {item.contactInfo.phone && (
                            <div className="flex items-center space-x-2">
                              <Phone className="w-3 h-3" />
                              <span>{item.contactInfo.phone}</span>
                            </div>
                          )}
                          {item.contactInfo.website && (
                            <div className="flex items-center space-x-2">
                              <ExternalLink className="w-3 h-3" />
                              <span>{item.contactInfo.website}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleReadMore(item.id, item.title)}
                        className="bg-ethiopian-green-500 hover:bg-ethiopian-green-600"
                      >
                        {expandedItems.has(item.id) ? "Show Less" : "Read More"}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleLike(item.id)}
                      >
                        <Heart className={`w-4 h-4 ${likedItems.has(item.id) ? 'text-red-500 fill-current' : ''}`} />
                        <span className="ml-1">{item.likes}</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleBookmark(item.id, item.title)}
                      >
                        <BookOpen className={`w-4 h-4 ${bookmarkedItems.has(item.id) ? 'text-blue-500 fill-current' : ''}`} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleShare(item.title)}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleComment(item.id)}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="ml-1">{item.comments}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredContent.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No announcements found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or category filter.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Statistics Section */}
        {newsContent.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-bold mb-6">News Statistics</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-ethiopian-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{newsContent.length}</div>
                  <div className="text-sm text-muted-foreground">Total Announcements</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{newsContent.filter(item => item.urgent).length}</div>
                  <div className="text-sm text-muted-foreground">Urgent Notices</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="h-8 w-8 text-ethiopian-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{newsContent.filter(item => item.featured).length}</div>
                  <div className="text-sm text-muted-foreground">Featured News</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{newsContent.reduce((sum, item) => sum + item.views, 0)}</div>
                  <div className="text-sm text-muted-foreground">Total Views</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
