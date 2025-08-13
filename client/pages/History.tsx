import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  Heart,
  Share2,
  MessageCircle,
  BookOpen,
  Star,
  Trophy,
  Send,
  ChevronRight,
  ChevronDown,
  Globe,
  Crown,
  TreePine,
  Sparkles,
  Timer,
  ThumbsUp,
  Eye,
  Filter,
  Search,
  Play,
  Download,
  X,
  Plus,
  Bookmark,
  Share,
  CheckCircle,
  Map,
  Camera,
  Scroll,
  Building,
  Mountain,
  Zap,
  Library,
  Award,
  FileText,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Info,
  Layers,
  Compass,
  Target
} from "lucide-react";

interface HistoricalPlace {
  id: number;
  name: string;
  location: string;
  period: string;
  description: string;
  significance: string;
  image: string;
  coordinates: { lat: number; lng: number };
  unescoSite: boolean;
  category: string;
  visitorsAnnually: number;
  discoveryYear?: number;
  likes: number;
  comments: number;
  views: number;
}

interface HistoricalFigure {
  id: number;
  name: string;
  title: string;
  period: string;
  dynasty?: string;
  achievements: string[];
  biography: string;
  image: string;
  birthYear?: number;
  deathYear?: number;
  significance: string;
  likes: number;
  category: string;
  views: number;
}

interface TimelineEvent {
  id: number;
  year: number;
  title: string;
  description: string;
  category: string;
  significance: string;
  period: string;
  dynasty?: string;
  image?: string;
  participants?: string[];
  likes: number;
  shares: number;
}

interface HistoricalArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  featured: boolean;
  image: string;
  references: string[];
}

interface Comment {
  id: number;
  itemId: number;
  itemType: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  avatar: string;
}

interface UserSubmission {
  title: string;
  category: string;
  content: string;
  location?: string;
  period?: string;
  author: string;
  email: string;
  sources?: string;
}

