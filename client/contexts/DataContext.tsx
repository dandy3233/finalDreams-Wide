import React, { createContext, useContext, useState, useEffect } from 'react';

export interface JobData {
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
  logo?: string;
  logoFallback?: string;
  postedDays: number;
}

export interface ContentItem {
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
  description?: string;
  image?: string;
  quiz?: {
    questions: Array<{
      id: number;
      question: string;
      options: string[];
      correct: number;
      explanation: string;
    }>;
  };
  timeline?: Array<{
    year: string;
    event: string;
    description: string;
  }>;
  contactInfo?: {
    email?: string;
    phone?: string;
    website?: string;
  };
}

export interface User {
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

interface DataContextType {
  // Jobs
  jobs: JobData[];
  addJob: (job: Partial<JobData>) => void;
  updateJob: (id: number, job: Partial<JobData>) => void;
  deleteJob: (id: number) => void;
  getJobsByCategory: (category: string) => JobData[];
  getPublishedJobs: () => JobData[];
  
  // Content
  content: ContentItem[];
  addContent: (content: Partial<ContentItem>) => void;
  updateContent: (id: number, content: Partial<ContentItem>) => void;
  deleteContent: (id: number) => void;
  getContentByType: (type: string) => ContentItem[];
  getPublishedContent: (type?: string) => ContentItem[];
  
  // Users
  users: User[];
  addUser: (user: Partial<User>) => void;
  updateUser: (id: number, user: Partial<User>) => void;
  deleteUser: (id: number) => void;
  
