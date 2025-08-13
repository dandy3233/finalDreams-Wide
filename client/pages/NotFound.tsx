import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <AlertCircle className="h-24 w-24 text-ethiopian-yellow-500 mx-auto mb-6" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-foreground mb-4">404</CardTitle>
              <CardDescription className="text-xl">
                Oops! The page you're looking for doesn't exist.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                The page <code className="bg-muted px-2 py-1 rounded font-mono text-sm">{location.pathname}</code> could not be found.
              </p>

              <p className="text-muted-foreground">
                You might have mistyped the URL, or the page may have been moved or removed.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild className="bg-ethiopian-green-500 hover:bg-ethiopian-green-600">
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Homepage
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/jobs">
                    <Search className="mr-2 h-4 w-4" />
                    Browse Jobs
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
