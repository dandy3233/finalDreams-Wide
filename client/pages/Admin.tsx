import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import {
  BarChart3,
  Users,
  Briefcase,
  BookOpen,
  Landmark,
  Newspaper,
  Plus,
  Edit,
  Trash2,
  Eye,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Star,
  MessageSquare,
  Heart,
  Filter,
  Search,
  Download,
  Settings,
  LogOut,
  Save,
  PieChart,
  Activity,
  Globe,
  Building2,
  Award,
  UserCheck,
  UserX,
  Flag,
  Upload,
  ImageIcon,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { useNavigate } from "react-router-dom";
import { LogoutButton, SessionStatusIndicator } from "@/components/LogoutButton";

interface ContentItem {
  id: number;
  title: string;
  type: string;
  status: "published" | "draft" | "pending" | "rejected";
  author: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
  urgent?: boolean;
  content?: string;
  category?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "moderator" | "admin";
  status: "active" | "suspended" | "banned";
  joinDate: string;
  lastActive: string;
  posts: number;
  avatar?: string;
  verified: boolean;
}

interface JobData {
  id: number;
  title: string;
  company: string;
  category: string;
  location: string;
  salary: string;
  type: string;
  status: string;
  applications: number;
  deadline: string;
  featured: boolean;
  verified: boolean;
  description?: string;
  requirements?: string[];
}

const STORAGE_KEYS = {
  JOBS: 'admin_jobs',
  CONTENT: 'admin_content',
  USERS: 'admin_users'
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{show: boolean, item: any, type: string}>({show: false, item: null, type: ''});
  
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Use centralized data management
  const {
    jobs,
    content,
    users,
    addJob,
    updateJob,
    deleteJob,
    addContent,
    updateContent,
    deleteContent,
    updateUser,
    deleteUser
  } = useData();

  // Form states
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [imagePreview, setImagePreview] = useState<string>('');
  const [logoPreview, setLogoPreview] = useState<string>('');


  // Removed handleLogout - now handled by LogoutButton component

  // CRUD Operations using centralized data functions
  const handleCreateJob = (jobData: Partial<JobData>) => {
    addJob(jobData);
    toast({
      title: "Job Created",
      description: `"${jobData.title}" has been created successfully`,
    });
  };

  const handleUpdateJob = (id: number, jobData: Partial<JobData>) => {
    updateJob(id, jobData);
    toast({
      title: "Job Updated",
      description: "Job has been updated successfully",
    });
  };

  const handleDeleteJob = (id: number) => {
    deleteJob(id);
    toast({
      title: "Job Deleted",
      description: "Job has been deleted successfully",
      variant: "destructive",
    });
  };

  const handleCreateContent = (contentData: Partial<ContentItem>) => {
    addContent({...contentData, author: user?.name || 'Admin'});
    toast({
      title: "Content Created",
      description: `"${contentData.title}" has been created successfully`,
    });
  };

  const handleUpdateContent = (id: number, contentData: Partial<ContentItem>) => {
    updateContent(id, contentData);
    toast({
      title: "Content Updated",
      description: "Content has been updated successfully",
    });
  };

  const handleDeleteContent = (id: number) => {
    deleteContent(id);
    toast({
      title: "Content Deleted",
      description: "Content has been deleted successfully",
      variant: "destructive",
    });
  };

  const handleUpdateUser = (id: number, userData: Partial<User>) => {
    updateUser(id, userData);
    toast({
      title: "User Updated",
      description: "User has been updated successfully",
    });
  };

  const handleDeleteUser = (id: number) => {
    deleteUser(id);
    toast({
      title: "User Deleted",
      description: "User has been deleted successfully",
      variant: "destructive",
    });
  };

  // File upload handlers
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, isLogo: boolean = false) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (isLogo) {
          setLogoPreview(result);
          setFormData({...formData, logo: result});
        } else {
          setImagePreview(result);
          setFormData({...formData, image: result});
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (isLogo: boolean = false) => {
    if (isLogo) {
      setLogoPreview('');
      setFormData({...formData, logo: undefined});
    } else {
      setImagePreview('');
      setFormData({...formData, image: undefined});
    }
  };

  // Generic handlers
  const handleEdit = (item: any, type: string) => {
    setEditingItem({...item, type});
    setFormData(item);
    setImagePreview(item.image || '');
    setLogoPreview(item.logo || '');
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;

    switch (editingItem.type) {
      case 'job':
        handleUpdateJob(editingItem.id, formData);
        break;
      case 'content':
        handleUpdateContent(editingItem.id, formData);
        break;
      case 'user':
        handleUpdateUser(editingItem.id, formData);
        break;
    }

    setShowEditDialog(false);
    setEditingItem(null);
    setFormData({});
    setImagePreview('');
    setLogoPreview('');
  };

  const handleDelete = (item: any, type: string) => {
    setDeleteConfirm({show: true, item, type});
  };

  const confirmDelete = () => {
    const { item, type } = deleteConfirm;
    
    switch (type) {
      case 'job':
        handleDeleteJob(item.id);
        break;
      case 'content':
        handleDeleteContent(item.id);
        break;
      case 'user':
        handleDeleteUser(item.id);
        break;
    }

    setDeleteConfirm({show: false, item: null, type: ''});
  };

  // Utility functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "draft":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "rejected":
      case "suspended":
      case "banned":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  // Dashboard stats calculated from actual data
  const dashboardStats = {
    totalJobs: jobs.length,
    totalUsers: users.length,
    totalContent: content.length,
    pendingReviews: content.filter(item => item.status === 'pending').length,
    jobsGrowth: 12.5,
    usersGrowth: 8.3,
    contentGrowth: 15.7,
    reviewsGrowth: -5.2,
    activeToday: users.filter(user => user.status === 'active').length,
    newApplications: jobs.reduce((sum, job) => sum + job.applications, 0),
    reportedContent: 7,
    monthlyViews: content.reduce((sum, item) => sum + item.views, 0)
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="h-8 w-8 text-ethiopian-green-500" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Dreams Wide Admin</h1>
                  <p className="text-sm text-muted-foreground">Administrator Control Panel</p>
                </div>
              </div>
              <Badge className="bg-ethiopian-yellow-500 text-white">
                <Activity className="h-3 w-3 mr-1" />
                Live Dashboard
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <div className="text-right">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              )}

              <SessionStatusIndicator />

              <Badge variant="outline" className="text-green-600 border-green-200">
                <Globe className="h-3 w-3 mr-1" />
                System Online
              </Badge>

              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>

              <LogoutButton variant="outline" size="sm" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-7 bg-muted">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Jobs
            </TabsTrigger>
            <TabsTrigger value="culture" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Culture
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Landmark className="h-4 w-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              News
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="moderation" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Moderation
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    className="bg-ethiopian-green-500 hover:bg-ethiopian-green-600"
                    onClick={() => setActiveTab("jobs")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Job
                  </Button>
                  <Button 
                    className="bg-ethiopian-yellow-500 hover:bg-ethiopian-yellow-600 text-white"
                    onClick={() => setActiveTab("news")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add News
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("moderation")}>
                    <Eye className="h-4 w-4 mr-2" />
                    Review Content
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("users")}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-ethiopian-green-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalJobs}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {getGrowthIcon(dashboardStats.jobsGrowth)}
                    <span>+{dashboardStats.jobsGrowth}% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalUsers}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {getGrowthIcon(dashboardStats.usersGrowth)}
                    <span>+{dashboardStats.usersGrowth}% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Content</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalContent}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {getGrowthIcon(dashboardStats.contentGrowth)}
                    <span>+{dashboardStats.contentGrowth}% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.pendingReviews}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>Needs attention</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Content ({content.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {content.slice(0, 4).map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium truncate">{item.title}</p>
                            {item.featured && <Star className="h-4 w-4 text-yellow-500" />}
                            {item.urgent && <AlertTriangle className="h-4 w-4 text-red-500" />}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{item.type}</span>
                            <span>���</span>
                            <span>{item.author}</span>
                            <Badge className={getStatusColor(item.status)} variant="outline">
                              {item.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {item.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {item.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              {item.comments}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(item, 'content')}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Recent Users ({users.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.slice(0, 4).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{user.name}</p>
                              {user.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="outline">{user.role}</Badge>
                              <Badge className={getStatusColor(user.status)} variant="outline">
                                {user.status}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {user.posts} posts • Joined {user.joinDate}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(user, 'user')}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Shield className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Jobs Management Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Job Vacancies Management</h2>
                <p className="text-muted-foreground">Manage and moderate job postings ({jobs.length} total)</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-ethiopian-green-500 hover:bg-ethiopian-green-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Job
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Job Posting</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="jobTitle">Job Title</Label>
                          <Input 
                            id="jobTitle" 
                            placeholder="Enter job title"
                            value={formData.title || ''}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="company">Company</Label>
                          <Input 
                            id="company" 
                            placeholder="Company name"
                            value={formData.company || ''}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select onValueChange={(value) => setFormData({...formData, category: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Banking">Banking & Finance</SelectItem>
                              <SelectItem value="Airlines">Ethiopian Airlines</SelectItem>
                              <SelectItem value="Government">Government</SelectItem>
                              <SelectItem value="NGO">NGO & International</SelectItem>
                              <SelectItem value="Technology">Technology</SelectItem>
                              <SelectItem value="Education">Education</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input 
                            id="location" 
                            placeholder="Job location"
                            value={formData.location || ''}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="salary">Salary Range</Label>
                          <Input 
                            id="salary" 
                            placeholder="ETB 15,000 - 25,000"
                            value={formData.salary || ''}
                            onChange={(e) => setFormData({...formData, salary: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="deadline">Application Deadline</Label>
                          <Input 
                            id="deadline" 
                            type="date"
                            value={formData.deadline || ''}
                            onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="description">Job Description</Label>
                        <Textarea 
                          id="description" 
                          placeholder="Enter job description" 
                          rows={4}
                          value={formData.description || ''}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="jobLogo">Company Logo</Label>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <Input
                              id="jobLogo"
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, true)}
                              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-ethiopian-green-50 file:text-ethiopian-green-700 hover:file:bg-ethiopian-green-100"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => document.getElementById('jobLogo')?.click()}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Logo
                            </Button>
                          </div>
                          {logoPreview && (
                            <div className="relative inline-block">
                              <img
                                src={logoPreview}
                                alt="Logo preview"
                                className="w-20 h-20 object-cover rounded-lg border"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                onClick={() => removeImage(true)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="featured"
                          checked={formData.featured || false}
                          onCheckedChange={(checked) => setFormData({...formData, featured: !!checked})}
                        />
                        <Label htmlFor="featured">Mark as featured job</Label>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                        Cancel
                      </Button>
                      <Button 
                        className="bg-ethiopian-green-500 hover:bg-ethiopian-green-600"
                        onClick={() => {
                          handleCreateJob(formData);
                        setShowCreateDialog(false);
                        setFormData({});
                        setImagePreview('');
                        setLogoPreview('');
                        }}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Create Job
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Job Listings ({jobs.length})</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search jobs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="pending">Pending Review</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs
                      .filter(job => 
                        (statusFilter === 'all' || job.status === statusFilter) &&
                        (searchQuery === '' || 
                         job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()))
                      )
                      .map((job) => (
                      <TableRow key={job.id}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{job.title}</span>
                            {job.featured && <Star className="h-4 w-4 text-yellow-500" />}
                            {job.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                            {job.logo && (
                              <div title="Has logo">
                                <ImageIcon className="h-4 w-4 text-blue-500" />
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {job.logo ? (
                              <img
                                src={job.logo}
                                alt={`${job.company} logo`}
                                className="h-6 w-6 object-cover rounded"
                              />
                            ) : (
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                            )}
                            {job.company}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{job.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            {job.applications}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {job.deadline}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEdit(job, 'job')}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600"
                              onClick={() => handleDelete(job, 'job')}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cultural Content Tab */}
          <TabsContent value="culture" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Cultural Content Management</h2>
                <p className="text-muted-foreground">Manage festivals, traditions, and cultural educational content</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-ethiopian-green-500 hover:bg-ethiopian-green-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Cultural Content
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create Cultural Content</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="culturalTitle">Title</Label>
                      <Input 
                        id="culturalTitle" 
                        placeholder="Enter content title"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="culturalType">Content Type</Label>
                      <Select onValueChange={(value) => setFormData({...formData, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cultural Content">Festival</SelectItem>
                          <SelectItem value="Cultural Content">Tradition</SelectItem>
                          <SelectItem value="Cultural Content">Cultural Quiz</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="culturalContent">Content</Label>
                      <Textarea 
                        id="culturalContent" 
                        placeholder="Enter content description" 
                        rows={6}
                        value={formData.content || ''}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="culturalImage">Content Image</Label>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Input
                            id="culturalImage"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e)}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-ethiopian-green-50 file:text-ethiopian-green-700 hover:file:bg-ethiopian-green-100"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById('culturalImage')?.click()}
                          >
                            <ImageIcon className="h-4 w-4 mr-2" />
                            Upload Image
                          </Button>
                        </div>
                        {imagePreview && (
                          <div className="relative inline-block">
                            <img
                              src={imagePreview}
                              alt="Content preview"
                              className="w-32 h-20 object-cover rounded-lg border"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                              onClick={() => removeImage()}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="culturalFeatured"
                        checked={formData.featured || false}
                        onCheckedChange={(checked) => setFormData({...formData, featured: !!checked})}
                      />
                      <Label htmlFor="culturalFeatured">Mark as featured content</Label>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button 
                      className="bg-ethiopian-green-500 hover:bg-ethiopian-green-600"
                      onClick={() => {
                        handleCreateContent(formData);
                        setFormData({});
                        setImagePreview('');
                        setLogoPreview('');
                      }}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Create Content
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-ethiopian-green-500">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Festivals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    {content.filter(item => item.type === 'Cultural Content' && item.title.includes('Festival')).length}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Active festival posts</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Published</span>
                      <span className="font-medium">
                        {content.filter(item => item.type === 'Cultural Content' && item.status === 'published').length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Pending</span>
                      <span className="font-medium">
                        {content.filter(item => item.type === 'Cultural Content' && item.status === 'pending').length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-ethiopian-yellow-500">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Traditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    {content.filter(item => item.type === 'Cultural Content' && item.title.includes('Tradition')).length}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Cultural traditions documented</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Published</span>
                      <span className="font-medium">
                        {content.filter(item => item.type === 'Cultural Content' && item.status === 'published').length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Draft</span>
                      <span className="font-medium">
                        {content.filter(item => item.type === 'Cultural Content' && item.status === 'draft').length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Cultural Quiz
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">12</div>
                  <p className="text-sm text-muted-foreground mb-4">Quiz questions available</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Active</span>
                      <span className="font-medium">10</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Review</span>
                      <span className="font-medium">2</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cultural Content List */}
            <Card>
              <CardHeader>
                <CardTitle>Cultural Content ({content.filter(item => item.type === 'Cultural Content').length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content.filter(item => item.type === 'Cultural Content').map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-ethiopian-green-100 rounded-lg flex items-center justify-center overflow-hidden">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <BookOpen className="h-6 w-6 text-ethiopian-green-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.views} views • {item.likes} likes</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                            {item.featured && <Badge variant="outline">Featured</Badge>}
                            {item.image && <Badge variant="outline" className="text-green-600">Has Image</Badge>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(item, 'content')}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600"
                          onClick={() => handleDelete(item, 'content')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">User Management</h2>
                <p className="text-muted-foreground">Manage user accounts, roles, and permissions ({users.length} total)</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Users
                </Button>
              </div>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{users.length}</div>
                  <div className="text-sm text-muted-foreground">Total Users</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <UserCheck className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{users.filter(user => user.status === 'active').length}</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <UserX className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{users.filter(user => user.status === 'suspended').length}</div>
                  <div className="text-sm text-muted-foreground">Suspended Users</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{users.filter(user => user.role === 'moderator').length}</div>
                  <div className="text-sm text-muted-foreground">Moderators</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>User List ({users.length})</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox />
                      </TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Posts</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{user.name}</span>
                                {user.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={user.role === 'admin' ? 'border-red-200 text-red-700' : user.role === 'moderator' ? 'border-blue-200 text-blue-700' : 'border-gray-200 text-gray-700'}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell>{user.posts}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(user, 'user')}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Shield className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600"
                              onClick={() => handleDelete(user, 'user')}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Moderation Tab */}
          <TabsContent value="moderation" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Content Moderation</h2>
                <p className="text-muted-foreground">Review, approve, and moderate all platform content</p>
              </div>
              <Badge className="bg-red-100 text-red-800 border-red-200">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {dashboardStats.pendingReviews} Items Pending
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Pending Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{dashboardStats.pendingReviews}</div>
                  <p className="text-sm text-muted-foreground mb-4">Awaiting moderation</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Jobs</span>
                      <span className="font-medium">{jobs.filter(job => job.status === 'pending').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cultural</span>
                      <span className="font-medium">{content.filter(item => item.status === 'pending' && item.type === 'Cultural Content').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>News</span>
                      <span className="font-medium">{content.filter(item => item.status === 'pending' && item.type === 'News & Announcements').length}</span>
                    </div>
                  </div>
                  <Button className="mt-4 w-full" onClick={() => setActiveTab("overview")}>
                    <Eye className="h-4 w-4 mr-2" />
                    Review All
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Flag className="h-5 w-5" />
                    Reported Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">7</div>
                  <p className="text-sm text-muted-foreground mb-4">User reports</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Spam</span>
                      <span className="font-medium">4</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Inappropriate</span>
                      <span className="font-medium">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other</span>
                      <span className="font-medium">1</span>
                    </div>
                  </div>
                  <Button className="mt-4 w-full">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    View Reports
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Community Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">15</div>
                  <p className="text-sm text-muted-foreground mb-4">Active rules</p>
                  <div className="space-y-2 text-sm">
                    <div className="text-muted-foreground">Content standards</div>
                    <div className="text-muted-foreground">Community behavior</div>
                    <div className="text-muted-foreground">Posting guidelines</div>
                  </div>
                  <Button className="mt-4 w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Rules
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Moderation Queue */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Moderation Queue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content.filter(item => item.status === 'pending').map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-8 w-8 text-blue-600" />
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.type} • Submitted by {item.author}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{item.type}</Badge>
                            <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleUpdateContent(item.id, { status: 'published' })}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600"
                          onClick={() => handleUpdateContent(item.id, { status: 'rejected' })}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {content.filter(item => item.status === 'pending').length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>No items pending review</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* News & History Tabs - Simplified for brevity */}
          <TabsContent value="news" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">News & Announcements Management</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-ethiopian-green-500 hover:bg-ethiopian-green-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add News
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create News & Announcement</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="newsTitle">Title</Label>
                      <Input 
                        id="newsTitle" 
                        placeholder="Enter news title"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="newsType">Category</Label>
                      <Select onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Government Update">Government Update</SelectItem>
                          <SelectItem value="Scholarship">Scholarship</SelectItem>
                          <SelectItem value="Training Program">Training Program</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="newsContent">Content</Label>
                      <Textarea 
                        id="newsContent" 
                        placeholder="Enter news content" 
                        rows={6}
                        value={formData.content || ''}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="newsImage">News Image</Label>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Input
                            id="newsImage"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e)}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-ethiopian-green-50 file:text-ethiopian-green-700 hover:file:bg-ethiopian-green-100"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById('newsImage')?.click()}
                          >
                            <ImageIcon className="h-4 w-4 mr-2" />
                            Upload Image
                          </Button>
                        </div>
                        {imagePreview && (
                          <div className="relative inline-block">
                            <img
                              src={imagePreview}
                              alt="News preview"
                              className="w-32 h-20 object-cover rounded-lg border"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                              onClick={() => removeImage()}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsUrgent"
                        checked={formData.urgent || false}
                        onCheckedChange={(checked) => setFormData({...formData, urgent: !!checked})}
                      />
                      <Label htmlFor="newsUrgent">Mark as urgent</Label>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button 
                      className="bg-ethiopian-green-500 hover:bg-ethiopian-green-600"
                      onClick={() => {
                        handleCreateContent({...formData, type: 'News & Announcements'});
                        setFormData({});
                        setImagePreview('');
                        setLogoPreview('');
                      }}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Create News
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="text-lg">Government Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    {content.filter(item => item.type === 'News & Announcements' && item.category === 'Government Update').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Active announcements</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-lg">Scholarships</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    {content.filter(item => item.type === 'News & Announcements' && item.category === 'Scholarship').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Available opportunities</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="text-lg">Training Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    {content.filter(item => item.type === 'News & Announcements' && item.category === 'Training Program').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Training opportunities</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Historical Posts Management</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-ethiopian-green-500 hover:bg-ethiopian-green-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Historical Content
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create Historical Content</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="historicalTitle">Title</Label>
                      <Input 
                        id="historicalTitle" 
                        placeholder="Enter historical content title"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="historicalType">Type</Label>
                      <Select onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Historical Place">Historical Place</SelectItem>
                          <SelectItem value="Historical Figure">Historical Figure</SelectItem>
                          <SelectItem value="Timeline Event">Timeline Event</SelectItem>
                          <SelectItem value="Expert Article">Expert Article</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="historicalContent">Content</Label>
                      <Textarea
                        id="historicalContent"
                        placeholder="Enter historical content"
                        rows={6}
                        value={formData.content || ''}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="historicalImage">Content Image</Label>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Input
                            id="historicalImage"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e)}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-ethiopian-green-50 file:text-ethiopian-green-700 hover:file:bg-ethiopian-green-100"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById('historicalImage')?.click()}
                          >
                            <ImageIcon className="h-4 w-4 mr-2" />
                            Upload Image
                          </Button>
                        </div>
                        {imagePreview && (
                          <div className="relative inline-block">
                            <img
                              src={imagePreview}
                              alt="Historical content preview"
                              className="w-32 h-20 object-cover rounded-lg border"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                              onClick={() => removeImage()}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button 
                      className="bg-ethiopian-green-500 hover:bg-ethiopian-green-600"
                      onClick={() => {
                        handleCreateContent({...formData, type: 'Historical Post'});
                        setFormData({});
                        setImagePreview('');
                        setLogoPreview('');
                      }}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Create Content
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="text-lg">Historical Places</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    {content.filter(item => item.type === 'Historical Post' && item.category === 'Historical Place').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Places documented</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="text-lg">Historical Figures</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    {content.filter(item => item.type === 'Historical Post' && item.category === 'Historical Figure').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Figures featured</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="text-lg">Timeline Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    {content.filter(item => item.type === 'Historical Post' && item.category === 'Timeline Event').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Timeline entries</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-lg">Expert Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    {content.filter(item => item.type === 'Historical Post' && item.category === 'Expert Article').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Expert contributions</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Edit {editingItem?.type === 'job' ? 'Job' : editingItem?.type === 'content' ? 'Content' : 'User'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {editingItem?.type === 'job' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editTitle">Job Title</Label>
                    <Input 
                      id="editTitle" 
                      value={formData.title || ''}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editCompany">Company</Label>
                    <Input 
                      id="editCompany" 
                      value={formData.company || ''}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editLocation">Location</Label>
                    <Input 
                      id="editLocation" 
                      value={formData.location || ''}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editSalary">Salary</Label>
                    <Input 
                      id="editSalary" 
                      value={formData.salary || ''}
                      onChange={(e) => setFormData({...formData, salary: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="editDescription">Description</Label>
                  <Textarea
                    id="editDescription"
                    rows={4}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="editJobLogo">Company Logo</Label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Input
                        id="editJobLogo"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, true)}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-ethiopian-green-50 file:text-ethiopian-green-700 hover:file:bg-ethiopian-green-100"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('editJobLogo')?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Update Logo
                      </Button>
                    </div>
                    {logoPreview && (
                      <div className="relative inline-block">
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          onClick={() => removeImage(true)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {editingItem?.type === 'content' && (
              <>
                <div>
                  <Label htmlFor="editContentTitle">Title</Label>
                  <Input 
                    id="editContentTitle" 
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="editContentText">Content</Label>
                  <Textarea
                    id="editContentText"
                    rows={6}
                    value={formData.content || ''}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="editContentImage">Content Image</Label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Input
                        id="editContentImage"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e)}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-ethiopian-green-50 file:text-ethiopian-green-700 hover:file:bg-ethiopian-green-100"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('editContentImage')?.click()}
                      >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Update Image
                      </Button>
                    </div>
                    {imagePreview && (
                      <div className="relative inline-block">
                        <img
                          src={imagePreview}
                          alt="Content preview"
                          className="w-32 h-20 object-cover rounded-lg border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          onClick={() => removeImage()}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="editStatus">Status</Label>
                  <Select value={formData.status || ''} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {editingItem?.type === 'user' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editUserName">Name</Label>
                    <Input 
                      id="editUserName" 
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editUserEmail">Email</Label>
                    <Input 
                      id="editUserEmail" 
                      value={formData.email || ''}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editUserRole">Role</Label>
                    <Select value={formData.role || ''} onValueChange={(value) => setFormData({...formData, role: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="editUserStatus">Status</Label>
                    <Select value={formData.status || ''} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="banned">Banned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => {
              setShowEditDialog(false);
              setImagePreview('');
              setLogoPreview('');
            }}>
              Cancel
            </Button>
            <Button 
              className="bg-ethiopian-green-500 hover:bg-ethiopian-green-600"
              onClick={handleSaveEdit}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirm.show} onOpenChange={(open) => setDeleteConfirm({...deleteConfirm, show: open})}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this {deleteConfirm.type}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
