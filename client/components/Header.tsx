import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, Briefcase, Globe, BookOpen, Megaphone, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { LogoutButton } from "./LogoutButton";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, user } = useAuth();

  const navItems = [
    { href: "/jobs", label: "Job Vacancies", icon: Briefcase },
    { href: "/culture", label: "Culture", icon: Globe },
    { href: "/history", label: "History", icon: BookOpen },
    { href: "/news", label: "News", icon: Megaphone },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
              DW
            </div>
            <span className="text-xl font-bold text-primary">Dreams Wide</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center space-x-1 text-foreground/80 hover:text-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Search Bar & Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search jobs, culture, history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-muted/50"
              />
            </div>

            {isAuthenticated ? (
  <div className="flex items-center space-x-3">
    {user && (
      <div className="flex items-center space-x-2 text-xs">
        <User className="h-3 w-3" />
        <span className="text-muted-foreground">{user.name}</span>
      </div>
    )}
    {/* Dashboard Button */}
    <Link
      to="/Admin"
      className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md px-3 py-2"
    >
      <Shield className="h-3 w-3" />
      <span>Dashboard</span>
    </Link>
    <LogoutButton variant="outline" size="sm" showText={false} />
  </div>
) : (
  <Link
    to="/login"
    className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md px-3 py-2"
  >
    <Shield className="h-3 w-3" />
    <span>Admin</span>
  </Link>
)}

          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search jobs, culture, history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-muted/50"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="flex items-center space-x-3 px-2 py-2 text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <div className="border-t pt-2 mt-2">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    {user && (
                      <div className="flex items-center space-x-3 px-2 py-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{user.name} ({user.role})</span>
                      </div>
                    )}
                    <div className="px-2">
                      <LogoutButton variant="outline" size="sm" className="w-full" />
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center space-x-3 px-2 py-2 text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Shield className="h-5 w-5" />
                    <span>Admin Login</span>
                  </Link>
                )}
              </div>

              {/* Additional Links */}
              <div className="border-t pt-2 mt-2">
                <Link
                  to="/cities"
                  className="flex items-center space-x-3 px-2 py-2 text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Globe className="h-5 w-5" />
                  <span>Ethiopian Cities</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
