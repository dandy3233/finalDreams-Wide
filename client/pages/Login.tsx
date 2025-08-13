import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Lock, 
  User, 
  AlertCircle,
  CheckCircle 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  // Demo credentials - in a real app, this would connect to a backend
  const ADMIN_CREDENTIALS = {
    email: "admin@dreamswide.et",
    password: "admin123"
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Login attempt:', { email, password: password ? '[HIDDEN]' : 'empty' });

      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        // Use AuthContext login function
        const userData = {
          email: email,
          name: "Dreams Wide Administrator",
          role: "admin",
          loginTime: new Date().toISOString()
        };

        console.log('Logging in with userData:', userData);

        // Call login function
        login(userData);

        console.log('Login function called, navigating to admin...');

        // Navigate immediately - the AuthContext will handle the state
        navigate("/admin");

      } else {
        console.log('Invalid credentials provided');
        setError("Invalid email or password. Please try again.");
        toast({
          title: "Login Failed",
          description: "Invalid credentials provided",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setError("An error occurred during login. Please try again.");
      toast({
        title: "Login Error",
        description: "An unexpected error occurred",
        variant: "destructive",
        duration: 3000,
      });
    }

    setIsLoading(false);
  };

  const handleDemoLogin = () => {
    console.log('Auto-filling demo credentials');
    setEmail(ADMIN_CREDENTIALS.email);
    setPassword(ADMIN_CREDENTIALS.password);
    setError(""); // Clear any existing errors

    toast({
      title: "Demo Credentials Filled",
      description: "Demo admin credentials have been filled. Click 'Sign in' to login.",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ethiopian-green-50 via-ethiopian-yellow-50 to-ethiopian-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-ethiopian-green-500 text-white rounded-full mb-4">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Dreams Wide Admin</h1>
          <p className="text-muted-foreground mt-2">Secure Administrator Access</p>
        </div>

        <Card className="shadow-lg border-ethiopian-green-200">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Demo Credentials Info */}
            <Alert className="mb-6 border-blue-200 bg-blue-50">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <div className="space-y-1">
                  <p className="font-medium">Demo Admin Credentials:</p>
                  <p className="text-sm">Email: admin@dreamswide.et</p>
                  <p className="text-sm">Password: admin123</p>
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={handleDemoLogin}
                    className="p-0 h-auto text-blue-700 underline"
                  >
                    Click to auto-fill
                  </Button>
                </div>
              </AlertDescription>
            </Alert>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@dreamswide.et"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-ethiopian-green-500 hover:bg-ethiopian-green-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Sign in to Admin Panel
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Secure access to Dreams Wide administration panel
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            🔒 This is a secure admin portal. All activities are logged and monitored.
          </p>
        </div>
      </div>
    </div>
  );
}