export default function History() {
  const [activeTab, setActiveTab] = useState("places");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<HistoricalPlace | null>(null);
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(null);
  const [timelineFilter, setTimelineFilter] = useState("all");
  const [timelineRange, setTimelineRange] = useState({ start: 0, end: 2024 });
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(new Set());
  const [expandedArticles, setExpandedArticles] = useState<Set<number>>(new Set());
  const [showComments, setShowComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      itemId: 1,
      itemType: "place",
      author: "Dr. Zara Yacob",
      content: "Lalibela remains one of the most extraordinary architectural achievements in human history. The precision and spiritual devotion evident in these churches is breathtaking.",
      timestamp: "3 hours ago",
      likes: 23,
      avatar: "🏛️"
    },
    {
      id: 2,
      itemId: 1,
      itemType: "place",
      author: "Archaeological Team",
      content: "Recent ground-penetrating radar has revealed additional underground chambers that were previously unknown. The site continues to yield new discoveries.",
      timestamp: "1 day ago",
      likes: 45,
      avatar: "🔍"
    },
    {
      id: 3,
      itemId: 2,
      itemType: "place",
      author: "Heritage Specialist",
      content: "The Aksum obelisks represent the pinnacle of ancient Ethiopian engineering. Each one tells a story of royal power and religious devotion.",
      timestamp: "2 days ago",
      likes: 31,
      avatar: "⚱️"
    },
    {
      id: 4,
      itemId: 1,
      itemType: "figure",
      author: "History Professor",
      content: "The Queen of Sheba's influence on Ethiopian identity cannot be overstated. She remains a powerful symbol of African sovereignty and wisdom.",
      timestamp: "4 hours ago",
      likes: 67,
      avatar: "👑"
    },
    {
      id: 5,
      itemId: 1,
      itemType: "article",
      author: "Student Researcher",
      content: "This article beautifully captures the complexity of Aksumite civilization. The trade networks they established were truly international in scope.",
      timestamp: "6 hours ago",
      likes: 19,
      avatar: "📚"
    }
  ]);
  const [userSubmission, setUserSubmission] = useState<UserSubmission>({
    title: "",
    category: "",
    content: "",
    location: "",
    period: "",
    author: "",
    email: "",
    sources: ""
  });
  const [submittedContent, setSubmittedContent] = useState<UserSubmission[]>([]);

  // Updated state data with realistic numbers
  const [places, setPlaces] = useState<HistoricalPlace[]>([
    {
      id: 1,
      name: "Rock-Hewn Churches of Lalibela",
      location: "Lalibela, Amhara Region",
      period: "12th Century",
      description: "Eleven medieval monolithic cave churches carved directly into solid volcanic rock, representing one of the world's greatest architectural achievements.",
      significance: "Considered the 'New Jerusalem' of Ethiopia, these churches continue to serve as active places of worship and pilgrimage for Ethiopian Orthodox Christians. The complex engineering and spiritual symbolism make this site unique in world architecture.",
      image: "/placeholder.svg",
      coordinates: { lat: 12.0343, lng: 39.0351 },
      unescoSite: true,
      category: "unesco",
      visitorsAnnually: 100000,
      discoveryYear: 1200,
      likes: 2847,
      comments: 456,
      views: 15678
    },
    {
      id: 2,
      name: "Aksum Obelisks",
      location: "Aksum, Tigray Region",
      period: "3rd-4th Century",
      description: "Towering granite monuments marking the tombs of Aksumite royalty, standing as testaments to one of Africa's greatest ancient civilizations.",
      significance: "These obelisks represent the pinnacle of Aksumite architectural achievement and served as markers for underground burial chambers of kings and nobles. The largest standing obelisk reaches 23 meters in height.",
      image: "/placeholder.svg",
      coordinates: { lat: 14.1319, lng: 38.7168 },
      unescoSite: true,
      category: "ancient",
      visitorsAnnually: 75000,
      discoveryYear: 100,
      likes: 1923,
      comments: 298,
      views: 12456
    },
    {
      id: 3,
      name: "Gondar's Royal Enclosure",
      location: "Gondar, Amhara Region",
      period: "17th-18th Century",
      description: "The Fasil Ghebbi fortress-city containing six castles and several other buildings, showcasing unique Ethiopian architecture influenced by Nubian, Arabic, and Baroque styles.",
      significance: "Served as the residence of Ethiopian emperors and their royal court, representing the height of Ethiopian imperial power and architectural innovation during the Gondarine period.",
      image: "/placeholder.svg",
      coordinates: { lat: 12.6081, lng: 37.4712 },
      unescoSite: true,
      category: "medieval",
      visitorsAnnually: 65000,
      discoveryYear: 1636,
      likes: 1456,
      comments: 203,
      views: 9834
    },
    {
      id: 4,
      name: "Harar Jugol",
      location: "Harar, Harari Region",
      period: "10th-16th Century",
      description: "The fortified historic town known as the 'City of Saints' with 82 mosques and 102 shrines, representing a unique blend of African and Islamic culture.",
      significance: "Considered the fourth holiest city of Islam and a major center of Islamic learning and culture in the Horn of Africa. The unique architectural style blends local and Islamic influences.",
      image: "/placeholder.svg",
      coordinates: { lat: 9.3150, lng: 42.1179 },
      unescoSite: true,
      category: "medieval",
      visitorsAnnually: 45000,
      discoveryYear: 1000,
      likes: 1234,
      comments: 167,
      views: 7892
    },
    {
      id: 5,
      name: "Lower Valley of the Awash",
      location: "Afar Region",
      period: "4 Million Years Ago",
      description: "One of the most important paleontological sites in the world, where Lucy (Australopithecus afarensis) was discovered, revolutionizing our understanding of human evolution.",
      significance: "Provides crucial evidence for human evolution and contains some of the oldest hominid fossils ever found, making Ethiopia the 'Cradle of Humanity.' The site continues to yield new discoveries about our ancestors.",
      image: "/placeholder.svg",
      coordinates: { lat: 11.2500, lng: 40.5833 },
      unescoSite: true,
      category: "archaeology",
      visitorsAnnually: 25000,
      discoveryYear: 1974,
      likes: 3421,
      comments: 789,
      views: 23456
    },
    {
      id: 6,
      name: "Tiya Stone Pillars",
      location: "Tiya, Oromia Region",
      period: "10th-15th Century",
      description: "Archaeological site containing 36 decorated stone pillars (stelae) with mysterious symbols and carvings, representing an unknown civilization.",
      significance: "The largest concentration of stelae in Ethiopia, these monuments hold secrets of an ancient culture that remains largely mysterious to archaeologists. The symbols have not been fully deciphered.",
      image: "/placeholder.svg",
      coordinates: { lat: 8.4500, lng: 38.6167 },
      unescoSite: true,
      category: "archaeology",
      visitorsAnnually: 15000,
      discoveryYear: 1935,
      likes: 892,
      comments: 134,
      views: 5678
    }
  ]);

  const [figures, setFigures] = useState<HistoricalFigure[]>([
    {
      id: 1,
      name: "Queen of Sheba (Makeda)",
      title: "Queen of Ethiopia",
      period: "10th Century BCE",
      dynasty: "Solomonic",
      achievements: [
        "Legendary meeting with King Solomon",
        "Established the Solomonic dynasty",
        "Brought the Ark of the Covenant to Ethiopia",
        "Promoted trade between Africa and the Middle East",
        "Founded the Ethiopian imperial legitimacy",
        "Established diplomatic relations with ancient Israel"
      ],
      biography: "According to Ethiopian tradition, the Queen of Sheba, known as Makeda in Ethiopia, was a powerful ruler who visited King Solomon in Jerusalem. Their meeting resulted in the birth of Menelik I, founder of the Ethiopian imperial dynasty. She is credited with bringing the Ark of the Covenant to Ethiopia, making her central to Ethiopian Orthodox belief and royal legitimacy. Her wisdom and diplomatic skills made her a legendary figure across multiple cultures and religions.",
      image: "/placeholder.svg",
      birthYear: -1000,
      significance: "Legendary founder of Ethiopian imperial legitimacy and central figure in Ethiopian Orthodox Christianity",
      likes: 4567,
      category: "ancient",
      views: 18923
    },
    {
      id: 2,
      name: "Emperor Menelik II",
      title: "Emperor of Ethiopia",
      period: "1889-1913",
      dynasty: "Solomonic",
      achievements: [
        "Defeated Italian forces at the Battle of Adwa (1896)",
        "Modernized Ethiopia with railways and telegraphs",
        "Expanded Ethiopian territory to its modern borders",
        "Established Addis Ababa as the capital",
        "Maintained Ethiopian independence during colonial period",
        "Introduced modern banking and postal systems"
      ],
      biography: "Menelik II was one of Ethiopia's greatest emperors, successfully defending the country against European colonization. His victory at Adwa made Ethiopia the only African nation to successfully resist European colonial conquest. He modernized the country by introducing new technologies, establishing the modern capital of Addis Ababa, and expanding Ethiopia's borders through military campaigns. His reign marked the beginning of modern Ethiopia.",
      image: "/placeholder.svg",
      birthYear: 1844,
      deathYear: 1913,
      significance: "Defender of Ethiopian independence and modernizer of the Ethiopian state",
      likes: 3892,
      category: "modern",
      views: 16745
    },
    {
      id: 3,
      name: "Emperor Haile Selassie I",
      title: "Emperor of Ethiopia",
      period: "1930-1974",
      dynasty: "Solomonic",
      achievements: [
        "Led Ethiopia into the League of Nations",
        "Established the Organization of African Unity (OAU)",
        "Modernized Ethiopian education and legal systems",
        "Inspired the Rastafarian movement worldwide",
        "Survived Italian occupation and exile",
        "Championed African independence movements"
      ],
      biography: "Haile Selassie I, born Ras Tafari Makonnen, ruled Ethiopia for over four decades. He modernized the country's institutions, played a key role in establishing the OAU, and became an international symbol of African independence. His speeches at the League of Nations about Italian aggression became legendary, and he influenced pan-African movements worldwide. His resistance to Italian occupation made him a symbol of African dignity.",
      image: "/placeholder.svg",
      birthYear: 1892,
      deathYear: 1975,
      significance: "Pan-African leader and symbol of African independence and dignity",
      likes: 5234,
      category: "modern",
      views: 21567
    },
    {
      id: 4,
      name: "King Lalibela",
      title: "King of Ethiopia",
      period: "1181-1221",
      dynasty: "Zagwe",
      achievements: [
        "Commissioned the famous rock-hewn churches",
        "Created a 'New Jerusalem' in Ethiopia",
        "Promoted Christian pilgrimage",
        "Advanced Ethiopian architecture and engineering",
        "Established religious schools and monasteries",
        "Unified northern Ethiopian territories"
      ],
      biography: "King Lalibela commissioned the construction of eleven rock-hewn churches in the town that now bears his name. These architectural marvels were designed to create a 'New Jerusalem' in Ethiopia, allowing Ethiopian Christians to make pilgrimages without traveling to the Holy Land. His vision and dedication created one of the world's most remarkable religious sites. The engineering precision required for these churches demonstrates advanced planning and execution.",
      image: "/placeholder.svg",
      birthYear: 1140,
      deathYear: 1221,
      significance: "Creator of Ethiopia's most iconic religious architecture and pilgrimage destination",
      likes: 2786,
      category: "medieval",
      views: 14329
    },
    {
      id: 5,
      name: "Empress Taitu Betul",
      title: "Empress of Ethiopia",
      period: "1883-1918",
      dynasty: "Solomonic",
      achievements: [
        "Co-founded Addis Ababa",
        "Led troops at the Battle of Adwa",
        "Promoted women's education",
        "Established the first modern school for girls",
        "Advised on military strategy and diplomacy",
        "Championed women's rights in traditional society"
      ],
      biography: "Empress Taitu was the wife of Menelik II and a powerful political figure in her own right. She played a crucial role in the Battle of Adwa, personally leading troops and providing strategic counsel. She co-founded Addis Ababa with her husband and was instrumental in promoting education, especially for women, establishing Ethiopia's first school for girls. Her influence extended beyond traditional gender roles.",
      image: "/placeholder.svg",
      birthYear: 1851,
      deathYear: 1918,
      significance: "Pioneer of women's rights and education in Ethiopia, co-founder of Addis Ababa",
      likes: 2145,
      category: "modern",
      views: 11892
    },
    {
      id: 6,
      name: "Emperor Ezana",
      title: "King of Aksum",
      period: "320-360 CE",
      dynasty: "Aksumite",
      achievements: [
        "First Christian ruler of Ethiopia",
        "Expanded Aksumite territory",
        "Established Christianity as state religion",
        "Created the first Ethiopian coins",
        "Built magnificent palaces and churches",
        "Established trade relations with Rome and India"
      ],
      biography: "Emperor Ezana was the ruler who officially converted the Kingdom of Aksum to Christianity, making Ethiopia one of the first Christian nations in the world. Under his reign, Aksum reached its territorial zenith, controlling trade routes across the Red Sea and Indian Ocean. He minted the first Ethiopian coins and left inscriptions in Greek, Ge'ez, and South Arabian scripts. His conversion to Christianity fundamentally shaped Ethiopian culture.",
      image: "/placeholder.svg",
      birthYear: 300,
      deathYear: 360,
      significance: "Established Christianity in Ethiopia and expanded the Aksumite empire to its greatest extent",
      likes: 1876,
      category: "ancient",
      views: 9756
    }
  ]);

  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([
    {
      id: 1,
      year: -3200000,
      title: "Lucy's Time Period",
      description: "Australopithecus afarensis lived in the Afar region, representing our early human ancestors",
      category: "Prehistory",
      significance: "Ethiopia becomes central to human evolution studies",
      period: "Prehistoric",
      likes: 1234,
      shares: 567
    },
    {
      id: 2,
      year: -1000,
      title: "Queen of Sheba's Reign",
      description: "Legendary Queen Makeda rules Ethiopia and visits King Solomon",
      category: "Ancient",
      significance: "Foundation myths of Ethiopian royal legitimacy",
      period: "Ancient",
      dynasty: "Proto-Solomonic",
      likes: 892,
      shares: 234
    },
    {
      id: 3,
      year: 100,
      title: "Kingdom of Aksum Founded",
      description: "Rise of the powerful Aksumite civilization, controlling Red Sea trade",
      category: "Ancient",
      significance: "Ethiopia emerges as a major regional power",
      period: "Ancient",
      dynasty: "Aksumite",
      likes: 1567,
      shares: 423
    },
    {
      id: 4,
      year: 350,
      title: "Christianity Adopted",
      description: "Emperor Ezana converts Aksum to Christianity",
      category: "Religious",
      significance: "Ethiopia becomes one of the world's first Christian nations",
      period: "Ancient",
      dynasty: "Aksumite",
      likes: 2134,
      shares: 678
    },
    {
      id: 5,
      year: 1270,
      title: "Solomonic Dynasty Restored",
      description: "Yekuno Amlak overthrows the Zagwe dynasty and restores Solomonic rule",
      category: "Political",
      significance: "Beginning of the longest-ruling dynasty in Ethiopian history",
      period: "Medieval",
      dynasty: "Solomonic",
      likes: 756,
      shares: 189
    },
    {
      id: 6,
      year: 1200,
      title: "Lalibela Churches Built",
      description: "King Lalibela commissions eleven rock-hewn churches",
      category: "Architecture",
      significance: "Creation of Ethiopia's most famous religious site",
      period: "Medieval",
      dynasty: "Zagwe",
      likes: 1823,
      shares: 512
    },
    {
      id: 7,
      year: 1636,
      title: "Gondar Founded",
      description: "Emperor Fasilides establishes Gondar as the new capital",
      category: "Political",
      significance: "Beginning of the Gondarine period and architectural renaissance",
      period: "Early Modern",
      dynasty: "Solomonic",
      likes: 645,
      shares: 156
    },
    {
      id: 8,
      year: 1896,
      title: "Battle of Adwa",
      description: "Ethiopian forces defeat Italy, maintaining independence",
      category: "Military",
      significance: "Ethiopia remains the only uncolonized African nation",
      period: "Modern",
      dynasty: "Solomonic",
      likes: 3245,
      shares: 1023
    },
    {
      id: 9,
      year: 1930,
      title: "Haile Selassie Crowned",
      description: "Ras Tafari becomes Emperor Haile Selassie I",
      category: "Political",
      significance: "Beginning of Ethiopia's modern international engagement",
      period: "Modern",
      dynasty: "Solomonic",
      likes: 1687,
      shares: 445
    },
    {
      id: 10,
      year: 1963,
      title: "OAU Founded",
      description: "Organization of African Unity established in Addis Ababa",
      category: "International",
      significance: "Ethiopia becomes the diplomatic capital of Africa",
      period: "Modern",
      likes: 923,
      shares: 267
    },
    {
      id: 11,
      year: 1974,
      title: "Lucy Discovered",
      description: "Australopithecus afarensis fossil discovered in Afar region",
      category: "Scientific",
      significance: "Revolutionary discovery for human evolution studies",
      period: "Modern",
      likes: 2756,
      shares: 834
    }
  ]);

  const [articles, setArticles] = useState<HistoricalArticle[]>([
    {
      id: 1,
      title: "The Aksumite Empire: Africa's Ancient Trading Superpower",
      excerpt: "Discover how the Kingdom of Aksum became one of the four great powers of the ancient world, controlling crucial trade routes between Rome and Ancient India.",
      content: `The Kingdom of Aksum stood as one of the four great powers of the ancient world, alongside Rome, Persia, and China. From its capital in what is now northern Ethiopia, this remarkable civilization controlled the lucrative trade routes between the Roman Empire and Ancient India for over 800 years.

Founded around the 1st century CE, Aksum's strategic location on the Red Sea made it the perfect intermediary for trade between Africa, Arabia, and the Mediterranean world. The kingdom's merchants dealt in luxury goods: silk and spices from India, ivory and gold from Africa, and manufactured goods from the Roman world.

The Aksumites were master builders and engineers. Their towering obelisks, some reaching over 100 feet in height, served as elaborate tombstones for their kings. These granite monuments, carved from single pieces of stone, demonstrate sophisticated understanding of engineering and mathematics that rivals any ancient civilization.

Emperor Ezana's conversion to Christianity around 330 CE marked a turning point in Ethiopian history. This made Aksum one of the first Christian kingdoms in the world, predating the Roman Empire's official adoption of Christianity. The kingdom's Christian identity would become central to Ethiopian culture for the next 1,700 years.

Aksum's influence extended far beyond its borders. Archaeological evidence shows Aksumite presence in Yemen, and the kingdom maintained diplomatic relations with Byzantium. Aksumite coins, inscribed in Greek, Ge'ez, and South Arabian scripts, circulated throughout the Red Sea region.

The kingdom's decline began in the 7th century as Islamic expansion changed trade patterns in the Red Sea. However, Aksum's legacy lived on in Ethiopian Orthodox Christianity, the Ge'ez script, and the architectural traditions that would later create marvels like Lalibela.

Modern archaeological work continues to reveal Aksum's sophisticated urban planning, advanced metallurgy, and complex administrative systems. Recent discoveries include elaborate palaces, churches, and evidence of international trade networks that stretched from Britain to India.

The Aksumite empire demonstrates that African civilizations were fully integrated into the ancient world's political and economic systems. Far from being isolated, Ethiopia was at the center of international commerce and diplomacy for centuries.

Today, visitors to Aksum can still see the towering obelisks, underground tombs, and ruins of palaces that testify to this great civilization. The site continues to yield new discoveries, adding to our understanding of Africa's role in ancient history.`,
      author: "Dr. Stuart Munro-Hay",
      publishDate: "2024-01-20",
      readTime: "12 min read",
      category: "ancient",
      tags: ["Aksum", "Trade", "Christianity", "Ancient History", "Archaeology"],
      likes: 1456,
      comments: 203,
      views: 8934,
      featured: true,
      image: "/placeholder.svg",
      references: [
        "Munro-Hay, S. (1991). Aksum: An African Civilization of Late Antiquity",
        "Phillipson, D. (2012). Foundations of an African Civilization: Aksum & the northern Horn",
        "Peacock, D. (2007). The Roman period of the Red Sea trade"
      ]
    },
    {
      id: 2,
      title: "Lucy: The Discovery That Changed Human Origins",
      excerpt: "The story of how a 3.2 million-year-old fossil found in Ethiopia revolutionized our understanding of human evolution and made Ethiopia the 'Cradle of Humanity.'",
      content: `On November 24, 1974, in the remote Afar region of Ethiopia, paleoanthropologist Donald Johanson made a discovery that would fundamentally change our understanding of human evolution. The partial skeleton of a female Australopithecus afarensis, affectionately named "Lucy," provided unprecedented insights into our ancient ancestors.

Lucy lived approximately 3.2 million years ago in what was then a lush, wooded environment very different from today's arid landscape. Standing about 3 feet tall and weighing roughly 60 pounds, she possessed a unique combination of ape and human characteristics that revolutionized scientific thinking about the transition from our ape-like ancestors to modern humans.

The discovery was named "Lucy" after the Beatles song "Lucy in the Sky with Diamonds," which was playing repeatedly at the expedition camp. In Ethiopia, she is known as "Dinkinesh," meaning "you are marvelous" in Amharic, reflecting the national pride in this extraordinary find.

Lucy's pelvis clearly showed adaptations for upright walking, proving that bipedalism evolved much earlier than previously thought. Her arms retained ape-like proportions for tree climbing, suggesting our ancestors lived both on the ground and in trees. This discovery pushed back the timeline of human bipedalism by over a million years.

The Afar region, part of the East African Rift Valley, has since yielded thousands of fossils representing various hominid species. The area's unique geological conditions - ancient lake beds, volcanic ash layers, and minimal water erosion - create perfect conditions for fossil preservation.

Ethiopia's contribution to paleoanthropology extends far beyond Lucy. Recent discoveries include Ardi (Ardipithecus ramidus) at 4.4 million years old, and Selam, a 3.3 million-year-old child from the same species as Lucy. These finds have solidified Ethiopia's position as the birthplace of humanity.

The Ethiopian government established the Lucy Museum (National Museum of Ethiopia) in Addis Ababa, where visitors can see Lucy's actual remains and learn about human evolution. The discovery has made Ethiopia a pilgrimage site for anyone interested in our species' origins.

Today, international research teams continue working in Ethiopia's fossil-rich regions, constantly adding to our knowledge of human evolution. Each new discovery reinforces Ethiopia's crucial role in the human story.

The implications of Lucy's discovery continue to resonate through scientific communities worldwide. Her existence proves that human ancestors were walking upright millions of years before they developed large brains, fundamentally changing theories about human evolution.

Recent technological advances, including CT scanning and 3D modeling, continue to reveal new information about Lucy and her contemporaries. These tools allow scientists to study fossil remains in unprecedented detail without damaging the precious specimens.`,
      author: "Dr. Donald Johanson",
      publishDate: "2024-01-18",
      readTime: "10 min read",
      category: "archaeology",
      tags: ["Lucy", "Human Evolution", "Fossils", "Paleoanthropology", "Afar"],
      likes: 2847,
      comments: 456,
      views: 15678,
      featured: true,
      image: "/placeholder.svg",
      references: [
        "Johanson, D. & Edey, M. (1981). Lucy: The Beginnings of Humankind",
        "Kimbel, W. & Delezene, L. (2009). Lucy's species Australopithecus afarensis",
        "Haile-Selassie, Y. (2010). Lucy's Legacy: The Quest for Human Origins"
      ]
    },
    {
      id: 3,
      title: "The Battle of Adwa: How Ethiopia Defeated European Colonialism",
      excerpt: "The remarkable story of how Emperor Menelik II and Empress Taitu led Ethiopian forces to a decisive victory over Italy, maintaining Africa's only independence.",
      content: `On March 1, 1896, near the town of Adwa in northern Ethiopia, one of the most significant battles in African history took place. The Battle of Adwa saw Ethiopian forces under Emperor Menelik II decisively defeat an Italian army, making Ethiopia the only African nation to successfully resist European colonial conquest.

The conflict began with the Treaty of Wuchale (1889), which contained different versions in Italian and Amharic. The Italian version claimed Ethiopia was an Italian protectorate, while the Amharic version made no such claim. When Italy began treating Ethiopia as a colony, Menelik II denounced the treaty and prepared for war.

Menelik II's military preparations were extensive and sophisticated. He imported modern rifles and artillery from France and Russia, trained his forces in European military tactics, and established ammunition factories. The emperor also skillfully used Ethiopia's diverse ethnic groups, uniting them against the foreign threat.

Empress Taitu Betul played a crucial role in the victory. She personally led troops into battle, provided strategic counsel, and helped coordinate the complex logistics of moving over 100,000 Ethiopian troops to the battlefield. Her leadership challenged European stereotypes about African women and warfare.

The battle itself was a masterpiece of African military strategy. Ethiopian forces used their knowledge of local terrain, superior numbers, and modern weapons to encircle and destroy the Italian army. Nearly 70% of the Italian force was killed, wounded, or captured in one of the most complete military defeats in colonial history.

The victory at Adwa had profound international implications. It proved that African armies could defeat European forces using modern tactics and weapons. The victory inspired anti-colonial movements across Africa and Asia, making Menelik II a symbol of resistance to European imperialism.

European powers were forced to recognize Ethiopian sovereignty. The Treaty of Addis Ababa (1896) abolished the Treaty of Wuchale and recognized Ethiopia's complete independence. Italy paid war reparations and returned Ethiopian territories it had occupied.

The Battle of Adwa remains a source of immense pride for Ethiopians and all Africans. March 1st is celebrated as Victory Day in Ethiopia, and the battle has inspired countless works of art, literature, and scholarship. It stands as proof that African military genius and determination could triumph over European technological superiority.

Modern historians recognize Adwa as a turning point in the relationship between Africa and Europe. It demonstrated that colonialism was not inevitable and that African leaders could successfully modernize their militaries and states to resist foreign domination.

The legacy of Adwa extends beyond military history. It represents African dignity, sovereignty, and the possibility of successful resistance to foreign domination. For many Africans, Adwa symbolizes what could have been achieved across the continent with unity and determination.`,
      author: "Professor Harold Marcus",
      publishDate: "2024-01-15",
      readTime: "14 min read",
      category: "modern",
      tags: ["Battle of Adwa", "Menelik II", "Colonialism", "Independence", "Military History"],
      likes: 1923,
      comments: 287,
      views: 12456,
      featured: true,
      image: "/placeholder.svg",
      references: [
        "Marcus, H. (1995). The Life and Times of Menelik II: Ethiopia 1844-1913",
        "Berkeley, G. (1902). The Campaign of Adowa and the Rise of Menelik",
        "Jonas, R. (2011). The Battle of Adwa: African Victory in the Age of Empire"
      ]
    }
  ]);

  const categories = [
    { value: "all", label: "All Periods", icon: Globe },
    { value: "ancient", label: "Ancient Civilizations", icon: Crown },
    { value: "medieval", label: "Medieval Period", icon: Building },
    { value: "modern", label: "Modern History", icon: Star },
    { value: "archaeology", label: "Archaeological Sites", icon: Mountain },
    { value: "unesco", label: "UNESCO Sites", icon: Award },
    { value: "discoveries", label: "Recent Discoveries", icon: Zap }
  ];

  const filteredPlaces = places.filter(place => {
    const matchesCategory = selectedCategory === "all" || place.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredFigures = figures.filter(figure => {
    const matchesCategory = selectedCategory === "all" || figure.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      figure.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      figure.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      figure.achievements.some(achievement => achievement.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredTimeline = timelineEvents.filter(event => {
    const matchesFilter = timelineFilter === "all" || event.category === timelineFilter;
    const matchesRange = event.year >= timelineRange.start && event.year <= timelineRange.end;
    const matchesSearch = searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesRange && matchesSearch;
  });

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleLike = (type: string, id: number) => {
    const key = `${type}-${id}`;
    const newLikedItems = new Set(likedItems);
    
    if (newLikedItems.has(key)) {
      newLikedItems.delete(key);
      // Decrease like count
      switch (type) {
        case "place":
          setPlaces(places.map(place => 
            place.id === id ? { ...place, likes: place.likes - 1 } : place
          ));
          break;
        case "figure":
          setFigures(figures.map(figure => 
            figure.id === id ? { ...figure, likes: figure.likes - 1 } : figure
          ));
          break;
        case "article":
          setArticles(articles.map(article => 
            article.id === id ? { ...article, likes: article.likes - 1 } : article
          ));
          break;
        case "timeline":
          setTimelineEvents(timelineEvents.map(event => 
            event.id === id ? { ...event, likes: event.likes - 1 } : event
          ));
          break;
      }
    } else {
      newLikedItems.add(key);
      // Increase like count
      switch (type) {
        case "place":
          setPlaces(places.map(place => 
            place.id === id ? { ...place, likes: place.likes + 1 } : place
          ));
          break;
        case "figure":
          setFigures(figures.map(figure => 
            figure.id === id ? { ...figure, likes: figure.likes + 1 } : figure
          ));
          break;
        case "article":
          setArticles(articles.map(article => 
            article.id === id ? { ...article, likes: article.likes + 1 } : article
          ));
          break;
        case "timeline":
          setTimelineEvents(timelineEvents.map(event => 
            event.id === id ? { ...event, likes: event.likes + 1 } : event
          ));
          break;
      }
    }
    
    setLikedItems(newLikedItems);
    
    toast({
      description: newLikedItems.has(key) ? "Liked! ❤️" : "Like removed",
    });
  };

  const toggleCommentLike = (commentId: number) => {
    const newLikedComments = new Set(likedComments);
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        if (newLikedComments.has(commentId)) {
          newLikedComments.delete(commentId);
          return { ...comment, likes: comment.likes - 1 };
        } else {
          newLikedComments.add(commentId);
          return { ...comment, likes: comment.likes + 1 };
        }
      }
      return comment;
    }));
    setLikedComments(newLikedComments);
  };

  const incrementViews = (type: string, id: number) => {
    switch (type) {
      case "place":
        setPlaces(places.map(place => 
          place.id === id ? { ...place, views: place.views + 1 } : place
        ));
        break;
      case "figure":
        setFigures(figures.map(figure => 
          figure.id === id ? { ...figure, views: figure.views + 1 } : figure
        ));
        break;
      case "article":
        setArticles(articles.map(article => 
          article.id === id ? { ...article, views: article.views + 1 } : article
        ));
        break;
    }
  };

  const toggleBookmark = (type: string, id: number) => {
    const key = `${type}-${id}`;
    const newBookmarks = new Set(bookmarkedItems);
    if (newBookmarks.has(key)) {
      newBookmarks.delete(key);
    } else {
      newBookmarks.add(key);
    }
    setBookmarkedItems(newBookmarks);
    
    toast({
      description: newBookmarks.has(key) ? "Bookmarked! 📖" : "Bookmark removed",
    });
  };

  const handleShare = (title: string, description: string) => {
    if (navigator.share) {
      navigator.share({
        title,
        text: description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${title} - ${description}`);
      toast({
        description: "Content copied to clipboard! 📋",
      });
    }
  };

  const toggleExpandArticle = (articleId: number) => {
    const newExpanded = new Set(expandedArticles);
    if (newExpanded.has(articleId)) {
      newExpanded.delete(articleId);
    } else {
      newExpanded.add(articleId);
      // Increment view count when expanded
      incrementViews("article", articleId);
    }
    setExpandedArticles(newExpanded);
  };

  const addComment = (itemType: string, itemId: number) => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        itemId,
        itemType,
        author: "Guest Historian",
        content: newComment,
        timestamp: "Just now",
        likes: 0,
        avatar: "🎓"
      };
      setComments([comment, ...comments]);
      
      // Increment comment count for the item
      switch (itemType) {
        case "place":
          setPlaces(places.map(place => 
            place.id === itemId ? { ...place, comments: place.comments + 1 } : place
          ));
          break;
        case "article":
          setArticles(articles.map(article => 
            article.id === itemId ? { ...article, comments: article.comments + 1 } : article
          ));
          break;
      }
      
      setNewComment("");
      toast({
        description: "Comment added successfully! 💬",
      });
    }
  };

  const submitUserContent = () => {
    if (userSubmission.title && userSubmission.category && userSubmission.content && userSubmission.author) {
      setSubmittedContent([...submittedContent, userSubmission]);
      setUserSubmission({
        title: "",
        category: "",
        content: "",
        location: "",
        period: "",
        author: "",
        email: "",
        sources: ""
      });
      toast({
        title: "Historical Content Submitted! ✅",
        description: "Thank you for contributing to Ethiopian historical knowledge. Our experts will review your submission.",
      });
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-ethiopian-green-50 via-ethiopian-yellow-50 to-ethiopian-red-50 py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Historical Heritage</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore Ethiopia's fascinating past and archaeological wonders
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search historical places, figures, events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg bg-background border-2"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.value)}
                    className={selectedCategory === category.value ? "bg-ethiopian-green-500 hover:bg-ethiopian-green-600" : ""}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="places">Historical Places</TabsTrigger>
            <TabsTrigger value="figures">Famous Figures</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="articles">Expert Articles</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="submit">Submit Content</TabsTrigger>
          </TabsList>

          {/* Historical Places Tab */}
          <TabsContent value="places" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map((place) => (
                <Card key={place.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted relative">
                    <img 
                      src={place.image} 
                      alt={place.name}
                      className="w-full h-full object-cover"
                    />
                    {place.unescoSite && (
                      <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
                        <Award className="w-3 h-3 mr-1" />
                        UNESCO Site
                      </Badge>
                    )}
                    <div className="absolute top-3 right-3 flex space-x-1">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => toggleBookmark("place", place.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarkedItems.has(`place-${place.id}`) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{place.period}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {place.visitorsAnnually.toLocaleString()} visitors/year
                      </span>
                    </div>
                    <CardTitle className="text-lg leading-tight">{place.name}</CardTitle>
                    <CardDescription className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {place.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4">{place.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{place.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{place.likes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{place.comments}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleLike("place", place.id)}
                          className={likedItems.has(`place-${place.id}`) ? "bg-red-50 border-red-200" : ""}
                        >
                          <Heart className={`w-4 h-4 ${likedItems.has(`place-${place.id}`) ? "fill-red-500 text-red-500" : ""}`} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShare(place.name, place.description)}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowComments(showComments === `place-${place.id}` ? null : `place-${place.id}`)}
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            incrementViews("place", place.id);
                            toast({ description: `Opening interactive map for ${place.name} 🗺️` });
                          }}
                        >
                          <Map className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Comments Section */}
                    {showComments === `place-${place.id}` && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-semibold mb-3">Comments ({comments.filter(c => c.itemType === "place" && c.itemId === place.id).length})</h4>
                        <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                          {comments.filter(c => c.itemType === "place" && c.itemId === place.id).map((comment) => (
                            <div key={comment.id} className="bg-muted/50 p-3 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className="text-lg">{comment.avatar}</span>
                                  <span className="font-medium text-sm">{comment.author}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleCommentLike(comment.id)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <ThumbsUp className={`w-3 h-3 ${likedComments.has(comment.id) ? "fill-blue-500 text-blue-500" : ""}`} />
                                  </Button>
                                  <span className="text-xs text-muted-foreground">{comment.likes}</span>
                                </div>
                              </div>
                              <p className="text-sm">{comment.content}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Share your historical insights..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="flex-1"
                            onKeyPress={(e) => e.key === 'Enter' && addComment("place", place.id)}
                          />
                          <Button 
                            size="sm"
                            onClick={() => addComment("place", place.id)}
                            className="bg-ethiopian-green-500 hover:bg-ethiopian-green-600"
                            disabled={!newComment.trim()}
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full"
                          onClick={() => incrementViews("place", place.id)}
                        >
                          Learn More
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{place.name}</DialogTitle>
                          <DialogDescription>{place.location} • {place.period}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="aspect-video bg-muted rounded-lg">
                            <img 
                              src={place.image} 
                              alt={place.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Description</h4>
                            <p className="text-sm">{place.description}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Historical Significance</h4>
                            <p className="text-sm">{place.significance}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Discovery/Founded:</span>
                              <p>{place.discoveryYear}</p>
                            </div>
                            <div>
                              <span className="font-medium">Annual Visitors:</span>
                              <p>{place.visitorsAnnually.toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              className="flex-1"
                              onClick={() => {
                                toast({ description: "Opening virtual tour! 🎥" });
                              }}
                            >
                              <Camera className="w-4 h-4 mr-2" />
                              Virtual Tour
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => {
                                toast({ description: "Opening detailed map! 🗺️" });
                              }}
                            >
                              <Compass className="w-4 h-4 mr-2" />
                              View Map
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Famous Figures Tab */}
          <TabsContent value="figures" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredFigures.map((figure) => (
                <Card key={figure.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="w-24 h-24 bg-muted rounded-full flex-shrink-0 overflow-hidden">
                        <img 
                          src={figure.image} 
                          alt={figure.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold">{figure.name}</h3>
                            <p className="text-muted-foreground">{figure.title}</p>
                            <p className="text-sm text-muted-foreground">{figure.period}</p>
                            {figure.dynasty && (
                              <Badge variant="outline" className="mt-1">{figure.dynasty} Dynasty</Badge>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleBookmark("figure", figure.id)}
                          >
                            <Bookmark className={`w-4 h-4 ${bookmarkedItems.has(`figure-${figure.id}`) ? "fill-current" : ""}`} />
                          </Button>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Major Achievements:</h4>
                          <ul className="text-sm space-y-1">
                            {figure.achievements.slice(0, 3).map((achievement, index) => (
                              <li key={index} className="flex items-start">
                                <Star className="w-3 h-3 mt-1 mr-2 text-ethiopian-yellow-500 flex-shrink-0" />
                                {achievement}
                              </li>
                            ))}
                            {figure.achievements.length > 3 && (
                              <li className="text-muted-foreground text-xs">
                                + {figure.achievements.length - 3} more achievements
                              </li>
                            )}
                          </ul>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{figure.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{figure.likes.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => toggleLike("figure", figure.id)}
                              className={likedItems.has(`figure-${figure.id}`) ? "bg-red-50 border-red-200" : ""}
                            >
                              <Heart className={`w-4 h-4 ${likedItems.has(`figure-${figure.id}`) ? "fill-red-500 text-red-500" : ""}`} />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleShare(figure.name, figure.significance)}
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShowComments(showComments === `figure-${figure.id}` ? null : `figure-${figure.id}`)}
                            >
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => incrementViews("figure", figure.id)}
                              >
                                Biography
                                <BookOpen className="w-4 h-4 ml-1" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{figure.name}</DialogTitle>
                                <DialogDescription>{figure.title} • {figure.period}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                                  <img 
                                    src={figure.image} 
                                    alt={figure.name}
                                    className="max-h-full max-w-full object-contain rounded-lg"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Biography</h4>
                                  <p className="text-sm leading-relaxed">{figure.biography}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Historical Significance</h4>
                                  <p className="text-sm">{figure.significance}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Complete Achievements</h4>
                                  <ul className="text-sm space-y-1">
                                    {figure.achievements.map((achievement, index) => (
                                      <li key={index} className="flex items-start">
                                        <CheckCircle className="w-4 h-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                                        {achievement}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                {(figure.birthYear || figure.deathYear) && (
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    {figure.birthYear && (
                                      <div>
                                        <span className="font-medium">Born:</span>
                                        <p>{figure.birthYear > 0 ? `${figure.birthYear} CE` : `${Math.abs(figure.birthYear)} BCE`}</p>
                                      </div>
                                    )}
                                    {figure.deathYear && (
                                      <div>
                                        <span className="font-medium">Died:</span>
                                        <p>{figure.deathYear} CE</p>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>

                        {/* Comments Section for Figures */}
                        {showComments === `figure-${figure.id}` && (
                          <div className="mt-4 pt-4 border-t">
                            <h4 className="font-semibold mb-3">Comments ({comments.filter(c => c.itemType === "figure" && c.itemId === figure.id).length})</h4>
                            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                              {comments.filter(c => c.itemType === "figure" && c.itemId === figure.id).map((comment) => (
                                <div key={comment.id} className="bg-muted/50 p-3 rounded-lg">
                                  <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-lg">{comment.avatar}</span>
                                      <span className="font-medium text-sm">{comment.author}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleCommentLike(comment.id)}
                                        className="h-6 w-6 p-0"
                                      >
                                        <ThumbsUp className={`w-3 h-3 ${likedComments.has(comment.id) ? "fill-blue-500 text-blue-500" : ""}`} />
                                      </Button>
                                      <span className="text-xs text-muted-foreground">{comment.likes}</span>
                                    </div>
                                  </div>
                                  <p className="text-sm">{comment.content}</p>
                                </div>
                              ))}
                            </div>
                            <div className="flex space-x-2">
                              <Input
                                placeholder="Share your thoughts on this historical figure..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="flex-1"
                                onKeyPress={(e) => e.key === 'Enter' && addComment("figure", figure.id)}
                              />
                              <Button 
                                size="sm"
                                onClick={() => addComment("figure", figure.id)}
                                className="bg-ethiopian-green-500 hover:bg-ethiopian-green-600"
                                disabled={!newComment.trim()}
                              >
                                <Send className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Interactive Timeline of Ethiopian History
                </CardTitle>
                <CardDescription>
                  Explore major events and periods in Ethiopian history
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Timeline Filters */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <Select value={timelineFilter} onValueChange={setTimelineFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Prehistory">Prehistory</SelectItem>
                      <SelectItem value="Ancient">Ancient</SelectItem>
                      <SelectItem value="Religious">Religious</SelectItem>
                      <SelectItem value="Political">Political</SelectItem>
                      <SelectItem value="Military">Military</SelectItem>
                      <SelectItem value="Architecture">Architecture</SelectItem>
                      <SelectItem value="Scientific">Scientific</SelectItem>
                      <SelectItem value="International">International</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setTimelineRange({ start: 0, end: 2024 });
                      setTimelineFilter("all");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>

                {/* Timeline Events */}
                <div className="space-y-6">
                  {filteredTimeline.sort((a, b) => a.year - b.year).map((event, index) => (
                    <div key={event.id} className="flex gap-6 group">
                      {/* Timeline Line */}
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-ethiopian-green-500 rounded-full border-4 border-background shadow-md"></div>
                        {index < filteredTimeline.length - 1 && (
                          <div className="w-0.5 h-16 bg-border mt-2"></div>
                        )}
                      </div>
                      
                      {/* Event Content */}
                      <Card className="flex-1 group-hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-lg font-bold text-ethiopian-green-600">
                                  {event.year > 0 ? `${event.year} CE` : `${Math.abs(event.year)} BCE`}
                                </span>
                                <Badge variant="outline">{event.category}</Badge>
                                {event.dynasty && (
                                  <Badge variant="secondary">{event.dynasty}</Badge>
                                )}
                              </div>
                              <h3 className="text-lg font-semibold">{event.title}</h3>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleLike("timeline", event.id)}
                                className={likedItems.has(`timeline-${event.id}`) ? "bg-red-50" : ""}
                              >
                                <Heart className={`w-4 h-4 ${likedItems.has(`timeline-${event.id}`) ? "fill-red-500 text-red-500" : ""}`} />
                                <span className="ml-1 text-xs">{event.likes}</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setTimelineEvents(timelineEvents.map(e => 
                                    e.id === event.id ? { ...e, shares: e.shares + 1 } : e
                                  ));
                                  handleShare(event.title, event.description);
                                }}
                              >
                                <Share2 className="w-4 h-4" />
                                <span className="ml-1 text-xs">{event.shares}</span>
                              </Button>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-2">{event.description}</p>
                          <p className="text-sm font-medium text-ethiopian-green-700">{event.significance}</p>
                          {event.participants && (
                            <div className="mt-2">
                              <span className="text-xs font-medium text-muted-foreground">Key Figures: </span>
                              <span className="text-xs">{event.participants.join(", ")}</span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>

                {filteredTimeline.length === 0 && (
                  <div className="text-center py-8">
                    <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No events found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters to see more historical events.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Expert Articles Tab */}
          <TabsContent value="articles" className="space-y-6">
            <div className="space-y-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className={`hover:shadow-lg transition-shadow ${article.featured ? 'border-ethiopian-yellow-300 bg-ethiopian-yellow-50/30' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="w-48 h-32 bg-muted rounded-lg flex-shrink-0">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            {article.featured && (
                              <Badge className="bg-ethiopian-yellow-500 text-white">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                            <Badge variant="outline">{categories.find(c => c.value === article.category)?.label}</Badge>
                            <span className="text-sm text-muted-foreground">{article.readTime}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleBookmark("article", article.id)}
                          >
                            <Bookmark className={`w-4 h-4 ${bookmarkedItems.has(`article-${article.id}`) ? "fill-current" : ""}`} />
                          </Button>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                        <p className="text-muted-foreground mb-3">{article.excerpt}</p>
                        
                        {expandedArticles.has(article.id) && (
                          <div className="mb-4 p-4 bg-muted/30 rounded-lg">
                            <div className="prose prose-sm max-w-none">
                              {article.content.split('\n\n').slice(0, 6).map((paragraph, index) => (
                                <p key={index} className="mb-3 text-sm leading-relaxed">
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                            <div className="mt-4 pt-4 border-t">
                              <div className="flex flex-wrap gap-2 mb-3">
                                {article.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                              {article.references.length > 0 && (
                                <div>
                                  <h4 className="font-semibold mb-2 text-sm">References:</h4>
                                  <ul className="text-xs text-muted-foreground space-y-1">
                                    {article.references.map((ref, index) => (
                                      <li key={index}>• {ref}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{article.views.toLocaleString()}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{article.likes}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{article.comments}</span>
                            </span>
                            <span>By {article.author}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => toggleLike("article", article.id)}
                              className={likedItems.has(`article-${article.id}`) ? "bg-red-50 border-red-200" : ""}
                            >
                              <Heart className={`w-4 h-4 ${likedItems.has(`article-${article.id}`) ? "fill-red-500 text-red-500" : ""}`} />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleShare(article.title, article.excerpt)}
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShowComments(showComments === `article-${article.id}` ? null : `article-${article.id}`)}
                            >
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toggleExpandArticle(article.id)}
                          >
                            {expandedArticles.has(article.id) ? (
                              <>
                                Show Less
                                <ChevronDown className="w-4 h-4 ml-1" />
                              </>
                            ) : (
                              <>
                                Read More
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </>
                            )}
                          </Button>
                        </div>

                        {/* Comments Section for Articles */}
                        {showComments === `article-${article.id}` && (
                          <div className="mt-4 pt-4 border-t">
                            <h4 className="font-semibold mb-3">Comments ({comments.filter(c => c.itemType === "article" && c.itemId === article.id).length})</h4>
                            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                              {comments.filter(c => c.itemType === "article" && c.itemId === article.id).map((comment) => (
                                <div key={comment.id} className="bg-muted/50 p-3 rounded-lg">
                                  <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-lg">{comment.avatar}</span>
                                      <span className="font-medium text-sm">{comment.author}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleCommentLike(comment.id)}
                                        className="h-6 w-6 p-0"
                                      >
                                        <ThumbsUp className={`w-3 h-3 ${likedComments.has(comment.id) ? "fill-blue-500 text-blue-500" : ""}`} />
                                      </Button>
                                      <span className="text-xs text-muted-foreground">{comment.likes}</span>
                                    </div>
                                  </div>
                                  <p className="text-sm">{comment.content}</p>
                                </div>
                              ))}
                            </div>
                            <div className="flex space-x-2">
                              <Input
                                placeholder="Share your academic insights..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="flex-1"
                                onKeyPress={(e) => e.key === 'Enter' && addComment("article", article.id)}
                              />
                              <Button 
                                size="sm"
                                onClick={() => addComment("article", article.id)}
                                className="bg-ethiopian-green-500 hover:bg-ethiopian-green-600"
                                disabled={!newComment.trim()}
                              >
                                <Send className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Historical Photo Collections */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Camera className="w-5 h-5 mr-2" />
                    Ancient Monuments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { title: "Lalibela Churches", count: "45 photos", views: "12k" },
                      { title: "Aksum Obelisks", count: "32 photos", views: "8k" },
                      { title: "Gondar Castles", count: "38 photos", views: "9k" },
                      { title: "Rock Art", count: "27 photos", views: "5k" }
                    ].map((collection, i) => (
                      <div 
                        key={i} 
                        className="aspect-square bg-muted rounded-lg flex flex-col items-center justify-center hover:shadow-md transition-shadow cursor-pointer group"
                        onClick={() => toast({ description: `Opening ${collection.title} gallery! 📸` })}
                      >
                        <Camera className="w-6 h-6 text-muted-foreground mb-2 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-medium text-center">{collection.title}</div>
                        <div className="text-xs text-muted-foreground">{collection.count}</div>
                        <div className="text-xs text-muted-foreground">{collection.views} views</div>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => toast({ description: "Opening complete historical photo archive! 🖼️" })}
                  >
                    View All Historical Photos
                  </Button>
                </CardContent>
              </Card>

              {/* Archaeological Discoveries */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mountain className="w-5 h-5 mr-2" />
                    Archaeological Finds
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { title: "Lucy Fossil Discovery", type: "3D Model", views: "15k", interactions: 45 },
                      { title: "Aksumite Coins", type: "Gallery", views: "8k", interactions: 23 },
                      { title: "Ancient Manuscripts", type: "Digital Archive", views: "12k", interactions: 67 },
                      { title: "Stone Tools", type: "Interactive", views: "6k", interactions: 19 }
                    ].map((item, i) => (
                      <div 
                        key={i} 
                        className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => toast({ description: `Exploring ${item.title}! 🔍` })}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-sm">{item.title}</div>
                            <div className="text-xs text-muted-foreground">{item.type}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">{item.views} views</div>
                            <div className="text-xs text-muted-foreground">{item.interactions} interactions</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => toast({ description: "Opening archaeological discovery database! ⚱️" })}
                  >
                    Explore All Discoveries
                  </Button>
                </CardContent>
              </Card>

              {/* UNESCO Heritage Sites */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    UNESCO Heritage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {places.filter(place => place.unescoSite).slice(0, 4).map((site) => (
                      <div 
                        key={site.id} 
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => {
                          incrementViews("place", site.id);
                          toast({ description: `Virtual tour of ${site.name}! 🎥` });
                        }}
                      >
                        <div className="w-12 h-12 bg-muted rounded">
                          <img 
                            src={site.image} 
                            alt={site.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{site.name}</div>
                          <div className="text-xs text-muted-foreground">{site.period}</div>
                          <div className="text-xs text-muted-foreground">{site.views.toLocaleString()} views</div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => toast({ description: "Opening comprehensive UNESCO heritage tour! 🌍" })}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    View All UNESCO Sites
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Submit Content Tab */}
          <TabsContent value="submit" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Send className="w-5 h-5 mr-2" />
                    Submit Historical Content
                  </CardTitle>
                  <CardDescription>
                    Share your knowledge and discoveries about Ethiopian history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input 
                      placeholder="Title of your historical content" 
                      value={userSubmission.title}
                      onChange={(e) => setUserSubmission({...userSubmission, title: e.target.value})}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input 
                        placeholder="Your Name" 
                        value={userSubmission.author}
                        onChange={(e) => setUserSubmission({...userSubmission, author: e.target.value})}
                      />
                      <Input 
                        placeholder="Your Email (optional)" 
                        type="email"
                        value={userSubmission.email}
                        onChange={(e) => setUserSubmission({...userSubmission, email: e.target.value})}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Select 
                        value={userSubmission.category} 
                        onValueChange={(value) => setUserSubmission({...userSubmission, category: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Historical Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.filter(c => c.value !== "all").map(category => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Input 
                        placeholder="Time Period (e.g., 12th Century)" 
                        value={userSubmission.period}
                        onChange={(e) => setUserSubmission({...userSubmission, period: e.target.value})}
                      />
                    </div>

                    <Input 
                      placeholder="Location (if applicable)" 
                      value={userSubmission.location}
                      onChange={(e) => setUserSubmission({...userSubmission, location: e.target.value})}
                    />
                    
                    <Textarea 
                      placeholder="Share your historical content, discoveries, or insights..." 
                      rows={8}
                      value={userSubmission.content}
                      onChange={(e) => setUserSubmission({...userSubmission, content: e.target.value})}
                    />

                    <Textarea 
                      placeholder="Sources and references (optional)" 
                      rows={3}
                      value={userSubmission.sources}
                      onChange={(e) => setUserSubmission({...userSubmission, sources: e.target.value})}
                    />
                    
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        All submissions are reviewed by our team of historians and archaeologists before publication. 
                        Please ensure your content is accurate and properly sourced.
                      </AlertDescription>
                    </Alert>

                    <Button 
                      className="w-full bg-ethiopian-green-500 hover:bg-ethiopian-green-600"
                      onClick={submitUserContent}
                    >
                      Submit Historical Content
                    </Button>
                    
                    {submittedContent.length > 0 && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">
                            {submittedContent.length} submission(s) received!
                          </span>
                        </div>
                        <div className="text-sm text-green-600">
                          Thank you for contributing to Ethiopian historical knowledge. 
                          Our experts will review your content and contact you if needed.
                        </div>
                        <div className="mt-2 space-y-1">
                          {submittedContent.map((submission, index) => (
                            <div key={index} className="text-xs text-green-700">
                              📜 {submission.title} ({submission.category})
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
