import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  comingSoonFeatures?: string[];
}

export function PlaceholderPage({ title, description, comingSoonFeatures = [] }: PlaceholderPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <Wrench className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{title}</CardTitle>
            <CardDescription className="text-lg">{description}</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              This section is currently under development. We're working hard to bring you the best experience possible.
            </p>
            
            {comingSoonFeatures.length > 0 && (
              <div className="text-left">
                <h3 className="font-semibold mb-3">Coming Soon:</h3>
                <ul className="space-y-2">
                  {comingSoonFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="pt-4">
              <Button asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Homepage
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