  // Utility functions
  likeContent: (id: number) => void;
  incrementViews: (id: number) => void;
  addComment: (id: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const STORAGE_KEYS = {
  JOBS: 'dreams_wide_jobs',
  CONTENT: 'dreams_wide_content',
  USERS: 'dreams_wide_users'
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Initialize data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    // Load or create initial jobs data
    const savedJobs = localStorage.getItem(STORAGE_KEYS.JOBS);
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    } else {
      const initialJobs: JobData[] = [
        {
          id: 1,
          title: "Senior Software Developer",
          company: "Ethiopian Airlines",
          category: "airlines",
          location: "Addis Ababa",
          salary: "ETB 25,000 - 35,000",
          type: "Full-time",
          status: "published",
          applications: 45,
          deadline: "2024-02-15",
          featured: true,
          verified: true,
          description: "We are seeking a Senior Software Developer to join our IT team and help modernize our airline systems.",
          requirements: ["Bachelor's degree in Computer Science", "5+ years of experience", "React, Node.js, Python", "Database design experience"],
          logo: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=120&h=120&fit=crop&crop=center",
          logoFallback: "ET",
          postedDays: 2
        },
        {
          id: 2,
          title: "Banking Operations Manager",
          company: "Commercial Bank of Ethiopia",
          category: "banking",
          location: "Addis Ababa",
          salary: "ETB 30,000 - 45,000",
          type: "Full-time",
          status: "published",
          applications: 67,
          deadline: "2024-02-20",
          featured: true,
          verified: true,
          description: "Lead banking operations and ensure efficient customer service delivery across our branch network.",
          requirements: ["Bachelor's in Finance/Banking", "7+ years banking experience", "Management experience", "Strong analytical skills"],
          logo: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=120&h=120&fit=crop&crop=center",
          logoFallback: "CB",
          postedDays: 1
        },
        {
          id: 3,
          title: "Airport Security Officer",
          company: "Ethiopian Airports Enterprise",
          category: "airports",
          location: "Bole International Airport",
          salary: "ETB 15,000 - 20,000",
          type: "Full-time",
          status: "published",
          applications: 123,
          deadline: "2024-02-10",
          featured: false,
          verified: true,
          description: "Ensure airport security and safety protocols are maintained at all times.",
          requirements: ["High school diploma", "Security training certification", "Physical fitness", "Background check clearance"],
          logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=120&h=120&fit=crop&crop=center",
          logoFallback: "EA",
          postedDays: 3
        },
        {
          id: 4,
          title: "Data Analyst",
          company: "Ministry of Health",
          category: "government",
          location: "Addis Ababa",
          salary: "ETB 18,000 - 25,000",
          type: "Full-time",
          status: "published",
          applications: 89,
          deadline: "2024-02-25",
          featured: false,
          verified: true,
          description: "Analyze health data to support evidence-based policy making and program planning.",
          requirements: ["Bachelor's in Statistics/Data Science", "R/Python programming", "Data visualization tools", "Public health knowledge"],
          logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=120&h=120&fit=crop&crop=center",
          logoFallback: "MH",
          postedDays: 4
        },
        {
          id: 5,
          title: "Project Manager",
          company: "World Vision Ethiopia",
          category: "ngo",
          location: "Multiple Locations",
          salary: "ETB 35,000 - 50,000",
          type: "Full-time",
          status: "published",
          applications: 34,
          deadline: "2024-03-01",
          featured: true,
          verified: true,
          description: "Manage development projects focused on child welfare and community development.",
          requirements: ["Master's in Development Studies", "PMP certification preferred", "5+ years project management", "Field work experience"],
          logo: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=120&h=120&fit=crop&crop=center",
          logoFallback: "WV",
          postedDays: 5
        },
        {
          id: 6,
          title: "English Teacher",
          company: "International Community School",
          category: "education",
          location: "Addis Ababa",
          salary: "ETB 20,000 - 28,000",
          type: "Full-time",
          status: "published",
          applications: 56,
          deadline: "2024-02-18",
          featured: false,
          verified: true,
          description: "Teach English to international students in grades 6-12 using modern pedagogical approaches.",
          requirements: ["Bachelor's in English/Education", "Teaching certification", "2+ years experience", "Native/near-native English"],
          logo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=120&h=120&fit=crop&crop=center",
          logoFallback: "IC",
          postedDays: 6
        },
        {
          id: 7,
          title: "Mechanical Engineer",
          company: "Ethiopian Electric Power",
          category: "engineering",
          location: "Dire Dawa",
          salary: "ETB 22,000 - 32,000",
          type: "Full-time",
          status: "published",
          applications: 78,
          deadline: "2024-02-28",
          featured: false,
          verified: true,
          description: "Design and maintain power generation equipment and infrastructure.",
          requirements: ["Bachelor's in Mechanical Engineering", "Professional license", "Power systems knowledge", "CAD software proficiency"],
          logo: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=120&h=120&fit=crop&crop=center",
          logoFallback: "EP",
          postedDays: 7
        },
        {
          id: 8,
          title: "Digital Marketing Specialist",
          company: "Dashen Bank",
          category: "banking",
          location: "Addis Ababa",
          salary: "ETB 16,000 - 22,000",
          type: "Contract",
          status: "published",
          applications: 92,
          deadline: "2024-02-12",
          featured: false,
          verified: true,
          description: "Develop and execute digital marketing campaigns to promote our banking services.",
          requirements: ["Bachelor's in Marketing", "Google Ads certified", "Social media management", "Analytics tools experience"],
          logo: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b696?w=120&h=120&fit=crop&crop=center",
          logoFallback: "DB",
          postedDays: 8
        }
      ];
      setJobs(initialJobs);
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(initialJobs));
    }

