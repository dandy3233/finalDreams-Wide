import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,
  Send,
  Heart,
  Star,
  Shield,
  Award,
  Coffee,
  Mountain,
  Sun,
  Crown,
  BookOpen,
  Briefcase,
  Users,
  Calendar,
  ArrowRight,
  CheckCircle,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: "Job Vacancies", href: "/jobs", icon: Briefcase },
      { name: "Cultural Content", href: "/culture", icon: Globe },
      { name: "Historical Posts", href: "/history", icon: BookOpen },
      { name: "News & Updates", href: "/news", icon: Calendar },
    ],
    company: [
      { name: "About Dreams Wide", href: "/about", icon: Users },
      { name: "Our Mission", href: "/mission", icon: Star },
      { name: "Career Opportunities", href: "/careers", icon: Award },
      { name: "Contact Us", href: "/contact", icon: Phone },
    ],
    resources: [
      { name: "Help Center", href: "/help", icon: Shield },
      { name: "Privacy Policy", href: "/privacy", icon: CheckCircle },
      { name: "Terms of Service", href: "/terms", icon: BookOpen },
      { name: "Community Guidelines", href: "/guidelines", icon: Heart },
    ],
    connect: [
      { name: "Partner with Us", href: "/partners", icon: Users },
      { name: "Advertise", href: "/advertise", icon: Star },
      { name: "API Access", href: "/api", icon: Globe },
      { name: "Developer Resources", href: "/developers", icon: Award },
    ]
  };

  const socialLinks = [
    { name: "Facebook", href: "#", icon: Facebook, color: "hover:text-blue-600" },
    { name: "Twitter", href: "#", icon: Twitter, color: "hover:text-sky-500" },
    { name: "Instagram", href: "#", icon: Instagram, color: "hover:text-pink-600" },
    { name: "LinkedIn", href: "#", icon: Linkedin, color: "hover:text-blue-700" },
    { name: "YouTube", href: "#", icon: Youtube, color: "hover:text-red-600" },
  ];

  const ethiopianCities = [
    "Addis Ababa", "Dire Dawa", "Mekelle", "Gondar", "Awassa", "Bahir Dar", "Jimma", "Dessie"
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-ethiopian-green-500 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-ethiopian-yellow-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-ethiopian-red-500 rounded-full blur-3xl"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 text-ethiopian-green-500 opacity-10">
        <Coffee className="w-16 h-16" />
      </div>
      <div className="absolute top-20 right-20 text-ethiopian-yellow-500 opacity-10">
        <Sun className="w-12 h-12" />
      </div>
      <div className="absolute bottom-20 right-10 text-ethiopian-red-500 opacity-10">
        <Mountain className="w-20 h-20" />
      </div>
      <div className="absolute bottom-32 left-20 text-white opacity-5">
        <Crown className="w-16 h-16" />
      </div>

      <div className="relative">
        {/* Newsletter Section */}
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-ethiopian-green-500/20 text-ethiopian-green-400 rounded-full px-4 py-2 mb-6">
                <Star className="w-4 h-4" />
                <span className="text-sm font-semibold">STAY CONNECTED</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get the Latest Updates from Ethiopia
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Subscribe to receive the newest job opportunities, cultural insights, and historical discoveries directly in your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-ethiopian-green-500"
                />
                <Button className="bg-gradient-to-r from-ethiopian-green-500 to-ethiopian-green-600 hover:from-ethiopian-green-600 hover:to-ethiopian-green-700 text-white shadow-lg">
                  <Send className="w-4 h-4 mr-2" />
                  Subscribe
                </Button>
              </div>
              
              <p className="text-sm text-gray-400 mt-4">
                Join 10,000+ Ethiopians already subscribed. No spam, unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-2 bg-ethiopian-green-500 rounded"></div>
                  <div className="w-8 h-2 bg-ethiopian-yellow-500 rounded"></div>
                  <div className="w-8 h-2 bg-ethiopian-red-500 rounded"></div>
                </div>
                <h3 className="text-2xl font-bold">Dreams Wide</h3>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                🇪🇹 Ethiopia's premier platform connecting talented professionals with verified employers 
                while celebrating our rich cultural heritage and historical legacy.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-ethiopian-green-500" />
                  <span>Addis Ababa, Ethiopia</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-ethiopian-yellow-500" />
                  <span>+251-11-XXX-XXXX</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-ethiopian-red-500" />
                  <span>hello@dreamswide.et</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`p-3 bg-white/10 rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-110 ${social.color}`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                
                {/* Platform Links */}
                <div>
                  <h4 className="text-lg font-bold mb-6 text-ethiopian-green-400">Platform</h4>
                  <ul className="space-y-3">
                    {footerLinks.platform.map((link) => {
                      const Icon = link.icon;
                      return (
                        <li key={link.name}>
                          <Link 
                            to={link.href} 
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                          >
                            <Icon className="w-4 h-4 text-gray-500 group-hover:text-ethiopian-green-400 transition-colors" />
                            <span>{link.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Company Links */}
                <div>
                  <h4 className="text-lg font-bold mb-6 text-ethiopian-yellow-400">Company</h4>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link) => {
                      const Icon = link.icon;
                      return (
                        <li key={link.name}>
                          <Link 
                            to={link.href} 
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                          >
                            <Icon className="w-4 h-4 text-gray-500 group-hover:text-ethiopian-yellow-400 transition-colors" />
                            <span>{link.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Resources Links */}
                <div>
                  <h4 className="text-lg font-bold mb-6 text-ethiopian-red-400">Resources</h4>
                  <ul className="space-y-3">
                    {footerLinks.resources.map((link) => {
                      const Icon = link.icon;
                      return (
                        <li key={link.name}>
                          <Link 
                            to={link.href} 
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                          >
                            <Icon className="w-4 h-4 text-gray-500 group-hover:text-ethiopian-red-400 transition-colors" />
                            <span>{link.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Connect Links */}
                <div>
                  <h4 className="text-lg font-bold mb-6 text-blue-400">Connect</h4>
                  <ul className="space-y-3">
                    {footerLinks.connect.map((link) => {
                      const Icon = link.icon;
                      return (
                        <li key={link.name}>
                          <Link 
                            to={link.href} 
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                          >
                            <Icon className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                            <span>{link.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Ethiopian Cities Section */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold text-white mb-4">Serving Cities Across Ethiopia</h4>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {ethiopianCities.map((city, index) => (
                  <Link
                    key={city}
                    to={`/cities/${city.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300 hover:bg-white/20 hover:text-white transition-all duration-300 transform hover:scale-105"
                  >
                    {city}
                  </Link>
                ))}
              </div>
              <Button asChild variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10 hover:text-white">
                <Link to="/cities" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  View All Cities & Information
                </Link>
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Secure Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                <span>Verified Employers</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-500" />
                <span>Trusted by 10,000+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Made with ❤️ in Ethiopia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 bg-black/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © {currentYear} Dreams Wide. All rights reserved. Made in Ethiopia 🇪🇹
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors hover:underline">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors hover:underline">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors hover:underline">
                  Cookie Policy
                </Link>
                <Link
                  to="/cities"
                  className="text-gray-400 hover:text-white transition-colors hover:underline"
                >
                  All Cities
                </Link>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Status</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