    // Load or create initial content data
    const savedContent = localStorage.getItem(STORAGE_KEYS.CONTENT);
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    } else {
      const initialContent: ContentItem[] = [
        {
          id: 1,
          title: "Timkat Festival Celebration Guide 2024",
          type: "Cultural Content",
          status: "published",
          author: "Cultural Team",
          createdAt: "2024-01-15",
          updatedAt: "2024-01-15",
          views: 1245,
          likes: 89,
          comments: 23,
          featured: true,
          content: "Timkat, the Ethiopian Orthodox celebration of Epiphany, is one of the most colorful and spiritual festivals in Ethiopia. Celebrated on January 19th (or 20th in leap years), it commemorates the baptism of Jesus Christ in the River Jordan.",
          category: "Festival",
          description: "A comprehensive guide to celebrating Timkat festival in Ethiopia.",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop"
        },
        {
          id: 2,
          title: "Ethiopian Coffee Ceremony Tradition",
          type: "Cultural Content",
          status: "published",
          author: "Cultural Team",
          createdAt: "2024-01-14",
          updatedAt: "2024-01-14",
          views: 892,
          likes: 145,
          comments: 34,
          featured: true,
          content: "The Ethiopian coffee ceremony is an integral part of Ethiopian culture and daily life. This ancient tradition brings communities together through the preparation and sharing of coffee.",
          category: "Tradition",
          description: "Learn about the sacred coffee ceremony that binds Ethiopian communities.",
          image: "https://images.unsplash.com/photo-1509785307647-15c773c9ded8?w=800&h=400&fit=crop"
        },
        {
          id: 3,
          title: "Emperor Menelik II: Architect of Modern Ethiopia",
          type: "Historical Post",
          status: "published",
          author: "History Department",
          createdAt: "2024-01-13",
          updatedAt: "2024-01-13",
          views: 2156,
          likes: 234,
          comments: 67,
          featured: true,
          content: "Emperor Menelik II (1844-1913) was one of Ethiopia's most influential rulers, credited with modernizing the country and maintaining its independence during the colonial period.",
          category: "Historical Figure",
          description: "Exploring the legacy of Emperor Menelik II in modern Ethiopia.",
          image: "https://images.unsplash.com/photo-1594736797933-d0701ba0d275?w=800&h=400&fit=crop"
        },
        {
          id: 4,
          title: "Lalibela: Ethiopia's New Jerusalem",
          type: "Historical Post",
          status: "published",
          author: "History Department",
          createdAt: "2024-01-12",
          updatedAt: "2024-01-12",
          views: 1876,
          likes: 298,
          comments: 45,
          featured: true,
          content: "The rock-hewn churches of Lalibela, carved directly into volcanic rock in the 12th century, represent one of the world's most remarkable architectural achievements.",
          category: "Historical Place",
          description: "Discover the magnificent rock churches of Lalibela, Ethiopia's spiritual heart.",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop"
        },
        {
          id: 5,
          title: "New University Scholarships Available for 2024",
          type: "News & Announcements",
          status: "published",
          author: "Education Ministry",
          createdAt: "2024-01-11",
          updatedAt: "2024-01-11",
          views: 3245,
          likes: 456,
          comments: 89,
          featured: true,
          urgent: true,
          content: "The Ministry of Education announces new scholarship opportunities for Ethiopian students pursuing higher education in various fields.",
          category: "Scholarship",
          description: "Apply now for fully-funded scholarships to top universities.",
          contactInfo: {
            email: "scholarships@moe.gov.et",
            phone: "+251-11-155-0000",
            website: "www.moe.gov.et/scholarships"
          }
        },
        {
          id: 6,
          title: "Ethiopian Cultural Quiz Challenge",
          type: "Cultural Content",
          status: "published",
          author: "Cultural Team",
          createdAt: "2024-01-10",
          updatedAt: "2024-01-10",
          views: 567,
          likes: 78,
          comments: 12,
          featured: false,
          content: "Test your knowledge of Ethiopian culture, traditions, and history with our interactive quiz.",
          category: "Quiz",
          description: "Challenge yourself with questions about Ethiopian heritage.",
          quiz: {
            questions: [
              {
                id: 1,
                question: "What is the traditional Ethiopian New Year called?",
                options: ["Enkutatash", "Timkat", "Meskel", "Genna"],
                correct: 0,
                explanation: "Enkutatash is the Ethiopian New Year celebrated on September 11th (or 12th in leap years)."
              },
              {
                id: 2,
                question: "Which ancient kingdom is considered the predecessor to modern Ethiopia?",
                options: ["Nubia", "Kush", "Aksum", "Sheba"],
                correct: 2,
                explanation: "The Kingdom of Aksum was a major trading empire that existed from approximately 100-960 CE."
              }
            ]
          }
        }
      ];
      setContent(initialContent);
      localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(initialContent));
    }

    // Load or create initial users data
    const savedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      const initialUsers: User[] = [
        {
          id: 1,
          name: "Dawit Tadesse",
          email: "dawit.t@email.com",
          role: "user",
          status: "active",
          joinDate: "2024-01-10",
          lastActive: "2024-01-15",
          posts: 12,
          verified: true,
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=center"
        },
        {
          id: 2,
          name: "Hanan Ahmed",
          email: "hanan.a@email.com",
          role: "user",
          status: "active",
          joinDate: "2024-01-08",
          lastActive: "2024-01-14",
          posts: 8,
          verified: true,
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b142?w=120&h=120&fit=crop&crop=center"
        }
      ];
      setUsers(initialUsers);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialUsers));
    }
  };

  // Job functions
  const addJob = (jobData: Partial<JobData>) => {
    const newJob: JobData = {
      id: Date.now(),
      title: jobData.title || '',
      company: jobData.company || '',
      category: jobData.category || '',
      location: jobData.location || '',
      salary: jobData.salary || '',
      type: jobData.type || 'Full-time',
      status: 'published',
      applications: 0,
      deadline: jobData.deadline || '',
      featured: jobData.featured || false,
      verified: true,
      description: jobData.description || '',
      requirements: jobData.requirements || [],
      logo: jobData.logo,
      logoFallback: jobData.logoFallback || jobData.company?.charAt(0).toUpperCase() || 'CO',
      postedDays: 0
    };

    const updatedJobs = [...jobs, newJob];
    setJobs(updatedJobs);
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(updatedJobs));
  };

  const updateJob = (id: number, jobData: Partial<JobData>) => {
    const updatedJobs = jobs.map(job => 
      job.id === id ? { ...job, ...jobData } : job
    );
    setJobs(updatedJobs);
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(updatedJobs));
  };

  const deleteJob = (id: number) => {
    const updatedJobs = jobs.filter(job => job.id !== id);
    setJobs(updatedJobs);
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(updatedJobs));
  };

  const getJobsByCategory = (category: string) => {
    return jobs.filter(job => job.category === category && job.status === 'published');
  };

  const getPublishedJobs = () => {
    return jobs.filter(job => job.status === 'published');
  };

  // Content functions
  const addContent = (contentData: Partial<ContentItem>) => {
    const newContent: ContentItem = {
      id: Date.now(),
      title: contentData.title || '',
      type: contentData.type || 'Cultural Content',
      status: 'published',
      author: contentData.author || 'Admin',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0,
      comments: 0,
      featured: contentData.featured || false,
      content: contentData.content || '',
      category: contentData.category,
      description: contentData.description,
      image: contentData.image,
      urgent: contentData.urgent,
      contactInfo: contentData.contactInfo,
      quiz: contentData.quiz,
      timeline: contentData.timeline
    };

    const updatedContent = [...content, newContent];
    setContent(updatedContent);
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(updatedContent));
  };

  const updateContent = (id: number, contentData: Partial<ContentItem>) => {
    const updatedContent = content.map(item => 
      item.id === id ? { ...item, ...contentData, updatedAt: new Date().toISOString().split('T')[0] } : item
    );
    setContent(updatedContent);
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(updatedContent));
  };

  const deleteContent = (id: number) => {
    const updatedContent = content.filter(item => item.id !== id);
    setContent(updatedContent);
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(updatedContent));
  };

  const getContentByType = (type: string) => {
    return content.filter(item => item.type === type && item.status === 'published');
  };

  const getPublishedContent = (type?: string) => {
    if (type) {
      return content.filter(item => item.type === type && item.status === 'published');
    }
    return content.filter(item => item.status === 'published');
  };

  // User functions
  const addUser = (userData: Partial<User>) => {
    const newUser: User = {
      id: Date.now(),
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'user',
      status: userData.status || 'active',
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      posts: 0,
      verified: false,
      avatar: userData.avatar
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));
  };

  const updateUser = (id: number, userData: Partial<User>) => {
    const updatedUsers = users.map(user => 
      user.id === id ? { ...user, ...userData } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));
  };

  const deleteUser = (id: number) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));
  };

  // Utility functions
  const likeContent = (id: number) => {
    const updatedContent = content.map(item => 
      item.id === id ? { ...item, likes: item.likes + 1 } : item
    );
    setContent(updatedContent);
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(updatedContent));
  };

  const incrementViews = (id: number) => {
    const updatedContent = content.map(item => 
      item.id === id ? { ...item, views: item.views + 1 } : item
    );
    setContent(updatedContent);
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(updatedContent));
  };

  const addComment = (id: number) => {
    const updatedContent = content.map(item => 
      item.id === id ? { ...item, comments: item.comments + 1 } : item
    );
    setContent(updatedContent);
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(updatedContent));
  };

  const value = {
    // Jobs
    jobs,
    addJob,
    updateJob,
    deleteJob,
    getJobsByCategory,
    getPublishedJobs,
    
    // Content
    content,
    addContent,
    updateContent,
    deleteContent,
    getContentByType,
    getPublishedContent,
    
    // Users
    users,
    addUser,
    updateUser,
    deleteUser,
    
    // Utilities
    likeContent,
    incrementViews,
    addComment
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
